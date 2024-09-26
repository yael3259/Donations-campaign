import { createContext, useEffect, useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import { FormPage } from './FormPage';
import { ListPage } from './ListPage';
import { Sum } from "./Sum";
import { NavBar,A } from './NavBar';
import { MyColorContext, RateContexts, CoinContext } from './contexts';
import axios from 'axios';


export function App() {

  // useContext-צבעים
  let [selectC, setSelectC] = useState("gray");
  // const cangeColor = () => {
  //   setSelectC(selectC == "green" ? "pink" : "green")
  // }
  const cangeColor = (x) => {
    setSelectC(x);
  }

  // // // useContext-מטבע
  const [rate, setRate] = useState({ dolar: undefined, currentCoin: "shekel" });
  
  const changeCoin = () => {
    setRate(prevRate => ({
      ...prevRate,
      currentCoin: prevRate.currentCoin === "dolar" ? "shekel" : "dolar"
    }));
  };

  useEffect(() => {
    axios.get('https://v6.exchangerate-api.com/v6/a7bafd87a97945d7a1cc734ddf4b2066/latest/USD')
      .then(res => {
        setRate(prevRate => ({ ...prevRate, dolar: res.data.conversion_rates.ILS }));
      })
      .catch(error => {
        console.error("Error fetching exchange rate:", error);
      });
  }, []);


    // useEffect(() => {
    //   axios.get('boi.org.il/PublicApi/GetExchangeRate?key=USD').then(res => {
    //     // 'https://v6.exchangerate-api.com/v6/a7bafd87a97945d7a1cc734ddf4b2066/latest/USD'
    //     setRate({ ...rate, dolar: res.data.rates.ILS })
    //   })
    // }, []);


  // let [arr, setArr]=useState({d})
  let [arr, setArr] = useState([]);
  // let [arr, setArr] = useState([{ id: 9, name: "shimon", sum: 50, date: new Date(2022, 3, 19) }]);

  const addToArr = (newDonate) => {
    let copy = [...arr, newDonate];
    setArr(copy);
  }


  return (
    <>
      <MyColorContext.Provider value={{ theColor: selectC, theFunc: cangeColor }}>
        <NavBar />
        <A />
      </MyColorContext.Provider>

        <RateContexts.Provider value={rate}>
        <CoinContext.Provider value={{ rate, setRate }}>
        <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="form" element={<FormPage onAdd={addToArr} />} />
        <Route path="list" element={<ListPage arrList={arr} />} />

        <Route path="sum" element={<Sum arrSum={arr} />} />

        <Route path="navbar" element={<NavBar onCoinChange={changeCoin}/>} />

        <Route path="" element={<HomePage />} />
        <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: 150 }}>דף לא קיים</h1>} />
        </Routes>
        </CoinContext.Provider>
        </RateContexts.Provider>

    </>
  );
}

export default App;