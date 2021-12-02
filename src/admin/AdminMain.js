import React, { Component } from 'react'
import Footer from './Footer'
import Main from './Main'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
// import Sidedark from './Sidedark'

export default class AdminMain extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                <Main />
                <Footer />
            </div>
        )
    }
}
