const {server_actions} = require('./action_types')
const {user_registration} = require('./user')

const routs = (db) => async (cntx) => {
  console.log('A')
  const {UserMD} = db
  const {request: {body: action}} = cntx
  console.log(cntx, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  switch(action) {
    case server_actions.REGISTRATION: {
      return user_registration({UserMD})(cntx)
    }
    default: {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      return cntx
    }
  }
}

module.exports = {
  routs
}