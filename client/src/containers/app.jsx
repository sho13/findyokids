import React, { Component } from 'react';
import Slider from 'react-slick';

class App extends Component {

  sideImages() {
    for(let i = 562; i < 633; i++) {
    console.log('./images/side/IMG_5' + i + '.jpg');
      return (
        <div>
          <img src={require('./images/side/IMG_5' + i + '.jpg')} alt='#'/>
        </div>
      )
    }
  }

  
  render() {  
    const settings = {
    	dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
    }

    return (
      <div>
        <Slider {...settings}>
          <div style>{this.sideImages()}</div>
        </Slider>
      </div>
    )
  }
}

export default App