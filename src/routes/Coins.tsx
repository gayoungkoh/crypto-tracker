import { useNavigate } from "react-router";

const Coins = () => {
  const containerClassName = "px-5";
  const headerClassName = "h-[10vh] flex justify-center items-center";
  const titleClassName = "text-5xl text-purple-400";
  const coinsListClassName = "";
  const coinClassName =
    "bg-white text-black mb-2.5 p-5 rounded-2xl cursor-pointer hover:text-purple-400";

  const coins = [
    {
      id: "btc-bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      rank: 1,
      is_new: false,
      is_active: true,
      type: "coin",
    },
    {
      id: "eth-ethereum",
      name: "Ethereum",
      symbol: "ETH",
      rank: 2,
      is_new: false,
      is_active: true,
      type: "coin",
    },
    {
      id: "usdt-tether",
      name: "Tether",
      symbol: "USDT",
      rank: 3,
      is_new: false,
      is_active: true,
      type: "token",
    },
  ];

  const navigate = useNavigate();

  const navigateToDetail = (coinId: string) => {
    navigate(`/${coinId}`);
  };

  return (
    <div className={containerClassName}>
      <header className={headerClassName}>
        <h1 className={titleClassName}>Coins</h1>
      </header>
      <ul className={coinsListClassName}>
        {coins.map((coin) => (
          <li
            key={coin.id}
            className={coinClassName}
            onClick={() => navigateToDetail(coin.id)}
          >
            {coin.name} &rarr;
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Coins;
