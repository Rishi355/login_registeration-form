import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./index.css"
function Signup() {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/register', {name,email,password})
        .then(res=>{
            console.log(res)
            navigate('./login')
        })
        .catch(err=>console.log(err))
    }
  return (
    <div>
        <div className='main'>
        <div className="form">
            <div className='title'>
                <h2>Register</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='box'>
                    <label htmlFor="name">
                        <strong>Name</strong>
                    </label>
                    <br />
                    <input className='text-box'
                        type="text"
                        placeholder='Enter Your Name'
                        name="name"
                        onChange={e=>setname(e.target.value)}
                    />
                </div>
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
                    <label htmlFor="password">
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
                <button className="btn" type='submit'>Register </button>
            </form>
            <div className='footer'>
                <p>Already have an account?</p>
                <Link className="btn-login" to="/login">
                    Login
                </Link>
            </div>

        </div>
        </div>
    </div>
  )
}

export default Signup