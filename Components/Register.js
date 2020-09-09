import React, { useState } from "react";


function Register({currentUser, setCurrentUser}) {
  const [formData, setFormData] = useState({})

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }
  
  const handleSubmit = (evt) =>{
    evt.preventDefault()
    fetch("http://localhost:5000/register", {
      method: 'POST', 
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res=> res.json())
    .then(data=> {
      setCurrentUser(data)
    })
  }
    return (
    <div className="registerForm">
    <form className="registerForm1" onSubmit={handleSubmit}> 
    <section className="section">
      <div className="container">
        <h1 className="title">Sign up</h1>
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left has-icons-right">
            <input className="input" type="text" placeholder="Enter Username" name="username" id ="username" onChange={handleChange} required/>
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input className="input" type="text" placeholder="Enter Email" name="email" id ="email" onChange={handleChange} required/>
            <span className ="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input className="input" type="password" placeholder="Enter Password" name="password" id ="password" onChange={handleChange} required/>
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>

        <div className="field is-small">
          <label className="label">Zip Code</label>
          <div className="control has-icons-left has-icons-right">
            <input className="input" type="text" placeholder="Zip Code" name="zipcode" id ="zipcode" onChange={handleChange} required/>
            <span className="icon is-small is-left">
              <i className="fas fa-home"></i>
            </span>
          </div>
        </div>



        <div className="field is-grouped">
          <div className="control">
            <button className="button is-primary" type="submit" id="register-button">Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light" type="reset" id="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
    </section>
  </form> 
  </div>
    );
}

export default Register

