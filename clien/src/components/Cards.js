import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productAction";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Select, Typography, Card,Spin } from "antd";

export default function Cards() {
  const [, setSelectedOption] = useState(null);
  const state = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const history = useHistory();
   
  useEffect(() => {
    if (slug) {
      dispatch(getProducts(slug));
    } else {
      dispatch(getProducts());
    }
  }, [slug, dispatch]);

  const options = [
    { value: "dec_by_price", label: "En yüksek fiyat" },
    { value: "inc_by_price", label: "En düşük fiyat" },
    { value: "desc_by_date", label: "En yeniler" },
  ];

  return state.loading ? <Spin /> : (
    <>
      <Row style={{ marginTop: "2rem" }} align="middle">
        <Col xs={24} sm={12}>
          <Typography.Text strong>
            Toplam {state.products.length} sonuç gösteriliyor
          </Typography.Text>
        </Col>
        <Col
          xs={24}
          sm={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Select
            labelInValue
            defaultValue={{ label: "Önerilen sıralama", value: 0 }}
            onChange={(e) => setSelectedOption(e)}
            style={{ width: 200 }}
          >
            {options.map((option, i) => (
              <Select.Option key={i} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row align="middle" style={{ marginTop: "2rem" }} gutter={[16, 16]}>
        {state.products.map((product) => (
          <Col
            key={product._id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            style={{ textAlign: "center" }}
          >
            <Card
              hoverable
              onClick={() => history.push(`/product/${product._id}`)}
              cover={
                <img
                  alt={product.brand}
                  src={product.image}
                  style={{ maxHeight: "250px" }}
                />
              }
              style={{
                padding: "0.5rem",
                height: "400px",
              }}
            >
              <Card.Meta
                style={{ position: "relative" }}
                title={product.brand}
                description={product.description}
              />
              <Typography.Title
                level={4}
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                }}
              >
                {product.price}TL
              </Typography.Title>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
