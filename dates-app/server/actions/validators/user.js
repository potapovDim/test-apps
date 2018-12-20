const validate_registration = async ({UserMD, body}) => {
  const {username, email} = body
  const requiredUser = await UserMD.findOne({username, email})
  return requiredUser
};

module.exports = {
  validate_registration
}
