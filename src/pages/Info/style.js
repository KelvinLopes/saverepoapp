import styled from 'styled-components';

export const Content = styled.div`

display: flex;
flex-direction: column;
align-items: start;
justify-content: center;

h1 {
  margin: 5px auto;
  color: #6db4ff;
}

p {

  color: #009aaa;
  line-height: 2;
  font-size: 18px;
  font-family: 'Ubuntu',Arial, Helvetica, sans-serif;
}

em {
  color: #6db4ff;
}

strong {

  color: #6db4ff;
}

span.button-text {
  background: #248eff;
  color: #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin: 5px;
  text-align: center;
}

a {
  padding: 2rem;
  margin: 0 auto;
}
`;
