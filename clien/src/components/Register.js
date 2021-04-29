import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";

import { register } from "../redux/actions/userAction";

export default function Register() {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(register(data));
  };

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  return (
    <Form
      {...formItemLayout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      style={{ padding: "1rem", backgroundColor: "white" }}
    >
      <Form.Item
        label="İsim"
        name="name"
        rules={[{ required: true, message: "Bu alan zorunludur!" }]}
      >
        <Input placeholder="İsminizi giriniz" />
      </Form.Item>

      <Form.Item
        label="Soyisim"
        name="surname"
        rules={[{ required: true, message: "Bu alan zorunludur!" }]}
      >
        <Input placeholder="Soyisminizi giriniz" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Bu alan zorunludur!" }]}
      >
        <Input placeholder="Email adresinizi giriniz" />
      </Form.Item>

      <Form.Item
        label="Şifre"
        name="password"
        rules={[{ required: true, message: "Bu alan zorunludur!" }]}
      >
        <Input.Password placeholder="Şifrenizi giriniz" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Kayıt Ol
        </Button>
      </Form.Item>
    </Form>
  );
}
