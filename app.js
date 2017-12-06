var mailer = require("nodemailer");

var data = require("./data");
var Game = require("./game");

function playerToString(player) {
	return player.name + ", " + player.email + ", " + player.first;
}

let amigoSecreto = new Game(data.gameName, data.players, data.giftValue, data.gameDate, data.gamePlace, data.avoidInGroupPairing);

console.log("Running game for " + amigoSecreto.getName());
console.log("Total players: " + amigoSecreto.getPlayers().length);
let first = amigoSecreto.getFirst();
console.log("First player: " + playerToString(first));
amigoSecreto.getPlayers().forEach(player => console.log(playerToString(player)));

console.log("\n\nSTARTING GAME!\n\n");
let result = amigoSecreto.play();
result.forEach(step => console.log(playerToString(step.player) + " > " + playerToString(step.target)));