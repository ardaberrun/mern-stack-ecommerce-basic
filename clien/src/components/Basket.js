import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";
import { Row, Col, Typography, InputNumber, Card,Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { changeQuantity, removeItem,buyProducts } from "../redux/actions/cartAction";

function Basket() {
  const { user, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const totalPrice = (cartItems) => cartItems.reduce((acc,curr) => acc+(curr.product.price * curr.quantity),0)

  return !user.user ? (
    <Result
      status="403"
      title="Sepete Ulaşmak İçin Giriş Yap"
      subTitle="Üzgünüm. Sepet işlemlerini sadece giriş yapmış kullanıcılar yapabilir."
      extra={
        <Button type="primary" onClick={() => history.push("/membership")}>
          Giriş Yap
        </Button>
      }
    />
  ) : cart.cartItems.length === 0 ? (
    <Result
      status="404"
      title="Sepetiniz Boş"
      subTitle="Alışverişe devam et sepetini doldur, indirimleri kaçırma! ."
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          Alışverişe Devam Et
        </Button>
      }
    />
  ) : (
    <>
      <Row style={{ marginTop: "2rem" }} align="middle">
        <Col xs={24}>
          <Typography.Text strong>
            Toplam {cart.cartItems.length} sonuç gösteriliyor
          </Typography.Text>
        </Col>
      </Row>
      <Row align="top" style={{ marginTop: "2rem" }} gutter={[16, 8]}>
        <Col xs={24} lg={16}>
          {cart.cartItems.map((cartItem) => (
            <Row
              justify="space-between"
              align="middle"
              key={cartItem.product._id}
              style={{
                padding: "1rem",
                border: "1px solid #f3f3f3",
                marginBottom: "0.3rem",
              }}
            >
              <Col
                xs={{ span: 20, order: 1 }}
                md={{ span: 12, order: 1 }}
                style={{ display: "flex" }}
              >
                <img width="40" height="50" src={cartItem.product.image} />
                <div>
                  <Typography.Title level={5} style={{ marginLeft: "0.5rem" }}>
                    {cartItem.product.brand}
                  </Typography.Title>
                  <Typography.Text
                    type="secondary"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    {cartItem.product.description}
                  </Typography.Text>
                </div>
              </Col>
              <Col xs={{ span: 12, order: 3 }} md={{ span: 8, order: 2 }}>
                <InputNumber
                  min={1}
                  onStep={(value, info) => {
                    dispatch(changeQuantity(cartItem.product._id, value));
                  }}
                  defaultValue={cartItem.quantity}
                />
              </Col>
              <Col
                xs={{ span: 4, order: 2 }}
                md={{ span: 2, order: 3 }}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Typography.Title level={5}>
                  {cartItem.product.price * cartItem.quantity}TL
                </Typography.Title>
              </Col>
              <Col
                xs={{ span: 12, order: 4 }}
                md={{ span: 2, order: 4 }}
                className="margin"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <DeleteOutlined
                  style={{ fontSize: "20px", marginBottom: "8px" }}
                  onClick={() => dispatch(removeItem(cartItem.product._id))}
                />
              </Col>
            </Row>
          ))}
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Sipariş Özeti">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Text strong>Fiyat</Typography.Text>
              <Typography.Text strong>{totalPrice(cart.cartItems)}TL</Typography.Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Text strong>Kargo Toplamı</Typography.Text>
              <Typography.Text strong>0TL</Typography.Text>
            </div>
            <Divider/>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Text strong>Toplam</Typography.Text>
              <Typography.Text strong>{totalPrice(cart.cartItems)}TL</Typography.Text>
            </div>
          </Card>
          <Button onClick={()=> dispatch(buyProducts(cart.cartItems,totalPrice(cart.cartItems)))} type="primary" style={{ width: "100%", marginTop: "0.5rem" }}>
            Siparişi Tamamla
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Basket;
