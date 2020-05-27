import React from 'react';
import Routes from 'routes';
import Footer from 'components/Footer';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from 'styles/GlobalStyle';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
