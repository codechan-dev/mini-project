//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

const { Configuration, OpenAIApi } = require("openai");
const express =require('express')
const bodyparser = require(`body-parser`)
const cors = require(`cors`)
const configuration = new Configuration({
    organization: "org-Bf4So4F6CNXaMoKejw2qigRu",
    apiKey:"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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();



const app =express()
app.use(express.json())
app.use(bodyparser.json())
app.use(cors())

const port=3080


app.post('/', async (req,res)=>{
  const { message }= req.body;
  console.log("message:",message);
  
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${message}`,
  max_tokens: 100,
  temperature: 0.5,
});
console.log(response.data.choices[0].text)
res.json(
  {
    message:response.data.choices[0].text,
  }
)

});

app.listen(port,()=>{
  console.log(`https://localhost:${port}`)
})