import React, { useContext } from 'react';
import { CalculatorContext } from '../context/calculatorContext';

const Display = () => {
  const [state] = useContext(CalculatorContext);
  return (
    <div id="current">
      <div id="equation">{state.equation}</div>
      <div id="display">{state.display}</div>
    </div>
  );
};
export default Display;
