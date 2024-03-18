import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import Linechart from "./Linechart";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/CryoptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  console.log(coinId);
  const [timePeriod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: cryptoHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;
  console.log(timePeriod);

  if (isFetching) return "Loading...";

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails.supply.circulating &&
        millify(cryptoDetails.supply.circulating)
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  //prettier-ignore
  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2}>{cryptoDetails.name} Price</Title>
      </Col>
      <Select
        defaultValue={"7d"}
        className="select-timeperiod"
        onChange={(val) => setTimeperiod(val)}
      >
        {time.map((period, i) => (
          <Option value={period} key={i} />
        ))}
      </Select>
      <Linechart
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
        history={cryptoHistory}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title className="coin-details-heading" level={3}>
              {cryptoDetails.name} statistics
            </Title>
            <p>An overview of stats of {CryptoDetails.name}</p>
          </Col>
          {stats.map((stat, i) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{stat.icon}</Text>
                <Text>{stat.title}</Text>
              </Col>
              <Text className="stats">{stat.value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title className="coin-details-heading" level={3}>
              General statistics
            </Title>
            <p>An overview of stats of top Cryptocurrencies</p>
          </Col>
          {genericStats.map((stat, i) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{stat.icon}</Text>
                <Text>{stat.title}</Text>
              </Col>
              <Text className="stats">{stat.value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title className="coin-details-heading" level={3}>
            Know more about {cryptoDetails.name}
            <br />
            {cryptoDetails.description}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title className="coin-details-heading" level={3}>
            {cryptoDetails.name} links
          </Title>
          {cryptoDetails.links.map((link, i) => (
            <Row className="coin-link" key={i}>
              <Title level={5} className="coin-link">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
