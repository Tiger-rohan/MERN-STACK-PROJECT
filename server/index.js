const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config({path: './config.env'})

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

app.use('/' , require('./routes/authRoutes'))
app.use('/api/projects', projectRoutes);

//task
app.use('/api', taskRoutes);


const port = 8000;
app.listen(port,()=>console.log(`server running on port ${port}`))