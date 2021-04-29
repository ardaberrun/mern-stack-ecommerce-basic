import React from 'react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Navigation from '../components/Navigation'
 
function SiteLayout({children,...props}) {

    return (
        <Container>
            <Navbar/>
            <Navigation/>
            {children}
        </Container>
    )
}

export default SiteLayout
