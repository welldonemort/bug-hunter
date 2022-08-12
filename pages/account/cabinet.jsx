import { useState } from "react";

// components
import CompanyCabinet from "../../components/CompanyCabinet";
import WHCabinet from "../../components/WHCabinet";

const Cabinet = () => {
  // прописать получение типа юзера с бэка: WH/Компания
  const [isCompany, setIsCompany] = useState(true);

  return (
    <div className="cabinet">
      {isCompany ? <CompanyCabinet /> : <WHCabinet />}
    </div>
  );
};

export default Cabinet;
