import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const LogoutButton = () => {
    const {logout} = useAuth0();
  return (
    <div>
      <button onClick={(e)=>logout()}>Logout</button>
    </div>
  )
}

export default LogoutButton
