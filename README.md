# NFT Marketplace
<i>NFT marketplace dApp where users mint ERC721 implemented NFTs.</i>
### Screenshots
![Home](/public/screenshots/screenshot1.jpg)

![Explore](/public/screenshots/screenshot2.jpg)

![NFT Info](/public/screenshots/screenshot3.jpg)
### Features
- Mint custom ERC721 implemented Tokens.
- Sell tokens on the marketplace.
- Set desired token price.
- Keeps track of all the tokens owned by an account - minted and bought.
- Query blockchain for token owner and token metadata.
#
### Stack
- [Tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework .
- [Next.js](https://nextjs.org/) - A framework that lets you build server-side rendering and static web applications using React.
- [TypeScript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [TypeChain Hardhat plugin ](https://github.com/ethereum-ts/TypeChain/tree/master/packages/hardhat) - Automatically generate TypeScript bindings for smartcontracts while using Hardhat.
- [web3.js](https://web3js.readthedocs.io/en/v1.3.4/) - Allows users to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.
- [Solidity](https://docs.soliditylang.org/en/v0.7.6/) - Object-oriented, high-level language for implementing smart contracts.
- [Hardhat](https://hardhat.org/) - Hardhat is a development environment for Ethereum software. It consists of different components for editing, compiling, debugging and deploying your smart contracts and dApps.
- [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/) - Standard for secure blockchain applications
- [Yarn](https://yarnpkg.com/) - Yarn is a package manager that doubles down as project manager.
#
### Interact with the deployed dApp
- NFT Marketplace dApp requires [Metamask](https://metamask.io/) browser wallet extension to interact with.
- Connect metamask browser wallet to the Localhost/Hardhat Test Network.
- Request and get test ethers for the metamask account from the generated wallet addresses by hardhat.
- NFT Marketplace Smart Contract is deployed locally thru the hardhat network 
#
#### Open new terminal window and clone this repository
```
git clone https://github.com/roy-buhay/NFT-Marketplace.git
```
### Run the App Locally
#### Install Yarn 
```
npm install --global yarn
```
#### Install dependencies
```
cd nft-marketplace
yarn install
```
#### Start
```
yarn start
```
#### Run Harhat's node
```
npx hardhat node
```
#### Deploy smart contract locally
```
npx hardhat run scripts/deploy.js --network localhost
```
- Open metamask browser wallet and connect network to Localhost 8545.
- Import accounts from the hardhat-cli into the metamask browser wallet to make transactions on the dApp.
