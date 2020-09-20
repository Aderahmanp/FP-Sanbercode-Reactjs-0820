import React, {useState, useContext } from "react"
import axios from "axios"
import { TextField, Button, Card } from '@material-ui/core';
import { UserContext } from "../UserContext";

const CreateGame = ()=> {
    const [input, setInput] = useState({
        name:"",
        genre:"",
        plaform:"",
        release:"",
        image_url:"",
        singlePlayer:"",



    })
    const [user] = useContext(UserContext)
    
    const SubmitForm = (event) => {
        console.log(input)
        event.preventDefault()
            axios.post('https://backendexample.sanbersy.com/api/data-game', { 
                name: input.name,
                genre:input.genre,
                image_url:input.image_url,
                plaform:input.plaform,
                release:input.release,
                singlePlayer:parseInt(input.singlePlayer)
            },{
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            .then(res => {
               setInput([input, {
                   id: res.data.id, input
               }])
               console.log(res)
                alert("data berhasil di buat")
                setInput({
                    name:"",
                    genre:"",
                    plaform:"",
                    release:"",
                    image_url:"",
                    singlePlayer:"",
                })
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
   
    }


    const handleChange = (event) => {
        let typeOfInput = event.target.name

        switch (typeOfInput) {
            case "name":
                {
                  setInput({...input, name: event.target.value});
                  break
                }
                case "genre":
                {
                  setInput({...input, genre: event.target.value});
                  break
                }
                case "image_url":
                {
                  setInput({...input, image_url: event.target.value});
                    break
                }
                case "plaform":
                    {
                      setInput({...input, plaform: event.target.value});
                        break
                    }
                case "release":
                {
                  setInput({...input, release: event.target.value});
                    break
                }
                case "singlePlayer":
                  {
                    setInput({...input, singlePlayer: event.target.value});
                      break
                  }
              default:
                {break;}
        }
    }
    return (
       <>
        <Card  style={{ marginBottom: 8 }}>
            <h1 className="title-edit" > Create Game </h1>
            <form  className="form-edit-movie" onSubmit={SubmitForm} >
            <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    autoFocus
                    value={input.name}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="genre"
                    label="genre"
                    name="genre"
                    autoComplete="name"
                    autoFocus
                    value={input.genre}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="image_url"
                    label="image_url"
                    name="image_url"
                    autoComplete="name"
                    autoFocus
                    value={input.image_url}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="plaform"
                    label="plaform"
                    name="plaform"
                    autoComplete="name"
                    autoFocus
                    value={input.plaform}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="release"
                    label="release"
                    name="release"
                    autoComplete="name"
                    autoFocus
                    value={input.release}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="singlePlayer"
                    label="singlePlayer"
                    name="singlePlayer"
                    autoFocus
                    value={input.singlePlayer}
                    onChange={handleChange}
                    type="number"
                />
    
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            
            >
                Create Game
            </Button>
            </form>
            
        </Card>
       </>
    )
}

export default CreateGame