import React, {useContext} from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from '../pages/Home'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import ChangePassword from '../pages/auth/ChangePassword'
import Movie from '../pages/movie/Movie'
import Game from '../pages/game/Game'
import MovieEditor from '../pages/movie/MovieEditor'
import EditMovie from '../pages/movie/EditMovie'
import CreateMovie from '../pages/movie/CreateMovie'
import GameEditor from '../pages/game/GameEditor'
import EditGame from '../pages/game/EditGame'
import CreateGame from '../pages/game/CreateGame'
import {UserContext} from "../pages/UserContext"


const Section = () => {
    const [user, setUser] = useContext(UserContext)

    const PrivateRoute = ({user, ...props}) => {
        if(user) {
            return <Route {...props}/>
        } else {
            return <Redirect to="/login"/>
        }
    }

    const LoginRoute = ({user, ...props}) =>
    user ? <Redirect to="/"/> : <Route {...props} />
    
    

    return(
        <section>
            <Switch>
                <Route exact path="/" user={user} component={Home}/> 
                <Route exact path="/Register" user={user} component={Register}/>
                <LoginRoute exact path="/Login" user={user} component={Login}/> 
                <Route exact path="/Change-Password" user={user} component={ChangePassword}/>
                <Route exact path="/movie/:id" user={user} component={Movie}/>
                <Route exact path="/game/:id" user={user} component={Game}/> 
                <PrivateRoute exact path="/movie-edit/:id" user={user} component={EditMovie}/>   
                <PrivateRoute exact path="/movie-editor" user={user} component={MovieEditor}/>
                <PrivateRoute exact path="/movie-create" user={user} component={CreateMovie}/>
                <PrivateRoute exact path="/game-editor" user={user} component={GameEditor}/>
                <PrivateRoute exact path="/game-edit/:id" user={user} component={EditGame}/> 
                <PrivateRoute exact path="/game-create" user={user} component={CreateGame}/>      
            </Switch>
        </section>
    )
}

export default Section