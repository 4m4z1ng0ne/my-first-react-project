import './App.css';
import React,  { useState } from 'react';
import axios from 'axios';

import {usePlatform} from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [fact, setFact] = useState('');
  const platform = usePlatform();

  const fetchCatFact = async () => {
    const response = await axios.get('https://catfact.ninja/fact');
    setFact(response.data.fact);
  };

  const fetchAge = async () => {
    if (name) {
      const response = await axios.get(`https://api.agify.io/?name=${name}`);
      setAge(response.data.age);
    }
  };

  const validateName = (name: string) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (validateName(newName)) {
      setName(newName);
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(setTimeout(fetchAge, 3000));
    } else {
      console.log("Invalid name. Please enter a name that consists only of letters.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button onClick={fetchCatFact}>Get Cat Fact</button>
      <textarea value={fact} readOnly />
      <form onSubmit={(e) => { e.preventDefault(); fetchAge(); }}>
        <input type="text" value={name} onChange={handleNameChange} />
        <button type="submit">Submit</button>
      </form>
      {age && <p>Estimated Age: {age}</p>}
    </div>
  );
};

export default App;
