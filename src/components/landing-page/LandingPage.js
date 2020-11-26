import React from 'react';
import '../styles/LandingPage.css';

import Home from '../landing-page/home/Home';
import Intro from '../landing-page/how-it-works/Intro';
import HelpCenter from './tools/HelpCenter';
import People from '../landing-page/people/People';
import Contact from '../landing-page/contact/Contact';
import Footer from '../landing-page/footer/Footer';
import Copyright from '../landing-page/copyright/Copyright';


const LandingPage = () => {
    return ( 
        <div className="wrapper">
            <Home />
            <Intro />
            <HelpCenter />
            <People /> 
            <Contact />
            <Footer />
            <Copyright />
        </div>   
    );
}

export default LandingPage;