const express = require('express');
const router = express.Router();
const publicIp = require('public-ip');
const parser = require('ua-parser-js');
//Visitas Model

const Visita = require('../models/visitas');

var ip_publica = null;

router.get('/', async (req, res) => {
    const visitas =  await Visita.find().count()
    res.json(visitas)
});

router.post('/', async (req,res) =>{

    var tiempo = new Date();
    //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    if ( typeof req.body.url == "undefined" ) {
        fullUrl = "-";
    }else{
        fullUrl = req.body.url;
    }

    var contador = new Visita( {
        fecha: tiempo,
        url: fullUrl
    });
    await contador.save()
    res.json({
        status:"visita guardada"
    })
})

module.exports = router;