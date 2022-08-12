import { useInput } from "../../helpers";
import { ERROR_MESSAGES, TOAST_TYPES } from "../../constants/constants";
import { useRouter } from "next/router";

// toasts
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// queries
import Api from "../../helpers/api";
const api = new Api();

// validations
import {
  EMAIL_VALIDATIONS,
  PASSWORD_VALIDATIONS,
} from "../../validations/validations";

// state
import cookie from "js-cookie";
import { useState } from "react";

// components
import { Button } from "../../components/common/Button";

const Registration = () => {
  // toasts, router
  const notify = (message, options) => toast(message, options);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const email = useInput("", EMAIL_VALIDATIONS);
  const password = useInput("", PASSWORD_VALIDATIONS);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const data = {
      email: email.value,
      password: password.value,
    };

    api
      .loginUser(data)
      .then((resp) => {
        notify(
          resp.data.success
            ? "Вы успешно авторизировались!"
            : resp.data.message,
          resp.data.success ? TOAST_TYPES.success : TOAST_TYPES.info
        );

        if (resp.data.success) {
          cookie.set("token", resp.data.data[0].token);
          router.push("/account/cabinet");
        }
      })
      .catch((error) => {
        console.log(error);
        notify(error.response.data.message, TOAST_TYPES.error);
      })
      .finally(() => setIsLoading(false));
  };

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
    <div className="login-form--holder">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Войти</h1>

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

        <Button
          type="submit"
          disabled={!email.inputValid || !password.inputValid}
          buttonStyle="btn--primary--solid"
          buttonSize="btn--large"
        >
          Войти
        </Button>
      </form>
    </div>
  );
};

export default Registration;
