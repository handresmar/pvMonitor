const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pv-db-app',{useMongoClient:true});
mongoose.Promise = global.Promise;
//.then(db => console.log('DB is connected'))
//.catch(err => console.error(err));