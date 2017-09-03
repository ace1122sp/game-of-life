import React from 'react';
import Field from './Grid/Field.js';

const Grid = ({n, grid, ids, changeFieldStatus}) => {
  const fields = ids.map( (i) =>
    <Field key={i} changeFieldStatus={changeFieldStatus} id={i} s={grid[i].status} />
  );
  return(
    <div className="grid">
      {fields}
    </div>
  );
}

export default Grid;
