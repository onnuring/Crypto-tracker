import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import App from "./App";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import HomeError from "./HomeError";
import CoinError from "./CoinError";

// const Router = () => {
//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Coins />} />
//         <Route path="/:coinId" element={<Coin />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

const router = createBrowserRouter(
  [
    {
      path: "/", // 슬래시 경로를 부모로 생각하고 router를 설정한다
      element: <App />,
      errorElement: <HomeError />,
      children: [
        {
          path: "",
          element: <Coins />,
          errorElement: <HomeError />,
        },
        {
          path: ":coinId",
          element: <Coin />,
          errorElement: <CoinError />,
          children: [
            {
              path: "chart",
              element: <Chart />,
              errorElement: <CoinError />,
            },
            {
              path: "price",
              element: <Price />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/Crypto-tracker",
  }
);

export default router;
