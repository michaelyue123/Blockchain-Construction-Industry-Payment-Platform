import React, { useState } from 'react';
import '../../../styles/auth/RegRole.css';
import '../../../styles/NavBar.css';
import { validateForm, validEmailRegex, validUsernameRegex, validBusinessName, validPassword, validPhoneNumber, validateABN } from '../../validation/InputValidate';
import { Row, Col} from 'react-bootstrap'; 
import { Link, useNavigate } from 'react-router-dom';
import { alertActions } from '../../../../actions';
import RegCommon from './RegCommon';
import RegContractorOne from './RegContractorOne';
import { sha256 } from 'js-sha256';
import { useDispatch } from 'react-redux';
import { authConstants } from '../../../../constants';
import { authService } from '../../../../services';


const RegContractor = () => {

    const [state, setState] = useState({
        role: 1,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        businessName: '',
        abn: '',
        vba: 'A61533195402',
        checked: false
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        businessName: '',
        abn: '',
        vba: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate()


    // input validation + input value set
    const onInputChange = (name, newValue) => {

        switch (name) {
            case 'firstName':
                errors.firstName = validUsernameRegex.test(newValue)
                    ? ''
                    : 'Please enter alphabetical character with first letter uppercase!';
                break;
            case 'lastName':
                errors.lastName = validUsernameRegex.test(newValue)
                    ? ''
                    : 'Please enter alphabetical character with first letter uppercase!';
                break;
            case 'businessName':
                errors.businessName = validBusinessName.test(newValue)
                    ? ''
                    : 'Please enter a valid bussiness name!';
                break;
            case 'email':
                errors.email = validEmailRegex.test(newValue)
                    ? ''
                    : 'Invalid email format. Please enter a valid email address!';
                break;
            case 'password':
                 errors.password = validPassword.test(newValue)
                    ? ''
                    : 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number!';
                break;
            case 'confirmPassword':
                if(newValue !== state.password) {
                    errors.confirmPassword = 'Password entered is inconsistent with previous input!';
                }
                else {
                    errors.confirmPassword = '';
                }
                break;
            case 'phone':
                errors.phone = validPhoneNumber.test(newValue)
                    ? ''
                    : 'Phone entered is invalid. Please enter a Australian phone number!';
                break;
            case 'abn':
                errors.abn = validateABN(newValue)
                    ? ''
                    : 'Please enter a valid ABN number!';
                break;  
            default:
                break;
        }
        setState(prevState => ({...prevState, [name]: newValue}));
        setErrors(errors);
    }

    function regSuccess(user, role) { return { type: authConstants.REGISTER_SUCCESS, user, role } }

    function regFailure(error) { return { type: authConstants.REGISTER_FAILURE, error } }


    // toggle checkbox
    const onClick = () => setState(prevState => ({...prevState, checked: !state.checked }));

 
    // submit check + submit function
    const OnFormSubmit = async (e) => {
        e.preventDefault();

        const { 
            role,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            phone,
            businessName,
            abn,
            vba,
            checked,  
        } = state;

           
        if(firstName!==''&& lastName!==''&& email!==''&& password!==''&& confirmPassword!==''&& phone!=='' && businessName!==''&& abn!=='' && vba!=='') {  

            if(validateForm(errors)) {
                if(checked) {
                    var hashedPassword = sha256(password);

                    authService.registerUser(role, firstName, lastName, email, hashedPassword, phone, abn, vba, businessName)
                    .then(
                        result => {
                            if (result.resultCode === 10301002) {
                                dispatch(regSuccess(result.returnObj, role));
                                alertActions.success("Registration as contractor is successful!", "", false, 1500);
                                navigate('/contractor');
                            }
                            else {
                                alertActions.error("Oops...", result.returnObj, true);
                            }
                        },
                        error => {
                            dispatch(regFailure(error.toString()));
                            alertActions.error(error.toString());
                        }
                    );    
                }
                else {
                    alertActions.error("Oops...", 'Please make sure you\'ve checked the box!', true)
                }
            }
            else {
                alertActions.error("Oops...", 'Please make sure details you\'ve entered are correct!', true)
            }
        }
        else {
            alertActions.error("Oops...", 'Please fill in all required details!', true)
        }
    }

    return(
        <div className="form wrapper">
            <h1 style={{color: "transparent", marginTop: "5rem"}}>contractor</h1>
            <form className="ui container-2">
                <h2 className="text-center" id="registration-title" style={{fontFamily:"sans serif"}}>Contractor Registration</h2> 
                    <Row xs={1} md={2}>
                        <Col>
                            <RegCommon errors={errors} onChange={onInputChange} />
                        </Col>
                        
                        <Col>
                            <RegContractorOne errors={errors} onChange={onInputChange} />
                        </Col>
                    </Row>
                <div className="form-group" id="terms-conditions">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" onClick={onClick} className="custom-control-input" id="customCheck1" required />
                        <label className="custom-control-label" htmlFor="customCheck1">I agree to the idealist <Link to="/"><span id="terms">Terms & Conditions</span></Link></label>
                    </div>
                </div>

                <button type="button" onClick={OnFormSubmit} className="btn btn-secondary btn-block">Submit</button>
                <p className="forgot-password text-right" style={{marginTop: "10px"}}>
                    Already registered <Link to="/Login">Sign In?</Link>
                </p>   
            </form>
        </div> 
    );
}

export default RegContractor;