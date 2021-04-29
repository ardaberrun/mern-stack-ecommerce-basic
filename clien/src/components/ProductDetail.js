import React, { useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Card,
  Typography,
  Button,
  Spin,
  Result,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
import { getProductDetail } from "../redux/actions/productAction";
import { useHistory } from "react-router-dom";
import Comments from "./Comments";

export default function ProductDetail({ id }) {
  const dispatch = useDispatch();
  const { product, cart, user } = useSelector((state) => state);
  const history = useHistory();

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);
 

  return product.loading ? (
    <Spin />
  ) : !product.product.product ? (
    <Result
      status="404"
      title="Hata"
      subTitle="Üzgünüm, böyle bir sayfa yok"
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          Anasayfaya Dön
        </Button>
      }
    />
  ) : (
    <Row align="middle" style={{ marginTop: "1rem" }} gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Image
          src={product.product.product.image}
          style={{ border: "1px solid #eaeaea", padding: "1rem" }}
        />
      </Col>
      <Col xs={24} md={12}>
        <Card title={product.product.product.brand}>
          <Typography.Title level={3}>
            {product.product.product.price}TL
          </Typography.Title>
          <Typography.Text type="secondary">
            {product.product.product.description}
          </Typography.Text>
          {cart.cartItems.find(
              (cartItem) => cartItem.product._id === id
            ) ? (
            <Button
              disabled
              type="primary"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Sepete Eklendi
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() =>
                user.user
                  ? dispatch(addToCart(id))
                  : Modal.error({
                      title:
                        "Sepete ekleyebilmek için giriş yapmalısınız.",
                    })
              }
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Sepete Ekle
            </Button>
          )}
        </Card>
      </Col>
      <Col xs={24}>
        <Comments />
      </Col>
    </Row>
  );
}
