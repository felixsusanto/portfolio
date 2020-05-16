import React from 'react';
import Greet from 'components/Greet';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import _ from 'lodash';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useTransition, animated, config } from 'react-spring';
import profile from 'assets/profile3.jpg';

const randomColor = () => {
  const colors = ['#c792ea', '#c3dc6c', '#82aaf3', '#212432'];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const Wrapper = styled.div`
  .bg {
    position: relative;
    height: 100vh;
    background-color: ${randomColor};
    background-size: cover;
    background-position: 50%;
    transition: all 0.5s ease-in-out 0.2s;
    &.img-shown {
      height: 50vh;
      clip-path: polygon(0 0, 100% 0, 100% 92%, 0% 100%);
    }
    > div:not(.blur-filter) {
      position: relative;
      z-index: 1;
      &.credit {
        position: absolute;
        bottom: 7%;
        width: 100%;
        padding-left: 10px;
        text-align: left;
        a {
          color: #fff;
        }
      }
    }
    > div.blur-filter {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 0;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;

      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGElEQVQYV2PU0LVPY2BgYGAEMRgZ/s8EABd4A5BBq/1uAAAAAElFTkSuQmCC)
        repeat;
    }
  }
`;

const timeSegregator = (unit: number) => {
  if (unit >= 6 * 60 && unit <= 11 * 60 + 59) {
    // morning 6.00 - 11.59
    return 'morning';
  } else if (unit <= 14 * 60 + 59) {
    // afternoon 12.00 - 14.59
    return 'afternoon';
  } else if (unit <= 18 * 60) {
    // evening 15.00 - 18.00
    return 'evening';
  } else {
    // night - rest
    return 'night';
  }
};

type BGState = {
  url?: string;
  timing?: string;
  country?: string;
  photographer?: string;
  username?: string;
  isLoading: boolean;
  minimumLoadScreenTime: boolean;
};

type BGProps = {
  query: string;
};

class Background extends React.Component<BGProps> {
  state: BGState = {
    url: undefined,
    timing: undefined,
    isLoading: true,
    photographer: undefined,
    username: undefined,
    minimumLoadScreenTime: false
  };

  dummyCall = () => {
    return new Promise((resolve) => {
      const r = {
        country: 'Indonesia',
        data: {
          urls: {
            raw:
              'https://images.unsplash.com/photo-1553895501-af9e282e7fc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEwMzQxN30'
          },
          user: {
            name: 'Annie Spratt',
            username: 'anniespratt',
            profile_image: {
              small:
                'https://images.unsplash.com/profile-1508107410047-a34950174b6b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32'
            }
          }
        }
      };
      resolve({ data: r });
    });
  };

  componentDidMount() {
    const timeUnit: number = moment()
      .format('H:mm')
      .split(':')
      .map((n: string, i: number) => {
        return i === 0 ? +n * 60 : +n;
      })
      .reduce((a, b) => a + b, 0);
    const timing = timeSegregator(timeUnit);

    setTimeout(() => this.setState({ minimumLoadScreenTime: true }), 5000);
    /*
    this.dummyCall()
    */
    const company = this.props.query;
    axios
      .get(
        `https://rv8jk9j4eh.execute-api.us-east-1.amazonaws.com/dev/hello?rand=1&t=${timing}${
          company ? '&cmp=' + company : ''
        }`
      )
      .then((r: any) => {
        const img = _.get(r.data, 'data.urls.raw');
        const photographer = _.get(r.data, 'data.user.name');
        const username = _.get(r.data, 'data.user.username');
        const country = _.get(r.data, 'country');
        this.setState({
          url: `${img}&w=1920`,
          timing,
          country,
          photographer,
          username
        });
      })
      .catch((e) => alert(e));
  }

  render() {
    const { isLoading, url } = this.state;
    return (
      <React.Fragment>
        {isLoading && url && (
          <img
            src={url}
            style={{ display: 'none' }}
            onLoad={() => this.setState({ isLoading: false })}
            alt=""
          />
        )}
        {typeof this.props.children === 'function' &&
          this.props.children(this.state)}
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

type RouteParams = {
  company: string;
};

type BlurFilterProps = {
  blur: boolean;
};

const BlurFilter: React.FunctionComponent<BlurFilterProps> = (props) => {
  const transition = useTransition(props.blur, {
    config: config.molasses,
    from: {
      backdropFilter: 'blur(20px)'
    },
    enter: { backdropFilter: 'blur(0)' },
    leave: { backdropFilter: 'blur(20px)' }
  });
  return transition((style, item) => {
    return item && <animated.div className="blur-filter" style={style} />;
  });
};

const ProfileWrapper = styled.img`
  border-radius: 50%;
`;

const Intro: React.FunctionComponent<RouteComponentProps<RouteParams>> = (
  props
) => {
  const company = props.match.params.company;

  return (
    <React.Fragment>
      <Background query={company}>
        {(state: BGState) => {
          const timeToShowImage =
            !state.isLoading && state.minimumLoadScreenTime;
          const bgImage = timeToShowImage
            ? { backgroundImage: `url(${state.url})` }
            : {};

          return (
            <Wrapper>
              <div
                className={`bg ${timeToShowImage ? 'img-shown' : ''}`}
                style={bgImage}
              >
                {!timeToShowImage && (
                  <LoaderText>
                    Hi There!
                    <h1>Thanks for stopping by...</h1>
                  </LoaderText>
                )}
                {timeToShowImage && (
                  <React.Fragment>
                    <Greet>
                      {company ? (
                        <div>
                          Hello, <strong>{company}</strong>
                        </div>
                      ) : (
                        <div>
                          Good {state.timing}, {state.country}
                        </div>
                      )}
                    </Greet>
                    <div className="credit">
                      <small>
                        Photo by{' '}
                        <a
                          href={`https://unsplash.com/@${state.username}?utm_source=felix_personal_portfolio&utm_medium=referral`}
                        >
                          {state.photographer}
                        </a>{' '}
                        on{' '}
                        <a href="https://unsplash.com/?utm_source=felix_personal_portfolio&utm_medium=referral">
                          Unsplash
                        </a>
                      </small>
                    </div>
                    <BlurFilter blur={timeToShowImage} />
                  </React.Fragment>
                )}
              </div>
            </Wrapper>
          );
        }}
      </Background>
      {/* <ProfileWrapper src={profile} alt="Felix Susanto" /> */}
    </React.Fragment>
  );
};

export default withRouter(Intro);
