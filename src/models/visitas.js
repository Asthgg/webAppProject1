const mongoose = require('mongoose');
const { Schema } = mongoose;

//Definimos nuestro esquema
var VisitasSchema = new Schema({  
    fecha: { type: Date, default: Date.now },
    url: { type: String }
  });
   


module.exports = mongoose.model('Visitas', VisitasSchema);
