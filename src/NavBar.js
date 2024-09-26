import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { MyColorContext, RateContexts, CoinContext } from "./contexts";
import { useContext } from "react";


export const A = () => {
    let theColor = useContext(MyColorContext);

    return (
        <><p className='colorText'><h1 className='colorContext' style={{ backgroundColor: theColor.theColor }}>שנה את גווני האתר</h1></p></>
    );
}

export const NavBar = ({ onCoinChange }) => {

    let color = useContext(MyColorContext);


    const handleColorChange = (e) => {
        const newColor = e.target.value;
        color.theFunc(newColor);

        const links = document.querySelectorAll('.overlay-navbar');
        links.forEach(link => {
            link.style.color = newColor;
            link.style.backgroundColor = 'rgb(255, 255, 255, 0.45)';
        });
    };

    return (
        <div class="navbar-container" >
            <br></br>

            <p className="contaxt">
                <input type="color" onChange={handleColorChange} />
            </p>

            {/* <input type="button" value={buttonText} className="coin" onClick={handleCoinChange} /> */}

            <input type="button" className="coin" value="הצג את האתר בדולרים/ בשקלים" onClick={onCoinChange} />
            
            <NavLink to="home" className="overlay-navbar" style={{ color: color.color }}>עמוד הבית</NavLink>
            <NavLink to="form" className="overlay-navbar" style={{ color: color.color }}>לתרומה</NavLink>
            <NavLink to="list" className="overlay-navbar" style={{ color: color.color }}>עמוד תורמים</NavLink>
        </div>
    )
}