import React from 'react';
import Buttons from './Aside/Buttons.js';
import Semafors from './Aside/Semafors.js';
import CommandRoom from './Aside/CommandRoom.js';

const showBtns = () => {
  const elem = document.querySelector('.buttons');
  if(window.MOUSE) {
    elem.style.opacity = 1;
    window.setTimeout(() => {
      elem.style.opacity = 0;
    }, 2000);
  }
}

const setVisible = () => {
  const elem = document.querySelector('.buttons');
  if(!window.MOUSE) elem.style.opacity = 1;
}

const Aside = ({reset, generation, start, stop, timeLineStatus, genSpeed, changeSpeed}) => {
  return(
    <div className="aside" onMouseMove={showBtns} onLoad={setVisible}>
      <Semafors generation={generation} />
      <CommandRoom genSpeed={genSpeed} changeSpeed={changeSpeed}/>
      <Buttons timeLineStatus={timeLineStatus} reset={reset} start={start} stop={stop}/>
    </div>
  );
}

export default Aside;
