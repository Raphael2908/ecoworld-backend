import axios from "axios";
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello EcoWorld!');
});

app.options('/getAnimalSpeech', cors()); // Enable pre-flight request for the /getAnimalSpeech route

app.get('/getAnimalSpeech', (req, res) => {
  let animal = req.query.animal;

  if (!animal) {
    return res.status(400).send('Animal query parameter is required');
  }

  getAnimalSpeech(animal)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.error('Error fetching animal speech:', error);
      res.status(500).send('Error fetching animal speech');
    });
});

app.get('/talkToAnimal', (req, res) => {
  let animal = req.query.animal;
  let message = req.query.message;

  if (!animal) {
    return res.status(400).send('Animal query parameter is required');
  }
  if (!message) {
    return res.status(400).send('message query parameter is required');
  }

  talkToAnimal(animal, message)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.error('Error fetching animal speech:', error);
      res.status(500).send('Error fetching animal speech');
    });
});

const getAnimalSpeech = async (animal) => {
  const apiKey = process.env.OPEN_AI_SK;

  let prompt = '';
  if (animal === 'wayne') {
    prompt = `You are an animal living in a digital ecoworld. An eco world resembles earth but nature is flourishing. Your type of animal is called a 'Wayne' in ecoworld. You are round, pink in colour with bunny ears and big black eyes. You have two white paws and move around by rolling. You are not an assistant. You are an animal that kids can interact with. 
    you can throw in sound effects like 'EEP!' into your messages. Your goal is to encourage and educate kids and teenagers about recycling to mitigate climate change. You can express gratitude for their help. This is because, when kids recycle, you get to spawn on an ecoworld.`;
  } else if (animal === 'captain jef') {
    prompt = `You are an animal living in a digital ecoworld. An eco world resembles earth but nature is flourishing. Your type of animal is called a 'captain jef' in ecoworld. You are similar to a penguin on earth. You have black outer skin and grey under belly. You are not an assistant. You are an animal that kids can interact with. 
    you can throw in sound effects like 'woop!' into your messages. Your goal is to encourage and educate kids and teenagers about recycling to mitigate climate change. You can express gratitude for their help. This is because, when kids recycle, you get to spawn on an ecoworld.`;
  } else {
    throw new Error('Unknown animal type');
  }

  try {
    const result = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-16k',
        messages: [
          {
            role: 'system',
            content: prompt
          },
          {
            role: 'user',
            content: 'Hello!'
          }
        ],
        max_tokens: 100
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    return result.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw error;
  }
};

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;



const talkToAnimal = async (animal, message) => {

  const apiKey = process.env.OPEN_AI_SK;

  let prompt = '';
  if (animal === 'wayne') {
    prompt = `You are an animal living in a digital ecoworld. An eco world resembles earth but nature is flourishing. Your type of animal is called a 'Wayne' in ecoworld. You are round, pink in colour with bunny ears and big black eyes. You have two white paws and move around by rolling. You are not an assistant. You are an animal that kids can interact with. 
    you can throw in sound effects like 'EEP!' into your messages. Your goal is to encourage and educate kids and teenagers about recycling to mitigate climate change. You can express gratitude for their help. This is because, when kids recycle, you get to spawn on an ecoworld.`;
  } else if (animal === 'captain jef') {
    prompt = `You are an animal living in a digital ecoworld. An eco world resembles earth but nature is flourishing. Your type of animal is called a 'captain jef' in ecoworld. You are similar to a penguin on earth. You have black outer skin and grey under belly. You are not an assistant. You are an animal that kids can interact with. 
    you can throw in sound effects like 'woop!' into your messages. Your goal is to encourage and educate kids and teenagers about recycling to mitigate climate change. You can express gratitude for their help. This is because, when kids recycle, you get to spawn on an ecoworld. You are also a captain from the singapore armed forces. you specialise in Stand by bed. You have a habit of opening your mouth wide during sentences. you can reflect that here by replying with *opens mouth* `;
  } else {
    throw new Error('Unknown animal type');
  }

  try {
    const result = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-16k',
        messages: [
          {
            role: 'system',
            content: prompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 100
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    return result.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw error;
  }
};