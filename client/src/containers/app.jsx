import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: null,
      side: null
    }
  }

  componentDidMount() {
    axios.get('/images')
      .then((data) => {
        this.setState( 
          {
          front: data.data.front,
          side: data.data.side
        })
      })
  }

  images() {
    if(this.state.front === null && this.state.side === null) {
      return (
        <div>Loading</div>
      )
    }
    return this.state.front.map((val) => {
      axios.post('/sendFrame', { front: val } )
           .then((response) => {
            console.log("RESSSSPONSE:", response);
            if(response.data !== null) {
              let api_key = 'dab5bbc0';
              let api_secret = '7008ac711dd75f08';
              let to = 16467449919;        //can only send it to these numbers 19739028359, 15162366339, 16467449919 ... have to register more
              let from = 12028525488;
              let text = response.data;
              
              axios.post(`https://rest.nexmo.com/sms/json?api_key=${api_key}&api_secret=${api_secret}&to=${to}&from=${from}&text=${text}`)
                .then((res) => {
                  return res;
                })
               .catch((error) => {
                 console.log(error);
               });
             }
           })
           .catch((err) => {
             console.log(err);
           })
      return (
        <div>
          <img width='400' height='400' src={'/front/' + val} /> 
        </div>
      )
    });
  }
  
  render() {  
    const settings = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 500,
      slidesToShow: 1000,
      slidesToScroll: 1000,
    }

    
    return (
      <div>
        <Slider {...settings}>
          {this.images()}
        </Slider>
      </div>
    )
  }
}

export default App
