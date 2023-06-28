import pkg from '@slack/bolt';
const { App } = pkg;

import env from './env.json' assert { type: 'json' };
import { questionPrompt, summaryPrompt, findMeGifs, additionalResources, extendKnowledge, describePeople } from './llm-helper.js';


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

const userMap = {};

const getHistory = async (channelId, number) => {
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

  const orderedMessages = filterdMessages.splice(0, number).reverse();
  for (let i = 0; i < orderedMessages.length; i++) {
	const msg = orderedMessages[i];
	if (!userMap[msg.user]) {
	  const r = await app.client.users.info({
		 user: msg.user 
	  });
	  if (r) {
		userMap[msg.user] = r.user.name;
	  }
	} 
  }
  const text = orderedMessages.map(d => {
    return `${userMap[d.user]}: ${d.text}`;
  }).join('\n');
  return text;
}


const handleSummary = async (channelId, number, say) => {
  const text = await getHistory(channelId, number);

  const llmResult= await summaryPrompt(text); 
  return say(llmResult); 
}

const handleRef = async (channelId, number, say) => {
  const text = await getHistory(channelId, number);

  const llmResult= await extendKnowledge(text); 
  return say(llmResult); 
}

const handleGif = async (channelId, number, say) => {
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

  const orderedMessages = filterdMessages.splice(0, number).reverse().map(d => d.text);
  const text = orderedMessages.join('\n');
  const llmResult= await findMeGifs(text); 
  return say(llmResult); 
}

const handleAdditional = async (channelId, number, say) => {
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

  const orderedMessages = filterdMessages.splice(0, number).reverse().map(d => d.text);
  const text = orderedMessages.join('\n');
  const llmResult= await additionalResources(text); 
  return say(llmResult); 
}
const handleDescribePeople = async (channelId, number, say) => {
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

  const orderedMessages = filterdMessages.splice(0, number).reverse().map(d => d.text);
  const text = orderedMessages.join('\n');
  const llmResult= await describePeople(text); 
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

tldr-block <triple backtick block>
- summarize roughly the last <x> number of messages

additional [x=50]
-Reads the last <x> messages and provides Additional Resources 

gif [x=50]
-Reads the last <x> messages and provides gif reaction search

descriptions
-Reads the chat and provides a description of the users in the channel.
What are some of their strengths and what are some of the topics you can ask them about
  \`\`\`
  `);
};

app.message(/.*/, async ({ message, say }) => {
  if (message.text.startsWith(`<@${botUserId}>`)) {
	// console.log(message);
	const channelId = message.channel;

	// Parse message
	let [_id, command, ...args] = message.text.split(' ');
	let userText = '';
	if (command.includes('\n') && command.includes('```')) {
	  [command, ...args] = command.split('\n');
	  userText = message.text.substring(message.text.indexOf('```'), 9999);
	} else {
	  userText = args.join(' ');
	}

	// console.log('> commoand', command);
	// console.log('> userText', userText);

	if (command === 'q') {
		await handleQuestion(userText, say);
	} else if (command === 'tldr') {
		await handleSummary(channelId, +userText, say);
	} else if (command === 'tldr-block') {
		userText = userText.replaceAll('```', '');
		const res = await summaryPrompt(userText);
		await say(res);
    } else if (command === 'ref') {
		await handleRef(channelId, +userText, say);
    } else if (command === 'ref-block') {
		userText = userText.replaceAll('```', '');
		const res = await extendKnowledge(userText);
		await say(res);
    } else if (command === "gif") {
      await handleGif(channelId, +userText, say);
    } else if (command === "additional") {
      await handleAdditional(channelId, +userText, say);
    } else if (command === "descriptions") {
      await handleDescribePeople(channelId, +userText, say);
    } else {
      await handleHelp(say);
    }
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

