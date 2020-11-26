import React from 'react';

const RegCommon = (props) => {

    let errors = props.errors;

    // call back function to set input value
    function onInputChange(e) {
        const { name, value } = e.target;
        props.onChange(name, value);
    }

    return (
        <div>
            <div className="form-group">
                <input type="text" defaultValue="" onChange={onInputChange} name="firstName" className="form-control" placeholder="First Name*" required />                  
                {errors.firstName.length > 0 && <span className='error'>{errors.firstName}</span>}
            </div>
            <div className="form-group">
                <input type="text" defaultValue="" onChange={onInputChange} name="lastName" className="form-control" placeholder="Last Name*" required />    
                {errors.lastName.length > 0 && <span className='error'>{errors.lastName}</span>}
            </div>
            <div className="form-group">
                <input type="email" defaultValue="" onChange={onInputChange} name="email" className="form-control" placeholder="Email*" required />
                {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
            </div>

            <div className="form-group">
                <input type="password" defaultValue="" onChange={onInputChange} name="password" className="form-control" placeholder="Create Password*" required />
                {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
            </div>

            <div className="form-group">
                <input type="password" defaultValue="" onChange={onInputChange} name="confirmPassword" className="form-control" placeholder="Confirm Password*" required />
                {errors.confirmPassword.length > 0 && <span className='error'>{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
                <input type="text" defaultValue="" onChange={onInputChange} name="phone" className="form-control" placeholder="Phone*" required />
                {errors.phone.length > 0 && <span className='error'>{errors.phone}</span>}
            </div>
        </div>
    );
} 

export default RegCommon;