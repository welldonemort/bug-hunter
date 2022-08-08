import { useState } from "react";

// hooks
import { useInput } from "../../helpers";

// queries
import Api from "../../helpers/api";
const api = new Api();

// constants
import {
  BIN_VALIDATIONS,
  COMPANY_NAME_VALIDATIONS,
  EMAIL_VALIDATIONS,
  NAME_VALIDATIONS,
  PASSWORD_VALIDATIONS,
  SURNAME_VALIDATIONS,
} from "../../validations/validations";
import { ERROR_MESSAGES } from "../../constants/constants";

const Registration = () => {
  //
  const [isCompany, setIsCompany] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // form_state
  const name = useInput("", NAME_VALIDATIONS);
  const surname = useInput("", SURNAME_VALIDATIONS);
  const email = useInput("", EMAIL_VALIDATIONS);
  const password = useInput("", PASSWORD_VALIDATIONS);
  //
  const bin = useInput("", BIN_VALIDATIONS);
  const companyName = useInput("", COMPANY_NAME_VALIDATIONS);

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

  const getErrorMessage = (namespace) => {
    let error_message = "";

    if (namespace?.isDirty) {
      for (const rule in namespace) {
        error_message = namespace[rule] === true ? ERROR_MESSAGES[rule] : "";
        if (error_message) break;
      }

      return <div style={{ color: "red" }}>{error_message}</div>;
    }
  };

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

        {getErrorMessage(name)}
        <input
          onChange={(e) => name.onChange(e)}
          onBlur={(e) => name.onBlur(e)}
          value={name.value}
          name="name"
          type="text"
          placeholder="Введите имя..."
        />

        {getErrorMessage(surname)}
        <input
          onChange={(e) => surname.onChange(e)}
          onBlur={(e) => surname.onBlur(e)}
          value={surname.value}
          name="surname"
          type="text"
          placeholder="Введите фамилию..."
        />

        {getErrorMessage(email)}
        <input
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.onBlur(e)}
          value={email.value}
          name="email"
          type="text"
          placeholder="Введите email..."
        />

        {getErrorMessage(password)}
        <input
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          value={password.value}
          name="password"
          type="password"
          placeholder="Введите пароль..."
        />

        <div className={isCompany ? "" : "d-none"}>
          {getErrorMessage(bin)}
          <input
            onChange={(e) => bin.onChange(e)}
            onBlur={(e) => bin.onBlur(e)}
            value={bin.value}
            name="bin"
            type="text"
            placeholder="Введите БИН..."
          />

          {getErrorMessage(companyName)}
          <input
            onChange={(e) => companyName.onChange(e)}
            onBlur={(e) => companyName.onBlur(e)}
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
