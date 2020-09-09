import React, { useState } from "react";


function Login({currentUser, setCurrentUser}) {
    const [formData, setFormData] = useState({})

    const handleChange = (evt) => {
      setFormData({...formData, [evt.target.name]: evt.target.value})
    }
    
    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch("http://localhost:5000/login", {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data)
            })
    }

    return (
        <div className="loginForm">
            <form class="loginForm1" onSubmit={handleSubmit}>
                <section className="section">
                    <label className="label">Username</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text" placeholder="Enter Username" name="username" id="username"  onChange={handleChange} required />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="password" placeholder="Enter Password" name="password" id="password" onChange={handleChange} required />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
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
                </section>
            </form>
        </div >
    );
}

export default Login

