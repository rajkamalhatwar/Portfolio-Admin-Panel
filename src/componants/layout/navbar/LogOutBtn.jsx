import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/login/authSlice'
import authService from '../../../features/login/authService'

export default function LogOutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    
        <button
        className="dropdown-item"
        onClick={logoutHandler}
        >
        <i className="dropdown-item-icon mdi mdi-power text-primary me-2"></i>
        Sign Out
        </button>

  )
}
