const express = require('express');
const router = express.Router();

const Datanasa = require('../models/nasa');
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

router.get('/', (req, res) => {
    //console.log(router);
    //res.sendFile(path.join(__dirname, '/views/index.ejs'));
    res.render('index');
});


router.post('/bases/nasa',  async (req, res) => {
    const datanasa = new Datanasa(req.body);
    await datanasa.save();
    res.status(200).json({status:"received"});
    //console.log(process.env.PORT);
    socket.emit('newData',datanasa.vlr);
});

module.exports = router;


/*
router.get('/estacion', (req, res) => {
    res.render('estacion');
});

router.get('/plantas', (req, res) => {
    res.render('plantas');
});

router.get('/bases', (req, res) => {
    res.render('bases');
});
<<<<<<< HEAD

module.exports = router;
=======
*/
>>>>>>> nsDb
