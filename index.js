require('dotenv').config()
const express = require('express')
const App = express()
const CourseRouter = require('./Routers/Course')
const AuthRouter = require('./Routers/Auth')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')


App.use(express.json())
App.use(express.static(path.resolve(__dirname, 'dist', 'index.html')))
App.use(cors())
App.use('/api/courses', CourseRouter)
App.use('/auth', AuthRouter)

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("database connected")
}

App.listen(process.env.PORT, () => {
  console.log(
    `server is listening ${__dirname, process.env.PORT}`
  );
});