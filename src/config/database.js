//Database connection
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

//const URI = 'http://ec2-52-55-96-2.compute-1.amazonaws.com'
//const URI = 'mongodb://localhost/commentsdb'

const URI = 'mongodb://db:27017'


mongoose.connect(URI, {
	useCreateIndex: true,
	useNewUrlParser: true

})
  .then(db => console.log('Database connected successfully'))
  .catch(error => console.error(error));

module.exports = mongoose;

