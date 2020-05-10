import React from 'react';
import './App.css';
import Greet from './components/Greet';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import _ from 'lodash';
 
const Wrapper = styled.div`
  .bg {
    min-height: 100vh;
    background: #333;
    background-size: cover;
    background-position: 50%;
  }
`;
/**
 * morning   06.00am - 11.59am (6*60) - (11*60)+59
 * afternoon 00.00pm - 02.59pm 720 - (2*60 + 59)
 * evening   03.00pm - 06.00pm
 */
const timeSegregator = (unit: number) => {
  if (unit >= 6 * 60 && unit <= (11*60)+59) {
    // morning
    return 'morning';
  } else if(unit <= (2*60+59)+720) {
    // afternoon
    return 'afternoon';
  } else if(unit <= (6*60)+720) {
    // evening
    return 'evening';
  } else {
    // night
    return 'night';
  }
}

type BGState = {
  url?: string;
}

class Background extends React.Component {
  state: BGState = {
    url: undefined
  };

  componentDidMount() {
    const timeUnit: number = moment().format('LT')
      .split(' ')
      .map((s: string, index: number) => {
        if (index === 1) {
          return s === 'PM' ? 720 : 0;
        }
        const [h, mins] = s.split(':');
        return (Number(h) * 60) +  Number(mins);
      })
      .reduce((a,b) => a + b, 0)
    ;
    const timing = timeSegregator(timeUnit);
    axios.get(`https://rv8jk9j4eh.execute-api.us-east-1.amazonaws.com/dev/hello?t=${timing}`)
      .then(r => {
        const img = _.get(r.data, 'data.results[0].urls.raw');
        this.setState({url: `${img}&w=1920`});
      })
    ;
  }

  render() {
    return (
      typeof this.props.children === 'function' && this.props.children(this.state)
    );
  }
}


class App extends React.Component {
  
  render() {  
    return (
      <div className="App">
        <Background>
          {(state: BGState) => {
            return (
              <Wrapper>
                <div className="bg" style={{backgroundImage: `url(${state.url})`}}>
                  <Greet />
                </div>
              </Wrapper>
            );
          } 
          }
        </Background>
      </div>
    );
  }
}


export default App;
