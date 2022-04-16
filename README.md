# NCD Mathematician

## About the project

> Near dAPP that give prizes competitors who have high score.

NCD Mathematician is a Near app (whose frontend is powered by React) that ask you math question depends on difficulty and give rewards based on score you get.

Main features:

-   Login app.
-   Choose your difficulty.
-   Participate the game (Entrance ticket is 1 NEAR)
-   Based on point you get, system will reward you when game is done.
-   You can check previous results that you have obtained.

Project is powered by Google's Firebase. You can reach the project [here.](https://ncdmath.web.app/)

## Usage

To use this project for development purpose the things you should do:

-   Clone this repository
-   Run `npm i`  to install dependencies.
-   To run frontend, you have to run `npm run start`
-   Currently it uses my testnet account (nerdkrypto.testnet), if you want to deploy contract on your own account, change variables on neardev file.
-   To build contract, run `npm run buildNear:release`
-   To deploy contract, run `near dev-deploy .\out\main.wasm`

## Contract

Details about contract:

|Name|Type|Details|Functionality|How to Call|
|---|---|---|---|---|
|m|PersistentMap|private|This variable is used to keep track of all results for a player.|-|
|getStorage|Function|public - view function|This function is used to get storage value for a player. Value on storage is used to determine the state of player on frontend.|`contract.getStorage({ key: currentUser?.accountId })`|
|getMap|Function|public - view function|This function is used to get map value for a player. Value on map is used to check previous results of player on frontend.|`contract.getMap({ key: currentUser.accountId });`|
|getTicket|Function|public - call function|This function is used to get 1 NEAR from players and let them in game. It has assert checks, sets storage and creates promise batch to create transfer.|`contract.getTicket({}, ATTACHED_GAS, ATTACHED_TOKENS);`|
|finishGame|Function|public - call function|This function is used to send prize to player. It sets map values, storages and creates promise batch to create transfer.|`contract.finishGame({amount},ATTACHED_GAS, 0)`|





