const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const modelFile = require('./models')
const helpers = require('./helpers')

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// route to add user
app.post('/api/users',async(req,res)=>{
  const {username} = req.body
  if(!username) return res.json({success:false,error:"No username provided"})
  const newUser = await modelFile.createUser({username})
  return res.json(newUser)
})

//route to get all users
app.get('/api/users',async(req,res)=>{
  const users = await modelFile.getUsers()
  return res.json(users)
})

//route to add exercises
app.post('/api/users/:_id/exercises',async(req,res)=>{
  const {_id} = req.params
  let {description,duration,date} = req.body
  
  const user = await modelFile.getUser(_id)
  if(!user) return res.json({success:false,error:"innexistent user"})
  date = date?helpers.formatDate(date):helpers.formatDateFromNow()
  const exercise = {
    description:description,
    duration:Number(duration),
    date:date
  }
  user.count+=1;
  user.log.push(exercise)
  await user.save()

  return res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date:exercise.date,
    _id: user._id
  })
})

//route to get logs
app.get('/api/users/:_id/logs',async(req,res)=>{
  const{_id} = req.params
  const user = await modelFile.getUser(_id)
  if(!user) return res.json({s:false,error:"no user found"})
  let logs = user.log
  if(req.query.from&req.query.to) logs = helpers.filterLogsByDate(user.log,req.query.from,req.query.to)
  if(req.query.limit){
    let logCopy = [...logs]
    logs = []
    let limit = Number(req.query.limit)
    for(let i = 0;i<limit;i++){
      logs.push(logCopy[i])
    }
  } 
  console.log(logs)
  return res.json({
    username: user.username,
        count: user.count,
        _id: user._id,
        log: logs
  })
})







mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("connected to Mongo Atlas")
}).catch((error)=>{
  console.log(error)
})
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
