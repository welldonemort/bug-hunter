import { useInput } from "../../helpers";
import { ERROR_MESSAGES } from "../../constants/constants";

// queries
import Api from "../../helpers/api";
const api = new Api();

// validations
import {
  EMAIL_VALIDATIONS,
  PASSWORD_VALIDATIONS,
} from "../../validations/validations";

const Registration = () => {
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
        console.log(resp, resp.data);
      })
      .catch((error) => {
        console.log(error);
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
