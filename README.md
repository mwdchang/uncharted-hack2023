## LLM Slackbot
This ia a hackathon submission for Uncharted summer hackathon 2023. The goal is to create an LLM-powered Slackbot that is able to synthesize human conversations and to provide summarization and additinal context.

Example scenarios:
- If you take a short vacation, rather than reading thorugh potentially hundreds of messages, you can just ask the bot to provide an executive summary
- If there is a conversation that is either too technical or theoretical, you can ask the bot to provide additional resources

This is a one-day hack, however due to other obligations most of the code was written within a time span of 4 hours. The code "works" but does not represent how things should be done, nor good engineering practices.

### Prerequisite
- Copy `env.sample.json` to `env.json` and fill out the credentials.
- NodeJS 18

### Run LLM usecases by themselves
- Copy openAI key into `env.json`
- Run `npm install`
- Run `node ./llm-tests.js`

### Run Slackbot
- Setup and authorize a Slack App/API, this is a good guide that provides the necessary configurations for this bot.
  - https://medium.com/walmartglobaltech/create-slackbot-using-slack-bolt-api-and-node-js-a82876db012f
- Copy credentials as needed to `env.json`
- Invite the bot to the channel(s) on Slack
- Run `node ./slackbot.js`


## Informal result
Using `GTP-3.5 turbo` model. We found that summarizations were decent and potentially useful. The "expand" command to expand current knowledge scope yielded convincing, but often incorrect results - the LLM model here is hallucinating and provided external links that goes nowhere.
