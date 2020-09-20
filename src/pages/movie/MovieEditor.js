import React, {useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext";

const useStyles = makeStyles({
  table: {
    width: '100%',
    overflowX: 'auto',
    marginTop :'2%',
    marginBottom:'5%'

  },
});

export default function MovieEditor() {
  const [movies, setMovies] = useState(null)
  const [user] = useContext(UserContext)
  const classes = useStyles();


  useEffect( () => {
    if (movies === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
      .then(res => {
          setMovies(res.data.map(el=>{ return {
            id: el.id, 
            title: el.title, 
            description: el.description,
            year: el.year,
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
            image_url: el.image_url,
            updated_at:el.updated_at,
            created_at: el.created_at

          }
        }))
        console.log(res)
      })

    }
  }, [movies])



  const handleDelete = (event) =>{
    var id= parseInt(event.target.value) 
    console.log(id)
    axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {headers: {"Authorization" : `Bearer ${user.token}`}} )
    .then(res => {
        let newMovies = movies.filter(el => el.id !== id)
        setMovies(newMovies) 
    })
  }
  

  return (
      
    <TableContainer component={Paper} className={classes.table}  >
                    <Button  type="primary">
                  <Link to={'/movie-create'}>
                      Create Movie
                  </Link>
              </Button>
    {
        movies !== null && (
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">rating</TableCell>
            <TableCell align="right">description</TableCell>
            <TableCell align="right">Create</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((el) => (
            <TableRow key={el.id}>
              <TableCell component="th" scope="row">
                {el.title}
              </TableCell>
              <TableCell align="right"><img  alt="img-game" className="card-img-table" src={el.image_url} /> </TableCell>
              <TableCell align="right">{el.year}</TableCell>
              <TableCell align="right">{el.duration}</TableCell>
              <TableCell align="right">{el.genre}</TableCell>
              <TableCell align="right">{el.rating}</TableCell>
              <TableCell align="right">{el.description}</TableCell>
              <TableCell align="right">{el.created_at}</TableCell>
              <TableCell align="right">{el.updated_at}</TableCell>
              <TableCell align="right">
                  <div className="flex-button">
                    <Button value={el.id} type="primary">
                            <Link to={`/movie-edit/${el.id}`}>
                                Update 
                            </Link>
                    </Button>
                    <Button value={el.id} onClick={handleDelete} type="secondary" color="secondary" >Delete</Button>
                  </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        )
    }
      
    </TableContainer>
  );
}