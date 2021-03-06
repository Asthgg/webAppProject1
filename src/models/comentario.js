const mongoose = require('mongoose');
const { Schema } = mongoose;


const ComentarioSchema = new Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  reply: [{
    type: Schema.Types.ObjectId, ref: 'Comentario'
  }]
});

module.exports = mongoose.model('Comentario', ComentarioSchema);