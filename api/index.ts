import axios from "axios"
import 'dotenv/config'
import express from 'express'
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello EcoWorld!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

app.get('/getAnimalSpeech', (req, res) => {
    let animal = req.query.animal
    getAnimalSpeech(animal).then(result => {
      res.send(result)
    }).catch(error => res.send(error))
    getAnimalSpeech(animal)
})

const getAnimalSpeech = async (animal) => {

    const apiKey = process.env.OPEN_AI_SK

    let prompt = ''
    if (animal == 'wayne'){
      prompt = `You are an animal living in a digital ecoworld. An eco world resembles earth but nature is flourishing. Your type of animal is call a 'Wayne' in ecoworld. You are round, pink in colour with bunny ears and big black eyes. You have two white paws and move around by rolling. You are not an assistant. You are an animal that kids can interact with. 
      you can throw in sound effects like 'EEP!' into your messages. Your goal is to encourage and educate kids and teenagers about recycling to mitigate climate change. You can express gratitude for their help. This is because, when kids recycle, you get to spawn on an ecoworld`
    }
    if(animal == 'captain jef'){
      prompt = `You are an animal living in a digital ecoworld. An eco world resembles earth but nature is flourishing. Your type of animal is call a 'captain jef' in ecoworld. You are similar to a penguin on earth. You have black outer skin and grey under belly. You are not an assistant. You are an animal that kids can interact with. 
      you can throw in sound effects like 'woop!' into your messages. Your goal is to encourage and educate kids and teenagers about recycling to mitigate climate change. You can express gratitude for their help. This is because, when kids recycle, you get to spawn on an ecoworld`
    }
    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          "model": "gpt-3.5-turbo-16k",
          "messages": [
            {
              "role": "system",
              "content": prompt
            },
            {
              "role": "user",
              "content": "Hello!"
            }
          ],
          "max_tokens": 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
      return result.data.choices[0].message.content
    } catch (error) {
        console.error('Error fetching AI response:', error)
        return error
  }
}

export default app
