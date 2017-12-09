# amigo-secreto

Simple Secret Santa implementation that uses `data.json` as the input for participants and a text and html templates to send e-mails with the results.

## Configuring

1. Input game details and players' data into `data.json`;
2. Setup gmail account and details into `mailInfo.json`;
2.1. If the property `dryRun` is set to `true` no e-mail is going to be sent.
3. Setup the templates `txtTemplate.txt` and `htmlTemplate.html` the way you want keeping the markup fields (e.g. `{name}`).

## Running

`npm install && node app.js`
