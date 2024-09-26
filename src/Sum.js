import "./Sum.css";


export const Sum = ({ arrSum }) => {

    console.log(arrSum);
    const Precent = () => {
        let p = 0;
        let oneArray = 0;

        if (arrSum.length !== 0) {
            for (let index = 0; index < arrSum.length; index++) {
                oneArray = arrSum[index];
                p += +(oneArray.schum) || 0;
            }
        }
        return p;
    }

    return (
        <div className="details">
            <h1 className="h">יעד הקמפיין: ₪1,000,000 </h1>
            <h1 className="numOfDonation">מספר התורמים: {arrSum.length}</h1>
            <h1 className="h">סכום התרומות {Precent(arrSum)}</h1>
            <h1 className="h">גוייסו %{(Precent(arrSum)) * 0.1000000} מהיעד</h1>
            {/* <div className="h">{
            arrSum.map((item,i) => <div key={i}><h2>{item.lastName}</h2> <h2>{item.hakdasha}</h2></div> )
            }
            </div> */}
            <h1></h1>
        </div>
    )
}