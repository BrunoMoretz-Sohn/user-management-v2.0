import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${(props) => props.theme.fonts.primary};
    font-size: ${(props) => props.theme.fontSizes.primary};
  }

  body {
    background-color: ${(props) => props.theme.colors.bgBlack};
    color: ${(props) => props.theme.colors.textColorPrimary};
  }
`;

export default GlobalStyles;
