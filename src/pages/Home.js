import React, {Component} from "react"
import axios from "axios"
import { Card, Col, Row, Button } from 'antd';
import { Link } from "react-router-dom"
import {UserContext} from "./UserContext"
class Home extends Component {
    static contextType = UserContext
    constructor(props){
        super(props)
        this.state = {
            movies:[],
            games:[],
            user:""
        }
    }
    
    
    componentDidMount() {
        const user = this.contextType
        console.log(user)
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
        .then(res => {
            let games = res.data.map(item => {
                return {
                    id:item.id,
                    name:item.name,
                    genre:item.genre,
                    singlePlayer:item.singlePlayer,
                    multiplayer:item.multiplayer,
                    platform:item.platform,
                    release:item.release,
                    image:item.image_url
                }
            })
            this.setState({games})
        })

        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
        .then(res => {
            let movies = res.data.map(item => {
                return {
                    id:item.id,
                    title:item.title,
                    description:item.description,
                    year:item.year,
                    duration:item.duration,
                    genre:item.genre,
                    rating:item.rating,
                    review:item.review,
                    image:item.image_url
                }
            })
            this.setState({movies})
            console.log(movies)
        })
        
    }
    

    render() {
        return (
            <>
            
            <h1 className="Home-title">Daftar games</h1>
          
            <Row >
            {
                this.state.movies.map((item, index)=>{
                return (
                    <Col offset = {1} key={index}>
                        <Card title={item.title} style={{ marginBottom: 8 }}>
                        <img  alt="img-game" className="card-img" src={item.image} ></img>
                        <h3 className="release-text">{item.release}</h3>
                        {
                            item.description !== null &&(
                                <p> <strong>Deskripsi : </strong>{item.description.slice(0, 20)}</p>
                            )
                        }

{
                            item.description === null && (
                                <p> <strong>Deskripsi : </strong></p>
                            )
                        }
                        
                        {
                        this.state.user !== null && (
                                <>
                                <Button value={item.id} type="primary">
                                    <Link to={`/movie/${item.id}`}>
                                    Detail Game
                                    </Link>
                                </Button>
                            </>
                            )
                        }
                        </Card>
                    </Col>
                )       
                })
            }
            
            </Row>
            <h1 className="Home-title">Daftar games</h1>
            <Row >
            {
                this.state.games.map((item, index)=>{
                return (
                    <Col offset = {1} key={index}>
                        <Card title={item.name} style={{ marginBottom: 8 }}>
                        <img  alt="img-game" className="card-img" src={item.image} ></img>
                        <h3 className="release-text">{item.release}</h3>
                        <p> <strong>Genre : </strong>{item.genre}</p>
                        {
                        this.state.user !== null && (
                            <>
                            <Button value={item.id} type="primary">
                                <Link to={`/game/${item.id}`}>
                                Detail Game
                                </Link>
                            </Button>
                                </>
                            )
                        }
                        </Card>
                    </Col>
                )       
                })
            }
            </Row>
            </>
        )
    }
}

export default Home