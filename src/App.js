import React from 'react';
import Display from './Display';
import Buttons from './Buttons';
import { CalculatorProvider } from './calculatorContext';
import './App.scss';

const App = () => {
  return (
    <CalculatorProvider>
      <div className="App">
        <div className="container">
          <Display />
          <Buttons />
        </div>
        <div className="author">
          {' '}
          Designed and Coded by
          <br />
          Ian Benton
        </div>
      </div>
    </CalculatorProvider>
  );
};

export default App;
