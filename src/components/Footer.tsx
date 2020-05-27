import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import Mailto from 'react-protected-mailto';
import { GlobalTheme } from 'styles/GlobalStyle';

const FooterWrapper: StyledComponent<any, GlobalTheme> = styled.footer`
  .container {
    padding: 40px 0;
    max-width: ${(props) => props.theme.containerWidth};
    padding: ${(props) => props.theme.padding};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <div>&copy;2020 Felix Susanto</div>
        <p>
          Phone: <Mailto tel="+65 9878 5840" />
          <br />
          Email:{' '}
          <Mailto
            email="felix.susanto2000@gmail.com"
            headers={{
              subject: 'Query from Portfolio site'
            }}
          />
        </p>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
