import { createSlice } from '@reduxjs/toolkit'
import { initialStateType } from './UserSlice.model'

const initialState: initialStateType = {
  loggedIn: false,
  error: false,
}

const UserSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      const { login, password } = action.payload
      if (login === 'Admin' && password === '123') {
        state.loggedIn = true
        state.error = false
      } else {
        state.error = true
      }
    },
    handleLogout: (state) => {
      state.loggedIn = false
    },
  },
})

export const { handleLogin, handleLogout } = UserSlice.actions
export default UserSlice.reducer
