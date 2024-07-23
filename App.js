import './App.css';
import Header from './tools/Header.js';
import Notch from './tools/Notch.js';
import BottomBar from './tools/BottomBar.js';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBVqcze1bVoYkhaPrIW8Wsgh2sNUc7fhkk",
  authDomain: "highclear-ca2cf.firebaseapp.com",
  projectId: "highclear-ca2cf",
  storageBucket: "highclear-ca2cf.appspot.com",
  messagingSenderId: "537654889221",
  appId: "1:537654889221:web:50d2d63f585dd3894c456c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const inquiryCollection = collection(db, 'inquiry');//inquiry 는 컬렉션 이름

const addQuestionToFirestore = async (question) => {       //question 은 필드 이름
  try {
    const timestamp = new Date().toISOString();
    const localTimestamp = new Date().toLocaleString()

    await addDoc(inquiryCollection, {
      question: question,
      timestamp: timestamp,
      localTimestamp: localTimestamp
    });
    console.log('Question added to Firestore!');
  } catch (error) {
    console.error('Error adding question to Firestore:', error);
  }
};




function App() {
  const [messages, setMessages] = useState([]);

  const handleQuestionSubmit = (question) => {
    setMessages((prevMessages) => [...prevMessages, question]);
    addQuestionToFirestore(question); // Firestore에 문의사항 추가
  };

  return (
    <div>
      <Notch theme='dark'></Notch>
      <Header theme='dark' back={true}></Header>
      <Content onQuestionSubmit={handleQuestionSubmit} messages={messages}></Content>
      <BottomBar></BottomBar>
    </div>
  );
}
function Content({ onQuestionSubmit,messages }) {
  const contentRef = React.createRef(); 
  
  useEffect(() => {
    contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }, [messages]);
  
  return (
    <div className='content' ref={contentRef}>
     <p className='title'>문의 사항</p>
     <p className='description'>
     <InquiryForm onQuestionSubmit={onQuestionSubmit} /> 
     {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
        ))}
    </p>
    
  </div>
  );
}

function InquiryForm({ onQuestionSubmit }) {
  
  const [inquiryText, setInquiryText] = useState('');

  const handleInputChange = (event) => {
    setInquiryText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onQuestionSubmit(inquiryText);
    setInquiryText('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        onQuestionSubmit(inquiryText);
        setInquiryText('');
    }
};

return (
  <div style={{ position: 'fixed', bottom: 70, left: 0, width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <textarea
        className='textInput'
        cols="20"
        placeholder="내용을 입력하세요"
        value={inquiryText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{ fontFamily: 'Noto Sans KR, sans-serif', fontSize: '16px', marginRight: '10px'}}
      ></textarea>
      <div
        style={{
          fontSize: '22px',
          position: 'absolute',
          right: '20px',
          bottom: '18px',
          backgroundColor: '#77D6B4',
          color: 'white',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleSubmit}
      >
        ⬆
      </div>
    </form>
  </div>
);

}

function MessageBubble({ message }) {
  const bubbleStyle={
    fontSize: '14px', 
    borderRadius: '30px', 
    backgroundColor: '#96DE98',
    color: 'black', 
    border: '1px solid #ddd', 
    padding: '10px', 
    margin: '10px',
    maxWidth: '80%',
    wordWrap: 'break-word',
    width: `${message.length * 15}px`,
  };
  return (
    <div style={bubbleStyle}>
      {message}
    </div>
  );
}

export default App;