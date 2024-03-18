import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/CryoptoApi";
import { Cryptocurrencies, News } from "../components";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(100);
  console.log(data);
  let getCryptos = data?.data?.stats;
  let { Title } = Typography;
  if (isFetching) return "Loading...";
  return (
    <>
      <Title level={2} className="heading">
        GLobal Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total cryptocurrencies"
            value={millify(getCryptos.total)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(getCryptos.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total market cap"
            value={millify(getCryptos.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24 hour value"
            value={millify(getCryptos.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(getCryptos.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the World
        </Title>
        <Title level={2} className="show-more">
          <Link to="/cryptocurrencies">Show more...</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Crypto News
        </Title>
        <Title level={2} className="show-more">
          <Link to="/news">Show more...</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
