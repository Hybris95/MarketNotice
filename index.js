import AudioPlayer from "../AudioAPI";

const bidSound = new AudioPlayer();
const cashSound = new AudioPlayer();

bidSound.open(new java.io.File("./config/ChatTriggers/modules/MarketNotice/assets/bid.wav"));
cashSound.open(new java.io.File("./config/ChatTriggers/modules/MarketNotice/assets/cash.wav"));

const { Setting, SettingsObject } = require("SettingsManager/SettingsManager.js")
const Settings = new SettingsObject("MarketNotice", [
    {
        name:"MarketNotice Sound",
        settings: [
            new Setting.Toggle("Bazaar Sell", false),
			new Setting.Toggle("Bazaar Buy", false),
			new Setting.Toggle("AH Sell", false),
			new Setting.Toggle("AH Bid", false)
        ]
    },
	{
		name:"MarketNotice Screen Message",
		settings: [
            new Setting.Toggle("Bazaar Sell", false),
			new Setting.Toggle("Bazaar Buy", false),
			new Setting.Toggle("AH Sell", false),
			new Setting.Toggle("AH Bid", false)
		]
	},
	{
		name:"MarketNotice Message Cleanup",
		settings: [
            new Setting.Toggle("Bazaar Sell", false),
			new Setting.Toggle("Bazaar Buy", false),
			new Setting.Toggle("AH Sell", false),
			new Setting.Toggle("AH Outbid", false)
		]
	},
	{
		name:"MarketNotice Developer",
		settings: [
            new Setting.Toggle("Debug Messages", false)
		]
	}
]).setCommand("marketnotice").setSize(Renderer.screen.getWidth()/2, Renderer.screen.getHeight()/2);
Setting.register(Settings);

register("chat", (player,coins,item,event) => {
	if(Settings.getSetting("MarketNotice Developer","Debug Messages")){
		ChatLib.chat("&cDetected bid for " + item + "&c by " + player + "&c of " + coins + "&c coins");
	}
	if(Settings.getSetting("MarketNotice Screen Message","AH Outbid")){
		Client.showTitle("&c&lOutbid!", item + "&7 was outbid by " + coins + "&7 coins", 0, 35, 15)
	}
	if(Settings.getSetting("MarketNotice Sound","AH Outbid")){
		bidSound.play();
	}
	if(Settings.getSetting("MarketNotice Cleanup","AH Outbid")){
		cancel(event);
	}
}).setCriteria("&6[Auction] ${player} &eoutbid you by ${coins} &efor ${item} &e&lCLICK&r")

register("chat", (player,item,price,event) => {
	if(Settings.getSetting("MarketNotice Developer","Debug Messages")){
		ChatLib.chat("&cDetected Sell for " + item + "&c by " + player + "&c of " + price + "&c coins");
	}
	if(Settings.getSetting("MarketNotice Screen Message","AH Sell")){
		Client.showTitle("&c&lSold!", item + "&7 was bought by " + player + "&7 for " + price + "&7 coins", 0, 35, 15)
	}
	if(Settings.getSetting("MarketNotice Sound","AH Sell")){
		cashSound.play();
	}
	if(Settings.getSetting("MarketNotice Cleanup","AH Sell")){
		cancel(event);
	}
}).setCriteria("&6[Auction] ${player} &ebought ${item} &efor ${price} coins &lCLICK&r")

register("chat", (amount,product,event) => {
	if(Settings.getSetting("MarketNotice Developer","Debug Messages")){
		ChatLib.chat("&cBuy order filled for " + amount + " " + product);
	}
	if(Settings.getSetting("MarketNotice Screen Message","Bazaar Buy")){
		Client.showTitle("&c&1Buy order!", amount + " " + product + "&7 was bought", 0, 35, 15)
	}
	if(Settings.getSetting("MarketNotice Sound","Bazaar Buy")){
		cashSound.play();
	}
	if(Settings.getSetting("MarketNotice Cleanup","Bazaar Buy")){
		cancel(event);
	}
}).setCriteria("&r&6[Bazaar] &r&eYour &r&aBuy Order &r&efor ${amount}&r&7x ${product} &r&ewas filled!&r")

register("chat", (amount,product,event) => {
	if(Settings.getSetting("MarketNotice Developer","Debug Messages")){
		ChatLib.chat("&cSell order filled for " + amount + " " + product);
	}
	if(Settings.getSetting("MarketNotice Screen Message","Bazaar Sell")){
		Client.showTitle("&c&1Sell order!", amount + " " + product + "&7 was sold", 0, 35, 15)
	}
	if(Settings.getSetting("MarketNotice Sound","Bazaar Sell")){
		cashSound.play();
	}
	if(Settings.getSetting("MarketNotice Cleanup","Bazaar Sell")){
		cancel(event);
	}
}).setCriteria("&r&6[Bazaar] &r&eYour &r&6Sell Offer &r&efor ${amount}&r&7x ${product} &r&ewas filled!&r")

/*
register("chat", (event) => {
	if(Settings.getSetting("MarketNotice Developer","Debug Messages")){
		ChatLib.chat("&c"+ChatLib.getChatMessage(event,true).split("&").join("\\&"));
	}
})
*/