import { useEffect } from "react";
import "./FormPage.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";




export const FormPage = ({ onAdd }) => {
    let navigate = useNavigate();

    const Save = (data) => {
        let d = { ...data, "date": new Date().getMinutes() };
        console.log(d);
        onAdd(d);
        navigate("/list");
    };

    let { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm({ defaultValues: { isAgree: true } });

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
        <>
            <form className="page" noValidate onSubmit={handleSubmit(Save)}>
                <br /><br /><br /><br /><br /><br /><br />

                <label className="tytle">פרטי התרומה שלי   <img src="https://cdn-icons-png.flaticon.com/512/194/194741.png" width={60} height={60} className="img" /></label>
                <br /><br /><br /><br /><br /><br /><br /><br />

                <input type="text" name="firstName" placeholder="שם פרטי" className="txt" {...register("firstName", { required: true, minLength: 2, maxLength: 12 })} />
                {errors.firstName?.type === "required" && <p className="error">שם פרטי הוא שדה חובה</p>}
                {errors.firstName?.type === "minLength" && <p className="error">מספר אותיות נמוך מדי</p>}
                {errors.firstName?.type === "maxLength" && <p className="error">מספר אותיות גבוה מדי</p>}
                <br /><br />

                <input type="text" name="lastName" placeholder="שם משפחה" className="txt" {...register("lastName", { required: true, minLength: 2, maxLength: 12 })} />
                {errors.lastName?.type === "required" && <p className="error">שם משפחה הוא שדה חובה</p>}
                {errors.lastName?.type === "minLength" && <p className="error">מספר אותיות נמוך מדי</p>}
                {errors.lastName?.type === "maxLength" && <p className="error">מספר אותיות גבוה מדי</p>}
                <br /><br /><br /><br />

                <input type="text" name="tz" placeholder="מספר זהות" className="txt" {...register("tz", { required: false, pattern: /^[0-9]{9}$/ })} />
                {errors.tz?.type === "pattern" && <p className="error">מספר זהות חייב להכיל 9 ספרות</p>}
                <br /><br /><br /><br />

                <input type="email" name="email" placeholder="דואר אלקטרוני" className="txt" {...register("email", { required: false, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ })} />
                {errors.email?.type === "pattern" && <p className="error">דוא"ל לא תקין</p>}
                <br /><br />

                <input type="email" name="emailIsTrue" placeholder="אימות דואר אלקטרוני" className="txt"
                    {...register("emailIsTrue", {
                        required: false, validate: (val) => {
                            if (val === getValues("email"))
                                return true;
                            return false;
                        }
                    })} />
                {errors.emailIsTrue && <p className="error">דואר אלקטרוני לא תואם</p>}
                <br /><br /><br /><br />

                <p className="mat">בחר/י סוג מטבע</p>
                <select className="select" name="select1" id="click" {...register("select1")} onChange={() => {
                    alert("סוג מטבע: " + document.getElementById("click").value);
                }} >
                    <option value="שקל">שקל</option>
                    <option value="דולר">דולר</option>
                </select >
                <br /><br /><br />

                <p name="schum" className="schum">סכום לתרומה</p>
                <input type="text" name="schum" className="schum1" placeholder="₪" {...register("schum", { required: true, pattern: /^[0-9]{1,}$/ })} ></input>
                {errors.schum?.type === "required" && <p className="error">סכום הוא שדה חובה</p>}
                {errors.schum?.type === "pattern" && <p className="error">הסכום יכול להכיל ספרות בלבד</p>}
                <br /><br /><br /><br />

                <p className="mat">הקדשה אישית</p>
                <textarea rows="5" cols="20" name="hakdasha" className="hakdasha" {...register("hakdasha")}></textarea>
                <p className="area">
                    <input type="checkbox" className="check" name="isAgree" {...register("isAgree")} ></input>אני מעוניין/ת להציג את ההקדשה בעמוד התורמים
                </p>
                <br /><br /><br /><br />

                <input type="submit" value="אישור" name="ok" className="ok" />
                <br /><br /><br /><br /><br /><br />
                
                <div className="bthn_form" id="bthn"></div>
            </form>

        </>
    );
};

