import React, { Component } from 'react';

class Field extends Component {
  constructor(props) {
    super(props);
    this.changeFieldStatus = this.props.changeFieldStatus;
    this.id = this.props.id;
    this.s = this.props.s;
  }
  componentWillReceiveProps(nextProps) {
    if(this.s !== nextProps.s) this.s = nextProps.s;
  }
  changeStatus = () => {
    if(window.MOUSE) this.changeFieldStatus(this.id);
  }
  render() {
    return(
      <div className={'g-field ' + this.s} onClick={this.changeStatus}></div>
    );
  }
}


export default Field;
