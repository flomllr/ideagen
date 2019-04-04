import React, { Component } from 'react';
import './App.css';
const apiAddress = 'http://localhost:8888';

class App extends Component {
	componentDidMount = async () => {
		await this.loadProducts();
	};

	sendcors = async (address, body) => {
		const response = await fetch(address, {
			mode: 'cors',
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		console.log(response);
		return await response.json();
	};

	sendpost = async (address, body) => {
		const response = await fetch(address, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		console.log(response);
		return await response.json();
	};

	loadProducts = async () => {
		const response = await fetch(apiAddress);
		const products = await response.json();
		console.log(products);
		this.setState({ products });
	};

	submit = async () => {
		const { newIdea } = this.state;
		const response = await fetch(
			'https://hooks.zapier.com/hooks/catch/4762538/76rbv5/?message=' + newIdea
		);
		await this.loadProducts();
		this.setState({ newIdea: '' });
	};

	handleInputChange = e => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	};

	render() {
		const { products, newIdea } = this.state || {};
		console.log(products);
		const prodTiles = products ? (
			<div className='prodWrapper'>
				<div
					className='prodTile'
					dangerouslySetInnerHTML={{ __html: products[0] }}
				/>
				<div
					className='prodTile'
					dangerouslySetInnerHTML={{ __html: products[1] }}
				/>
				<textarea
					name='newIdea'
					onChange={this.handleInputChange}
					value={newIdea}
				/>
				<button className='refreshButton' onClick={this.loadProducts}>
					Try again.
				</button>
				<button className='submitButton btn-primary' onClick={this.submit}>
					Save to Trello.
				</button>
			</div>
		) : (
			''
		);
		return <div className='App'>{prodTiles}</div>;
	}
}

export default App;
