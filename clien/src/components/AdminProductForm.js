import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { createProduct } from "../redux/actions/productAction";
import { useHistory } from "react-router";
import { Form, Button, Input, Select } from "antd";

export default function AdminProductForm() {
    const history = useHistory();

    const state = useSelector((state) => state.category);
    const dispatch = useDispatch();
  
    const handleSubmit = (data) => {
      dispatch(createProduct(data));
      history.push("/admin");
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
        style={{ padding: "1rem", maxWidth: "50rem", margin: "0 auto" }}
      >
        <Form.Item
          label="Marka"
          name="brand"
          rules={[{ required: true, message: "Bu alan zorunludur!" }]}
        >
          <Input placeholder="Marka ismini giriniz" />
        </Form.Item>
  
        <Form.Item
          label="Kategori"
          name="category"
          rules={[{ required: true, message: "Bu alan zorunludur!" }]}
        >
          <Select placeholder="Kategori Seçiniz">
            {state.categories.map((category) => (
              <Select.Option value={category._id} key={category.slug}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Fiyat"
          name="price"
          rules={[{ required: true, message: "Bu alan zorunludur!" }]}
        >
          <Input placeholder="Fiyat bilgisi giriniz" />
        </Form.Item>
        <Form.Item
          label="Stok Bilgisi"
          name="stock"
          rules={[{ required: true, message: "Bu alan zorunludur!" }]}
        >
          <Input placeholder="Stok bilgisi giriniz." />
        </Form.Item>
        <Form.Item
          label="Açıklama"
          name="description"
          rules={[{ required: true, message: "Bu alan zorunludur!" }]}
        >
          <Input.TextArea placeholder="Açıklama giriniz." />
        </Form.Item>
        <Form.Item
          label="Resim"
          name="image"
          rules={[{ required: true, message: "Bu alan zorunludur!" }]}
        >
          <Input placeholder="Resim giriniz." />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Ürün oluştur
          </Button>
        </Form.Item>
      </Form>
    );
}
