import React from "react";
import { ERROR_MESSAGES } from "../../../constants/constants";

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

export const Input = ({ name, type, placeholder, nameSpace }) => {
  return (
    <div>
      {getErrorMessage(nameSpace)}
      <input
        onChange={(e) => nameSpace.onChange(e)}
        onBlur={(e) => nameSpace.onBlur(e)}
        value={nameSpace.value}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
