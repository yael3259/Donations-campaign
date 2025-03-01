import { useEffect } from "react";



const TickerScript = () => {
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

    return null;
};

export default TickerScript;
