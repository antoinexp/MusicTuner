import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'
import Microphone from './backend/Microphone.js'

import NoteFlow from "./NoteFlow"

var data = undefined;


function App() {

  const [countTomato, setCountTomato] = useState(0);
  const [countApple, setCountApple] = useState(0);

  const appleWorker: Worker = new Worker('./freq_worker.js');

  appleWorker
    .postMessage({ msg: 'start' });

  useEffect(() => {
    appleWorker.onmessage = ($event: MessageEvent) => {
      if ($event && $event.data) {
        setCountApple($event.data);
      }
    };
  }, [appleWorker]);

  function incApple() {
    appleWorker
      .postMessage({ msg: 'incApple', countApple: countApple });
  }

  return (
    <div>
      <p>Tomato: {countTomato} | Apple: {countApple}</p>

      <div className="ion-padding-top">
        <button
          onClick={() => setCountTomato(countTomato + 1)}
          color="primary">Tomato</button>

        <button
          onClick={() => incApple()}
          color="secondary">Apple</button>
      </div>


      <NoteFlow />
    </div >
  );

}

export default App;
