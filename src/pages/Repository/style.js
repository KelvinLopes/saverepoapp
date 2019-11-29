import styled, { keyframes } from 'styled-components';

const rotate = keyframes`

      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    `
    ;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  h1{
    margin-left: 5px;
    font-size: 10px;
    margin-top: 3px;
  }

  svg {
    width: 48px;
    height: 48px;
    animation: ${rotate} 15s linear infinite;
  }
`
;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    font-size: 16px;
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

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  h1 {
    margin-top: 5px;
    font-weight: 400;
    color: #248eff;
  }
`
;

export const IssueList = styled.ul`

  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border-radius: 4px;
    border: 1px solid #eee;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;
    }

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #248eff;


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

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 700;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }
  }

  p {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }
`
;
