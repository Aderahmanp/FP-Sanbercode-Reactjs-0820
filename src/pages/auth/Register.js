import React, { useContext, useState } from "react"
import {UserContext} from "../UserContext"
import axios from "axios"
import { TextField, Button } from '@material-ui/core';
import {useHistory} from "react-router-dom"

const Register = () => {
    let history = useHistory()
    const [, setUser] = useContext(UserContext)
    const [input, setInput] = useState({name: "", email: "" , password: ""})

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("https://backendexample.sanbersy.com/api/register", {
            name: input.name,
            email: input.email,
            password:input.password
        }).then(
            (res)=> {
                console.log(res)
                let user = res.data.user
                let token = res.data.token
                let currentUSer = {
                    name:user.name,
                    email:user.email,
                    token
                }
                console.log(currentUSer)
                setUser(currentUSer)
                localStorage.setItem("user", JSON.stringify(currentUSer))
                history.push("/")
            }
        ).catch((err) => {
            alert(err)
        })
    }

    const handleChange = (event) =>{
        let value = event.target.value
        console.log(value)
        let name = event.target.name
        switch (name){
          case "name":{
            setInput({...input, name: value})
            break;
          }
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


    return(
        <>
        <form onSubmit={handleSubmit} className="form-register">
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange} value={input.name}
          />
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
            Register
          </Button>
        </form>
        </>
    )

    }

export default Register
