import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Input } from "antd";

export default function RePassword() {
    const history = useHistory();

    const state = useSelector((state) => state.user);
    const dispatch = useDispatch();
  
    const handleSubmit = (data) => {
      //   dispatch(createProduct(data));
     // history.push("/admin");
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
        style={{ padding: "1rem", maxWidth: "30rem", margin: "0 auto" }}
      >
        <Form.Item label="Şifre" name="password">
          <Input placeholder="Yeni şifrenizi girin" />
        </Form.Item>
        <Form.Item label="Şifre Tekrar" name="repassword">
          <Input placeholder="Yeni şifrenizi tekrar giriniz" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Şifremi Yenile
          </Button>
        </Form.Item>
      </Form>
    );
}
