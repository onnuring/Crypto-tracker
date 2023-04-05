import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const PriceBox = styled.ul`
  padding: 10px;
  box-shadow: 2px 2px ${(props) => props.theme.shadowColor};
  background-color: ${(props) => props.theme.cardColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
`;

const PriceList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  color: ${(props) => props.theme.textColor};
  span:last-child {
    font-weight: 300;
    color: red;
    margin-right: 5px;
  }
`;

interface PriceProps {
  tickersData: {
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
  };
}

function Price() {
  const { tickersData } = useOutletContext<PriceProps>();
  const priceData = tickersData?.quotes.USD;

  return (
    <PriceBox>
      <PriceList>
        <span>Price</span>
        <span>${Number(priceData.price.toFixed(2)).toLocaleString("en")}</span>
      </PriceList>
      <PriceList>
        <span>Change Percentage(24h)</span>
        <span>{priceData.percent_change_24h}%</span>
      </PriceList>
      <PriceList>
        <span>Volume(24h)</span>
        <span>
          {Number(priceData.volume_24h.toFixed(2)).toLocaleString("en")}
        </span>
      </PriceList>
      <PriceList>
        <span>Market cap</span>
        <span>
          ${Number(priceData.market_cap.toFixed(2)).toLocaleString("en")}
        </span>
      </PriceList>
      <PriceList>
        <span>All-Time-High</span>
        <span>
          $ {Number(priceData.ath_price.toFixed(2)).toLocaleString("en")}
        </span>
      </PriceList>
    </PriceBox>
  );
}

export default Price;
