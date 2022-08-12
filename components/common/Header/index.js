import React, { useEffect, useState } from "react";
import Link from "next/link";
import cookie from "js-cookie";

const Header = () => {
  const [session, setSession] = useState();

  useEffect(() => {
    setSession(cookie.get("token"));
  }, [cookie.get("token")]);

  const logout = () => {
    cookie.set("token", "");
  };

  return (
    <div className="header">
      <div>BugHunter</div>

      {session ? (
        <div>
          <Link href="/account/cabinet">Личный кабинет</Link>
          <button onClick={logout}>
            <Link href="/">Выйти</Link>
          </button>
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
