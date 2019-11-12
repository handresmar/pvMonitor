const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

    res.render('index');
    //console.log(router);
    //res.sendFile(path.join(__dirname, '/views/index.ejs'));
});
router.get('/openweather', (req, res) => {

    res.render('openweather');
    //console.log(router);
    //res.sendFile(path.join(__dirname, '/views/index.ejs'));
});
router.get('/plntLabe', (req, res) => {

    res.render('plntLabe');
    //console.log(router);
    //res.sendFile(path.join(__dirname, '/views/index.ejs'));
});



module.exports = router;


/*
------------------------------------------------
const Datanasa = require('../models/nasa');
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

router.post('/bases/nasa',  async (req, res) => {
    const datanasa = new Datanasa(req.body);
    await datanasa.save();
    //res.status(200).json({status:"received"});
    //console.log(process.env.PORT);
    socket.emit('newData',datanasa.vlr);
});
------------------------------------------------
router.get('/estacion', (req, res) => {
    res.render('estacion');
});

router.get('/plantas', (req, res) => {
    res.render('plantas');
});

router.get('/bases', (req, res) => {
    res.render('bases');
});

module.exports = router;*/
