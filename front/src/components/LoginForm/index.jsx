import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./loginFormSchema";
import { InputPass } from "../InputPass";
import { Link } from "react-router-dom";
import { useContext } from "react";
import style from "./style.module.scss";
import { clientContext } from "../../providers/clientContext";

export function LoginForm() {
  const {clientLogin} = useContext(clientContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  function submit(formData) {
    clientLogin(formData);
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(submit)}>
      <h1 className={style.title}>Login</h1>
      <Input 
        label="Email"
        type="email"
        register={register("email")}
        placeholder="Digite seu email"
        error={errors.email}
      />
      
      <InputPass
        label="Senha"
        register={register("password")}
        error={errors.password}
        placeholder="Digite sua senha"
        type="password"

      />
      <button className={style.button}>
        Entrar
        </button>
      <div className={style.bottomform}>
        <p className={style.p} >Ainda nao possui uma conta?</p>
        <Link className={style.link} to="/register">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
