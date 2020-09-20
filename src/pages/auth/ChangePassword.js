import React, { useContext, useState } from "react"
import {UserContext} from "../UserContext"
import axios from "axios"
import { TextField, Button } from '@material-ui/core';
import {useHistory} from "react-router-dom"

const ChangePassword = () => {
    let history = useHistory()
    const [user] = useContext(UserContext)
    const [input, setInput] = useState({current_password: "", new_password: "" , new_confirm_password: ""})

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("https://backendexample.sanbersy.com/api/change-password", {
            current_password: input.current_password,
            new_password: input.new_password,
            new_confirm_password:input.new_confirm_password
        },
        {headers: {"Authorization" : `Bearer ${user.token}`}} 
        ).then(
            (res)=> {
                history.push("/")
            }
        ).catch((err) => {
            alert(err)
        })
    }

    const handleChange = (event) =>{
        let value = event.target.value
        // console.log(value)
        let name = event.target.name
        switch (name){
          case "password":{
            setInput({...input, current_password: value})
            break;
          }
          case "new-password":{
            setInput({...input, new_password: value})
            break;
          }
          case "new_confirm_password":{
            setInput({...input, new_confirm_password: value})
            break;
          }
          default:{break;}
        }
      }


    return(
        <>
        <form onSubmit={handleSubmit} className="form-register">
        <h1 className="title-login" > Change Password </h1>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="old Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange} value={input.current_password}
          />

        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new-password"
            label="new Password"
            type="password"
            id="new-password"
            autoComplete="current-password"
            onChange={handleChange} value={input.new_password}
          />



        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_confirm_password"
            label="confirmation password"
            type="password"
            id="new_confirm_password"
            autoComplete="current-password"
            onChange={handleChange} value={input.new_confirm_password}
          />
   
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
        
          >
            Change Password
          </Button>
        </form>
        </>
    )

    }

export default ChangePassword
