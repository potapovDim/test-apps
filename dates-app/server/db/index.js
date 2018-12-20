const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = mongoose.connect('mongodb://127.0.0.1:27017')

module.exports = {
  UserMD: require('./user')(mongoose, Schema)
}
