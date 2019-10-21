import  React, { Component } from  'react';
import JobService from './JobService'

const Jobservice = new JobService()

class  JobsDetails  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            jobs: [],
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        var  self  =  this;
        Jobservice.getJob(params.pk).then(function (result) {
            console.log(result);
            self.setState({ jobs:  result})
        });
    }

    render() {
        return (
            <section className="ftco-section bg-light">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-3">
                        <div className="col-md-7 heading-section text-center ftco-animate">
                            <h2 className="mb-4">{this.state.jobs.title}</h2>
                            <div className="job-post-item-body d-block d-md-flex">
                                <div className="mr-3"><span className="icon-layers"></span> {this.state.jobs.category}</div>
                                <div className="mr-3"><span className="icon-my_location"></span> <span>{this.state.jobs.address}</span></div>
                                <div><span className="icon-print"></span> <span>{this.state.jobs.post_date}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" key={this.state.jobs.id}>
                            <div className="job-post-item bg-white p-4 d-block d-md-flex align-items-center">
                                <div className="mb-4 mb-md-0 mr-5">
                                    <div className="job-post-item-header d-flex align-items-center">
                                        <h2 className="mr-3 text-black h3">summary</h2>
                                    </div>
                                    <div className="job-post-item-body d-block d-md-flex">
                                        {this.state.jobs.summary}
                                    </div>
                                </div>
                                
                            </div>
                            <div className="job-post-item bg-white p-4 d-block d-md-flex align-items-center">
                                <div className="mb-4 mb-md-0 mr-5">
                                    <div className="job-post-item-header d-flex align-items-center">
                                        <h2 className="mr-3 text-black h3">Description</h2>
                                    </div>
                                    <div className="job-post-item-body d-block d-md-flex">
                                        {this.state.jobs.description}
                                    </div>
                                </div>
                                
                            </div>
                            <div className="job-post-item bg-white p-4 d-block d-md-flex align-items-center">
                                <div className="mb-4 mb-md-0 mr-5">
                                    <div className="job-post-item-header d-flex align-items-center">
                                        <h2 className="mr-3 text-black h3">Qualifications</h2>
                                    </div>
                                    <div className="job-post-item-body d-block d-md-flex">
                                        {this.state.jobs.qualifications}
                                    </div>
                                </div>
                            </div>
                            {this.state.jobs.education && 
                                <div className="job-post-item bg-white p-4 d-block d-md-flex align-items-center">
                                    <div className="mb-4 mb-md-0 mr-5">
                                        <div className="job-post-item-header d-flex align-items-center">
                                            <h2 className="mr-3 text-black h3">Education</h2>
                                        </div>
                                        <div className="job-post-item-body d-block d-md-flex">
                                            {this.state.jobs.education}
                                        </div>
                                    </div>
                                    
                                </div>
                            }
                            <div className="ml-auto d-flex">
                                <a href={this.state.jobs.url} target="_blank" className="btn btn-primary py-2 mr-1">Apply Job</a>
                            </div>
                        </div>
                    </div>
                </div>
		</section>
        );
    }
}

export  default  JobsDetails;