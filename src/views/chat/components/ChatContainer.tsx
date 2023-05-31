import React, { useState } from 'react'
import { connectionChat } from '../../../utils/chatConnection'
import styled from "styled-components";

const ChatContainer = () => {
  connectionChat.connect()

  const [messages, setMessages] = useState([]);

  const [currentChat, setCurrentChat] = useState(0)


  return (
    <>
      <Container>
        <div className='chat-container'></div>
      </Container>
    </>
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
  .chat-container {
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

export default ChatContainer