// Header.js
import React, {Component} from 'react';
import JobService from './JobService'

const Jobservice = new JobService()
export default class CategoryWork extends Component {

    constructor(props) {
        super(props);
        this.state  = {
            category: [],
        };
    }

    componentDidMount() {
        var  self  =  this;
        Jobservice.getCategory().then(function (result) {
            console.log(result);
            self.setState({ category:  result})
        });
    }

    render(){
        return (
            <section className="ftco-section ftco-counter">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-3">
                <div className="col-md-7 heading-section text-center ftco-animate">
                    <span className="subheading">Categories work wating for you</span>
                    <h2 className="mb-4"><span>Current</span> Job Posts</h2>
                </div>
                </div>
                <div className="row">
                    {this.state.category.map( c  =>
                        <div className="col-md-3">
                            <ul className="category">
                                <li><a>{c.title } <span className="number" data-number={c.total_jobs}>{c.total_jobs}</span></a></li>
                            </ul>
                        </div>
                    )}
                </div>
                </div>
            </section>
        )
    }
}