import styled from 'styled-components';

const Container = styled.div`

@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i&display=swap');

  max-width: 700px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1 );
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 21px;
    font-family: 'Roboto Condensed', sans-serif;
    color: #009aaa;
    font-weight: 300;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
      color: #586969;
      width: 6rem;
      height: 6rem;
    }

    a svg {
    margin: 0 auto 0 280px;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    width: 25px;
    height: 25px;

  }
  }


  @media screen and (max-width:300px), screen and (max-width: 411px),
   screen and (max-width: 414px) {

    h1 {
      font-size: 1.4em;

      a svg {
        margin: 0 auto 0 77px;
      }
    }

  }


  @media screen and (min-width:800px), screen and (min-width: 1000px) {

      h1 {
        font-size: 1.4em;

        a svg {
          margin: 0 auto 0 300px;
        }
}

}
`
;


export default Container;
