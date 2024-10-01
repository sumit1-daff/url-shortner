require('dotenv').config();
const express = require('express');
const urlRoute = require('./routes/urls');
const URL = require('./models/urls');

const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/short-url');

}
app.use(express.json());
app.use('/url',urlRoute);

app.get('/:shortid', async (req,res)=>{
    const shortId = req.params.shortid;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push :{
            visitHistory : {timestamp : Date.now(),  
            },
        },
    })
    console.log(entry.redirectURL);
    res.redirect(entry.redirectURL);
});


app.listen(process.env.PORT,()=>{
    console.log('Server Started at port' , process.env.PORT);
    
});