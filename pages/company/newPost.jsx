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
  EMPTY_VALIDATIONS,
  PASSWORD_VALIDATIONS,
} from "../../validations/validations";

// state
import cookie from "js-cookie";

const Registration = () => {
  // toasts, router
  const notify = (message, options) => toast(message, options);
  const router = useRouter();

  const title = useInput("", EMPTY_VALIDATIONS);
  const description = useInput("", EMPTY_VALIDATIONS);
  const restrictions = useInput("", EMPTY_VALIDATIONS);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: title.value,
      description: description.value,
      restrictions: restrictions.value,
      token: cookie.get("token"),
    };

    api
      .createPost(data)
      .then((resp) => {
        notify(
          resp.data.success ? "Вы успешно создали заказ!" : resp.data.message,
          resp.data.success ? TOAST_TYPES.success : TOAST_TYPES.info
        );

        if (resp.data.success) {
          router.push("/account/cabinet");
        }
      })
      .catch((error) => {
        console.log(error);
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
        <h1>Создание задачи</h1>

        {getErrorMessage(title)}
        <input
          onChange={(e) => title.onChange(e)}
          onBlur={(e) => title.onBlur(e)}
          value={title.value}
          name="title"
          type="text"
          placeholder="Введите заголовок..."
        />

        {getErrorMessage(description)}
        <input
          onChange={(e) => description.onChange(e)}
          onBlur={(e) => description.onBlur(e)}
          value={description.value}
          name="description"
          type="text"
          placeholder="Введите описание..."
        />

        {getErrorMessage(restrictions)}
        <input
          onChange={(e) => restrictions.onChange(e)}
          onBlur={(e) => restrictions.onBlur(e)}
          value={restrictions.value}
          name="restrictions"
          type="text"
          placeholder="Введите ограничения..."
        />

        <button type="submit">Создать задачу</button>
      </form>
    </div>
  );
};

export default Registration;
