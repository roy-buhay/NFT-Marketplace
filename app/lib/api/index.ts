import { ethers } from "ethers";
import axios from "axios";
import {
  doc,
  getFirestore,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "@firebase/initFirebase";

const IPFS_URL = process.env.NEXT_PUBLIC_IPFS_URL;
const { create } = require("ipfs-http-client");
const ipfs = create({
  host: process.env.NEXT_PUBLIC_IPFS_HOST,
  port: process.env.NEXT_PUBLIC_IPFS_PORT,
  protocol: process.env.NEXT_PUBLIC_IPFS_PROTOCOL,
});

async function uploadImage(file: string) {
  try {
    const added = await ipfs.add(file);
    const url = `${IPFS_URL}/ipfs/${added.path}`;
    return url
  } catch (error) {
    console.log("Error uploading file: ", error);
  }

  return null
}

async function uploadToIPFS(val: any) {
  const { name, description, price, attributes, category, collection, file } =
    val;
  const data = JSON.stringify({
    category,
    price,
    collection,
    name,
    description,
    image: file,
    attributes,
  });
  try {
    const added = await ipfs.add(data);
    const url = `${IPFS_URL}/ipfs/${added.path}`;

    console.log(url)
    return url;
  } catch (error) {
    console.error("Error uploading file: ", error);
  }
  return null;
}

async function getAllNFT(contract: { fetchMarketItems: () => any; tokenURI: any; }) {
  if (contract) {
    const data = await contract.fetchMarketItems();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          collection: meta.data.collection,
          category: meta.data.category,
          tokenURI,
        };
        return item;
      })
    );
    return items;
  }
  return null;
}

async function saveNFT(val: { price: string; }, url: any, contract: any) {
  const formattedPrice = ethers.utils.parseUnits(val.price, "ether");

  let listingPrice = await contract.getListingPrice();
  listingPrice = listingPrice.toString();

  let transaction = await contract.createToken(url, formattedPrice, {
    value: listingPrice,
  });
  const res = await transaction;
  const wait = res.wait();
  return wait;
}

async function saveCollection({ name, url, logo, banner, description, category }) {
  let collectionObject: any;
  collectionObject = {
    name: name,
    url: url,
    logo: logo,
    banner: banner,
    description: description,
    category: category,
  };
  const db = getFirestore();
  const collectionRef = collection(db, "collections");
  return await addDoc(collectionRef, collectionObject);
}

async function sellNFT(id: any, price: string, contract: any) {
  const priceFormatted = ethers.utils.parseUnits(price, "ether");

  let listingPrice = await contract.getListingPrice();
  listingPrice = listingPrice.toString();

  let transaction = await contract.resellToken(id, priceFormatted, {
    value: listingPrice,
  });

  const res = await transaction;
  const wait = res.wait();
  return wait;
}

async function buyNFT(data: any, contract: any) {
  const parsedPrice = ethers.utils.parseUnits(data.price.toString(), "ether");
  const transaction = contract.createMarketSale(data.tokenId, {
    value: parsedPrice,
  });
  const res = await transaction;
  const wait = res.wait();

  return wait;
}

function createUser(address: string) {
  let photo: string;
  let profile: any;

  fetch(`http://names.drycodes.com/1`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (displayName) {
      profile = {
        address: address,
        bio: "",
        email: "",
        name: displayName[0],
      };
      setDoc(doc(db, "users", address), profile);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export const api = {
  uploadImage,
  uploadToIPFS,
  getAllNFT,
  saveNFT,
  saveCollection,
  sellNFT,
  buyNFT,
  createUser,
};
