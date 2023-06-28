import { questionPrompt } from './llm-helper.js';

const Q = 'what is 1 + 2 + 3 + 4?';
console.log(Q);
const answer = await questionPrompt(Q);
console.log(answer);
