import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import './App.css'
import Timer from './types/timer';
import TextGenerator from './types/textGenerator';


function App() {
  const [input, setInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0); // keep track of the current word to be written
  const [timer, setTimer] = useState<Timer| null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState<number>(60);
  const [wpm, setWpm] = useState<number>(0);
  const [textGenerator] = useState<TextGenerator>(new TextGenerator);
  const [text, setText] = useState<string[]>(textGenerator.text);
  
const calculateWpm = () => {
  const minutes = ((timer!.startTime) - (timer!.time)) / 60;
      setWpm(Math.round(score / minutes));
  
};

  const resetAll = async () =>{
    const newText = await textGenerator.makeText();
    setText(newText);
    console.log(newText)
    setScore(0);
    setWordCount(0);
    setInput('');
    timer?.reset() 
    //set all textColor to black
    text.forEach((word, index) => {
      const element = document.getElementById(`${word}-${index}`);
      if (element) {
        element.style.color = 'white';
      }
    });
  };

  useEffect(() => {
    if (!timer) {
      setTimer(new Timer()); // Initialize the timer only once
    }
  }, [timer]);

  useEffect(() => {
    if(timer?.time){
    calculateWpm();
  }
  },[time]);  

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        setTime(timer.time);
      }, 100);
      
      return () => clearInterval(interval);
    }
 
  }, [timer]);



  const compareInput = (input: string, word: string) => {
    const element = document.getElementById(`${word}-${wordCount}`);
    if(time>0){
      if (input === word) {
        setScore(score + 1);
        if (element) {
          element.style.color = 'green';
        }
      }
      else {
        element?.style.setProperty('color', 'red');
      }
    }
    if (wordCount === text.length - 1) {
      timer?.stopTimer();
      calculateWpm();
    }
  }
  const handleChange = (event:  React.ChangeEvent<HTMLInputElement> ) => {
    //this causes a bug if the user can complete the entire text in less than 1 secound. the timer automaticcally starts if the timer is inactive and time===60
    if (!timer?.active && time === timer?.startTime) {
      timer?.startTimer();
    }
    setInput(event.target.value.trim());
    if (timer?.active) calculateWpm();
    console.log(input);
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      // Do something when the space key is pressed
      setInput(input.substring(1, input.length - 1)); //there is a space at index 1 that must be removed
      compareInput(input, text[wordCount]);
      setWordCount(wordCount + 1);
      setInput('');
    }
  
  };
    return (
      <>
        <div>
          <div><h1>{time}</h1></div>
          <br />
          <div className='flex flex-wrap max-w-2xl mx-auto'>
            {text.map((word, index)=> {
          
              return <p 
              id={`${word}-${index}`}  // Set unique id with word and index for multiple similar words
              className='word' 
              key={index}
              >
              {word}
              </p>;
            })}
          </div>
          <br />
          <input 
            className='box-border border-1 p-1'
            ref={inputRef}
            type="text" 
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown} 
            />
            
        </div>
        <br />
        <button
          onClick={() => {resetAll()} }
          >
          Restart
        </button>
        <h1>
          wpm : {wpm}
        </h1>
      </>
    );
  }


export default App
