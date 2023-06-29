### Prereq
- Copy `env.sample.json` to `env.json` and fill out the credentials.
- NodeJS 18

### Run LLM usecases by themselves
- Copy openAI key into `env.json`
- Run `npm install`
- Run `node ./llm-tests.js`

### Run Slackbot
- Setup and authorize a Slack App/API, this is a good guide.
  - https://medium.com/walmartglobaltech/create-slackbot-using-slack-bolt-api-and-node-js-a82876db012f
- Copy credentials as needed to `env.json`
- Invite the bot to the channel(s) on Slack
- Run `node ./slackbot.js`
