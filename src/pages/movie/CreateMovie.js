import React, {useState, useContext } from "react"
import axios from "axios"
import { TextField, Button, Card } from '@material-ui/core';
import { UserContext } from "../UserContext";

const CreateMovie = ()=> {
    const [input, setInput] = useState({
        title: '',
        description:'',
        year:2000,
        rating: 0,
        genre:"",
        image_url:"",
        review:"",
        duration:0,



    })
    const [user] = useContext(UserContext)

    

    const SubmitForm = (event) => {
        event.preventDefault()
        let inputRating = input.rating
        if (inputRating > 0 && inputRating < 11 ) {
            axios.post('https://backendexample.sanbersy.com/api/data-movie', { 
                title: input.title,
                description:input.description,
                year:input.year,
                duration:input.duration,
                genre:input.genre,
                rating:parseInt(input.rating),
                image_url:input.image_url,
                review:input.review
            },{
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            // console.log('masuk')
            .then(res => {
               setInput([input, {
                   id: res.data.id, input
               }])
                alert("data berhasil di buat")
                setInput({
                    title:"",
                    description:"",
                    year:"",
                    duration:"",
                    rating:"",
                    image_url:"",
                    review:"",
                    genre:""
                })
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
                  setInput({...input, title: event.target.value});
                  break
                }
                case "description":
                {
                  setInput({...input, description: event.target.value});
                  break
                }
                case "year":
                {
                  setInput({...input, year: event.target.value});
                    break
                }
                case "review":
                    {
                      setInput({...input, review: event.target.value});
                        break
                    }
                case "duration":
                {
                  setInput({...input, duration: event.target.value});
                    break
                }
                case "genre":
                  {
                    setInput({...input, genre: event.target.value});
                      break
                  }
                case "rating":
                  {
                    setInput({...input, rating: event.target.value});
                      break
                  }
                case "image_url":
                  {
                    setInput({...input, image_url: event.target.value});
                      break
                  }
              default:
                {break;}
        }
    }
    return (
       <>
        <Card  className="create-card">
            <h1 className="title-edit" > Create Movie </h1>
            <form  className="form-edit-movie" onSubmit={SubmitForm} >
            <TextField
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="title"
                name="title"
                autoComplete="name"
                autoFocus
                value={input.title}
                onChange={handleChange}
            />

            <TextField
                type="text"
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
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                label="description"
                name="description"
                autoComplete="name"
                value={input.description}
                autoFocus
                onChange={handleChange}
            />

            <TextField
                type="number"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="duration"
                label="duration"
                name="duration"
                autoComplete="name"
                value={input.duration}
                autoFocus
                onChange={handleChange}
            />

            <TextField
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="image_url"
                label="image_url"
                name="image_url"
                autoComplete="name"
                value={input.image_url}
                autoFocus
                onChange={handleChange}
            />

            <TextField
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="rating"
                label="rating"
                name="rating"
                autoComplete="name"
                value={input.rating}
                autoFocus
                onChange={handleChange}
                max={10} min={0}
            />


            <TextField
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="year"
                label="year"
                name="year"
                autoComplete="name"
                value={input.year}
                autoFocus
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
                value={input.review}
                autoFocus
                onChange={handleChange}
            />
    
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            
            >
                Create Movie
            </Button>
            </form>
            
        </Card>
       </>
    )
}

export default CreateMovie