import React, { useEffect, useState } from 'react'
import style from './Body.module.css'

const Body = () => {
  const [euraud, setEuraud] = useState('')
  const [eurusd, setEurusd] = useState('')
  const [eurgbp, setEurgbp] = useState('')
  const [eurbgn, setEurbgn] = useState('')
  const [counter, setCounter] = useState(1);
  const [increase, setIncrease] = useState(true)
  const [totalTime, setTotalTime] = useState(12 * 5)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('currencies.json')
      const json = await response.json()

      json.rates.AUD <= 1.0001 ? setEuraud(1.0001) : setEuraud((json.rates.AUD).toFixed(4))
      json.rates.USD <= 1.0001 ? setEurusd(1.0001) : setEurusd((json.rates.USD).toFixed(4))
      json.rates.GBP <= 1.0001 ? setEurgbp(1.0001) : setEurgbp((json.rates.GBP).toFixed(4))
      json.rates.BGN <= 1.0001 ? setEurbgn(1.0001) : setEurbgn((json.rates.BGN).toFixed(4))
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (counter < 13 && increase && totalTime > 0) {
      const increaseCounter = setInterval(() => {
        setCounter(counter + 1)
        console.log(counter);
        incr()
        setTotalTime(totalTime - 1)
        console.log('up')

      }, 1000);

      return () => {
        clearInterval(increaseCounter)
      }

    } else if (counter > 1 && totalTime > 0) {
      setIncrease(false)
      const decreaseCounter = setInterval(() => {
        setCounter(counter - 1)
        console.log(counter);
        decr()
        setTotalTime(totalTime - 1)
        console.log('down')
        if (counter == 2) {
          setIncrease(true)
        }
      }, 1000);

      return () => {
        clearInterval(decreaseCounter)
      }
    }
  })

  const incr = () => {
    setEuraud((Number(euraud) + 0.0001).toFixed(4))
    setEurusd((Number(eurusd) + 0.0001).toFixed(4))
    setEurgbp((Number(eurgbp) + 0.0001).toFixed(4))
    setEurbgn((Number(eurbgn) + 0.0001).toFixed(4))
  }

  const decr = () => {
    setEuraud((Number(euraud) - 0.0001).toFixed(4))
    setEurusd((Number(eurusd) - 0.0001).toFixed(4))
    setEurgbp((Number(eurgbp) - 0.0001).toFixed(4))
    setEurbgn((Number(eurbgn) - 0.0001).toFixed(4))
  }

  return (
    <div>
      <div>EURO / AUSTRALIAN DOLLAR</div>
      <div className={euraud}>{euraud}</div>
      <div>EURO / U.S. DOLLAR</div>
      <div className={eurusd}>{eurusd}</div>
      <div>URO / BRITISH POUND</div>
      <div className={eurgbp}>{eurgbp}</div>
      <div>EURO / BULGARIAN LEV</div>
      <div className={eurbgn}>{eurbgn}</div>
    </div>
  )
}

export default Body



// if (counter <= 20) {
//   const increaseRates = setInterval(() => {
//     incr()
//     console.log('up');
//   }, 1000);

//   return () => {
//     clearInterval(increaseRates)
//   }
// }