import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../redux/actions/userAction";
import { Descriptions, Divider } from "antd";
import moment from "moment";
import {Avatar,Button} from "antd";

export default function Orders() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return state.orders && state.orders.map((order) => (
    <>
      <Descriptions title="Sipariş Detayı" layout="vertical" bordered>
        <Descriptions.Item label="Sipariş Tarihi">
          {moment(order.createdAt).format("LLL")}
        </Descriptions.Item>
        <Descriptions.Item label="Alıcı">{`${state.user.name} ${state.user.surname}`}</Descriptions.Item>
        <Descriptions.Item label="Tutar">
          <strong>{order.price}TL</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Sipariş Özeti">
          {order.products.map((product) => <Avatar style={{marginRight:"40px",cursor:"pointer"}} shape="square" size="large" src={product.product.image}/>)}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </>
  ));
}
