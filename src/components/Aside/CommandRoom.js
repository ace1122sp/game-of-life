import React from 'react';

class CommandRoom extends React.PureComponent {
  constructor(props) {
    super(props);
    this.speed = 'medium';
    this.s = this.props.genSpeed;
    this.changeSpeed = this.props.changeSpeed;
  }
  speedShow = () => {
    switch (this.s) {
      case 1000:
        this.speed = 'slow';
        break;
      case 400:
        this.speed = 'medium';
        break;
      case 70:
        this.speed = 'fast';
        break;
    }
  };
  leftSpeed = () => {
    switch (this.s) {
      case 1000:
        this.s = 70;
        break;
      case 400:
        this.s = 1000;
        break;
      case 70:
       this.s = 400;
       break;
    }
    this.speedShow();
    this.changeSpeed(this.s);
  }
  rightSpeed = () => {
    switch (this.s) {
      case 1000:
        this.s = 400;
        break;
      case 400:
        this.s = 70;
        break;
      case 70:
       this.s = 1000;
       break;
    }
    this.speedShow();
    this.changeSpeed(this.s);
  }

  render() {
    return(
      <div className="command-room">
        <label>speed</label>
        <button id="leftA" onClick={this.leftSpeed}>{'<'}</button>
        <label>{this.speed}</label>
        <button id="rightA" onClick={this.rightSpeed}>{'>'}</button>
      </div>
    );
  }
}
export default CommandRoom;
