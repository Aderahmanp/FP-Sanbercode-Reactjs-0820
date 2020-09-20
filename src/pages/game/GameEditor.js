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
import { Button, Input } from '@material-ui/core';
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
  const [games, setGames] = useState(null)
  const [user] = useContext(UserContext)
  const [search, setSearch] = useState("")
  const classes = useStyles();


  useEffect( () => {
    if (games === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-game`)
      .then(res => {
          setGames(res.data)
        console.log(res)
      })

    }
  }, [games])


  const handleDelete = (event) => {
      let idGame = parseInt(event.target.value)
      console.log(idGame)
     

      axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${idGame}`, {headers: {"Authorization" : `Bearer ${user.token}`}})
      .then(res => {
          console.log(res)
          let deleteGame = games.filter(el => el.id !== idGame )
          setGames(deleteGame)
      })
   
  }

  const submitSearch = (event) => {
      event.preventDefault()
      axios.get(`https://backendexample.sanbersy.com/api/data-game`)
      .then(res => {
          setGames(res.data)
          let data = res.data
        console.log(data)
        let filterGame = data.filter(x=> x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        setGames([...filterGame])
      })

    }


  const handleSearch = (event) => {
      setSearch(event.target.value)
      console.log(event.target.value)
  }

  return (
      
    <TableContainer component={Paper} className={classes.table}  >
    <Button  type="primary">
        <Link to={'/game-create'}>
            Create Game
        </Link>
     </Button>
     <form className="form-serach" onSubmit={submitSearch}>
        <Input placeholder="Search" inputProps={{ 'aria-label': 'description' }} value={search}  onChange={handleSearch} />
    </form>
    {
        games !== null && (
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Release</TableCell>
            <TableCell align="right">Platform</TableCell>
            <TableCell align="right">Create</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((el) => (
            <TableRow key={el.id}>
              <TableCell component="th" scope="row">
                {el.name}
              </TableCell>
              <TableCell align="right"><img  alt="img-game" className="card-img-table" src={el.image_url} /> </TableCell>
              <TableCell align="right">{el.year}</TableCell>
              <TableCell align="right">{el.genre}</TableCell>
              <TableCell align="right">{el.realease}</TableCell>
              <TableCell align="right">{el.platform}</TableCell>
              <TableCell align="right">{el.created_at}</TableCell>
              <TableCell align="right">{el.updated_at}</TableCell>
              <TableCell align="right">
                  <div className="flex-button">
                    <Button value={el.id} type="primary">
                            <Link to={`/game-edit/${el.id}`}>
                                Update 
                            </Link>
                    </Button>
                    <Button type="primary" name="delete" value={el.id} onClick={handleDelete} color="secondary" >Delete</Button>
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