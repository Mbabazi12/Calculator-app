import React, { useEffect, useState } from "react";
import './App.css';
import './index.css';
import Toggle from "./components/toggle";
import useLocalStorage from "use-local-storage";


function App() {
 const [value, setValue] = useState('');
 const [currentOperator, setCurrentOperator] = useState<string | null>(null);
 const [firstOperand, setFirstOperand] = useState<number | null>(null);
 const [secondOperand, setSecondOperand] = useState<number | null>(null);

 useEffect(() => {
  const screenElement = document.getElementById('screen') as HTMLInputElement;
  if (screenElement) {
     screenElement.value = value;
  }
 }, [value]);
 

 const enterNum = (number: string | number) => {
    if (typeof number === 'number') {
      setValue(prev => prev + number.toString());
    } else if (number === '=') {
      if (currentOperator && firstOperand !== null) {
        let result: number;
        switch (currentOperator) {
          case '+':
            result = firstOperand + Number(value);
            break;
          case '-':
            result = firstOperand - Number(value);
            break;
          case 'x':
            result = firstOperand * Number(value);
            break;
          case '/':
            result = firstOperand / Number(value);
            break;
          default:
            result = 0;
        }
        setValue(result.toString());
        setFirstOperand(null);
        setSecondOperand(null);
        setCurrentOperator(null);
      }
    } else {
      if(typeof number === "string"){
        if (number === '.' && !value.includes('.')) {
          setValue(prev => prev + number);
        } else {
        setCurrentOperator(number);
        setFirstOperand(parseFloat(value));
        setValue('');
      }
    }
  }
 };

 const [isWhite, setIsWhite] = useState(false);

 return (
    <div className="body" data-theme={isWhite ? "second" : "first"}>
      <div className="calc">
        <div className="title">
          <h3 className="head">calc</h3>
        </div>
        <div className="togle">
          <Toggle
            isChecked={isWhite}
            handleChange={() => setIsWhite(!isWhite)}
          />
        </div>
        <form name="calc">
          <div className="screen">
            <input type="text" name="number" id="screen" readOnly />
          </div>
        </form>
        <div className="cal-body">
          <div className="btn">
            <div className="but">
              <button onClick={() => enterNum(7)}>7</button>
              <button onClick={() => enterNum(8)}>8</button>
              <button onClick={() => enterNum(9)}>9</button>
            </div>
            <div className="del"><button onClick={() => setValue(value.slice(0, -1))}>DEL</button></div>
            <div className="but">
              <button onClick={() => enterNum(4)}>4</button>
              <button onClick={() => enterNum(5)}>5</button>
              <button onClick={() => enterNum(6)}>6</button>
              <button onClick={() => enterNum('+')}>+</button>
              <button onClick={() => enterNum(1)}>1</button>
              <button onClick={() => enterNum(2)}>2</button>
              <button onClick={() => enterNum(3)}>3</button>
              <button onClick={() => enterNum('-')}>-</button>
              <button onClick={() => enterNum('.')}>.</button>
              <button onClick={() => enterNum(0)}>0</button>
              <button onClick={() => enterNum('/')}>/</button>
              <button onClick={() => enterNum('x')}>x</button>
            </div>
          </div>
          <div className="last">
            <div className="reset">
              <button className="reset" onClick={() => {
                setValue('');
                setFirstOperand(null);
                setSecondOperand(null);
                setCurrentOperator(null);
              }}>RESET</button>
            </div>
            <div className="equal">
              <button onClick={() => enterNum('=')}>=</button>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
}

export default App;







// const themes = ["first", "second", "third"];
// const [theme, setTheme] = useLocalStorage("theme", themes[0]);
// const toggleTheme = () => {
//  const currentIndex =themes.indexOf(theme);
//  const nextIndex = (currentIndex + 1) % themes.length;
//  setTheme(themes[nextIndex]);
// };

// useEffect(() =>{
//  document.documentElement.setAttribute("data-theme", theme);
// })

// return (
//    <div className="body" data-theme={theme}>
//      <div className="calc">
//        <div className="title">
//          <h3 className="head">calc</h3>
//        </div>
//        <div className="togle">
//          <Toggle
//            isChecked={theme === "second"}
//            handleChange={toggleTheme}
//          />
//        </div>