const {server_actions} = require('./action_types')
const {user_registration} = require('./user')

const routs = (db) => async (cntx) => {
  const {UserMD} = db
  const {request: {body: action}} = cntx
  switch(action) {
    case server_actions.REGISTRATION: {
      return user_registration({UserMD})(cntx)
    }
    default: {
      return cntx
    }
  }
}

module.exports = {
  routs
}