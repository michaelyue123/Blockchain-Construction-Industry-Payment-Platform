import React from 'react';
import help1 from '../../images/help-1.jpg';
import help2 from '../../images/help-2.jpg';
import help3 from '../../images/help-3.jpg';

const HelpCenter = () => {
    return (
        <div id="services" className="cards-2">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="text-center" style={{marginBottom:"30px"}}>Choose The Help Package<br/> That Suits Your Needs</h2>
                    </div> 
                </div> 
                <div className="row">

                    <div className="col-lg-12">  
                        <div className="card">
                            <div className="card-image">
                                <img className="img-fluid" src={help1} alt="alternative" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Project funds</h3>
                                <ul className="list-unstyled li-space-lg">
                                    <li className="media">
                                        <i className="fas fa-square"></i>
                                        <div className="media-body">Resolve late payments</div>
                                    </li>
                                    <li className="media">
                                        <i className="fas fa-square"></i>
                                        <div className="media-body">Payments to contractors and subcontractors be simplified</div>
                                    </li>
                                </ul>

                            </div>
                            <div className="button-container">
                                <a className="btn-solid-reg page-scroll" href="#contact">DETAILS</a>
                            </div> 
                        </div>
                        
                        <div className="card">
                            <div className="card-image">
                                <img className="img-fluid" src={help2}  alt="alternative" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Creditor status</h3>
                                <ul className="list-unstyled li-space-lg">
                                    <li className="media">
                                        <i className="fas fa-square"></i>
                                        <div className="media-body">Protection of creditor identity</div>
                                    </li>
                                    <li className="media">
                                        <i className="fas fa-square"></i>
                                        <div className="media-body">Safe and fair bidding</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="button-container">
                                <a className="btn-solid-reg page-scroll" href="#contact">DETAILS</a>
                            </div> 
                        </div>
                    
                        <div className="card">
                            <div className="card-image">
                                <img className="img-fluid" src={help3} alt="alternative" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Smart Contract</h3>
                                <ul className="list-unstyled li-space-lg">
                                    <li className="media">
                                        <i className="fas fa-square"></i>
                                        <div className="media-body"> Unique user identifications</div>
                                    </li>
                                    <li className="media">
                                        <i className="fas fa-square"></i>
                                        <div className="media-body">Distributed ledgers</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="button-container">
                                <a className="btn-solid-reg page-scroll" href="#contact">DETAILS</a>
                            </div> 
                        </div>
                    </div> 
                </div> 
            </div> 
        </div>
    );
}

export default HelpCenter;