import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { Card,  Button } from 'antd';

import { Link } from "react-router-dom"

;


const Game = ()=> {
    let {id} = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        if (data === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
           
        }
        console.log(data)
    }, [data, setData])


    return (
       <>
      {data !==  null && (
          
           <Card  className="card-detail">
            <h1 style={{testAlign: "center"}}> Detail Game {data.name}</h1>
            <div className="flex-detail">
                <div><img  alt="img-game" className="card-img-detail" src={data.image_url} ></img></div>
                <div className="deskripsi-detail" >
                    <p> <strong>{data.name} </strong></p>
                    <p className="release"> {data.year} </p>
                    <p> Platform :{data.platform} </p>
                    <hr/>
                    <p> Player : {data.singlePlayer} </p>
                    <hr/>
                    <p> Genre : {data.duration} </p>
                    <hr/>
                </div>
            </div>
           <Button  type="primary" className="button-detail">
               <Link to={`/`}>
               Back to home
               </Link>
           </Button>   
       </Card>
      ) }
       </>
    )
}

export default Game