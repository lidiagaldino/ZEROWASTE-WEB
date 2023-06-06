import React, { useState } from 'react'
import MenuLateral from '../home/components/MenuLateral'
import Contacts from './components/Contacts'
import styled from 'styled-components'
import Welcome from './components/Welcome'
import ChatContainer from './components/ChatContainer'
import { connectionChat } from '../../utils/chatConnection'

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(undefined);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  connectionChat.on("msg-recieve", (msg) => {
    console.log(msg);
  });

  console.log(currentChat);
  return (
    <body>
      <div style={{ display: 'flex' }}>
        <div>
          <MenuLateral />
        </div>
        <Container>
          <div className='container-do-chat'>
            <Contacts changeChat={handleChatChange}></Contacts>
            {currentChat === undefined ? 
              <Welcome></Welcome> :
              <ChatContainer currentChat={currentChat}></ChatContainer>
          }
            
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
    border-radius: 15px;
    height: 85vh;
    width: 85vw;
    background-color: green;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  .ftiPHt {
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: rgb(8, 4, 32);
    border-radius: 15px 0px 0px 15px;
}
.ftiPHt .contacts {
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  border-radius: 20px;
}

.imaFcA .chat-header {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 2rem;
  
}

.ftiPHt .contacts .contact .avatar img {
border: 10px red;
border-radius: 50%;
max-height: 60px;
max-width: 60px;
}

.eTdZnv .chat-header .user-details .avatar img {
  border-radius: 50%;
  max-height: 60px;
max-width: 60px;
}


`;

export default Chat