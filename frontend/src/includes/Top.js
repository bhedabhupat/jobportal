import React, {Component} from 'react';
var Background = '/images/bg_2.jpg'
export default class Top extends Component {
    render(){
        return (            
            <div className='hero-wrap js-fullheight' style={{ backgroundImage: "url(" + Background + ")" }} data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-start" data-scrollax-parent="true">
                        <div className="col-xl-10 ftco-animate mb-5 pb-5" data-scrollax=" properties: { translateY: '70%' }">
                            {/* <p className="mb-4 mt-5 pt-5" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">We have <span className="number" data-number="850000">0</span> great job offers you deserve!</p> */}
                            <h1 className="mb-5" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Your Dream     <br /><span>Job is Waiting</span></h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}