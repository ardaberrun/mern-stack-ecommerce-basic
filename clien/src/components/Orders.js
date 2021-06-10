import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../redux/actions/userAction";
import { Descriptions, Divider } from "antd";
import moment from "moment";
import { Avatar, Button } from "antd";
import CreateComment from "./CreateComment";

export default function Orders() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [commentProduct, setCommentProduct] = useState(null);
  const [orderId, setOrderId] = useState(null);
  
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  console.log(state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <>
      {showModal ? (
        <CreateComment closeModal={closeModal} isOpen={showModal} orderId={orderId} commentProduct={commentProduct} />
      ) : null}
      {state.orders &&
        state.orders.map((order) => (
          <div key={order._id}>
            <Descriptions title="Sipariş Detayı" layout="vertical" bordered>
              <Descriptions.Item label="Sipariş Tarihi">
                {moment(order.createdAt).format("LLL")}
              </Descriptions.Item>
              <Descriptions.Item label="Alıcı">{`${state.user.name} ${state.user.surname}`}</Descriptions.Item>
              <Descriptions.Item label="Tutar">
                <strong>{order.price}TL</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Sipariş Özeti">
                {order.products.map((product, i) => (
                  <Avatar
                    key={i}
                    style={{ marginRight: "40px", cursor: "pointer" }}
                    shape="square"
                    size="large"
                    src={product.product.image}
                    onClick={() => {
                      setCommentProduct(product);
                      setOrderId(order._id)
                      openModal();        
                    }}
                  />
                ))}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
          </div>
        ))}
    </>
  );
}
