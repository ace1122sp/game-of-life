import React from 'react';

const Buttons = ({reset, start, stop, timeLineStatus}) => {
  const tBtn = document.getElementById('timing-b');
  const clear = () => reset('clear')
  const random = () => reset('random')
  const timing = () => {
    if(timeLineStatus === 'inactive') {
      start();
      tBtn.innerText = 'stop';
    } else {
      stop();
      tBtn.innerText = 'run';
    }
  }
  return(
    <div className="buttons">
      <button key='1' id="timing-b" onClick={timing}>stop</button>
      <button key='2' id="random" onClick={random}>random</button>
      <button key='3' id="clear" onClick={clear}>clear</button>
    </div>
  );
}

export default Buttons;
