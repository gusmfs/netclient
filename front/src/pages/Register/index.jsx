import logo from "../../assets/logo.png";
import { RegisterForm } from "../../components/RegisterForm";
import style from "./style.module.scss";
export function Register() {
  
  return (
    <main className={style.main}>
      <div >
        <div >
          <RegisterForm/>
        </div>
      </div>
      <div>
        <div className={style.img}>
          <img src={logo} alt="Logo" />
        </div>
      </div>
    </main>
  );
}
