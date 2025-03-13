import LoadingSpinner from "@/components/loding-spinner";
import {
  CONTAINER_CLASS_NAME,
  HEADER_CLASSNAME,
  TITLE_CLASS_NAME,
} from "@/constants/class-name";
import { CoinRouteParams } from "@/types/coin";
import { useState } from "react";
import { useLocation, useParams } from "react-router";

const Coin = () => {
  const { coinId } = useParams<CoinRouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  return (
    <div className={CONTAINER_CLASS_NAME}>
      <header className={HEADER_CLASSNAME}>
        <h1 className={TITLE_CLASS_NAME}>{state?.name || ""}</h1>
      </header>
      {loading ? <LoadingSpinner className="w-100" /> : null}
    </div>
  );
};

export default Coin;
