const mongoose = require('mongoose');
const bluebird = require('bluebird');
const currentEnv = 'development';
const config = require('../config');
mongoose.Promise = bluebird;
mongoose.connect(config[currentEnv].url)
module.exports = mongoose; 