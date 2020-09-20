import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { Card,  Button } from 'antd';

import { Link } from "react-router-dom"

;


const Movie = ()=> {
    let {id} = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        if (data === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
            .then(res => {
                setData(res.data)
            })
           
        }
        console.log(data)
    }, [data, setData])


    return (
       <>
      {data !==  null && (
           <Card className="card-detail"  >
            <h1 style={{testAlign: "center"}}> Detail Game {data.title}</h1>
            <div className="flex-detail">
                <div><img  alt="img-game" className="card-img-detail" src={data.image_url} ></img></div>
                <div className="deskripsi-detail" >
                    <h3 className="release-text"></h3>
                    <p> <strong>{data.title} </strong></p>
                    <p className="year"> {data.year} </p>
                    <p> Genre :{data.genre} </p>
                    <hr/>
                    <p> Rating : {data.rating} </p>
                    <hr/>
                    <p> Durasi : {data.duration} </p>
                    <hr/>
                    <p> Deskripsi : {data.description} </p>
                    <hr/>
                    <p> Review : {data.review} </p>
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

export default Movie