import { LoginForm } from "../../components/LoginForm";
import logo from "../../assets/logo.png";
import style from "./style.module.scss";
export function Login() {
  
  return (
    <main className={style.main}>
      <div className={style.background}>
          <img className={style.img} src={logo} alt="Logo" />
      </div>
      <div className={style.form}>
          <LoginForm/>
      </div>
    </main>
  );
}
