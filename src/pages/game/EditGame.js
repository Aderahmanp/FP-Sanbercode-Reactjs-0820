import React, {useState, useEffect, useContext } from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { useHistory, } from "react-router-dom"
import { TextField, Button, Card } from '@material-ui/core';
import { UserContext } from "../UserContext";

const Movie = ()=> {
    let history = useHistory()
    let {id} = useParams()
    const [games, setGames] = useState(null)
    const [user] = useContext(UserContext)


    useEffect(() => {
        if (games === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
            .then(res => {
                setGames(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
           
        }
        // console.log(movie)
    }, [games, id])

    

    const SubmitForm = (event) => {
        event.preventDefault()
        axios.put(`https://backendexample.sanbersy.com/api/data-game/${games.id}`, { 
            name: games.name,
            genre:games.genre,
            image_url:games.image_url,
            plaform:games.plaform,
            release:games.release,
            singlePlayer:games.singlePlayer
        },{
            headers: {
                'Authorization' : `Bearer ${user.token}`
            }
        })
        // console.log('masuk')
        .then(res => {
            let newGame = games
            newGame.name = games.name
            newGame.genre = games.genre
            newGame.image_url = games.image_url
            newGame.plaform = games.plaform
            newGame.release = games.release
            newGame.singlePlayer = games.singlePlayer
            console.log(newGame)
            setGames(newGame)
            history.push('/game-editor')
            alert("data berhasil di ubah")
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
                  setGames({...games, name: event.target.value});
                  break
                }
                case "genre":
                {
                  setGames({...games, genre: event.target.value});
                  break
                }
                case "image_url":
                {
                  setGames({...games, image_url: event.target.value});
                    break
                }
                case "plaform":
                    {
                      setGames({...games, plaform: event.target.value});
                        break
                    }
                case "release":
                {
                  setGames({...games, release: event.target.value});
                    break
                }
                case "singlePlayer":
                  {
                    setGames({...games, singlePlayer: event.target.value});
                      break
                  }
              default:
                {break;}
        }
    }
    return (
       <>
      {games !==  null && (
           <Card  className="update-card">
               <h1 className="title-edit" > Edit Game </h1>
               <form  className="form-edit-movie" onSubmit={SubmitForm} >


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
                    value={games.name}
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
                    value={games.genre}
                    // value={input.title}
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
                    value={games.image_url}
                    // value={input.title}
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
                    value={games.plaform}
                    // value={input.title}
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
                    value={games.release}
                    // value={input.title}
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
                    autoComplete="name"
                    autoFocus
                    value={games.singlePlayer}
                    // value={input.title}
                    onChange={handleChange}
                />


        
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                
                >
                    Edit Movie
                </Button>
                </form>
               
           </Card>
      ) }
    
       </>
    )
}

export default Movie