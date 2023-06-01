import React, { useEffect, useRef, useState } from 'react'
import { connectionChat } from '../../../utils/chatConnection'
import styled from "styled-components";
import ChatInput from './ChatInput';
import {v4 as uuidv4} from 'uuid'

export default function ChatContainer ({currentChat}) {
  connectionChat.connect()

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
          localStorage.getItem('id_chat')
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const mode = localStorage.getItem('tipo')


  const handleSendMsg = async (msg: string) => {
    const data = localStorage.getItem('token')
    
    connectionChat.emit("send-msg", {
      to: mode == 'Gerador' ? currentChat.catador.user.id : currentChat.gerador.user.id,
      from: data,
      msg,
    });
    await fetch('https://zero-waste-chat.azurewebsites.net/message', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + data
      },
      body: JSON.stringify({
        to: mode == 'Gerador' ? currentChat.catador.user.id : currentChat.gerador.user.id,
        message: msg,
      }),
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    const data = localStorage.getItem('token')
    fetch(`${mode == 'Gerador' ? `https://zero-waste-chat.azurewebsites.net/message/${currentChat.catador.id_usuario}` : `https://zero-waste-chat.azurewebsites.net/message/${currentChat.gerador.id_usuario}`}`, {
      headers: {
        'Authorization': 'Bearer ' + data
      }
    }).then(response => response.json()).then(resposta => {
      const msg = []
      resposta.map(item => {
        msg.push({fromSelf: item.from == localStorage.getItem('id') ? true : false, message: item.message.text})
      })
      setMessages(msg)
    }).catch(() => setMessages([]))
  }, [currentChat])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
      connectionChat.on("msg-recieve", (msg) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    
  }, []);


  return (
    <>
      <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`${mode == 'Gerador' ? currentChat.catador.user.foto : currentChat.gerador.user.foto}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{mode == 'Gerador' ? currentChat.catador.user.email : currentChat.gerador.user.email}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    </>
  )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  grid-template-rows: 15% 70% 15%;
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
}
.chat-messages {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
}
`;