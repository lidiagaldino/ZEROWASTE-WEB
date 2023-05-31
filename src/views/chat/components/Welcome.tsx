import React from 'react'
import styled from "styled-components";
import Hello from "../../../assets/hello.gif";
const Welcome = () => {
    return (
        <Container>
            <img src={Hello} alt="hello" />
            <h1>
                Bem-vindo, <span>{localStorage.getItem('nome')}</span>!
            </h1>
            <h3>Por favor, selecione uma conversa para começar.</h3>
        </Container>
    )
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: black;
  }
`;

export default Welcome