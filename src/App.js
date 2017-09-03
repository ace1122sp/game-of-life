import React, { Component } from 'react';
import Header from './components/Header.js';
import Grid from './components/Grid.js';
import Aside from './components/Aside.js';
import SourceGitHub from './components/SourceGitHub.js';

window.addEventListener('mousemove', function onFirstTouch() {
  window.MOUSE = true;
  window.removeEventListener('mousemove', onFirstTouch);
}, false);
const getNeighbours = (grid, id, n) => {
  const coords = grid[id].coords;
  const first = 1;
  const last = n;
  const r = coords[0];
  const c = coords[1];
  let minR, plusR, minC, plusC;

  minR = r - 1;
  plusR = r + 1;
  minC = c - 1;
  plusC = c + 1;

  if(r === last) {
    plusR = first;
  } else if(r === first) {
    minR = last;
  }

  if(c === last) {
    plusC = first;
  } else if(c === first) {
    minC = last;
  }

  const nOne = [minR, minC].join('%');
  const nTwo = [minR, c].join('%');
  const nThree = [minR, plusC].join('%');
  const nFour = [r, minC].join('%');
  const nFive = [r, plusC].join('%');
  const nSix = [plusR, minC].join('%');
  const nSeven = [plusR, c].join('%');
  const nEight = [plusR, plusC].join('%');
  const neighbours = [nOne, nTwo, nThree, nFour, nFive, nSix, nSeven, nEight];
  return neighbours;
}
const createGridField = (id) => {
  const coordsArr = id.split('%');
  const r = parseInt(coordsArr[0]);
  const c = parseInt(coordsArr[1]);
  const coords = [r, c];
  const gField = {
    status: 'D',
    neighbours: [],
    coords,
  }
  return gField;
}
const createGrid = (n) => {
  let grid = {};
  let ids = [];
  for(let r = 1; r < n + 1; r++) {
    for(let c = 1; c < n + 1; c++) {
      let id = [r, c].join('%');
      grid[id] = createGridField(id);
      ids.push(id);
    }
  }
  ids.forEach( (id) => {
    let neighbours = getNeighbours(grid, id, n);
    grid[id].neighbours = neighbours;
  });
  const res = [[...ids], {...grid}];
  return res;
}
const shortGrid = (ids) => {
  let shortGrid = {};
  const count = ids.length;
  for(let i = 0; i < count; i++) {
    shortGrid[ids[i]] = {status: 'D', population: 0};
  }
  return {grid: {...shortGrid}};
}
const randomStatus = () => {
  const d = 'D';
  const l = 'L';
  const b = 'B';
  let status;
  const s = Math.ceil((Math.random() * 3));
  switch (s) {
    case 1:
      status = d;
      break;
    case 2:
      status = l;
      break;
    case 3:
      status = b;
      break;
  }
  return status;
}

class App extends Component {
    constructor() {
      super();
      this.state = {
        grid: {},
        generation: 0,
        timeLineStatus: 'inactive',
        genSpeed: 400
      };
      this.ids = [];
      this.grid = {};
      this.n = 50;
    }
    componentWillMount() {
      const idsAndGrid = createGrid(this.n);
      this.ids = [...idsAndGrid[0]];
      this.grid = {...idsAndGrid[1]};
      this.setState(shortGrid(this.ids));
    }
    componentDidMount() {
      this.reset('random');
      this.generating();
    }
    calcPopulation(grid, id) {
      let sum = 0;
      let i = 0;
      const neighbours = [...this.grid[id].neighbours];
      while(sum < 4 && i < 8) {
        if(grid[neighbours[i]].status === 'B' || grid[neighbours[i]].status === 'L') sum++;
        i++;
      }
      return sum;
    }
    stop() {
      clearInterval(this.intervalID);
      this.setState({timeLineStatus: 'inactive',});
      document.getElementById('leftA').style.visibility = 'visible';
      document.getElementById('rightA').style.visibility = 'visible';
    }
    updateStatus(grid, id) {
      const population = this.calcPopulation(grid, id);
      const currentStatus = grid[id].status;
      let status;
      if(population < 2 || population > 3) {
        status = 'D';
      } else if(currentStatus === 'D' && population === 3) {
        status = 'B';
      } else if(currentStatus === 'B') {
        status = 'L';
      } else {
        status = currentStatus;
      }
      return status;
    }
    changeFieldStatus(id) {
      if(this.state.timeLineStatus === 'inactive') {
        let grid = {...this.state.grid};
        grid[id].status = 'B';
        this.setState({grid: {...grid}});
      }
    }
    updateGrid() {
      let grid = JSON.parse(JSON.stringify(this.state.grid));
      const noChangeGrid = JSON.parse(JSON.stringify(this.state.grid));
      const generation = this.state.generation + 1;
      for(let id in grid) {
        grid[id].status = this.updateStatus(noChangeGrid, id);
      }
      this.setState({grid: {...grid}, generation,});
    }
    generating() {
      const s = this.state.genSpeed;
      this.intervalID = window.setInterval(this.updateGrid.bind(this), s);
      this.setState({timeLineStatus: 'active',});
      document.getElementById('leftA').style.visibility = 'collapse';
      document.getElementById('rightA').style.visibility = 'collapse';
    }
    reset(command) {
      if(this.state.timeLineStatus === 'inactive') {
          let grid = {...this.state.grid};
          const ids = [...this.ids];
          const count = ids.length;
          let action;
          if(command === 'random') {
            action = () => randomStatus()
          } else if(command === 'clear') {
            action = () => 'D'
          }
          for(let i = 0; i < count; i++) {
            let id = ids[i];
            grid[id].status = action();
          }
          this.setState({grid: {...grid}, generation: 0});
      }
    }
    changeSpeed(speed) {
      if(this.state.timeLineStatus === 'inactive') {
        this.setState({genSpeed: speed,});
      }
    }
    render(){
      return(
        <div className="body">
          <Header />
          <div className="cont">
            <SourceGitHub />
            <Grid n={this.n} changeFieldStatus={this.changeFieldStatus.bind(this)} ids={this.ids} grid={this.state.grid} />
            <Aside changeSpeed={this.changeSpeed.bind(this)} genSpeed={this.state.genSpeed} timeLineStatus={this.state.timeLineStatus} start={this.generating.bind(this)} stop={this.stop.bind(this)} reset={this.reset.bind(this)} generation={this.state.generation}/>
          </div>
        </div>
      );
    }
}

export default App;
