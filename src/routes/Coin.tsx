import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "./api";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: 2px 2px ${(props) => props.theme.shadowColor};
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : "transparent"};
  border: 1px solid ${(props) => props.theme.accentColor};
  padding: 7px 0;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  a {
    display: block;
  }
`;

//2. interface에서 타입 지정
interface RouteParams {
  coinId: string;
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 50px 20px 0;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  font-style: italic;
  font-weight: 700;
`;
const Loader = styled.span`
  display: block;
  text-align: center;
`;

interface RouteState {
  state: {
    name: string;
  };
}

//다중커서 선택한 문자열 가장 우측끝으로 포커싱 : shift+Option+i
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  //1. const { coinId } = useParams<{ coinId: string }>();
  // const { coinId } = useParams<RouteParams>(); ver5
  const { coinId } = useParams() as unknown as RouteParams;

  //코인아이디가 포함된 url로 바로 검색할 경우(시크릿모드) 오류가 날 수 있다. 홈화면에서 link를 클릭했을 때 state를 넘겨줄 수 있기 때문 그래서 ?를 추가해준다
  const { state } = useLocation() as RouteState;

  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();

  //url을 통해서 탭선택에 바로 적용시킬 수 있다
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  //useQuery hook 사용
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: tickersData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(4)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId, tickersData }} />
        </>
      )}
    </Container>
  );
};

export default Coin;
