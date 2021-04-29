import React, { useState ,useEffect} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { Row, Col, Input, Typography, Drawer, Menu, Badge } from "antd";
import { Link } from "react-router-dom";
import {
  AlignLeftOutlined,
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./Navbar.css";

import {getCartItems} from '../redux/actions/cartAction';

export default function Navbar() {
  const { user, cart, category } = useSelector((state) => state);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

    const dispatch = useDispatch();
    const state = useSelector(state => state.user);
    useEffect(() => {
      if(state.user) {
        dispatch(getCartItems());
      }
    },[dispatch,state])

  return (
    <Row align="middle" justify="space-around">
      <Col xs={{ span: 16, order: 1 }} lg={{ span: 4, order: 1 }}>
        <Drawer
          placement="left"
          closable={true}
          onClose={onClose}
          visible={visible}
          key="left"
        >
          <Menu
            mode="inline"
            style={{ fontSize: "16px", fontWeight: "600", marginTop: "2rem" }}
          >
            {category.categories &&
              category.categories.map((category) => (
                <Menu.Item key={category.name} onClick={onClose}>
                  <Link
                    to={`/category/${category.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    {category.name}
                  </Link>
                </Menu.Item>
              ))}
          </Menu>
        </Drawer>
        <Row className="res" align="middle" style={{ marginTop: "0.5rem" }}>
          <Col>
            <AlignLeftOutlined
              onClick={showDrawer}
              style={{ fontSize: "20px", marginBottom: "1rem" }}
              className="icon"
            />
          </Col>
          <Col>
            <Link to="/">
              <Typography.Title level={3}>E-COMMERCE</Typography.Title>
            </Link>
          </Col>
        </Row>
      </Col>
      <Col xs={{ span: 24, order: 3 }} lg={{ span: 10, order: 2 }}>
        <Input
          placeholder="Aradığınız ürün veya markayı yazınız"
          suffix={<SearchOutlined />}
        />
      </Col>
      <Col xs={{ span: 8, order: 2 }} lg={{ span: 6, order: 3 }}>
        <Row justify="center" align="middle">
          <Col xs={12} className="nav-text">
            <Link to="/membership">
              <Typography.Text>
              {user.user ? `Hoşgeldin ${user.user.name}` : `Giriş Yap/Kayıt Ol`}
              </Typography.Text>
            </Link>
          </Col>
          <Col xs={12} className="nav-icon">
            <Link to="/membership">
              {" "}
              <UserOutlined />
            </Link>
          </Col>
          <Col xs={12} className="nav-text">
            <Link to="/cart">
              <Typography.Text>
                Sepetim{" "}
                {cart.cartItems.length > 0 ? (
                  <Badge count={cart.cartItems.length} />
                ) : null}
              </Typography.Text>
            </Link>
          </Col>
          <Col xs={12} className="nav-icon">
            <Link to="/cart">
              {cart.cartItems.length > 0 ? (
                <Badge size="small" count={cart.cartItems.length}>
                  <ShoppingCartOutlined />
                </Badge>
              ) : (
                <ShoppingCartOutlined />
              )}
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
