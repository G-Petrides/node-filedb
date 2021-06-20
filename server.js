const express = require('express')
const app = express()
const port = 3000
let data = require('./data.json')
const fs = require("fs");

app.use(express.json({
    limit: '5mb',
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.post('/data',(req,res)=>{
    let dbData = req.body
    data[dbData.id] = dbData.data
    dbSave(data)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.dir(data,{color:true,depth:2})
})

const dbSave = (data)=>{
    let content = JSON.stringify(data)
    fs.writeFile('./data.json', content, err => {
        if (err) console.error(err)
    })
}