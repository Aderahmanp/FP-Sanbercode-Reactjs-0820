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
           
        }
        console.log(data)
    }, [data, setData])


    return (
       <>
    <h1 style={{testAlign: "center"}}>
      {data !==  null && (
           <Card  style={{ marginBottom: 8 }}>
            <div className="flex-detail">
                <div><img  alt="img-game" className="card-img-detail" src={data.image_url} ></img></div>
                <div className="deskripsi-detail" >
                    <h3 className="release-text"></h3>
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
    </h1>
       </>
    )
}

export default Game