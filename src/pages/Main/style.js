import styled, { keyframes, css} from 'styled-components';

export const Form = styled.form`

@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i&display=swap');

  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1 0 auto;
    border: 1.5px solid #248eff;
    border-radius: 14px 14px 14px 14px;
    font-size: 16px;
    outline: none;
    padding: 4px;
    font-family: 'Roboto Condensed', sans-serif;
    font-style: italic;
    color: #7159c1;

    &::placeholder{
      color: #00006f;
      font-weight: lighter;
    }

    @media screen and (max-width:500px){

      &::placeholder{
      color: #00006f;
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
    /*opacity: 0.6;*/
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

