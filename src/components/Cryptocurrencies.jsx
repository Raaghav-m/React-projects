import { Card, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/CryoptoApi";
import { Link } from "react-router-dom";
import millify from "millify";

const Cryptocurrencies = ({ simplified }) => {
  let count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptoInfo, setCryptoInfo] = useState([]);
  let [filterItem, setFilterItem] = useState([]);
  console.log(cryptoInfo);

  useEffect(() => {
    let searched = cryptoList?.data?.coins?.filter((coin) =>
      coin.name.toLowerCase().includes(filterItem)
    );
    setCryptoInfo(searched);
  }, [filterItem, cryptoList]);
  useEffect(() => {
    setCryptoInfo(cryptoList?.data?.coins);
  }, [cryptoList]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <input
            placeholder="Search crypto"
            onChange={(e) => setFilterItem(e.target.value)}
          ></input>
        </div>
      )}
      <Row gutter={[16, 16]} className="crypto-card-container">
        {cryptoInfo?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            xl={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/cryptodetails/${currency.uuid}`}>
              <Card
                title={`${currency.rank} . ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={`${currency.iconUrl}`}
                    alt={"hello"}
                  />
                }
              >
                Price:{millify(currency.price)}
                <br />
                Market cap:{millify(currency.marketCap)}
                <br />
                <p className={currency.change > 0 ? `positive` : `negative`}>
                  Daily Change:{millify(currency.change)}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
