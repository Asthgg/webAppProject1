//Database connection
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

//const URI = 'ec2-52-201-225-180.compute-1.amazonaws.com:27017'
const URI = 'mongodb://localhost/commentsdb'

mongoose.connect(URI, {
	useCreateIndex: true,
	useNewUrlParser: true

})
  .then(db => console.log('Database connected successfully'))
  .catch(error => console.error(error));

module.exports = mongoose;

