import { questionPrompt, summarizeArgument, additionalResources, findMeGifs } from './llm-helper.js';

const Q = 'what is 1 + 2 + 3 + 4?';
console.log(Q);
const answer = await questionPrompt(Q);
console.log(answer);

// const sumArgs = "Daniel Chang  [12:28 PM] \n @Tom Szendrey push directly to main!!!!!!!!!!!!!!! \nTom Szendrey  [12:29 PM] \nWill do \nDaniel Chang  [12:31 PM] \noh I need to make you a collaborator though ... what is your github id  \n@Tom Szendrey ?\n \nTom Szendrey  [12:32 PM] \nTom-Szendrey \n12:43 \n@Daniel Chang \npush successful - I do have access now thanks"
// console.log(sumArgs);
// const sumArgsAns = await summarizeArgument(sumArgs);
// console.log(sumArgsAns);


// const additionalRes = "Daniel Chang  [12:28 PM] \n @Tom Szendrey push directly to main!!!!!!!!!!!!!!! \nTom Szendrey  [12:29 PM] \nWill do \nDaniel Chang  [12:31 PM] \noh I need to make you a collaborator though ... what is your github id  \n@Tom Szendrey ?\n \nTom Szendrey  [12:32 PM] \nTom-Szendrey \n12:43 \n@Daniel Chang \npush successful - I do have access now thanks"
// console.log(additionalRes);
// const additionalResAns = await additionalResources(additionalRes);
// console.log(additionalResAns);

// const giveMeGif = "Daniel Chang \n11:13 AM \nwell that epic failed \nTom Szendrey \n11:13 AM \noof"
// console.log(giveMeGif);
// const reactionGifURL = await findMeGifs(giveMeGif);
// console.log(reactionGifURL);
