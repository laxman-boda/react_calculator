import React, { useContext } from 'react'
import { CalcContext } from './context/CalcContext'

const getStyleName = btn => {

 
    const className = {
        '=':'equals',
        'x':'opt',
        '-':'opt',
        '+':'opt',
        '/':'opt',

    }
    return className[btn]
}

const Button = ({value}) => {
  const {calc,SetCalc} = useContext(CalcContext)

  const commaClick = () => {
    SetCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
    })
  }
  const resetClick = () => {
    SetCalc({
      sign:'',
      num:0,
      res:0
    })
  }

  // User click click button

  const handleClickButton = () =>{
    const numberString = value.toString()

    let numberValue ;

    if(numberString === "0" && calc.num === 0) {
      numberValue = "0"
    } else {
      numberValue = Number(calc.num + numberString)
    }

    SetCalc({
      ...calc,
      num:numberValue
    })
  }

  // User Click Sign Button

  const signClick = () => {
    SetCalc({
      sign:value,
      res:!calc.res && calc.num ? calc.num : calc.res,
      num:0
    })
  }

  // User Clicks euqlas button
  
  
  const equalsClick = () => {
    if(calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          'x': (a, b) => a * b,
          '/': (a, b) => a / b,
        }
        return result[sign](a, b);
      }
      SetCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: '',
        num: 0
      })
    }

  }

  //User click Percentage Button 
  
const persnClick = () => {
  SetCalc({
    num:(calc.num / 100),
    res:(calc.res / 100),
    sign:''
  })
}

// User click invert button

const invertClick = () => {
  SetCalc({
    num:calc.num ? calc.num * -1 : 0,
    res:calc.res ? calc.res * -1 : 0,
    sign:''
  })
}
  const handleClick = () => {
    const results = {
      '.':commaClick,
      'C':resetClick,
      '/':signClick,
      'x':signClick,
      '+':signClick,
      '-':signClick,
      '=' :equalsClick,
      '%':persnClick,
      '+-':invertClick,
    }
    if(results[value]) {
      return results[value]()
    } else {
      return handleClickButton()
    }
  }
  return (
    <button className={`${getStyleName(value)} button`}
      onClick={handleClick}
    >
        {value}
    </button>
  )
}

export default Button