import React, { Component } from 'react';
import Item from './Item';
import Slider from './Slider'
import data from './data';
import './App.css';

class App extends Component {

  render() {
    return (
      <Slider>
        {
          data.map(({ src, description },index) => <Item src={src} description={description} key={index}/>)
         }
      </Slider>
    );
  }
}

export default App;
