import React, { Component } from 'react';
import Item from './Item';
import Slider from './Slider'
import data from './data';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
      <div className="demo">
      <Slider>
        {
          data.map(({ src, description },index) => <Item src={src} description={description} key={index}/>)
         }
      </Slider>
      </div>
      <div className="demo">
      <Slider  slidesToScroll= {1} slidesVisible= {2}>
        {
          data.map(({ src, description },index) => <Item src={src} description={description} key={index}/>)
         }
      </Slider>
      </div>

      <div className="demo">
      <Slider  slidesToScroll= {3} slidesVisible= {3}>
        {
          data.map(({ src, description },index) => <Item src={src} description={description} key={index}/>)
         }
      </Slider>
      </div>
      </div>
    );
  }
}

export default App;
