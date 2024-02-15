import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { ContactFormSchema } from "./ContactFormSchema";
import style from "./style.module.scss";
import { contactContext } from "../../providers/contactContext";

export function CreateContactModal() {
  const { setVisible, visible, postContact } = useContext(contactContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //resolver: zodResolver(ContactFormSchema),
  });

  function submit(formData) {
    const formTransformed = { ...formData, phone: Number(formData.phone) };
    postContact(formTransformed);
  }

  return (
    <div className={style.modal}  role="dialog">
      <div className={style.container}>
        <form onSubmit={handleSubmit(submit)}>
          <div className={style.header}>
            <h3 className={style.title}>Salvar contato</h3>
            <button className={style.button} onClick={() => setVisible(false)}>X</button>
          </div>
          <div className={style.form}>
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

            <Input
              label="Phone"
              register={register("phone")}
              placeholder="Phone number"
              //error={errors.phone}
            />
            <button className={style.button}>Cadastrar contato</button>

          </div>
        </form>
      </div>
    </div>
  );
}
