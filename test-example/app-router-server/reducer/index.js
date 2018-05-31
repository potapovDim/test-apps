const FILTER_NAME = 'FILTER_NAME'
const FILTER_VOLUME = 'FILTER_VOLUME'
const FILTER_PRICE = 'FILTER_PRICE'
const FILTER_DROP = 'FILTER_DROP'
const SET_INITIAL_STATE = 'SET_INITIAL_STATE'

const LOGIN = 'LOGIN'
const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
const FAIL_LOGIN = 'FAIL_LOGIN'
const LOGOUT = 'LOGOUT'
const ADD_MACHINE = 'ADD_MACHINE'

const SORT_PRICE_LOW = 'SORT_PRICE_LOW'
const SORT_PRICE_HIGHT = 'SORT_PRICE_HIGHT'

let initialState = { loggedIn: false }

export const filterName = ({ value }) => ({ type: FILTER_NAME, value })
export const filterVolume = ({ value }) => ({ type: FILTER_VOLUME, value })
export const filterPrice = ({ value }) => ({ type: FILTER_PRICE, value })
export const filterDrop = () => ({ type: FILTER_DROP })
export const setState = (storeFrome) => ({ type: SET_INITIAL_STATE, storeFrome })

export const login = ({ name, stern_machines }) => ({ type: LOGIN, name, stern_machines })

export const successLogin = (name) => ({ type: SUCCESS_LOGIN, name })

export const failLogin = (name) => ({ type: FAIL_LOGIN, name })

export const logout = () => ({ type: LOGOUT })

export const addMachine = ({ stern_machines }) => ({ type: ADD_MACHINE, stern_machines })

export const sortPriceFormLow = () => ({ type: SORT_PRICE_LOW })

export const sortPriceFormHight = () => ({ type: SORT_PRICE_HIGHT })

export function pingToken(token) {
  return function (dispatch) {
    return fetch('http://localhost:9999/pingtoken', {
      method: "POST",
      body: JSON.stringify({ token })
      // mode: 'no-cors'
    }).then(resp => resp.json()).then(parsedData => {
      if (parsedData.valid) {
        dispatch(login({ name: parsedData.name, stern_machines: parsedData.stern_machines }))
        return true
      } else {
        dispatch(logout())
        return false
      }
    })
  }
}

export function removeItem(token) {
  return function (dispatch) {
    return fetch('http://localhost:9999/remove', {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem('token') })
      // mode: 'no-cors'
    }).then(resp => resp.json()).then(parsedData => {
      if (parsedData.valid) {
        dispatch(login({ name: parsedData.name, stern_machines: parsedData.stern_machines }))
        return true
      } else {
        dispatch(logout())
        return false
      }
    })
  }
}

export function serverLogin(name, password) {
  console.log('dsadjsajdalskj')
  return function (dispatch) {
    return fetch('http://localhost:9999/login', {
      // mode: 'no-cors',
      method: "POST",
      body: JSON.stringify({ name, password })
    }).then(resp => {
      return resp.json()
    }).then(parsedData => {
      if (parsedData.token) {
        dispatch(login({ name, stern_machines: parsedData.stern_machines }))
        localStorage.setItem('token', parsedData.token)
        return true
      }
      return false
    })
  }
}

export function serverLogout() {
  return function (dispatch) {
    return fetch('http://localhost:9999/logout', {
      mode: 'no-cors',
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem('token') })
    }).then(resp => resp.json()).then((parsedData) => {
      if (parsedData.logout) {
        dispatch(logout())
        return true
      }
      return false
    })
  }
}

export function serverAddMachine(machine) {
  return function (dispatch) {
    return fetch('http://localhost:9999/add', {
      // mode: 'no-cors',
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem('token'), machine })
    }).then(resp => resp.json()).then(parsedData => {
      if (parsedData.stern_machines) {
        dispatch(addMachine({ stern_machines: parsedData.stern_machines }))
        return true
      }
      return false
    })
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN: {
      initialState = { ...initialState, name: action.name, stern_machines: action.stern_machines }
      console.log(action.name, 'action name')
      return { ...state, name: action.name, stern_machines: action.stern_machines }
    }
    case FILTER_NAME: {
      return {
        ...state, filter: action.value, stern_machines: state.stern_machines.filter(machine => {
          return machine.brand.includes(action.value)
        })
      }
    }
    case FILTER_PRICE:
      return {
        ...state, stern_machines: state.stern_machines.filter(machine => {
          return machine.price < +action.value
        })
      }
    case FILTER_VOLUME:
      return {
        ...state, stern_machines: state.stern_machines.filter(machine => {
          return machine.work_volume < +action.value
        })
      }
    case SET_INITIAL_STATE: {
      if (state.filter.length) {
        action.storeFrome.stern_machines = action.storeFrome.stern_machines.filter(machine => {
          return machine.brand.includes(state.filter)
        })
      }
      return {
        ...state, ...action.storeFrome, filter: state.filter
      }
    }
    case ADD_MACHINE: {
      return { ...state, stern_machines: action.stern_machines }
    }
    case SORT_PRICE_HIGHT: {
      state.stern_machines = ((arr) => {
        const n = arr.length
        for (let i = 0; i < n - 1; i++) {
          for (let j = 0; j < n - 1 - i; j++) {
            if (+arr[j + 1].price < +arr[j].price) {
              const t = arr[j + 1]
              arr[j + 1] = arr[j]
              arr[j] = t;
            }
          }
        }
        return arr
      })(state.stern_machines)
      return { ...state, stern_machines: state.stern_machines.map(a => a) }
    }
    case SORT_PRICE_LOW: {
      state.stern_machines = ((arr) => {
        const n = arr.length
        for (let i = 0; i < n - 1; i++) {
          for (let j = 0; j < n - 1 - i; j++) {
            if (+arr[j + 1].price > +arr[j].price) {
              const t = arr[j + 1]
              arr[j + 1] = arr[j]
              arr[j] = t;
            }
          }
        }
        return arr
      })(state.stern_machines)

      return { ...state, stern_machines: state.stern_machines.map(a => a) }
    }
    case FILTER_DROP: {
      return { ...initialState }
    }
    default:
      return state
  }
}