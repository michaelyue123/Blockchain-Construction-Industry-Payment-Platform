import React from 'react';
import intro from '../../images/intro-office.png';

const Intro = () => {
    return (
        <div>
            <div id="intro" className="basic-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="text-container">
                                <div className="section-title">HOW IT WORKS</div>
                                <h2>How Cascade Chain works</h2>
                                <p>Cascade Chain uses secure blockchain technology to streamline payments directly from the project funds to those in the payment chain, ensuring agreements are honoured and the job is delivered as planned..</p>
                                <p> <strong>Step 1: </strong>Sign up free</p>
                                <p> <strong>Step 2: </strong>Follow the easy step by step process to setting up a new project.</p>
                                <p> <strong>Step 3: </strong>Invite your project team (contractors, subcontractors, suppliers)</p>
                                <p> <strong>Step 4: </strong>Agree to scope of works and payment conditions.</p>
                                <p> <strong>Step 5: </strong>Complete the job and get paid as agreed.</p>
                            </div> 
                        </div> 
                        <div className="col-lg-7">
                            <div className="image-container">
                                <img className="img-fluid" src={intro} alt="alternative" />
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div>

            <div className="cards-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card" id="card-detail">
                                <span className="fa-stack">
                                    <span className="hexagon"></span>
                                    <i className="fas fa-dollar-sign fa-stack-1x"></i>
                                </span>
                                <div className="card-body">
                                    <h4 className="card-title">Secure Payments</h4>
                                    <ul className="side">
                                        <li>Transparent, simple, and efficient.</li>
                                        <li>Assured project funds and cash flow.</li>
                                        <li>Strengthen Security of payment Act.</li>
                                        <li> Quality workmanship and supplies are paid for on time, every time.</li>
                                    </ul>
                                </div>
                            </div>
                    
                            <div className="card" id="card-detail">
                                <span className="fa-stack">
                                    <span className="hexagon"></span>
                                    <i className="fas fa-tasks fa-stack-1x"></i>
                                </span>
                                <div className="card-body">
                                    <h4 className="card-title">Upfront Agreements</h4>
                                    <ul className="side">
                                        <li>Digital, automated, and secure contracts and payments.</li>
                                        <li>All agreements recorded on blockchain with the same “version of truth”.</li>
                                    </ul>
                                </div>
                            </div>
                
                            <div className="card" id="card-detail">
                                <span className="fa-stack">
                                    <span className="hexagon"></span>
                                    <i className="fas fa-desktop fa-stack-1x"></i>
                                </span>
                                <div className="card-body">
                                    <h4 className="card-title">Collaborative Practice</h4>
                                    <div className="card-body">
                                        <ul className="side">
                                            <li><div className="media-body">Protection of creditor identity</div></li>
                                            <li><div className="media-body">Safe and fair bidding</div></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;