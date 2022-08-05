import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <div className="header">
            <div>BugHunter</div>
            <div>
                <Link href="/account/login">Войти</Link>
                <Link href="/account/registration">Зарегистрироваться</Link>
            </div>
        </div>
    )
}

export default Header