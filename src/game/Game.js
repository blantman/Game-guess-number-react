import { useState } from 'react';
import './Game.css';

export function Game () {
  const [ isGuessed, setIsGuessed ] = useState(null);
  const [ attempts, setAttempts ] = useState(1);
  const [ number, setNumber ] = useState(getRandomNumber());
  const [ value, setValue ] = useState('');

  let promptText = 'Угадай число от 1 до 10!';
  let n = 'попыток';
  

  if (isGuessed)  {
    n = attempts > 1 ? ' попыток' : ' попытка' ;
    promptText = 'Правильно! Тебе понадобилось ' + attempts + n ;
  }
  
  else if (isGuessed === false) {
    promptText = value > number ? 'Слишком много ;(' : 'Слишком мало ;(';
  }

  function handleChange (e) { 
    setValue(e.target.value);
  } 

  function handleClick () {
    setIsGuessed(value == number);
    setAttempts(attempts + 1);
  }

  function handleRestart () {
    setIsGuessed(null);
    setAttempts(1);
    setNumber(getRandomNumber());
    setValue('');
  }

  let cta = (
    <div className="info"> 
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleClick} disabled={!value || isNaN(+value)}>OK!</button>
    </div> 
  );

  if (isGuessed) {
    cta = <button onClick={handleRestart}>Play agin</button>
  }

  return (
    <div className="title">
      <h1>{promptText}</h1>
      {cta}
    </div>
  )
}

function getRandomNumber () {
  return Math.ceil(Math.random() * 10);
}