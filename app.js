//Importing the basics here and defning the Discord Web Hook we will use
//I chose to use a npm module for this just to make the code look a little more clean, and sending post request to webhooks though Axios is hard.
const axios = require('axios');
const config = require('./config.js');


/*
Here we will define what we need for the app to run:
  *appid: The App ID is the game ID of the game we want to check if there is family share, the default is Rust
  *steamids: The Steam64 ID of the player we wish to check. If you don't know how to get Steam64 IDs I don't think this tool is for you :)
  *apikey: The API Key is what we need to make the query to steam to see if the player is family sharing. You can get an API key here: https://steamcommunity.com/dev/apikey
*/
const appid = config.steam.appid;
const steamids = "";
const apikey = config.steam.apikey;

//This is where the request is made to the Steam API and we get the resonse.
axios.get(`http://api.steampowered.com/IPlayerService/IsPlayingSharedGame/v0001/?key=${apikey}&steamid=${steamids}&appid_playing=${appid}&format=json`)
  .then(function (response) {
    console.log(response);
    const steamResponse = response.data.response.lender_steamid;
    if(steamResponse === '0') return doFamilyShareFalse();

    return doFamilyShareTrue(steamResponse)
  })
  .catch(function (error) {
    console.log(error);
  });



//IF FAMILY SHARE TRUE
function doFamilyShareTrue(steamResponse) {

};
//IF FAMILY SHARE IS FALSE
function doFamilyShareFalse() {


};

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Watchin Rust");
  console.log(client.users.get('').send(""));
});


client.login(config.discord.token);
