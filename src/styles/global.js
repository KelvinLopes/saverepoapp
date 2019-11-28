import  { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: rgba(1,1,1, 0.8);
    -webkit-font-smoothing: antialiased !important;

  }

  body, input, button {

    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
}

  button {
    cursor: pointer;
  }
`
;
