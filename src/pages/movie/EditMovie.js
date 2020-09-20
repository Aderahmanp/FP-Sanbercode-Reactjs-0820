import React, {useState, useEffect, useContext } from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { useHistory, } from "react-router-dom"
import { TextField, Button, Card } from '@material-ui/core';
import { UserContext } from "../UserContext";

const Movie = ()=> {
    let history = useHistory()
    let {id} = useParams()
    const [movie, setMovie] = useState(null)
    const [user] = useContext(UserContext)


    useEffect(() => {
        if (movie === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
           
        }
        // console.log(movie)
    }, [movie, id])

    

    const SubmitForm = (event) => {
        event.preventDefault()
        let inputRating = movie.rating
        if (inputRating > 0 && inputRating < 11 ) {
            axios.put(`https://backendexample.sanbersy.com/api/data-movie/${movie.id}`, { 
                title: movie.title,
                description:movie.description,
                year:movie.year,
                duration:movie.duration,
                genre:movie.genre,
                rating:parseInt(movie.rating),
                image_url:movie.image_url,
                review:movie.review
            },{
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            // console.log('masuk')
            .then(res => {
                let newMovie = movie
                newMovie.title = movie.title
                newMovie.description = movie.description
                newMovie.year = movie.year
                newMovie.duration = movie.duration
                newMovie.genre = movie.genre
                newMovie.rating = movie.rating
                newMovie.image_url = movie.image_url
                newMovie.review = movie.review
                console.log(newMovie)
                setMovie(newMovie)
                history.push('/movie-editor')
                alert("data berhasil di ubah")
            })
            .catch(err=>{
                console.log(err)
            })
        } else {
            return alert("Check kembali Rating, Max 10")
        }
       
   
    }


    const handleChange = (event) => {
        let typeOfInput = event.target.name

        switch (typeOfInput) {
            case "title":
                {
                  setMovie({...movie, title: event.target.value});
                  break
                }
                case "description":
                {
                  setMovie({...movie, description: event.target.value});
                  break
                }
                case "year":
                {
                  setMovie({...movie, year: event.target.value});
                    break
                }
                case "review":
                    {
                      setMovie({...movie, review: event.target.value});
                        break
                    }
                case "duration":
                {
                  setMovie({...movie, duration: event.target.value});
                    break
                }
                case "genre":
                  {
                    setMovie({...movie, genre: event.target.value});
                      break
                  }
                case "rating":
                  {
                    setMovie({...movie, rating: event.target.value});
                      break
                  }
                case "image_url":
                  {
                    setMovie({...movie, image_url: event.target.value});
                      break
                  }
              default:
                {break;}
        }
    }
    
    return (
       <>
      {movie !==  null && (
           <Card  className="update-card">
               <h1 className="title-edit" > Edit Movie </h1>
               <form  className="form-edit-movie" onSubmit={SubmitForm} >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="title"
                    name="title"
                    // autoComplete="name"
                    autoFocus
                    value={movie.title}
                    // value={input.title}
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
                    value={movie.genre}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="description"
                    name="description"
                    autoComplete="name"
                    autoFocus
                    value={movie.description}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="duration"
                    label="duration"
                    name="duration"
                    autoComplete="name"
                    autoFocus
                    value={movie.duration}
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
                    value={movie.image_url}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="rating"
                    label="rating"
                    name="rating"
                    autoComplete="name"
                    autoFocus
                    value={movie.rating}
                    onChange={handleChange}
                />


                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="year"
                    label="year"
                    name="year"
                    autoComplete="name"
                    autoFocus
                    value={movie.year}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="review"
                    label="review"
                    name="review"
                    autoComplete="name"
                    autoFocus
                    value={movie.review}
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