import "./ListPage.css";
import { NavBar } from "./NavBar";
import { FormPage } from "./FormPage";
import React, { useContext, useState, useEffect } from 'react';
import "./Sum.css";
import pic from "./files/pic.png";
import { RateContexts } from './contexts';



export const ListPage = ({ arrList }) => {
    const [sortedList, setSortedList] = useState(arrList);
    const [searchTerm, setSearchTerm] = useState("");

    // פונקציות מיון
    const sortByName = () => {
        const sorted = [...arrList].sort((a, b) => a.firstName.localeCompare(b.firstName));
        setSortedList(sorted);
    };

    const sortByHakdasha = () => {
        const sorted = [...arrList].sort((a, b) => (a.isAgree ? -1 : 1));
        setSortedList(sorted);
    };

    const filteredList = sortedList.filter(item => {
        return item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const Precent = () => {
        let p = 0;
        if (filteredList.length !== 0) {
            for (let index = 0; index < filteredList.length; index++) {
                p += +filteredList[index].schum || 0;
            }
        }
        return p;
    };

    let rate = useContext(RateContexts);

    // חישוב סכום התרומות
    const totalAmount = rate.currentCoin === "shekel" ? Precent() : Precent() / rate.dolar;

    useEffect(() => {
        const loadTicker = () => {
            const existingScript = document.getElementById("ticker-script");
            if (existingScript) {
                existingScript.remove();
            }

            const script = document.createElement("script");
            script.id = "ticker-script";
            script.type = "text/javascript";
            script.src = "https://bringthemhomenow.net/1.1.0/hostages-ticker.js";
            script.setAttribute(
                "integrity",
                "sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne"
            );
            script.setAttribute("crossorigin", "anonymous");
            document.head.appendChild(script);

            console.log("Ticker script added");
        };

        loadTicker();

        return () => {
            const script = document.getElementById("ticker-script");
            if (script) {
                script.remove();
            }
        };
    }, []);

    return (
        <div className="list">
            <br /><br /><br /><br />
            <p className="tytle1">עמוד התורמים</p>
            <br /><br />

            <div className="arrD">
                <table>
                    <thead>
                        <tr>
                            <th>שם התורמ/ת</th>
                            <th>סכום</th>
                            <th>הקדשה אישית</th>
                            <th>תאריך התרומה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.map((item, i) => (
                            <tr key={i}>
                                <td data-label="fullName">{item.firstName} {item.lastName}</td>
                                <td data-label="schum">{item.schum}</td>
                                <td data-label="hakdasha">{item.isAgree && <span>{item.hakdasha}</span>}</td>
                                <td data-label="submissionDate">לפני {new Date().getMinutes() - item.date} דקות</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br /><br /><br /><br />


            <button className="sort" onClick={sortByName}>מיון לפי שם</button>
            <button className="sort2" onClick={sortByHakdasha}>מיון לפי הקדשה</button>
            <input className="search" type="text" placeholder="חיפוש לפי שם..." onChange={(e) => setSearchTerm(e.target.value)} />
            <br /><br /><br /><br />

            <div className="details">
                <br />
                <h1 className="h">יעד הקמפיין: ₪1,000,000 </h1>
                <h1 className="numOfDonation">מספר התורמים: {arrList.length}</h1>
                <h1 className={`h ${totalAmount > 1000000 ? 'amount-high' : ''}`}>
                    סכום התרומות {rate.currentCoin === "shekel" ? `₪${totalAmount}` : `$${totalAmount.toFixed(2)}`}
                </h1>
                <h1 className="h">גוייסו %{((totalAmount) * 100) / 1000000} מהיעד</h1>
                <img src={pic} width={200} height={110} className="yellow"/>
            </div>

            <div className="bthn_list" id="bthn"></div>
        </div>
    );
};