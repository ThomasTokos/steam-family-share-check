//Importing the basics here and defning the Discord Web Hook we will use
//I chose to use a npm module for this just to make the code look a little more clean, and sending post request to webhooks though Axios is hard.
const axios = require('axios');
const config = require('./config.js');
const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Watchin Rust");
});


client.login(config.discord.token);

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
//This is a embed that will send to Discord if the result of the query is true
function doFamilyShareTrue(steamResponse) {
  const embed = {
  "title": "Rust Family Share Check",
  "description": "We will display the results of the user search for family share below! If there is an error, please dm the bot!",
  "url": "https://github.com/ThomasTokos/steam-family-share-check/tree/discord-bot",
  "color": 16711696,
  "timestamp": "2020-08-15T21:05:36.220Z",
  "footer": {
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
    "text": "Last check:"
  },
  "thumbnail": {
    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "image": {
    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "author": {
    "name": "Rust Family Share Check Bot",
    "url": "https://github.com/ThomasTokos/steam-family-share-check/tree/discord-bot",
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "fields": [
    {
      "name": ":red_circle: This player is Family Sharing! :red_circle: ",
      "value": " is Family Sharing a copy of Rust from "
    },
    {
      "name": "Coming Soon",
      "value": "Coming Soon"
    },
    {
      "name": "Coming Soon",
      "value": "Coming Soon"
    },
    {
      "name": "Coming Soon",
      "value": "Coming Soon",
      "inline": true
    }
  ]
};
channel.send({ embed });

};
//IF FAMILY SHARE IS FALSE
//This is a embed that will send to Discord if the result of the query is false
function doFamilyShareFalse() {
  const embed = {
    "title": "Rust Family Share Check",
    "description": "We will display the results of the user search for family share below! If there is an error, please dm the bot!",
    "url": "https://github.com/ThomasTokos/steam-family-share-check/tree/discord-bot",
    "color": 8311585,
    "timestamp": "2020-08-15T21:05:36.220Z",
    "footer": {
      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
      "text": "Last check:"
    },
    "thumbnail": {
      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "image": {
      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "author": {
      "name": "Rust Family Share Check Bot",
      "url": "https://github.com/ThomasTokos/steam-family-share-check/tree/discord-bot",
      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "fields": [
      {
        "name": "This player is not family sharing Rust",
        "value": " is not family sharing rust."
      },
      {
        "name": "Coming Soon",
        "value": "Coming Soon"
      },
      {
        "name": "Coming Soon",
        "value": "Coming Soon"
      },
      {
        "name": "Coming Soon",
        "value": "Coming Soon",
        "inline": true
      }
    ]
  };
