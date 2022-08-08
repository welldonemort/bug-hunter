import React from "react";
import Link from "next/link";
import cookie from "js-cookie";

const Header = () => {
  return (
    <div className="header">
      <div>BugHunter</div>

      {cookie.get("token") ? (
        <div>
          <Link href="/account/cabinet">Личный кабинет</Link>
        </div>
      ) : (
        <div>
          <Link href="/account/login">Войти</Link>
          <Link href="/account/registration">Зарегистрироваться</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
