import React, { useState, createContext } from 'react';

export const CalculatorContext = createContext([{}, () => {}]);

export const CalculatorProvider = props => {
  const [state, setState] = useState({
    display: '0',
    equation: '0',
    lastClicked: '',
    operators: 0
  });

  return (
    <CalculatorContext.Provider value={[state, setState]}>
      {props.children}
    </CalculatorContext.Provider>
  );
};
