import React, { useState } from 'react';
import axios from 'axios';

function Test() {
  const [inputString, setInputString] = useState('');

  const sendRequest = () => {
    axios.get('https://localhost:7106/api/Test/ProcessString', {
      params: {
        inputString: inputString
      }
    })
    .then(response => {
      console.log(response.data); // обработка полученного ответа от сервера
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });
  }

  return (
    <div>
      <input type="text" value={inputString} onChange={(e) => setInputString(e.target.value)} />
      <button onClick={sendRequest}>Отправить запрос</button>
    </div>
  );
}

export default Test;