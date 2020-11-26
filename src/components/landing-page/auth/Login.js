import React, { useState } from 'react';
import '../../styles/auth/Login.css';
import '../../styles/NavBar.css';
import { Form, Button } from 'react-bootstrap';
import { sha256 } from 'js-sha256';
import { validEmailRegex, validPassword } from '../validation/InputValidate';
import { useDispatch } from 'react-redux';
import { authConstants } from '../../../constants';
import { alertActions } from '../../../actions';
import { authService } from '../../../services';
import { useNavigate } from 'react-router-dom';


const Login = () =>  {

    const [state, setState] = useState({ loginEmail: '', loginPassword: '' });
    const [hidden, setHidden] = useState(true);
    const [errors, setErrors] = useState({ loginEmail: '', loginPassword: '' })
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // input validation + input value set 
    const onInputChange = e => {
        e.preventDefault();

        const { name, value } = e.target;

        switch (name) {
            case 'loginEmail':
                errors.loginEmail = validEmailRegex.test(value)
                    ? ''
                    : 'Invalid email format. Please enter a valid email address!';
                break;
            case 'loginPassword':
                errors.loginPassword = validPassword.test(value)
                    ? ''
                    : 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number!';
                break;
            default:
                break;
        }
        setState(prevState => ({...prevState, [name]: value}));
        setErrors(errors);
    }

    function loginSuccess(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function loginFailure(error) { return { type: authConstants.LOGIN_FAILURE, error } }

    // submit function + submit check + 
    const onSubmit = e => {
        e.preventDefault();

        const { loginEmail, loginPassword } = state;

        if (loginEmail && loginPassword) {
            authService.login(loginEmail, sha256(loginPassword))
            .then(
                response => { 
                    let resultCode = response.resultCode;
                    if(resultCode === 10302001){
                        let user = response.returnObj;

                        dispatch(loginSuccess(user));
                        alertActions.success("Login is successful.","", false, 1500);

                        if(user.role === "owner") {
                            navigate('/owner');
                        }
                        else if(user.role === "contractor") {
                            navigate('/contractor');
                        }
                        else {
                            navigate('/lead');
                        }  
                            
                    }else{
                        let message = response.returnObj.split(": ");
                        alertActions.error("Login failed", message[1], true);
                    }
                },
                error => {
                    dispatch(loginFailure(error.toString()));
                    alertActions.error(error.toString());
                }
            );
        }         
    }
    
    // toggle checkbox
    const toggleShow = () => setHidden(!hidden );

    return(
        <div className="login wrapper">
            <div className="login frame">
                <h2 className="text-center" style={{ fontFamily: "Fira Sans" }}>Sign In</h2>                                    
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><strong>Email address</strong></Form.Label>
                        <Form.Control defaultValue="" onChange={onInputChange} type="email" name="loginEmail" placeholder="Enter email" required />
                        {errors.loginEmail.length > 0 && <span className='error'>{errors.loginEmail}</span>}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><strong>Password</strong></Form.Label>
                        <Form.Control defaultValue="" onChange={onInputChange} type={hidden ? "password" : "text"} name="loginPassword" placeholder="Password" required />
                        {errors.loginPassword.length > 0 && <span className='error'>{errors.loginPassword}</span>}
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check onClick={toggleShow} type="checkbox" label="show password" />
                    </Form.Group>

                    <Button variant="btn btn-secondary" type="button" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form>    
            </div>
        </div>
    )  
};

export default Login;