const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook';

const connectTodb = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("db connected successfully!");
    }).catch((err)=>{
        console.log("Unable to connect to db.", err);
    });
}

module.exports = connectTodb;