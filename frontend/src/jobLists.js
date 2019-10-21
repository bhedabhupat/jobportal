import  React, { Component } from  'react';
import JobService from './JobService'
import JobDetails from './jobDetails'
import CategoryWork from './CategoryWork';

const Jobservice = new JobService()

class  JobsList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            jobs: [],
            nextPageURL:  '',
            prevPageURL: ''

        };
        this.nextPage  =  this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        Jobservice.getJobs().then(function (result) {
            console.log(result);
            self.setState({ jobs:  result.results, nextPageURL:  result.next})
        });
    }

    nextPage(){
        var  self  =  this;
        console.log(this.state.nextPageURL);        
        Jobservice.getJobsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ jobs:  result.results, nextPageURL:  result.next, prevPageURL: result.previous})
        });
    }

    prevPage() {
        var  self  =  this;
        console.log(this.state.prevPageURL);        
        Jobservice.getJobsByURL(this.state.prevPageURL).then((result) => {
            self.setState({ jobs:  result.results, nextPageURL:  result.next, prevPageURL: result.previous})
        });
    }
    
    render() {
        return (
            <div>
            <CategoryWork />
            <section className="ftco-section bg-light">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-3">
                        <div className="col-md-7 heading-section text-center ftco-animate">
                            <span className="subheading">Recently Added Jobs</span>
                            <h2 className="mb-4"><span>Recent</span> Jobs</h2>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.jobs.map( c  =>
                        <div className="col-md-12" key={c.id}>
                            <div className="job-post-item bg-white p-4 d-block d-md-flex align-items-center">
                                <div className="mb-4 mb-md-0 mr-5">
                                    <div className="job-post-item-header d-flex align-items-center">
                                        <h2 className="mr-3 text-black h3">{c.title}</h2>
                                        <div className="badge-wrap">
                                            <span className="bg-primary text-white badge py-2 px-3">Fulltime</span>
                                        </div>
                                    </div>
                                    <div className="job-post-item-body d-block d-md-flex">
                                        <div className="mr-3"><span className="icon-layers"></span> <a href="#">{c.category}</a></div>
                                        <div><span className="icon-my_location"></span> <span>{c.address}</span></div>
                                    </div>
                                </div>
                                <div className="ml-auto d-flex">
                                    <a href={"/jobdetails/"+c.id+"/"} component={JobDetails} className="btn btn-primary py-2 mr-1">View Job</a>
                                    {/* <a href="#" className="btn btn-secondary rounded-circle btn-favorite d-flex align-items-center icon">
                                        <span className="icon-heart"></span>
                                    </a> */}
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="row mt-5">
                        <div className="col text-center">
                            <div className="block-27">
                                <ul>
                                    {this.state.prevPageURL  &&
                                        <li><a onClick={this.prevPage}>&lt;</a></li>    
                                    }
                                    {this.state.nextPageURL &&
                                        <li><a onClick={this.nextPage} >&gt;</a></li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
		</section>
        </div>
        );
    }
}

export  default  JobsList;