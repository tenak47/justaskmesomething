// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi } from 'openai';
import configuration from '../../utils/constants';

type Data = {
  result: string
}

const openai = new OpenAIApi(configuration);

// const completion = await openai.createCompletion({
//   model: "text-davinci-002",
//   prompt: "Hello world",
// });
// console.log(completion.data.choices[0].text);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input } = req.body;

  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: input,
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const suggestion = response.data.choices[0].text;

  if (suggestion === undefined) throw new Error('No Suggestions found');

  res.status(200).json({ result: suggestion });
}
