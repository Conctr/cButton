import React from 'react';
import './Spinner.css';

function Spinner() {
  return (
    <div className="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default Spinner;