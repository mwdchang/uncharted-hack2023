import pkg from '@slack/bolt';
const { App } = pkg;

import env from './env.json' assert { type: 'json' };
import { questionPrompt, summaryPrompt } from './llm-helper.js';

const app = new App({
  token: env.OAUTH_TOKEN,
  signingSecret: env.SIGNING_SECRET,
  appToken: env.APP_TOKEN,
  socketMode: true // enable to use socket mode
});

let botUserId = '';

const handleQuestion = async (text, say) => {
  const result = await questionPrompt(text);
  return say(result);
};

const handleSummary = async (channelId, number, say) => {
  const result = await app.client.conversations.history({
    channel: channelId
  });

  const messages = result.messages;
  const filterdMessages = messages.filter(d => {
    return !d.subtype && 
	  !d.bot_profile &&
	  !d.text.startsWith(`<@${botUserId}>`) &&
	  d.text.length > 2;
  });

  const orderedMessages = filterdMessages.reverse().map(d => d.text).splice(number);
  const text = orderedMessages.join('\n');
  const llmResult= await summaryPrompt(text); 
  return say(llmResult); 
}

const handleHelp = async (say) => {
  return say(`
  \`\`\`
Usage is @bot <command> <context>:
The commands are:
q <question>
- basically a chatGPT proxy

tldr [x=50] 
- summarize roughly the last <x> number of messages
  \`\`\`
  `);
};

app.message(/.*/, async ({ message, say }) => {
  if (message.text.startsWith(`<@${botUserId}>`)) {
	// console.log(message);
	const channelId = message.channel;

	// Parse message
	const [_id, command, ...args] = message.text.split(' ');
	const userText = args.join(' ');
	console.log(command, userText);

	if (command === 'q') await handleQuestion(userText, say);
	else if (command === 'tldr') await handleSummary(channelId, +userText, say);
    else await handleHelp(say);
  }
});


(async () => {
  await app.start(3000);
  console.log('App started'); 
  const blah = await app.client.auth.test();
  botUserId = blah.user_id;
})();


/*
app.message(':wave:', async ({ message, say }) => {
  console.log('message', message);
  // Handle only newly posted messages here
  if (message.subtype === undefined
    || message.subtype === 'bot_message'
    || message.subtype === 'file_share'
    || message.subtype === 'thread_broadcast') {
    await say(`Hello, <@${message.user}>`);
  }
});
*/

