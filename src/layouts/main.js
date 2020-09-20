import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import Headers from './Header'
import Section from "../layouts/section"
import Footers from './Footer'
import "../App.css"
import { Layout,  } from 'antd';
import 'antd/dist/antd.css';



const Main = () => {
    return (
        <>
        <Router>
            <Layout className="layout">
            <Headers/>
            <div className="container">
            <Section/>
            </div>
            <Footers/>
            </Layout>
        </Router>
    </>
    )
}

export default Main