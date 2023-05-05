const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
app.use(express.json()) 
app.use(cors()) 
app.use(cors()) 


const path = require('path')
const fs = require('fs')
const { request } = require('http')
const { response, json } = require('express')
const dbPath = path.resolve(__dirname,'./db/facts.json')

app.get('/', (request, response) => { 
    try{
    const data = fs.readFileSync(dbPath,'utf8',)
    const facts = JSON.parse(data)
    return response.json(facts)
    }catch(e){
        console.log(e)
        return response.status(500).json({erro: 'Erro de execução'})
    }
   })

   app.get('/:id', (request, response) =>{
       const {id} = request.params

       try{
           let data = fs.readFileSync(dbPath,'utf8')
           let fact = null

           data = JSON.parse(data)['facts']

           for(let index in data){
               if(data[index]['id'] == id){
                   fact = data[index]
                   break
               }
           }
           if(fact === null){
               return response
               .status(404)
               .json({erro: "Nao encontrado"})
           }return response.json(fact)
       } catch (e) {
           console.log(e)
           return response.status(500).json({Erro: "Nao foi possivel executar essa oprecao"})
       }


   })

   app.post('/', (request, response)=>{
    const {text} = request.body
    try{
        let data = fs.readFileSync(dbPath,'utf8')
        data = JSON.parse(data)

        const newFact = {
            id: String(data['facts'].length + 1),
            text: text,
            type: 'cat',
            upvotes: 0,
        }

        data['facts'].push(newFact)

        fs.writeFileSync(dbPath, JSON.stringfy(data))

        return response.json(newFact)

    } catch (e){
        console.log(e)
        return response.status(500).json({Erro: "Nao foi possivel executar essa oprecao"})
    }

   })

app.listen(3000,()=>{
    console.warn('Servidor escutando na porta 3000')
})




