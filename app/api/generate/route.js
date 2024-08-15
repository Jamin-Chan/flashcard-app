import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { env } from 'node:process';

const systemPrompt = `You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`
// export async function POST(req) {
//   const openai = new OpenAI()
//   const data = await req.text()

//   const completion = await openai.chat.completions.create({
//     messages: [
//       { role: 'system', content: systemPrompt },
//       { role: 'user', content: data },
//     ],
//     model: 'gpt-4o',
//     response_format: { type: 'json_object' },
//   })

//   // Parse the JSON response from the OpenAI API
//   const flashcards = JSON.parse(completion.choices[0].message.content)

//   // Return the flashcards as a JSON response
//   return NextResponse.json(flashcards.flashcards)
// }

export async function POST(req) {
    const genAI = new GoogleGenerativeAI(env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt,

        generation_config: {
            "temperature": 1,
            "top_p": 1,
            "top_k": 64,
            "max_output_tokens": 1056,
            "response_mime_type": "application/json",
          }
    });

    const data = await req.text()
  
    const result = await model.generateContent(data);
    const flashcards = JSON.parse(result.response.text())

    console.log(flashcards);

    // const response = await result.response;
    // const flashcards = JSON.parse(response[0])
    // console.log(flashcards);
    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
}