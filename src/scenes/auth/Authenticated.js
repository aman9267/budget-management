import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Authenticated = (props) => {

  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const [isLoginIn, setInLoginIn] = useState(false)

  useEffect(() => {
    setToken(localStorage.getItem('token'))

  }, [token])

  if (!token || token == undefined ) {
    setInLoginIn(false)
    navigate('/login')
  }else{
    setInLoginIn(true)
  }
  return (

    <>
      {isLoginIn ? props.children : null}
    </>
  )
}

export default Authenticated