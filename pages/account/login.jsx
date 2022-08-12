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
import { Input } from "../../components/common/Input";

const Registration = () => {
  // toasts, router
  const notify = (message, options) => toast(message, options);
  const router = useRouter();

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
          router.push("/account/cabinet");
        }
      })
      .catch((error) => {
        console.log(error);
        notify(error.response.data.message, TOAST_TYPES.error);
      });
  };

  return (
    <div className="login-form--holder">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Войти</h1>

        <Input
          nameSpace={email}
          name="email"
          type="text"
          placeholder="Введите email..."
        />

        <Input
          nameSpace={password}
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
