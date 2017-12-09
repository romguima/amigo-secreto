# amigo-secreto

Simple Secret Santa implementation that uses `data.json` as the input for participants and a text and html templates to send e-mails with the results.

## Configuring

### Game and Participants details
This is inside `data.json` and can be configured as needed

    "gameName": "Friends & Family",
	"giftValue": {
		"minValue": "$ 50.00",
		"maxValue": "$ 60.00"
	},
	"gameDate": "10/10/2010 at 10PM",
	"gamePlace": "At John's place",	
	"players": [
		{
			"name": "John",
			"email": "mail@gmail.com",
			"first": false
		},
		...		

### Mailing Configurations
That's inside `mailInfo.json` and should be configured using a gmail account. I would suggest of creating a new one with this sole purpose. The account will store the sent e-mails and you can use it if any of the participants loose the e-mail with the details.

	"account": "senderMail@gmail.com",
	"password": "passwordHere",
	"dryRun": true,
	"maximumRetries": 4,
	"subject": "Your Secret Santa is here"

- `dryRun` - If `true` the app won't send any e-mails, it will just print out the text template.
- `maximumRetries`- If for any reason the e-mail fails to be sent it will automatically retry until reaches the maximum number of retries.

### Email Templates
There are two e-mail templates, one is plain text and the other one HTML. They can be configured as desired and the following markups can be used:

1. `{name}` will be replaced by the player name;
2. `{targetName}` will be replaced by the name of the player that will receive the gift;
3. `{date}` will be replaced by the game's date;
4. `{place}` will be replaced by the game's place;
5. `{minValue}`will be replaced by the minium gift value;
6. `{maxValue}`will be replaced by the maximum gift value.

## Running

`npm install && node app.js`

