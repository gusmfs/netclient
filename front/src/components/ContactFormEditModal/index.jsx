import { useContext } from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { contactContext } from "../../providers/contactContext";
import { Input } from "../Input";

export function EditContactModal() {
  const { edited, updateContact, setVisibleEdit } = useContext(contactContext);
  const { register, handleSubmit } = useForm({
    values: {
      completeName: edited.completeName,
      email: edited.email,
      phone: edited.phone,
    },
  });

  function submit(formData) {
    const formTransformed = { ...formData, phone: Number(formData.phone) };
    updateContact(formTransformed);
  }

  return (
    <div className={style.modal} role="dialog">
      <div className={style.container}>
        <form onSubmit={handleSubmit(submit)}>
          <div className={style.header}>
            <h3 className={style.title}>Atualizar contato</h3>
            <button className={style.buttonHeader} onClick={() => setVisibleEdit(false)}>X</button>
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
            />
            <button className={style.button}>Salvar alteracoes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
