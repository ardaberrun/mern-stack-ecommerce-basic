import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Input } from "antd";
import { login } from "../redux/actions/userAction";
import { useHistory } from "react-router";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (data) => {
    dispatch(login(data, history));
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
      className="bg-white border-1"
      style={{ padding: "1rem" }}
    >
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
          Giriş Yap
        </Button>
      </Form.Item>
    </Form>
  );
}
