import styled, { keyframes, css} from 'styled-components';

export const Form = styled.form`

@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i&display=swap');

  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1 0 auto;
    border: 1.5px solid #009aaa;
    border-radius: 14px 14px 14px 14px;
    font-size: 16px;
    outline: none;
    padding: 4px;
    font-family: 'Roboto Condensed', sans-serif;
    font-style: italic;
    color: #fff;
    background: #2a2a2a;

    &::placeholder{
      color: #248eff;
      font-weight: lighter;
    }

    @media screen and (max-width:500px){

      &::placeholder{
      color: #248eff;
      font-weight: lighter;
      font-size: 0.8rem;
    }
    }
  }
`
;

const rotate = keyframes`

      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    `
    ;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`

  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: 0;
  margin-left: -40px;
  width: 44px;
  height: 42px;
  border-radius: 50%;
  background: #248eff;
  z-index: 2;

  &[disabled] {
    cursor: not-allowed;
    background: #6db4ff;
  }

  ${ props =>
      props.loading &&
      css`
        svg {
          animation: ${rotate} 2s linear infinite;
        }
   `}
`
;

export const List = styled.ul`

@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i&display=swap');

list-style: none;
margin: 30px;

li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  font-family: 'Roboto Condensed', sans-serif;
  color: #009aaa;
  font-weight: 700;

  & + li {
    border-top: 1px solid #eeee;
  }

  a {
    color: #248eff;
    text-decoration: none;
    margin-left: 5px;
    padding-right: 5px;
    animation: ${rotate} 2s linear infinite;

  &:visited {
    color: #248eff;
  }

  &:hover {
    color: #009aaa;
    }

  &:active {
    color: #ff00ff;
  }

  }
}
`
;

export const ShowList = styled.button`

  display: none;
  align-items: center;
  justify-content: center;


  background: none;
  outline: none;
  border: none;
  color: #009aaa;

  margin: 12px auto;

  &:hover {
    color: #248eff;
    }

  &:active {
    color: #ff00ff;
  }


`
;

export const HiddenList = styled.button`

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  outline: none;
  border: none;
  color: #009aaa;

  margin: 12px auto;

  &:hover {
    color: #248eff;
    }

  &:active {
    color: #ff00ff;
  }

`
;

export const Footer =styled.footer`
  margin: 0 auto;
  text-align: center;

  .github-footer {

    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative !important;
  }

  h6 {
    margin: 0 auto;
    text-align: center;
    color: #009aaa;
    font-size: 14px;
    font-family: 'Ubuntu', Arial, Helvetica, sans-serif;
  }
`
;

export const Delete = styled.button`
  list-style: none;
  margin: 30px;
  border: none;
  background: none;
  color: #7159c1;
`;

