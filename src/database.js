const mongoose = require('mongoose');

const URI = 'ec2-52-201-225-180.compute-1.amazonaws.com:27017'

mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
