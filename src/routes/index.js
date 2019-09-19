const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //console.log(router);
    //res.sendFile(path.join(__dirname, '/views/index.ejs'));
    res.render('index', { title: 'Principal' });

});

router.get('/estacion', (req, res) => {
    res.render('estacion', { title: 'Estación meteorológica' });
});

router.get('/plantas', (req, res) => {
    res.render('plantas', { title: 'Plantas Fotovoltáicas' });
});


router.get('/bases', (req, res) => {
    res.render('bases', { title: 'Bases de Datos' });
});


module.exports = router;