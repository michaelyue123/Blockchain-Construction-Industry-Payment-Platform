import React from 'react';

const RegOwnerOne = (props) => {

    // call back function to set input value
    function onInputChange(e) {
        const { name, value } = e.target;
        props.onChange(name, value);
    }

    return (
        <div> 
            &nbsp;<label>Business Information (if applicable)</label>
            <div className="form-group">
                <input type="text" defaultValue="" onChange={onInputChange} name="businessName" className="form-control" placeholder="Business Name" />
                {props.errors.businessName.length > 0 && <span className='error'>{props.errors.businessName}</span>}
            </div>

            <div className="form-group">
                <input type="text" defaultValue="" onChange={onInputChange} maxLength="11" name="abn" className="form-control" placeholder="Australian Business Number (ABN)" />
                {props.errors.abn.length > 0 && <span className='error'>{props.errors.abn}</span>}
            </div>
        </div>
    );
} 

export default RegOwnerOne;