import React from "react";
import '../../../styles/auth/Register.css';
import '../../../styles/NavBar.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Register = () => {
    return (
        <div className="register wrapper">
            <div className="ui block">
                <h1 id="reg-title" className="text-center">What is your ROLE?</h1>
                <Row>
                    <Col><Link to="/RegOwner"><Button id="register-role" variant="outline-secondary">Project Owner</Button></Link></Col>
                    <Col><Link to="/RegContractor"><Button id="register-role" variant="outline-secondary">Contractor</Button></Link></Col>
                </Row>
            </div> 
        </div>
    );  
};

export default Register;