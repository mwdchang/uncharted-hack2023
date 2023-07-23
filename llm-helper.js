import { Configuration, OpenAIApi } from 'openai';
import env from './env.json' assert { type: 'json' };

const configuration = new Configuration({
  apiKey: env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);
const MODEL = 'gpt-3.5-turbo';

// Basic pass through chatting interface
export const questionPrompt = async (text) => {
  const res = await openai.createChatCompletion({
    model: MODEL,
    max_tokens: 2000,
    messages: [
	  { role: 'system', content: 'Assistant is a large language model' },
	  { role: 'user', content: text}
	]
  });
  return res.data.choices[0].message.content; 
}


// Summarize conversation
export const summaryPrompt = async (text) => {
  const prompt = `
	The following is a group conversation: 

	${text}

	Summarize the conversation in a few short sentences. Outline the point of view of each participants in the conversation.
  `;

  const res = await openai.createChatCompletion({
    model: MODEL,
    max_tokens: 2500,
    temperature: 0.02,
    messages: [
	  { role: 'system', content: 'Provide knowledge synthesize and act as a knowledge base' },
	  { role: 'user', content: prompt }
	]
  });
  return res.data.choices[0].message.content; 
}


// Extend knowledge
export const expandKnowledge = async (text) => {
  const prompt = `
	The following is a group conversation that is technical and scentific in nature: 

	${text}

    Provide a breif summarization of the above conversation in a non-scientific manner.

	Provide two or three additional resources, such as articles, websites, and scentific publications that provide additional information about the topics covered in the conversation above.
  `;

  const res = await openai.createChatCompletion({
    model: MODEL,
    max_tokens: 3500,
    temperature: 0.02,
    messages: [
	  { role: 'system', content: 'Provide knowledge synthesize and act as a knowledge base' },
	  { role: 'user', content: prompt }
	]
  });
  return res.data.choices[0].message.content; 
}

export const findMeGifs = async (text) => { 
  const promptText = `
	The following is a conversation: 

	${text}

	give me a search for gif reactions to the conversation like: https://giphy.com/search/ 
	`;

  const res = await openai.createCompletion({
    model: MODEL,
    max_tokens: 2000,
    temperature: 0.02,
    messages: [
	  { role: 'system', content: 'Assistant is a large language model' },
	  { role: 'user', content: promptText }
	]
  });
  return res.data.choices[0].message.content; 
}

export const describePeople = async (text) => { 
  const promptText = `
	The following is a conversation: 

	${text}

	For each person in this conversation give me a strength of theirs and what topics I can ask them about
	`;

  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 2500,
    temperature: 0.02,
	messages: [
	  { role: 'system', content: 'Assistant is a large language model' },
	  { role: 'user', content: promptText }
	]
  });
  return res.data.choices[0].message.content; 
}
