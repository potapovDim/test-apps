const {validate_registration} = require('./validators/user')

const user_registration = ({UserMD}) => async (cntx) => {
  const {request: {body}} = cntx
  const user = validate_registration({UserMD, body})

  return cntx
}

module.exports = {
  user_registration
}
