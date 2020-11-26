import React from 'react';

const RegContractorOne = (props) => {

    // call back function to set input value
    function onInputChange(e) {
        const { name, value } = e.target;
        props.onChange(name, value);
    }

    return (
        <div> 
            <div className="form-group">
                <input type="text" defaultValue="" onChange={onInputChange} name="businessName" className="form-control" placeholder="Business Name*" required />
                {props.errors.businessName.length > 0 && <span className='error'>{props.errors.businessName}</span>}
            </div>

            <div className="form-group">
                <input type="text" defaultValue="" onChange={onInputChange} name="abn" className="form-control" placeholder="Australian Business Number (ABN)*" required />
                {props.errors.abn.length > 0 && <span className='error'>{props.errors.abn}</span>}
            </div>

            <div className="form-group">
                <input type="text" defaultValue="" onChange={onInputChange} name="vba" className="form-control" placeholder="Victoria Building Authority Number*" required />
                {props.errors.vba.length > 0 && <span className='error'>{props.errors.vba}</span>}
            </div>
        </div>
    );

} 

export default RegContractorOne;