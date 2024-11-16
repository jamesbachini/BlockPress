# BlockPress

## Demo

https://jamesbachini.github.io/BlockPress/

## Concept

Trust in legacy media is at an all time low, maybe there is a gap in the market for somewhere creators can post content longer than 280 characters that is censorship resistant and dedicated to free speech.

Blockpress is somewhere between Wordpress and a React app but the reusable code modules are stored within a smart contract.

A creator can choose the look of their site, import the modules they want for menus, comment sections and novel unique web3 options like token based memberships. Then the author writes a blog post, article or news story and stores it on-chain, immutable forever.

No one selling your data, no monthly fees for hosting or cloud services, pay a tx fee for blockspace when posting and then never worry about it again.

Here’s how it works:

The key concept here is that we can store code in a smart contract. Not Solidity but HTML, JavaScript and CSS. These are the languages of the web and we can build decentralised applications by storing this code remotely on EVM blockchains. The following testnets are currently supported are:

Ethereum Sepolia, Worldchain, Flow, Polygon zkEVM, Mantle, Rootstock, Morth and Linea

Contracts are deployed and verified in blockscout.

Over time this could evolve into an open-source library of web developer plugins which can be combined to create websites, blogs and decentralized apps.

The BlockPress smart contract stores code modules and posts along with associated metadata but a browser still needs an access point to load the blockpress-sdk and direct queries to the right smart contract. For the hackathon we built this into a mini app for worldcoin and used the world ID to provide sybil protection.

Elon Musk is able to launch rockets and catch them with chopsticks but he hasn't managed to stop the bots spamming X. World ID's enable us to launch a social network of humans reducing spam and creating a real town square for the digitial age.

In the future it might be possible to embed the BlockPress-SDK into browsers so the decentralized web could be loaded directly without DNS using a URL like: bp://0xjames-news/my-first-webpage

0xjames-news would be the name of the site that loads the code modules to render the layout and my-first-webpage would load that individual post with the authors content. 

Developers could customise their own sites by building javascript modules similar to react modules which can then be stored on-chain and shared between users.

I believe permissionless publishing and decentralized social media is going to disrupt legacy media sooner or later. Why not help make it sooner?

BlockPress is a censorship resistant web3 platform where communities can share ideas without interference.


## Possible Tech Integrations

https://ethglobal.com/events/bangkok/prizes#blockless

Protocol Labs - filecoin to host images?
Worldcoin mini-app - frontend?
Blockscout Explorer - use it as the block explorer?
Dynamic -Web2, but better - use for account creation?
Web3Auth - Best Mini Apps built using Web3Auth SDKs - login for worldcoin miniapp

L2's

Flow -  Most Killer App Potential
Polygon - User Onboarding Challenge: Simplifying Web3 Access on Polygon
Mantle - Best UX / UI Project
Rootstock - BTC EVM
Morph - Best Consumer Applications build on Morph
Linear - Best Project Deployed on Linea and MetaMask JSON-RPC API
