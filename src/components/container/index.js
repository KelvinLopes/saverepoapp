import styled from 'styled-components';

const Container = styled.div`

@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i&display=swap');

  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1 );
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 21px;
    font-family: 'Roboto Condensed', sans-serif;
    color: #00006f;
    font-weight: 300;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
      color: #000;
      width: 6rem;
      height: 6rem;
    }
  }

  @media screen and (max-width:500px) {

    h1 {
      font-size: 1.4em;
    }

  }
`
;


export default Container;
