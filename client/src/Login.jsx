import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./index.css"
function Signup() {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/login', {email,password})
        .then(result=>{
            console.log(result)
            if(result.data=="User not found with this email"){
                navigate('/')
            }
            if(result.data==="Sucessfully login"){
              navigate('/home')
            }
        })
        .catch(err=>console.log(err))
    }
  return (
    <div>
        <div className='main'>
        <div className="form">
            <div className='title'>
                <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
                
                <div className='box'>
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <br />
                    <input className='text-box'
                        type="text"
                        placeholder='Enter Email'
                        name="email"
                        onChange={e=>setemail(e.target.value)}
                    />
                </div>
                <div className='box'>
                    <label htmlFor="email">
                        <strong>Password
                        </strong>
                    </label>
                    <br />
                    <input className='text-box'
                        type="password"
                        placeholder='Enter Password'
                        name="password"
                        onChange={e=>setpassword(e.target.value)}
                    />
                </div>
                <button className="btn" type='submit'>Login </button>
            </form>
            <div className='footer'>
                <p>Didn't have an account?</p>
                <Link className="btn-login" to="/">
                    Register
                </Link>
            </div>

        </div>
        </div>
    </div>
  )
}

export default Signup