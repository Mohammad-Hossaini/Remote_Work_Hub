import styled, { css } from "styled-components";
const test = css`
  text-align: center;
`;
const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 34px;
      font-weight: 600;
      background-color: yellow;
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 20px;
      font-weight: 500;
      background-color: green;
    `}
color : blue
`;
export default Heading;
