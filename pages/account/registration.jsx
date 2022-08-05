import { useState } from "react";

// hooks
import { useInput } from "../../helpers";

// queries
import Api from "../../helpers/api";
const api = new Api();

const Registration = () => {
  //
  const [isCompany, setIsCompany] = useState(false);

  // form_state
  const name = useInput("", { isEmpty: true });
  const surname = useInput("", { isEmpty: true });
  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 5, maxLength: 8 });
  //
  const bin = useInput("", { isEmpty: true });
  const companyName = useInput("", { isEmpty: true });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
      //
      bin: bin.value,
      companyName: companyName.value,
    };

    api
      .registerUser(data)
      .then((resp) => {
        console.log(resp, resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleForm = () => setIsCompany(!isCompany);

  return (
    <div className="registration-form--holder">
      <div className="radio-group">
        <button onClick={toggleForm} disabled={!isCompany}>
          WH
        </button>
        <button onClick={toggleForm} disabled={isCompany}>
          Компания
        </button>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <h1>Регистрация</h1>
        <input
          onChange={(e) => name.onChange(e)}
          value={name.value}
          name="name"
          type="text"
          placeholder="Введите имя..."
        />
        <input
          onChange={(e) => surname.onChange(e)}
          value={surname.value}
          name="surname"
          type="text"
          placeholder="Введите фамилию..."
        />

        {email.isDirty && email.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}
        {email.isDirty && email.minLengthError && (
          <div style={{ color: "red" }}>Слишком короткая почта</div>
        )}
        {email.isDirty && email.emailError && (
          <div style={{ color: "red" }}>Некорректный email</div>
        )}
        <input
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.onBlur(e)}
          value={email.value}
          name="email"
          type="text"
          placeholder="Введите email..."
        />

        {password.isDirty && password.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}
        {password.isDirty && password.minLengthError && (
          <div style={{ color: "red" }}>Слишком короткий пароль</div>
        )}
        {password.isDirty && password.maxLengthError && (
          <div style={{ color: "red" }}>Слишком длинный пароль</div>
        )}
        <input
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          value={password.value}
          name="password"
          type="password"
          placeholder="Введите пароль..."
        />

        <div className={isCompany ? "" : "d-none"}>
          <input
            onChange={(e) => bin.onChange(e)}
            value={bin.value}
            name="bin"
            type="text"
            placeholder="Введите БИН..."
          />
          <input
            onChange={(e) => companyName.onChange(e)}
            value={companyName.value}
            name="companyName"
            type="text"
            placeholder="Введите название компании..."
          />
        </div>

        <button
          disabled={!email.inputValid || !password.inputValid}
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
