import './App.css';
import React, { useState } from 'react';
// import { json } from 'body-parser';
// import { response } from 'express';

function App() {

  const [input,setInput]=useState("");
  const [chatlog,setChatLog]=useState([
  ]);

  function claearchat(){
    setChatLog([]);
  }

   async function handlesubmit(e) {
    e.preventDefault()
    let ChatLognew=[...chatlog,{ user:"me",message:`${input}`}];
     setInput("");
    //  setChatLog([ChatLognew])
    const messages=ChatLognew.map((message)=>message.message).join("");
    const response = await fetch("http://localhost:3080/",
    {
      method:"POST",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({
        message:messages
      })

    }
    );
    const data= await response.json();
    setChatLog([...ChatLognew,{ user:"gpt",message:`${data.message}`}])
    console.log(data.message);
  }
  return (
    <div className="App">
    <aside className="sidemenu" >
      <div className='newbutton' onClick={claearchat}> + new chat</div>
    </aside>
    <section className="mainmenu">
      <div className='chat-log'>
        {
          chatlog.map((message,index)=>(
            <ChatMessage key={index} message={message}/>

          ))
        }
      
        
      </div>
    <div className='chat-holder'>
      <form onSubmit={handlesubmit}>
      <input required type="text" value={input} onChange={(e)=> setInput(e.target.value)}  row="1" className='chat-input' placeholder='enter ur peoblem'></input>
      </form>
    
    </div>
    </section>
    </div>
  );
}

const ChatMessage=({message})=>{
  return(
    <div className={`chat-message ${message.user ==="gpt" && "chatgpt"}`}>
    {/* <div className={`avathar ${message.user ==="gpt" && "chatgpt"}`}>

    </div> */}
    <div className='message'>
      {message.message}

    </div>

  </div>
  )
}

export default App;
