import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cPassword:""});
    let navigate = useNavigate();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //API Call
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email,password:credentials.password}), 
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save auth token
            localStorage.setItem('token', json.authToken);
            props.showAlert("Account created Successfully", "success");
            navigate('/');
          }else{
            //alert("Invalid credentials");
           // console.log(json.error);
            props.showAlert(json.error, "danger");
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <div className='container mt-3'>
            <h2 className='my-2'>Create an accout to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="password" className="form-control" id="name" name='name' onChange={onChange} value={credentials.name} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp"  required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cPassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="cPassword" name='cPassword' onChange={onChange} value={credentials.cPassword} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
