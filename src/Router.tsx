import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import App from "./App";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

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

const router = createBrowserRouter([
  {
    path: "/", // 슬래시 경로를 부모로 생각하고 router를 설정한다
    element: <App />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
  },
]);

export default router;
