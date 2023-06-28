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
  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 2500,
    temperature: 0.02,
    prompt: `
	The following is a conversation: 

	${text}

	Summarize the conversation in a few short sentences.
	`
  });
  return res.data.choices[0].text; 
}

export const summarizeArgument = async (text) => { 
  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 2500,
    temperature: 0.02,
    prompt: `
	The following is a conversation: 

	${text}

	Summarize the main point of views of each person.
	`
  });
  return res.data.choices[0].text; 

}

// Synthesize new knowledge
