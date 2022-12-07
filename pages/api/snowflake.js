import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-003", {
    prompt: generatePrompt(req.body.sql),
    temperature: 1,
    max_tokens:1000
  });
  res.status(200).json({ resultSQL: completion.data.choices[0].text });
}

function generatePrompt(sql) {
  //const capitalizedAnimal = animal[0];
  return `Convert this Qlik script to a SQL that will work with Snowflake: ${sql}`;
}