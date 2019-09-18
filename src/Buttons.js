import React, { useContext } from 'react';
import { CalculatorContext } from './calculatorContext';

const Buttons = () => {
  const [state, setState] = useContext(CalculatorContext);

  const handleNum = e => {
    // Clear display and equation if starting from initial value or after evaluated
    // Dont allow zeroes at beginning of equation
    if (
      (state.display === '0' && e.target.value !== '0') ||
      state.lastClicked === '='
    ) {
      clearDisplay();
      clearEquation();
      setState(prevState => ({
        ...prevState,
        display: e.target.value,
        equation: e.target.value,
        lastClicked: e.target.value
      }));
    }
    // If decimal point is entered and there is not already a decimal point in the number
    // Append the decimal to the number on the display and equation
    else if (e.target.value === '.' && state.display.indexOf('.') === -1) {
      setState(prevState => ({
        ...prevState,
        display: prevState.display + e.target.value,
        equation: prevState.equation + e.target.value,
        lastClicked: e.target.value
      }));
    }
    // Don't allow zeroes at beginning of number after an operator
    else if (
      (state.lastClicked === '+' ||
        state.lastClicked === '*' ||
        state.lastClicked === '/' ||
        state.lastClicked === '-') &&
      e.target.value === '0'
    ) {
      setState(prevState => ({
        ...prevState
      }));
    }
    // If calculator is not in initial value and value is not a decimal
    //  When number is entered append the number to the rest of the equation and display
    else if (e.target.value !== '.' && state.display !== '0') {
      setState(prevState => ({
        ...prevState,
        display: prevState.display + e.target.value,
        equation: prevState.equation + e.target.value,
        lastClicked: e.target.value
      }));
    }
    // Removes synthetic event from the pool and allow references to the event to be retained by user code
    e.persist();
  };

  const handleOperator = e => {
    // If operator is entered when Calculator is in it's initial value
    if (state.display === '0' || state.equation === '0') {
      clearDisplay();
      clearEquation();
      setState(prevState => ({
        ...prevState,
        display: e.target.value,
        equation: e.target.value,
        lastClicked: e.target.value,
        operators: 1
      }));
    }
    // If an equation was just evaluated only clear the display so operators can be performed on
    // previous equation's result
    else if (state.lastClicked === '=') {
      clearDisplay();
      setState(prevState => ({
        ...prevState,
        display: e.target.value,
        equation:
          prevState.equation.substring(
            prevState.equation.indexOf('=') + 1,
            prevState.equation.length
          ) + e.target.value,
        lastClicked: e.target.value,
        operators: 1
      }));
      // If a subtraction/negative operator is entered and lastClicked is not a subtraction/negative operator
      // Append the subtraction/negative operator to the first operator
    } else if (
      e.target.value === '-' &&
      (state.lastClicked === '+' ||
        state.lastClicked === '*' ||
        state.lastClicked === '/')
    ) {
      clearDisplay();
      setState(prevState => ({
        ...prevState,
        equation: prevState.equation + e.target.value,
        display: e.target.value,
        lastClicked: e.target.value,
        operators: 2
      }));
    }
    // If 2 or more operators are entered consecutively, the operation performed should be the last operator entered
    else if (
      state.lastClicked === '-' &&
      state.operators === 2 &&
      e.target.value !== '-'
    ) {
      clearDisplay();
      setState(prevState => ({
        ...prevState,
        equation:
          prevState.equation.substring(0, prevState.equation.length - 2) +
          e.target.value,
        display: e.target.value,
        lastClicked: e.target.value
      }));
    }
    // If an operator is entered after another operator (excluding negative sign)
    // Remove last operator and append the current operator
    else if (
      (e.target.value === '+' ||
        e.target.value === '*' ||
        e.target.value === '/') &&
      (state.lastClicked === '+' ||
        state.lastClicked === '*' ||
        state.lastClicked === '/' ||
        state.lastClicked === '-')
    ) {
      clearDisplay();
      setState(prevState => ({
        ...prevState,
        equation:
          prevState.equation.substring(0, prevState.equation.length - 1) +
          e.target.value,
        display: e.target.value,
        lastClicked: e.target.value,
        operators: 1
      }));
    }
    // Append operator straight to the display/equation if lastClicked is not an operator
    else if (
      (e.target.value === '+' ||
        e.target.value === '*' ||
        e.target.value === '/' ||
        e.target.value === '-') &&
      (state.lastClicked !== '+' &&
        state.lastClicked !== '*' &&
        state.lastClicked !== '/' &&
        state.lastClicked !== '-')
    ) {
      clearDisplay();
      setState(prevState => ({
        ...prevState,
        equation: prevState.equation + e.target.value,
        display: e.target.value,
        lastClicked: e.target.value,
        operators: 1
      }));
    }
    // Removes synthetic event from the pool and allow references to the event to be retained by user code
    e.persist();
  };
  const handleEval = e => {
    // If equation ends with an operator, remove it from the equation before evaluating
    let trimmedEquation = '';
    if (
      (state.equation.endsWith('+-') ||
        state.equation.endsWith('*-') ||
        state.equation.endsWith('/-')) &&
      state.lastClicked != '=' &&
      state.equation != '.' &&
      state.equation != '+' &&
      state.equation != '-' &&
      state.equation != '/' &&
      state.equation != '*'
    ) {
      trimmedEquation = state.equation.substring(0, state.equation.length - 2);
      setState(prevState => ({
        ...prevState,
        equation: `${trimmedEquation} = ${eval(trimmedEquation)}`,
        display: eval(trimmedEquation),
        lastClicked: e.target.value
      }));
    } else if (
      (state.equation.endsWith('+') ||
        state.equation.endsWith('-') ||
        state.equation.endsWith('*') ||
        state.equation.endsWith('/')) &&
      state.lastClicked != '=' &&
      state.equation != '.' &&
      state.equation != '+' &&
      state.equation != '-' &&
      state.equation != '/' &&
      state.equation != '*'
    ) {
      trimmedEquation = state.equation.substring(0, state.equation.length - 1);
      setState(prevState => ({
        ...prevState,
        equation: `${trimmedEquation} = ${eval(trimmedEquation)}`,
        display: eval(trimmedEquation),
        lastClicked: e.target.value
      }));
    } else if (
      state.lastClicked != '=' &&
      state.equation != '.' &&
      state.equation != '+' &&
      state.equation != '-' &&
      state.equation != '/' &&
      state.equation != '*'
    ) {
      setState(prevState => ({
        ...prevState,
        equation: `${prevState.equation} = ${eval(prevState.equation)}`,
        display: eval(prevState.equation),
        lastClicked: e.target.value
      }));
    }
    // Removes synthetic event from the pool and allow references to the event to be retained by user code
    e.persist();
  };

  const clearDisplay = () => {
    setState(prevState => ({ ...prevState, display: '0' }));
  };
  const clearEquation = () => {
    setState(prevState => ({ ...prevState, equation: '0' }));
  };
  const onClear = () => {
    clearDisplay();
    clearEquation();
  };
  return (
    <div className="buttons">
      <button id="clear" value="AC" onClick={onClear}>
        AC
      </button>
      <button id="divide" value="/" onClick={handleOperator}>
        /
      </button>
      <button id="multiply" value="*" onClick={handleOperator}>
        *
      </button>
      <button id="seven" value="7" onClick={handleNum}>
        7
      </button>
      <button id="eight" value="8" onClick={handleNum}>
        8
      </button>
      <button id="nine" value="9" onClick={handleNum}>
        9
      </button>
      <button id="subtract" value="-" onClick={handleOperator}>
        -
      </button>
      <button id="four" value="4" onClick={handleNum}>
        4
      </button>
      <button id="five" value="5" onClick={handleNum}>
        5
      </button>
      <button id="six" value="6" onClick={handleNum}>
        6
      </button>
      <button id="add" value="+" onClick={handleOperator}>
        +
      </button>
      <button id="one" value="1" onClick={handleNum}>
        1
      </button>
      <button id="two" value="2" onClick={handleNum}>
        2
      </button>
      <button id="three" value="3" onClick={handleNum}>
        3
      </button>
      <button id="zero" value="0" onClick={handleNum}>
        0
      </button>
      <button id="decimal" value="." onClick={handleNum}>
        .
      </button>
      <button id="equals" value="=" onClick={handleEval}>
        =
      </button>
    </div>
  );
};

export default Buttons;
