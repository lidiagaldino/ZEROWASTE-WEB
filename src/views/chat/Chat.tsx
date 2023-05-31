import React, { useState } from 'react'
import MenuLateral from '../home/components/MenuLateral'
import Contacts from './components/Contacts'
import styled from 'styled-components'
import Welcome from './components/Welcome'

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(undefined);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <body>
      <div style={{ display: 'flex' }}>
        <div>
          <MenuLateral />
        </div>
        <Container>
          <div className='container-do-chat'>
            <Contacts changeChat={handleChatChange}></Contacts>
            <Welcome></Welcome>
          </div>

        </Container>
      </div>
    </body>
  )
}



const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #DEF6D8;
  .container-do-chat {
    height: 85vh;
    width: 85vw;
    background-color: green;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat