import { useInput } from "../../helpers";
import { ERROR_MESSAGES, TOAST_TYPES } from "../../constants/constants";

// toasts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// queries
import Api from "../../helpers/api";
const api = new Api();

// validations
import {
  EMAIL_VALIDATIONS,
  PASSWORD_VALIDATIONS,
} from "../../validations/validations";
import cookie from "js-cookie";

const Registration = () => {
  // toasts
  const notify = (message, options) => toast(message, options);

  const email = useInput("", EMAIL_VALIDATIONS);
  const password = useInput("", PASSWORD_VALIDATIONS);

  const handleSubmit = (event) => {
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
          console.log(cookie.get("token"));
        }
      })
      .catch((error) => {
        notify(error.response.data.message, TOAST_TYPES.error);
      });
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

        <button
          disabled={!email.inputValid || !password.inputValid}
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Registration;
