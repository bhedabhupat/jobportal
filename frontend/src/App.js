import  React, { Component } from  'react';
import { BrowserRouter } from  'react-router-dom'
import { Route, Link } from  'react-router-dom'

import  './App.css';
import JobsList from './jobLists';
import Header from './includes/Header';
import Top from './includes/Top';
import JobsDetails from './jobDetails';

const BaseLayout = () => (
	<div className="content">
		<Route path="/" exact component={JobsList} />
		<Route path="/jobdetails/:pk/" component={JobsDetails} />
	</div>
)

class App extends Component {
	componentDidMount() {
		const script = document.createElement("script");
		script.src = "/js/main.js";
		script.async = true;
		document.body.appendChild(script);
	}

   	render() {
		return (
		<BrowserRouter>
			<Header />
			<Top />
			<BaseLayout/>
		</BrowserRouter>
		);
  }
}

export default App;