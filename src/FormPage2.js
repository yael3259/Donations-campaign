import { useContext, useState } from "react";
import "./FormPage.css";
import { NavBar } from "./NavBar";
import { MyColorContext } from "./contexts";
import { useForm } from "react-hook-form";



// useContext-צבעים
export const E = () => {

    let color = useContext(MyColorContext);
    return (
        <>
            {/* <h1><input type="button" value={"שנה צבע מתוך קומפוננטה"} onClick={color.theFunc} /> e</h1> */}
            <p className="contaxt"><input type="color" onChange={(e) => { color.theFunc(e.target.value) }} /></p>

        </>
    );
}



// export function FormPage() {

    const FormPage = () => {
    let { register, handleSubmit } = useForm();

    const save2 = (data) => {
        alert(JSON.stringify(data));
    }


    let [myCustomer, setMyCustomer] = useState({
        firstName: "",
        lastName: "",
        tz: "",
        email: "",
        emailIsTrue: "",
        select1: "",
        schum: "",
        hakdasha: "",
        check1: false
    })

    let [myErrors, setMyErrors] = useState({});

    const change = (e) => {
        let inputValue = e.target.value;
        let inputName = e.target.name;
        let inputType = e.target.type;
        if (inputType == "checkbox")
            inputValue = e.target.checked;
        else if (inputType == "number")
            inputValue = Number(inputValue);

        let copy = { ...myCustomer };
        copy[inputName] = inputValue;
        setMyCustomer(copy);
    }

    const errorsMasage = () => {
        let err = {};
        if (!myCustomer.firstName)
            err.firstName = "שם הוא שדה חובה";

        if (!myCustomer.lastName)
            err.lastName = "שם הוא שדה חובה";

        if (!myCustomer.tz)
            err.tz = "מספר זהות הוא שדה חובה";
        else if (myCustomer.tz.length < 9)
            err.tz = "מספר זהות קצר מידי";
        else if (myCustomer.tz.length > 9)
            err.tz = "מספר זהות ארוך מידי";
        else if (!/^[0-9]{1,}$/.test(myCustomer.tz))
            err.tz = "מספר זהות יכול להכיל ספרות בלבד";

        if (!myCustomer.email)
            err.email = "דואר אלקטרוני הוא שדה חובה";
        // if (!/^['0'-'9']||['a'-'z']||['A'-'Z']||['.']||['@']{1,}$/.test(myCustomer.email))
        // err.email = "כתובת אימייל לא תקינה";

        if (!myCustomer.emailIsTrue)
            err.emailIsTrue = "דואר אלקטרוני הוא שדה חובה";
        if (!(myCustomer.emailIsTrue == myCustomer.email))
            err.emailIsTrue = "דואר אלקטרוני שגוי";

        if (!myCustomer.schum)
            err.schum = "סכום הוא שדה חובה";

        else if (!/^[0-9]{1,}$/.test(myCustomer.schum))
            err.schum = "הסכום יכול להכיל ספרות בלבד";

        return err;
    }

    console.log(myErrors);



    const save = (e) => {
        e.preventDefault();

        let a = errorsMasage();
        if (Object.keys(a).length == 0) {
            alert("פרטיך נשלחו בהצלחה");
            <FormPage />
        }
        else
            setMyErrors(a);
    }


    return (

        <form className="page" onSubmit={save}>

            <NavBar />

            <br></br><br></br><br></br><br></br>

            <p className="tytle"><img src="https://cdn-icons-png.flaticon.com/512/194/194741.png" width={60} height={60} className="img" />   פרטי התרומה שלי</p>
            <br></br><br></br><br></br>

            <input type="text" name="firstName" placeholder="שם פרטי" className="txt" {...register("שם")} onBlur={change} />
            <br></br>
            {myErrors.firstName ? <span className="error">{myErrors.firstName}</span> : null}
            <br></br><br></br>

            <input type="text" name="lastName" placeholder="שם משפחה" className="txt" {...register("משפחה")} onBlur={change} />
            <br></br>
            {myErrors.lastName ? <span className="error">{myErrors.lastName}</span> : null}
            <br></br><br></br>

            <input type="text" name="tz" placeholder="מספר זהות" className="txt" onBlur={change} />
            <br></br>
            {myErrors.tz ? <span className="error">{myErrors.tz}</span> : null}
            <br></br><br></br><br></br><br></br>

            <input type="email" name="email" placeholder="דואר אלקטרוני" className="txt" onBlur={change} />
            <br></br>
            {myErrors.email ? <span className="error">{myErrors.email}</span> : null}
            <br></br><br></br>

            <input type="email" name="emailIsTrue" placeholder="אימות דואר אלקטרוני" className="txt" onBlur={change} />
            <br></br>
            {myErrors.emailIsTrue ? <span className="error">{myErrors.emailIsTrue}</span> : null}
            <br></br><br></br><br></br><br></br><br></br>

            <p>בחר/י סוג מטבע</p>
            <select name="select1" size="3" multiple id="click" onClick={() => {
                {
                    alert("סוג מטבע: " + document.getElementById("click").value, 3000);
                }
            }} onBlur={change}>
                <option value="שקל">שקל</option>
                <option value="דולר">דולר</option>
            </select >
            <br></br><br></br><br></br>


            <p name="schum" className="schum" >סכום לתרומה</p>
            <input type="text" name="schum" className="schum1" placeholder="₪" {...register("סכום")} onBlur={change}></input>
            <br></br>
            {myErrors.schum ? <span className="error">{myErrors.schum}</span> : null}
            <br></br><br></br><br></br><br></br>


            <p>הקדשה אישית</p>
            <textarea rows="5" cols="20" name="hakdasha" className="hakdasha" {...register("הקדשה")} onBlur={change}></textarea>
            <p className="area">אני מעוניין/ת להציג את ההקדשה בעמוד התורמים
                <input type="checkbox" className="check" name="check1" {...register("מסכים להציג הקדשה?")} onBlur={change}></input></p>
            <br></br><br></br><br></br><br></br>

            <input type="submit" value="אישור" name="ok" className="ok" />
            {/* <input type="button" value="פרטים" name="ok" className="ok" onClick={handleSubmit(save2)} /> */}
            <br></br><br></br>

            <input type="button" value={"פרטים"} onClick={handleSubmit(save2)} />

            <br></br><br></br><br></br><br></br><br></br><br></br>

        </form>

    )
}
