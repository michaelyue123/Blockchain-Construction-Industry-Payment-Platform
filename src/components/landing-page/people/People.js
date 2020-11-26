import React from 'react';
import staff1 from '../../images/staff-1.png';
import staff2 from '../../images/staff-2.png';
import { Swiper, SwiperSlide } from 'swiper/react'; 

const People = () => {
    return(
        <div className="slider">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="text-center">Our Team Of Consultants</h2>
                    </div> 
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="slider-container">
                            <div className="swiper-container card-slider">
                                <Swiper
                                    spaceBetween={50}
                                    slidesPerView={3}
                                    updateOnWindowResize
                                >
                                    <SwiperSlide>
                                        <div className="card">
                                            <img className="card-image" src={staff1} alt="alternative" />
                                            <div className="card-body">
                                                <div className="testimonial-text">She has extensive experience in the construction industry and so far she has been involved in more than 10 projects</div>
                                                <div className="testimonial-author">Jessica Malcolm</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>      
                                    <SwiperSlide>
                                        <div className="card">
                                            <img className="card-image" src={staff2} alt="alternative" />
                                            <div className="card-body">
                                                <div className="testimonial-text">Assoc Director Business Ops & EngagementBlockchain Innovation Hub </div>
                                                <div className="testimonial-author">John Doe</div>
                                            </div>
                                        </div>        
                                    </SwiperSlide>  
                                    <SwiperSlide>
                                        <div className="card">
                                            <img className="card-image" src={staff2} alt="alternative" />
                                            <div className="card-body">
                                                <div className="testimonial-text">Assoc Director Business Ops & EngagementBlockchain Innovation Hub </div>
                                                <div className="testimonial-author">Jane Doe</div>
                                            </div>
                                        </div>        
                                    </SwiperSlide> 
                                </Swiper> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div>
    ); 
}

export default People;