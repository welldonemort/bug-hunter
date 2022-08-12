import { useState } from "react";
import { useRouter } from "next/router";

// toasts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import { ERROR_MESSAGES, TOAST_TYPES } from "../../constants/constants";

// components
import { Input } from "../../components/common/Input";

const Registration = () => {
  // toasts, router
  const notify = (message, options) => toast(message, options);
  const router = useRouter();

  //
  const [isCompany, setIsCompany] = useState(false);

  // form_state_fields
  const name = useInput("", NAME_VALIDATIONS);
  const surname = useInput("", SURNAME_VALIDATIONS);
  const email = useInput("", EMAIL_VALIDATIONS);
  const password = useInput("", PASSWORD_VALIDATIONS);
  // form_state_fields_company
  const bin = useInput("", BIN_VALIDATIONS);
  const companyName = useInput("", COMPANY_NAME_VALIDATIONS);

  const handleSubmit = (event) => {
    event.preventDefault();

    // form_state_fields
    const data = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
    };
    // form_state_fields_company
    if (isCompany) data.bin = bin.value;
    if (isCompany) data.companyName = companyName.value;

    api
      .registerUser(data)
      .then((resp) => {
        notify(
          resp.data.success
            ? "Вы успешно зарегистрированы!"
            : resp.data.message,
          resp.data.success ? TOAST_TYPES.success : TOAST_TYPES.info
        );

        router.push("/account/login");
      })
      .catch((error) => {
        notify(error.response.data.message, TOAST_TYPES.error);
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

        <Input nameSpace={name} name="name" placeholder="Введите имя..." />

        <Input
          nameSpace={surname}
          name="surname"
          placeholder="Введите фамилию..."
        />

        <Input nameSpace={email} name="email" placeholder="Введите email..." />

        <Input
          nameSpace={password}
          name="password"
          type="password"
          placeholder="Введите пароль..."
        />

        <div className={isCompany ? "" : "d-none"}>
          <Input nameSpace={bin} name="bin" placeholder="Введите БИН..." />

          <Input
            nameSpace={companyName}
            name="companyName"
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
