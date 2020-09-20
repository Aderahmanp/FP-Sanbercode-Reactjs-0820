import React from "react"
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Headers from './Header'
import Section from "../layouts/section"
import Footers from './Footer'

import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;


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