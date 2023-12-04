import React, { useState } from 'react';

function Test() {

    const uri = 'api/Test/ProcessString';
    const [inputString, setInputString] = useState('');

    const sendRequest = () => {
        fetch(uri, {
          params: {
            inputString: inputString
          }
        })
        .then(response => {
          console.log(inputString);
          console.log(response.data);
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