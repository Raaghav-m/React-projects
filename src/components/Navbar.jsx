import React from "react";
import { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Icon from "../images/R.jpg";

const Navbar = () => {
  let [sideMenu, setSideMenu] = useState(true);
  let [size, setSize] = useState(null);
  useEffect(() => {
    let handleSize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }, []);
  useEffect(() => {
    if (size < 768) {
      setSideMenu(false);
    } else {
      setSideMenu(true);
    }
  }, [size]);
  return (
    <div className="nev-container">
      <div className="logo-container">
        <Avatar src={Icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Crypto</Link>
          <Button
            className="menu-control-container"
            onClick={() => setSideMenu(!sideMenu)}
          >
            <MenuOutlined />
          </Button>
        </Typography.Title>
      </div>
      {sideMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
