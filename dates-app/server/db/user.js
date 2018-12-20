const create_user_model = (mongoose, Schema) => {
  const user_schema = Schema({
    name: String, password: String, registrationDate: Date
  })

  return mongoose.model('user', user_schema)
}

module.exports = create_user_model
