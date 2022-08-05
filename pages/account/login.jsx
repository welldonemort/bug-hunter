import { useInput } from "../../helpers";
import axios from "axios";

// queries
import Api from "../../helpers/api";
const api = new Api();

const ERROR_MESSAGES = {
  is_empty: "Поле не может быть пустым",
  min_length: "Слишком короткое значение",
  email: "Некорректный email",
  max_length: "Слишком длинное значение",
};

const Registration = () => {
  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 5, maxLength: 8 });

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

    if (namespace.isDirty) {
      if (namespace.isEmpty) error_message = ERROR_MESSAGES.is_empty;
      else if (namespace.minLengthError)
        error_message = ERROR_MESSAGES.min_length;
      else if (namespace.emailError) error_message = ERROR_MESSAGES.email;
      else if (namespace.maxLength) error_message = ERROR_MESSAGES.max_length;

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
