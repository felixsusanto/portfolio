import { createGlobalStyle } from 'styled-components';

export const theme = {
  mainColor: '#bfc7d5',
  darkBlue: '#292d3e',
  containerWidth: '800px',
  padding: '20px'
};

type Props = {
  theme: GlobalTheme;
};
export type GlobalTheme = typeof theme;
export const GlobalStyle = createGlobalStyle<Props>`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.darkBlue};
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIElEQVQoU2Msqeps6Gkrb2AgABgJKYDJjyrEG1JEBw8AYJ8ECyFQDdYAAAAASUVORK5CYII=);
    color: ${(props) => props.theme.mainColor};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  
`;
