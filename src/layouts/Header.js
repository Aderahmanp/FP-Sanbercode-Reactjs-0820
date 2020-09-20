import React, { useContext } from "react"
import { Link } from "react-router-dom"
import {AppBar, Toolbar, Button, Grid} from "@material-ui/core"
import {UserContext} from "../pages/UserContext"

const Headers = () => {
    const styleLinkNavbar={
        color: "inherit",
        textDecoration: "none"
    }

    const [user, setUser] = useContext(UserContext)

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return(
        <>
        <AppBar position="static">
      <Toolbar>
        <Grid
          justify="space-between"
          container 
          spacing={24}
        >
          <Grid item>
            <Button color="inherit">
              <Link style={styleLinkNavbar} to="/">Home</Link>
            </Button>
            {
                  user !== null && (
                    <>
                    <Button color="inherit">
                      <Link style={styleLinkNavbar} to="/Movie-Editor">Movie Editor</Link>  
                    </Button>
                    <Button color="inherit">
                      <Link style={styleLinkNavbar} to="/game-editor">Games Editor</Link>  
                    </Button>
                  </>
                  )
              }

          </Grid>
    
          <Grid item>
            <div>
              {
                  user === null && (
                    <>
                    <Button color="inherit">
                      <Link style={styleLinkNavbar} to="/login">Login</Link>  
                    </Button>
                    <Button color="inherit">
                      <Link style={styleLinkNavbar} to="/register">Register</Link>  
                    </Button>
                  </>
                  )
              }

              {
                  user !== null && (
                      <>
                        <Button color="inherit">
                        {user.name}
                        </Button>
                        <Button color="inherit">
                            <Link style={styleLinkNavbar} to="/Change-Password">Ganti Password</Link>  
                        </Button>
                        <Button onClick={handleLogout} color="inherit">
                        Logout
                        </Button>
                      </>
                  )
              }

            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

        </>
    )
}

export default Headers