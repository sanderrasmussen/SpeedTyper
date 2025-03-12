import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import './App.css'
import Timer from './types/timer';

function App() {
  const [input, setInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0); // keep track of the current word to be written
  const [timer, setTimer] = useState<Timer| null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState<number>(60);
  const [wpm, setWpm] = useState<number>(0);

  const text: string[] = [
    "apple", "banana", "cherry", "dragon", "elephant",
    "forest", "guitar", "hammer", "island", "jungle",
    "kitten", "lemon", "mountain", "notebook", "ocean",
    "pencil", "quartz", "river", "shadow", "tiger",
    "umbrella", "violet", "whisper", "xylophone", "yellow",
    "zebra", "bridge", "castle", "desert", "emerald",
    "fountain", "glacier", "horizon", "ivory", "jasmin",
    "kingdom", "lantern", "meadow", "nest", "orchid",
    "prairie", "quilt", "rainbow", "stream", "thunder",
    "valley", "willow", "xenon", "yogurt", "zephyr",
    "anchor", "beacon", "canyon", "dolphin", "eagle",
    "falcon", "garden", "harbor", "igloo", "jacket",
    "koala", "lizard", "magnet", "noodle", "oasis",
    "pebble", "quest", "rocket", "saddle", "tunnel",
    "vortex", "wagon", "xerox", "yarn", "zipper",
    "boulder", "cricket", "daisy", "engine", "feather",
    "giraffe", "hollow", "insect", "jewel", "kettle",
    "ladder", "mosaic", "needle", "oxygen", "parrot",
    "riddle", "spider", "trumpet", "velvet", "window"
];
  const calculateWpm = () => {
// Calculate time used in minutes
const currentTime = timer && timer.active ? Date.now() : (timer ? timer.startTime + (60 * 1000) : 0);
const timeUsedInMs = timer ? currentTime - timer.startTime : 0;
const timeUsedInMinutes = timeUsedInMs / 1000 / 60; // Convert ms to minutes

// WPM = (words typed / time in minutes)
const calculatedWpm = timeUsedInMinutes > 0 
  ? Math.round(wordCount / timeUsedInMinutes) 
  : 0;

  setWpm(calculatedWpm);
    console.log(wpm);
  }

  const resetAll = () =>{
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
  }, [timer, time]);

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        setTime(timer.time);
        if (timer.active) calculateWpm();
      }, 100);
      calculateWpm();
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
  }
  const handleChange = (event:  React.ChangeEvent<HTMLInputElement> ) => {
    if (timer?.active === false && time > 0) {
      timer?.startTimer();
    }
    setInput(event.target.value.trim());
    
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
          <div><p>{time}</p></div>
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
          <input 
            className='box-border border-1 p-1'
            ref={inputRef}
            type="text" 
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown} 
            />
            
        </div>
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
