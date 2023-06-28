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
