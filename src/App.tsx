import React from 'react';
import './App.css';
import Greet from './components/Greet';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import _ from 'lodash';
 
const Wrapper = styled.div`
  .bg {
    position: relative;
    height: 50vh;
    background: #333;
    background-size: cover;
    background-position: 50%;
    > div {
      position: relative;
      z-index: 1;
    }
    .credit {
      position: absolute;
      bottom: 10px;
      width: 100%;
      padding-left: 10px;
      text-align: left;
      a {
        color: #fff;
      }
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQYV2NkYGBIY2BgYGCEMtIACCUBNYu1ui0AAAAASUVORK5CYII=) repeat;
    }
  }
`;

const timeSegregator = (unit: number) => {
  if (unit >= 6 * 60 && unit <= (11*60)+59) {
    // morning 6.00 - 11.59 
    return 'morning';
  } else if(unit <= (14*60)+59) {
    // afternoon 12.00 - 14.59
    return 'afternoon';
  } else if(unit <= 18*60) {
    // evening 15.00 - 18.00
    return 'evening';
  } else {
    // night - rest
    return 'night';
  }
}

type BGState = {
  url?: string;
  timing?: string;
  country?: string;
  photographer?: string;
  username?: string;
  isLoading: boolean;
}

class Background extends React.Component {
  state: BGState = {
    url: undefined,
    timing: undefined,
    isLoading: true,
    photographer: undefined,
    username: undefined
  };

  dummyCall = () => {
    return new Promise(resolve => {
      const r = {
        country: "Indonesia",
        data: {
          urls: {
            raw: "https://images.unsplash.com/photo-1553895501-af9e282e7fc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEwMzQxN30",
          },
          user: {
            name: "Annie Spratt",
            username: "anniespratt",
            profile_image: {
              small: "https://images.unsplash.com/profile-1508107410047-a34950174b6b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32"
            }
          }
        }
      };
      resolve({data: r});
    });
  }

  componentDidMount() {
    const timeUnit: number = moment().format('H:mm')
      .split(':')
      .map((n: string, i: number) => {
        return i === 0 ? +n * 60 : +n;
      })
      .reduce((a,b) => a + b, 0)
    ; 
    const timing = timeSegregator(timeUnit);
    // axios.get(`https://rv8jk9j4eh.execute-api.us-east-1.amazonaws.com/dev/hello?rand=1&cmp=google&t=${timing}`)
    this.dummyCall()
      .then((r: any) => {
        const img = _.get(r.data, 'data.urls.raw');
        const photographer = _.get(r.data, 'data.user.name');
        const username = _.get(r.data, 'data.user.username');
        const country = _.get(r.data, 'country');
        this.setState({url: `${img}&w=1920`, timing, country, photographer, username});
      })
      .catch((e) => alert(e))
    ;
  }

  render() {
    const { isLoading, url } = this.state;
    return (
      <React.Fragment>
        {isLoading && url && (
          <img src={url} style={{display: 'none'}} onLoad={() => this.setState({isLoading: false})} alt=""/>
        )}
        {typeof this.props.children === 'function' && this.props.children(this.state)}
      </React.Fragment>
    );
  }
}

const LoaderText = styled.div`
  font-size: 4rem;
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  font-weight: bold;
  h1 {
    font-size: 2rem;
    font-weight: normal;
  }
`;

class App extends React.Component {
  
  render() {  
    return (
      <div className="App">
        <Background>
          {(state: BGState) => {
            return (
              <Wrapper>
                <div className="bg" style={{backgroundImage: `url(${state.url})`}}>
                  {state.isLoading && (<LoaderText>
                    Hi There!
                    <h1>Thanks for stopping by...</h1>
                  </LoaderText>)}
                  {!state.isLoading && (
                    <Greet>
                      <div>Good {state.timing}, {state.country}</div>
                    </Greet>
                  )}
                  <div className="credit">
                    <small>
                      Photo by <a href={`https://unsplash.com/@${state.username}?utm_source=your_app_name&utm_medium=referral`}>
                        {state.photographer}
                      </a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>
                    </small>
                  </div>
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
