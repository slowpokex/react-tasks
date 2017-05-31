import React, { Component } from 'react';
import Header from './components/Header'
import ConvertForm from './components/ConvertForm'

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<ConvertForm />
			</div>
		);
	}
}

export default App;