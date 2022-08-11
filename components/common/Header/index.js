import React from "react";
import Link from "next/link";
import cookie from "js-cookie";

import { useState, useEffect } from "react";

const Header = () => {
  const [session, setSession] = useState();

  useEffect(() => {
    setSession(cookie.get("token"));
  }, []);

  return (
    <div className="header">
      <div>BugHunter</div>

      {session ? (
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
