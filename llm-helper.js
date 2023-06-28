import { Configuration, OpenAIApi } from 'openai';
import env from './env.json' assert { type: 'json' };

const configuration = new Configuration({
  apiKey: env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

// Basic pass through
export const questionPrompt = async (text) => {
  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 2000,
    prompt: text
  });
  return res.data.choices[0].text; 
}


// Summarize conversation
export const summaryPrompt = async (text) => {
  const prompt = `
	The following is a group conversation: 

	${text}

	Summarize the conversation in a few short sentences.
  `;

  console.log('====\n', prompt, '\n===');

  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 2500,
    temperature: 0.02,
    prompt: prompt
  });
  return res.data.choices[0].text; 
}


// Summarize conversation
export const extendKnowledge = async (text) => {
  const prompt = `
	The following is a group conversation that is technical and scentific in nature: 

	${text}

	Provide two lists, each list up to a maximum of 2 itmes:
	- the first list scentific articles published in the last 3 years that supports the views expressed in the conversation above. 
	- the second list articles published in the last 3 years that express opposite views in the conversation above.

	Give preference to IEEE and ACM publications, the two lists cannot have repeated items, provide URL if available.

	Return the first list with a "suport" heading, return the second list with an "refute" heading.
  `;

  console.log('====\n', prompt, '\n===');

  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 3500,
    temperature: 0.02,
    prompt: prompt
  });
  return res.data.choices[0].text; 
}


//May be too similar to tldr2 for actual use
export const summarizeArgument = async (text) => { 
  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 2500,
    temperature: 0.02,
    prompt: `
	The following is a conversation: 

	${text}

	Summarize the main points of a conversation between the people discussing a conflict they are having with one sentence per person.
	`
  });
  return res.data.choices[0].text; 
}

export const additionalResources = async (text) => { 
  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 2500,
    temperature: 0.02,
    prompt: `
	The following is a conversation: 

	${text}

	Provide me additional resources for my understanding based off of the topics discussed in this conversation.
	`
  });
  return res.data.choices[0].text; 
}

export const findMeGifs = async (text) => { 
  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 2500,
    temperature: 0.02,
    prompt: `
	The following is a conversation: 

	${text}

	give me a search for gif reactions to the conversation like: https://giphy.com/search/ 
	`
  });
  return res.data.choices[0].text; 
}


// Synthesize new knowledge
