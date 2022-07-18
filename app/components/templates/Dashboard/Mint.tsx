import React from "react";
import Image from 'next/image'
import Router from "next/router";
import useSWR from "swr";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import { IItem } from "types";
import { api } from "@lib/api";
import { fetchWrapper } from "@util/fetchWrapper";
import { useContract } from "@hooks/index";
import {
  TextInput,
  TextArea,
  SelectCustom,
  ImageUpload,
  Properties,
} from "@module/Input";
import { Preview } from "@element/SVG";
import { RiLoader4Fill } from "react-icons/ri";

const collection_endpoint = process.env.NEXT_PUBLIC_COLLECTIONS
const category_endpoint = process.env.NEXT_PUBLIC_CATEGORIES

const nftSchema = Yup.object().shape({
  file: Yup.string().required("Required"),
  name: Yup.string().min(4, "Too Short!").required("Required"),
  price: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  collection: Yup.object().shape({
    name: Yup.string().required("Required"),
    logo: Yup.string().required("Required"),
  }),
});

async function fetcher(url: string) {
  const res = await fetchWrapper(url)
  return res
}

const Mint: React.FC = () => {
  const { contract } = useContract();
  const { data: collectionData } = useSWR(collection_endpoint, fetcher)
  const { data: categoryData } = useSWR(category_endpoint, fetcher)

  const attribute = { key: undefined, value: undefined };

  const values: IItem = {
    file: undefined,
    name: undefined,
    price: undefined,
    description: undefined,
    category: undefined,
    collection: undefined,
    attributes: [attribute],
  };

  async function handleSubmit(val: IItem, actions: FormikHelpers<IItem>) {
    const url = await api.uploadToIPFS(val);
    actions.setSubmitting(true);
    const save = await api.saveNFT(val, url, contract);
    save.status === 1 && Router.push("/");
  }

  return <div>
      <Formik
        initialValues={values}
        validationSchema={nftSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {({
          values,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        }) => (
          <Form className="flex items-center justify-between">
            <div className="lg:w-7/12 px-12">
              {values.file ? (
                <div className="gradientBorder relative mt-6 h-[40rem] md:h-[40rem] w-full">
                  <span className="block relative z-10 w-full rounded-lg overflow-hidden object-contain rounded-lg perspective h-[250px] md:h-[450px]">
                    <Image
                      src={values.file}
                      alt={values.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </span>
                </div>
              ) : <Preview />}
            </div>
            <div className="flex flex-col space-y-5 w-full lg:w-5/12">
              <Field
                name="name"
                label="NFT Name"
                component={TextInput}
                errors={errors.name}
              />

              <Field
                name="price"
                label="Price (in ETH)"
                component={TextInput}
                errors={errors.price}
              />

              <SelectCustom
                name="category"
                label="Category"
                data={categoryData ? categoryData : []}
                activeCategory={values.category}
              />

              <SelectCustom
                name="collection"
                label="Collections"
                data={collectionData ? collectionData : []}
                activeCollection={values.collection}
              />

              <Field
                name="description"
                label="Description"
                component={TextArea}
                errors={errors.description}
              />

              <ImageUpload label="Image asset" name="file" />

              <Properties
                label="Properties"
                values={values.attributes}
              />

              <button
                type="submit"
                className={`flex items-center justify-center space-x-2 w-full px-4 py-2 text-white text-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded shadow-lg ${isSubmitting && "opacity-50 pointer-events-none"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <span>Submitting...</span>{" "}
                    <RiLoader4Fill className="animate-spin text-white" />
                  </>
                ) : (
                  <span>Create</span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
}

export default Mint