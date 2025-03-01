import { useEffect, useContext } from 'react';
import './HomePage.css';
import { NavLink } from 'react-router-dom';
import { MyColorContext } from "./contexts";
import { Sum } from "./Sum";


export const HomePage = () => {

  useEffect(() => {
    const loadTicker = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://bringthemhomenow.net/1.1.0/hostages-ticker.js";
      script.setAttribute(
        "integrity",
        "sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne"
      );
      script.setAttribute("crossorigin", "anonymous");
      document.getElementsByTagName("head")[0].appendChild(script);
    };

    // קריאה לפונקציה בעת ההתקנה
    loadTicker();
  }, []);

  return (
    <div className="HomePage">
      <br />
      <div className='image'>
        <img src='https://media4.giphy.com/media/3ohhwzIw3bISRhQWME/giphy.gif?cid=ecf05e47dadkyxrkbt3npdxe71z9imsdxgaa0oybntpbozfi&ep=v1_gifs_related&rid=giphy.gif&ct=s' className='gliders' height={562} width={880} alt="Gliders" />
        <img src='https://images.squarespace-cdn.com/content/v1/5e3578618a73ef3c81b55932/0840ac28-0807-4106-9d27-458b0dc14e2b/AdobeStock_454586489.png' className="pic_1" alt="Stock" />
        {/* <img src='./fils/hands.png' /> */}
      </div>

      <div className="text-container">
        <NavLink to="/form" className="overlay-text">לתרומה לחץ כאן</NavLink>
      </div>

      <div className="frame">
        <div className='caption'>
          <h1 className="yachad">יחד ננצח!</h1>
          <p className='blue'>מסייעים יחד לנפגעי המלחמה</p>
          <p className='red'>❤️‍🩹</p>
        </div>
      </div>
      <div id="bthn" lang="en"></div>
      <br />

    </div>
  );
}