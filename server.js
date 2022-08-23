const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
let db = mongoose.connection
require('dotenv').config()


app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://gepeto:Alimento@cluster0.kg0uz.mongodb.net/album?retryWrites=true&w=majority')

const CardSchema = new mongoose.Schema({
    cards: [
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
        { number: String, have: String },
    ],
    country: String,
    sigla: String
})

const Cards = mongoose.model('Figurinhas', CardSchema)


app.post('/', async (req, res) => {

    let pais = req.body.country
    let carta = ''

    const selectedCard = await Cards.findOne({ country: req.body.country, number: req.body.number })
    if (selectedCard.cards[req.body.number - 1].have === 'false') {
        db.collection("figurinhas").updateOne({
            "cards.number": req.body.number,
            "country":req.body.country
          },
          {
            $set: {
              "cards.$.have": "true"
            }
          })
        carta = 'não tem'
    } else {
        db.collection("figurinhas").updateOne({
            "cards.number": req.body.number,
            "country":req.body.country
          },
          {
            $set: {
              "cards.$.have": "false"
            }
          })
        carta = 'não tem'
    }
    console.log((await Cards.find({})).length)
    res.json({ pais: pais})
})

app.get('/getAll', async (req, res) => {

    const AllCards = await Cards.find({})
    res.send(AllCards)

})





db.on('error', () => { console.log('Houve um erro') })
db.once('open', () => { console.log('DataBase loaded') })
app.listen(process.env.PORT || 3001, (req, res) => {
    console.log('Rodando na 3001')
})