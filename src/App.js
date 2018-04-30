import React, { Component } from 'react';
import Item from './Item';
import Slider from './Slider';
import data from './data';
import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<h1 style={{ color: '#fff', textAlign: 'center' }}>this slider is reponsive</h1>
				<div className="demo">
					<Slider responsive>
						{data.map(({ src, description }, index) => (
							<Item src={src} description={description} key={index} />
						))}
					</Slider>
				</div>
				<div className="demo">
					<Slider slidesToScroll={1} slidesVisible={2}>
						{data.map(({ src, description }, index) => (
							<Item src={src} description={description} key={index} />
						))}
					</Slider>
				</div>

				<div className="demo">
					<Slider slidesToScroll={3} slidesVisible={3}>
						{data.map(({ src, description }, index) => (
							<Item src={src} description={description} key={index} />
						))}
					</Slider>
				</div>
			</div>
		);
	}
}

export default App;
