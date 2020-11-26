import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../images/logo.png';
import { Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import { useDispatch } from 'react-redux';
import { alertActions } from '../../actions';
import { authConstants } from '../../constants';

const NavBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSignOut = () => {

        dispatch(logoutSuccess());
        alertActions.success("Logout is successful.","", false, 1500);
        navigate("/Login");
    }

    function logoutSuccess() { return { type: authConstants.LOGOUT };}

    // extract data from redux store
    const user = useSelector(state => state.authentication.user);

    return (
        <div>
            <div className="spinner-wrapper">
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>

            <nav id="navId" 
            style = 
            {{ 
                backgroundColor: user ? "black": "",
                padding: user ? "0.29rem 3rem 0.29rem 4rem" : "",
                boxShadow: user ? "0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.1)" : ""     
            }} 
            className="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
                {
                    user !== undefined ?
                    (
                        user.role === 'owner' ?
                        <Link className="navbar-brand logo-text page-scroll" to="/owner">
                            <Row>
                                <img src={logo} height="58rem" width="44rem" alt="logo" />
                                &nbsp;
                                <Col>
                                    <Row><span id="logo-title">CASCADE</span></Row>
                                    <Row><span id="logo-title">CHAIN</span></Row>
                                </Col>
                            </Row>  
                        </Link>
                        :
                        (
                            user.role === 'lead' ?
                            <Link className="navbar-brand logo-text page-scroll" to="/lead">
                                <Row>
                                    <img src={logo} height="58rem" width="44rem" alt="logo" />
                                    &nbsp;
                                    <Col>
                                        <Row><span id="logo-title">CASCADE</span></Row>
                                        <Row><span id="logo-title">CHAIN</span></Row>
                                    </Col>
                                </Row>  
                            </Link>
                            :
                            <Link className="navbar-brand logo-text page-scroll" to="/contractor">
                                <Row>
                                    <img src={logo} height="58rem" width="44rem" alt="logo" />
                                    &nbsp;
                                    <Col>
                                        <Row><span id="logo-title">CASCADE</span></Row>
                                        <Row><span id="logo-title">CHAIN</span></Row>
                                    </Col>
                                </Row>  
                            </Link>
                        )
                    )
                    :
                    (
                        window.location.href.search("#") > 0 ?
                        <a className="navbar-brand logo-text page-scroll" href="#header">
                            <Row>
                                <img src={logo} height="58rem" width="44rem" alt="logo" />
                                &nbsp;
                                <Col>
                                    <Row><span id="logo-title">CASCADE</span></Row>
                                    <Row><span id="logo-title">CHAIN</span></Row>
                                </Col>
                            </Row>  
                        </a>
                        :
                        <a className="navbar-brand logo-text page-scroll" href="/#header">
                            <Row> 
                                <img src={logo} height="58rem" width="44rem" alt="logo" />
                                &nbsp;                 
                                <Col>
                                    <Row><span id="logo-title">CASCADE</span></Row>
                                    <Row><span id="logo-title">CHAIN</span></Row>
                                </Col>                    
                            </Row>  
                        </a>
                    )
                }
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-awesome fas fa-bars"></span>
                    <span className="navbar-toggler-awesome fas fa-times"></span>
                </button>

                {
                    user ?
                    
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <div type="button" className="btn-secondary" onClick={onSignOut}><span className="landing text" id="auth">Sign Out</span></div>
                            </li>
                        </ul>
                    </div>
                    
                    :

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                {
                                    window.location.href.search("#") > 0 ?
                                    <a className="nav-link page-scroll" id="landing-text" href="#header"><span className="landing text" >Home</span></a>
                                    :
                                    <a className="nav-link page-scroll" id="landing-text" href="/#header"><span className="landing text" >Home</span></a>
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    window.location.href.search("#") > 0 ?
                                    <a className="nav-link page-scroll" id="landing-text" href="#intro"><span className="landing text" >How It Works</span></a>
                                    :
                                    <a className="nav-link page-scroll" id="landing-text" href="/#intro"><span className="landing text" >How It Works</span></a>
                                }
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle  page-scroll" href="#service" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="landing text" >Tools</span></a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/Blogs"><span className="landing text">Blogs</span></a>
                                    <div className="dropdown-items-divide-hr"></div>
                                    <a className="dropdown-item" href="/Resources"><span className="landing text">Resources</span></a>
                                    <div className="dropdown-items-divide-hr"></div>
                                    <a className="dropdown-item" href="/CaseStudies"><span className="landing text" >Case Studies</span></a>
                                </div>
                            </li>
                            <li className="nav-item">
                                {
                                    window.location.href.search("#") > 0 ?
                                    <a className="nav-link page-scroll" href="#contact"><span className="landing text" >Contact</span></a>
                                    :
                                    <a className="nav-link page-scroll" href="/#contact"><span className="landing text" >Contact</span></a>
                                }
                            </li>
                            <li className="nav-item">    
                                <a className="nav-link page-scroll" href="/AboutUs"><span className="landing text" >About Us</span></a>
                            </li>            
                        
                            <li className="nav-item">
                                <Link className="nav-link page-scroll" to="/Register"><span className="landing text" id="auth">Sign Up Free</span></Link>  
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link page-scroll" to="/Login"><span className="landing text" id="auth">Sign In</span></Link>
                            </li>
                        </ul>
                    </div>
                }    
            </nav>
        </div>   
    );     
}

export default NavBar;