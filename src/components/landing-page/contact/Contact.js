import React, { Component } from 'react';
import { contactAction } from '../../../actions';


class Contact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        message: '',
        checked: false
    }

    onInputChange = async (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        await this.setState({ [name]: value });      
    }

    onClick = () => this.setState({ checked: !this.state.checked });

    onFormSubmit = async (e) => {
        e.preventDefault();
        
        const { name, email, phone, message, checked } = this.state;

        if(name !== '' && email !== '' && message !== '') {
            if(checked) { 
                contactAction.sendContactInfo(name, email, phone, message);
            }
            else {}
        }
        else {}
    }

    render() {
        return(
            <div id="contact" className="form-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="text-container">
                                <div className="section-title">CONTACT</div>
                                <h2>Get In Touch Using The Form</h2>
                                <p>You can stop by our office for a cup of coffee and just use the contact form below for any questions and inquiries</p>
                                <ul className="list-unstyled li-space-lg">
                                    <li className="address"><i className="fas fa-map-marker-alt"></i>14/240 Sydney Rd, Coburg VIC , Melbourne</li>
                                    <li><i className="fas fa-phone"></i><a href="tel:003024630820">+81 720 22 126</a></li>
                                    <li><i className="fas fa-phone"></i><a href="tel:003024630820">+81 720 22 128</a></li>
                                    <li><i className="fas fa-envelope"></i><a href="mailto:office@aria.com">office@Blockchain.com</a></li>
                                </ul>
                            </div> 
                        </div> 
                        <div className="col-lg-6">
                            <form id="contactForm" data-toggle="validator" data-focus="false">
                                <div className="form-group">
                                    <input type="text" name="name" onChange={this.onInputChange} className="form-control-input" placeholder="Name" id="cname" required />
                                    <div className="help-block with-errors"></div>
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" onChange={this.onInputChange} className="form-control-input" placeholder="Email" id="cemail" required />
                                    <div className="help-block with-errors"></div>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="phone" onChange={this.onInputChange} className="form-control-input" placeholder="Phone" id="cphone" />
                                    <div className="help-block with-errors">
                                    </div>
                                </div>
                                <div className="form-group">
                                    <textarea name="message" className="form-control-textarea" onChange={this.onInputChange} id="cmessage" placeholder="Your Message" required></textarea>
                                    <div className="help-block with-errors">
                                    </div>
                                </div>
                                <div className="form-group checkbox">
                                    <input type="checkbox" id="cterms" onClick={this.onClick} value="Agreed-to-Terms" required />I agree with Cascade Chain stated <a href="privacy-policy.html">Privacy Policy</a> and <a href="terms-conditions.html">Terms Conditions</a>
                                    <div className="help-block with-errors"></div>
                                </div>
                                <div className="form-group">
                                    <button type="button" onClick={this.onFormSubmit} className="form-control-submit-button">SUBMIT MESSAGE</button>
                                </div>
                                <div className="form-message">
                                    <div id="cmsgSubmit" className="h3 text-center hidden"></div>
                                </div>
                            </form>
                        </div> 
                    </div> 
                </div> 
            </div>
        );
    }
}

export default Contact;