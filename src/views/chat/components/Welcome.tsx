import React from 'react'
import styled from "styled-components";
import Hello from "../../../assets/hello.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons'
const Welcome = () => {
  return (
    <Container>
      <img src={Hello} alt="hello" />
      <h1>
        Bem-vindo, <span>{localStorage.getItem('nome')}</span>!
      </h1>
      {localStorage.getItem('contatos') == 'ntem' && localStorage.getItem('contato') == 'Gerador' &&
        <>
          <div className="circle-warning" style={{ border: "3px solid black", marginTop: 20 }}>
            <FontAwesomeIcon icon={faTriangleExclamation} style={{ fontSize: 35, alignItems: 'center', justifyContent: 'center', marginBottom: 5, color: 'black' }} />
          </div>
          <h3>Favorite um catador para iniciar uma conversa</h3>
        </>
      }

      {localStorage.getItem('contatos') == 'tem' && localStorage.getItem('tipo') == 'Gerador' &&
        <>
     
          <h3>Selecione um catador para iniciar uma conversa</h3>
        </>
      }

      {localStorage.getItem('tipo') == 'Catador' && localStorage.getItem('contatos') == 'ntem' &&
        <>
        <h3>Espere um gerador favoritar você para iniciar uma conversa.</h3>
        </>      
      }

{localStorage.getItem('tipo') == 'Catador' && localStorage.getItem('contatos') == 'tem' &&
        <>
        <h3>Selecione um gerador para iniciar uma conversa</h3>
        </>      
      }


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