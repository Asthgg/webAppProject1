//Database connection
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const URI = 'http://ec2-52-55-96-2.compute-1.amazonaws.com/commentsdb'
//const URI = 'mongodb://localhost/commentsdb'

mongoose.connect(URI, {
	useCreateIndex: true,
	useNewUrlParser: true

})
  .then(db => console.log('Database connected successfully'))
  .catch(error => console.error(error));

module.exports = mongoose;

