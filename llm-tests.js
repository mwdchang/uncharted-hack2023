import { questionPrompt, summarizeArgument, additionalResources, findMeGifs, describePeople } from './llm-helper.js';

// const Q = 'what is 1 + 2 + 3 + 4?';
// console.log(Q);
// const answer = await questionPrompt(Q);
// console.log(answer);

// const sumArgs = "Daniel Chang  [12:28 PM] \n @Tom Szendrey push directly to main!!!!!!!!!!!!!!! \nTom Szendrey  [12:29 PM] \nWill do \nDaniel Chang  [12:31 PM] \noh I need to make you a collaborator though ... what is your github id  \n@Tom Szendrey ?\n \nTom Szendrey  [12:32 PM] \nTom-Szendrey \n12:43 \n@Daniel Chang \npush successful - I do have access now thanks"
// console.log(sumArgs);
// const sumArgsAns = await summarizeArgument(sumArgs);
// console.log(sumArgsAns);


// const additionalRes = "Daniel Chang  [12:28 PM] \n @Tom Szendrey push directly to main!!!!!!!!!!!!!!! \nTom Szendrey  [12:29 PM] \nWill do \nDaniel Chang  [12:31 PM] \noh I need to make you a collaborator though ... what is your github id  \n@Tom Szendrey ?\n \nTom Szendrey  [12:32 PM] \nTom-Szendrey \n12:43 \n@Daniel Chang \npush successful - I do have access now thanks"
// console.log(additionalRes);
// const additionalResAns = await additionalResources(additionalRes);
// console.log(additionalResAns);

const giveMeGif = "Daniel Chang \n11:13 AM \nwell that epic failed \nTom Szendrey \n11:13 AM \noof"
console.log(giveMeGif);
const reactionGifURL = await findMeGifs(giveMeGif);
console.log(reactionGifURL);

// const descPeopleMessage = " Daniel Chang 2:50 PM Well, ask yourself, when you are dropped into a slack channel or invited into a group conversation, what is it that you want to do? 2:51 [INFO]  socket-mode:SocketModeClient:0 Now connected to Slack > commoand additional > userText 10 [ERROR]  bolt-app UnknownError: say is not a function 2:51 if you are in the midst of a conversation, what do you wish you have? Tom Szendrey   2:51 PM Fair point Summarize what the channel’s entire purpose is or the last few messages at least Ask who everyone is - that could be cool Maybe check what times the channel is used at Daniel Chang   2:52 PM Well, for 2, you might be able to craft a prompt that discovers what are the strength of each individual :53 @azul  help";
// console.log(descPeopleMessage);
// const peopleDescription = await describePeople(descPeopleMessage);
// console.log(peopleDescription);