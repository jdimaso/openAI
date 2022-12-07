import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-003", {
    prompt: generatePrompt(req.body.mentor),
    temperature: 0,
    max_tokens:1000
  });
  res.status(200).json({ resultMentor: completion.data.choices[0].text });
}

function generatePrompt(mentor) {
  //const capitalizedAnimal = animal[0];
  return `${mentor} in Qlik Sense`;
}