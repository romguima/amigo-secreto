var format = require("string-template");
var requireText = require("require-text");
var mailer = require("gmail-send")({
	user: 'mail@gmail.com',
	pass: 'password',
	subject: 'Sample subject'
});

let maximumRetries = 4;
let textTemplate = requireText("./textTemplate.txt", require);
let htmlTemplate = requireText("./htmlTemplate.html", require);
let data = require("./data");
let Game = require("./game");
var dryRun = true;

function playerToString(player) {
	return player.name + ", " + player.email + ", " + player.first;
}

let sendMail = function(step, content, retry) {
	if (dryRun) {
		console.log("\n============================================");
		console.log(format(textTemplate, content));
		console.log("\n===========================================");
	} else {
		mailer({
			to: step.player.email,
			text: format(textTemplate, content),
			html: format(htmlTemplate, content)
		}, function(err, res) {
			if (!err) {
				console.log("Mail successfully sent to: " + playerToString(step.player));
			} else {
				console.log("Error while sending mail to: " + playerToString(step.player));
				console.log("Error details: \n" + err);
				if (retry >= maximumRetries) {
					console.log("** ERROR: maximum number of attempts reached, exiting.");
					process.exit(1);
				}
				console.log("Retrying...");
				sendMail(step, content, retry+1);
			}
		});
	}
}

let game = new Game(data.gameName, data.players, data.giftValue, data.gameDate, data.gamePlace, data.avoidInGroupPairing);

console.log("Running game for " + game.getName());
console.log("Total players: " + game.getPlayers().length);
let first = game.getFirst();
console.log("First player: " + playerToString(first));

let result = game.play();
result.forEach(step => {
	var content = {
		name: step.player.name,
		targetName: step.target.name,
		date: game.getDate(),
		place: game.getPlace(),
		minValue: game.getMinGiftValue(),
		maxValue: game.getMaxGiftValue()
	}

	sendMail(step, content, 0);
});

