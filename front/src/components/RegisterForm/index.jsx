import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./registerFormSchema.js";
import { InputPass } from "../InputPass";
import style from "./style.module.scss";
import { useContext } from "react";
import { clientContext } from "../../providers/clientContext";
export function RegisterForm() {
  const {clientRegister} = useContext(clientContext)
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm({ 
    //resolver: zodResolver(registerFormSchema),
  });
  
  function submit(formData) {
    const formTransformed = {...formData, phone: Number(formData.phone)}
    clientRegister(formTransformed);
  }
  return (
    <form className={style.form} onSubmit={handleSubmit(submit)}>
      <div >
        <h1>Crie sua conta</h1>
        <p>Rapido e grátis, vamos nessa</p>
      </div>
      <Input
        label="Nome Completo"
        type="completeName"
        register={register("completeName")}
        placeholder="Digite seu nome completo"
        //error={errors.completeName}
      />
      <Input
        label="Email"
        type="email"
        register={register("email")}
        placeholder="Digite seu email"
        //error={errors.email}
      />
      <InputPass
        label="Senha"
        type="password"
        register={register("password")}
        //error={errors.password}
      />
      <Input
        label="Phone"
        type= "phone"
        register={register("phone")}
        placeholder="Phone number"
        //error={errors.phone}
      />
      <button className={style.button}>
        Cadastrar
        </button>
    </form>
  );
}
