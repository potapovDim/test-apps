const create_user_model = (mongoose) => {
  const userShema = mongoose.Schema({
    name: String, password: String, registrationDate: Date
  })

  return mongoose.model('user', userShema)
}

module.exports = create_user_model
