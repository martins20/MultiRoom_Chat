//Importar os Frameworks 
const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

//Iniciar o objeto do express
const app = express()

//setar as variaveis 'view engine' e 'views' do express
app.set('view engine', 'ejs')
app.set('views', './app/views')

//Configurar o Middleware express.static
app.use(express.static('./app/assets'))

//configurar o Middleware body-parser
app.use(bodyParser.urlencoded({extended: true}))

//configurar o Middleware express-validator
app.use(expressValidator())

//efetua o auto load das rotas, dos models e dos controllers para o objeto app 
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)


//exportar o objeto app para o "./app" usar-la
module.exports = app