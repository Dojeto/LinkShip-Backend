import express from 'express';
import cors from 'cors'
import { config } from 'dotenv';
import auth from './routes/jwtauth.js'
import dashboard from './routes/dashboard.js'
import mongo from './models/db.js'
import managelinks from './routes/managelinks.js'
import home from './routes/home.js'

const port = process.env.PORT || 3000;

const app = express();
config();

app.use(express.json());
app.use(cors());

//Routes
app.use('/',home)
app.use('/auth',auth);
app.use('/dashboard',dashboard);
app.use('/manage',managelinks);

app.listen(port,()=>{
    console.log(`listening on ${port}`);
})