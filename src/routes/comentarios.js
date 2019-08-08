const express = require('express');
const router = express.Router();

// Models
const Comentario = require('../models/Comentario');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// Nuevo comentario
router.get('/comentarios/add', isAuthenticated, (req, res) => {
  try {
    res.render('comentarios/new-comentario');
  } catch (error) {
    console.error(error);
  }
});

router.post('/comentarios/add', isAuthenticated, async (req, res) => {
  try {
    console.log('HOLAA')
    const { title, topic, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({text: 'Please Write a Title.'});
  }
  if (!topic) {
    errors.push({text: 'Please Write a Topic.'});
  }
  if (!description) {
    errors.push({text: 'Please Write a Description'});
  }
  if (errors.length > 0) {
    res.render('comentarios/new-comentario', {
      errors,
      title,
      topic,
      description
    });
  } else {
    const newComment = new Comentario({title, topic, description});
    newComment.user = req.user.id;
    await newComment.save();
    req.flash('success_msg', 'Comment Added Successfully');
    res.redirect('/comentarios');
  }
    
  } catch (error) {
    console.error(error);
  }
});

// Get mis comentarios
router.get('/comentarios', isAuthenticated, async (req, res) => {
  const comentarios = await Comentario.find({user: req.user.id}).sort({date: 'desc'});
  res.render('comentarios/todos-comentarios', { comentarios });
});

// Editar comentario
router.get('/comentarios/edit/:id', isAuthenticated, async (req, res) => {
  const comentario = await Comentario.findById(req.params.id);
  if(comentario.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/comentarios');
  } 
  res.render('comentarios/edit-comentario', { comentario });
});

router.put('/comentarios/edit-comentario/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Comentario.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Comentario Updated Successfully');
  res.redirect('/comentarios');
});

// Delete comentario
router.delete('/comentarios/delete/:id', isAuthenticated, async (req, res) => {
  await Comentario.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Comentario Deleted Successfully');
  res.redirect('/comentarios');
});

module.exports = router;