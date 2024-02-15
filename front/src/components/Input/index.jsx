import style from "./style.module.scss";
export function Input({ error, label, type, register, disabled , placeholder }) {
  return (
    <div className={style.inputBox}>
      <label>{label}</label>
      <input
        type={type}
        {...register}
        disabled={disabled}
        placeholder={placeholder}
      />
      {error ? <p className={style.erro}>{error.message}</p> : null}
    </div>
  );
}
 