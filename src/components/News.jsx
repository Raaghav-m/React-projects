import React, { useEffect, useState } from "react";
import { useGetCryptoNewsQuery } from "../services/CryptoNewsApi";
import { Card, Row, Typography, Col, Avatar } from "antd";
import moment from "moment";

const News = ({ simplified }) => {
  let count = simplified ? 10 : 100;
  if (count == 100) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  let { Title, Text } = Typography;
  let { data: newsData, isFetching } = useGetCryptoNewsQuery();
  console.log(newsData);
  if (isFetching) return "Loading...";
  return (
    <>
      <Row gutter={[16, 16]}>
        {newsData?.data?.map(
          (news, i) =>
            i < count && (
              <Col xs={24} sm={12} xl={8}>
                <a href={news.url} rel="noreferrer" target="_blank">
                  <Card hoverable className="news-card">
                    <div className="news-image-container">
                      <Title className="news-title" level={4}>
                        {news.title}
                      </Title>
                      <img
                        src={news.thumbnail}
                        className="img-container"
                        alt="hello"
                      />
                    </div>

                    <p>{news.description}</p>
                    <div className="provider-container">
                      <div>
                        <Avatar src={news.thumbnail} />
                      </div>
                      <Text>
                        {moment(news.createdAt).startOf("ss").fromNow()}
                      </Text>
                    </div>
                  </Card>
                </a>
              </Col>
            )
        )}
      </Row>
    </>
  );
};

export default News;
