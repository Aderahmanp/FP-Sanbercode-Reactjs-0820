import React, {useContext, useState } from "react"
import { UserContext } from "../UserContext"
import axios from "axios"
import {useHistory} from "react-router-dom"
import { TextField, Button } from '@material-ui/core';

const Login = () => {
    let history = useHistory()
    const [, setUser] = useContext(UserContext)
    const [input, setInput] = useState({
        email:"",
        password: ""
    })
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        axios.post("https://backendexample.sanbersy.com/api/user-login", {
          email: input.email, 
          password: input.password
        }).then(
          (res)=>{
            var user = res.data.user
            var token = res.data.token
            var currentUser = {name: user.name, email: user.email, token }
            setUser(currentUser)
            localStorage.setItem("user", JSON.stringify(currentUser))
            history.push("/")
          }
        ).catch((err)=>{
          alert(err)
        })
      }
    
    const handleChange = (event) =>{
        let value = event.target.value
        let name = event.target.name
        switch (name){
          case "email":{
            setInput({...input, email: value})
            break;
          }
          case "password":{
            setInput({...input, password: value})
            break;
          }
          default:{break;}
        }
      }

      return (
          <>

        <form onSubmit={handleSubmit} className="form-register">
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange} value={input.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange} value={input.password}
          />
   
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
        
          >
            Log In
          </Button>
        </form>
          </>
      )
}

export default Login