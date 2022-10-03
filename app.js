import express from 'express';
import cors from 'cors'
import { config } from 'dotenv';
import mongo from './models/db.js'
import auth from './routes/jwtauth.js'
import dashboard from './routes/dashboard.js'
import managelinks from './routes/managelinks.js'

const port = process.env.PORT || 3000;

const app = express();
config();

app.use(express.json());
app.use(cors());

//Routes
app.use('/auth',auth);
app.use('/dashboard',dashboard);
app.use('/',managelinks);

app.listen(port,()=>{
    console.log(`listening on ${port}`);
})