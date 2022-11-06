import React from 'react'
import Topbar from './Topbar'
import Banner from './Banner'
import Form from './Form'
import Nav from './Nav'
import './Create.css';

export default function Create() {
  return (
    <>
    <Topbar>
    <Banner/></Topbar>
    <Nav/>
    
    <div className='body-wrapper'>
    <h1>Add your own videogame!</h1>
    <Form/>
    </div>
    </>
  )
}
