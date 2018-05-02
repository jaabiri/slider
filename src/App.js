import React, { Component } from 'react';
import Item from './Item';
import Slider from './Slider';

import './App.css';

const config = {
	1690: {
		slidesToScroll: 1,
		slidesVisible: 6
	},
	1280: {
		slidesToScroll: 1,
		slidesVisible: 5
	},
	980: {
		slidesToScroll: 1,
		slidesVisible: 4
	},
	736: {
		slidesToScroll: 1,
		slidesVisible: 3
	},
	480: {
		slidesToScroll: 1,
		slidesVisible: 2
	}
};

class App extends Component {
	render() {
		const slides = [ ...Array(6).keys() ].map((key) => (
			<Item
				src={`http://placehold.it/400x200/c9c9c9/1CB5E0?text=${key + 1}`}
				description={`${key + 1}`}
				key={key}
			/>
		));

		return (
			<div>
				<h1 style={{ color: '#fff', textAlign: 'center' }}>this slider is responsive</h1>
				<div className="demo">
					<Slider config={config}>{slides}</Slider>
				</div>
				<div className="demo">
					<Slider slidesToScroll={1} slidesVisible={2}>
						{slides}
					</Slider>
				</div>

				<div className="demo">
					<Slider slidesToScroll={3} slidesVisible={3}>
						{slides}
					</Slider>
				</div>
			</div>
		);
	}
}

export default App;
