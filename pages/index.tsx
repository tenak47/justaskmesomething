import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners';

const Home: NextPage = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input.length < 100) setError(false);
  }, [input]);

  const submit = async () => {
    if (input.length > 100) return setError(true);

    console.log('OOO => ', input);

    setLoading(true);

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      const payload: { result: string } = await res.json();
      const { result } = payload;

      setSuggestion(result);
    } catch(error) {
      console.log('error', error); 
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="hero w-full h-full">
      <Head>
        <title>Just Ask Me Anything</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="lg:max-w-7xl mx-auto py-12">
        <h1 className="text-2xl font-bold text-center pb-2">Just Ask Me Anything</h1>

        <div className="flex flex-col gap-4 lg:w-1/3 px-3 justify-content mx-auto">
          <div className="relative w-full">
            {error && (
              <p className="text-red-500 text-xs">
                Character limit exceeded, please enter less text
              </p>
            )}
            <textarea
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border-2 border-gray-300 bg-white p-4 rounded-lg text-sm focus:outline-none resize-none w-full"
              placeholder="Type something ffs..."
            />
            <div
              className={`absolute ${
                input.length > 100 ? 'text-red-500' : 'text-gray-400'
              } bottom-3 right-3 text-gray-400 text-xs`
            }
            >
              <span>{input.length}</span>/100
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={submit}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-4">
                <p>Loading...</p>
                <MoonLoader size={20} color="white" />
              </div>
            ) : (
              'Answer me'
            )}
          </button>

          {suggestion && (
            <div className="relative w-full rounded-md bg-gray-100 p-4 mt-8">
              <h4 className="text-lg font-semibold pb-2">
                Your Answer
              </h4>
              <p className="text-sm text-gray-700">{suggestion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;