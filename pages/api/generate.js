import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-003", {
    prompt: generatePrompt(req.body.animal),
    temperature: 1,
    max_tokens:1000
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
  //const capitalizedAnimal = animal[0];
  return `Convert this Qlik expression to a Power BI formula: ${animal}`;
}