import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import profile from 'assets/profile3.jpg';
import Masthead from 'components/Masthead';

const ProfileWrapper = styled.img`
  border-radius: 50%;
  width: 150px;
`;

const IntroWrapper = styled.div`
  color: #bfc7d5;
  line-height: 1.5;
  font-size: 14px;
  max-width: ${(props) => props.theme.containerWidth};
  margin: 0 auto;
  padding: 0 20px;
  text-align: left;
  strong {
    color: #fff;
  }
  .profile {
    text-align: center;
  }
`;

type RouteParams = {
  company: string;
};

const Intro: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  const company = props.match.params.company;
  const [introLoaded, setState] = useState(false);
  return (
    <React.Fragment>
      <Masthead
        company={company}
        onLoadComplete={() => {
          setState(true);
        }}
      />
      {introLoaded && (
        <IntroWrapper>
          <div className="profile">
            <ProfileWrapper src={profile} alt="Felix Susanto" />
          </div>
          <p>
            My name is <strong>Felix Susanto</strong>
          </p>
          <p>Thanks for your time!</p>
          <p>
            I'm a self-taught frontend developer who took visual communication
            &amp; design as my formal education. I had 4 years of working
            experience doing print design, before take a dive in the world of
            programming. Started in 2010 as a multimedia designer, I soon
            discover interest in designing an interactive website, before I know
            it in 2015 I had change my course of career from designer to a
            frontend developer.
          </p>
          <p>
            I'd like to say that it's been quite a challenge to jump and explore
            new teritory. Perhaps my curiosity and drive to always learn
            something new, enables me in making this transition.
          </p>
          <p>
            Even now, I'm still open to learn and explore new things related to
            technology.
          </p>
          <p>
            I hope that I can be someone useful to your organization and brings
            value to the company. If you'd like to find out more about me,
            please check my portfolio, and resume here.
          </p>
        </IntroWrapper>
      )}
    </React.Fragment>
  );
};

export default withRouter(Intro);
