import React from "react";
import Link from "next/link";

class CompanyCabinet extends React.Component {
  render() {
    return (
      <div className="company">
        <h1>Добро пожаловать, Компания!</h1>
        <Link href="/account/cabinet">Статус текущих задач</Link>
        <Link href="/company/newPost">Создать новую задачу!</Link>
      </div>
    );
  }
}

export default CompanyCabinet;
