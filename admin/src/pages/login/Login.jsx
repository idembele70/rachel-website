import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../../Redux/apiCalls'
import "./login.css"
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogin = (e) => {
    e.preventDefault()
    login(dispatch, { email, password })
    history.replace("/")
  }

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Se connecter</h1>

        <input className="email" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin} className='btn' type="submit">Connexion</button>
      </div>
    </div>
  )
}

export default Login
