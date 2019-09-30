const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pv-db-app',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));