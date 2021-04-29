import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { editProduct, getProductDetail } from "../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Input, Select } from "antd";

export default function AdminEditProductForm() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { category, product } = useSelector((state) => state);

  
    useEffect(() => {
      dispatch(getProductDetail(id));
    }, [dispatch, id]);
  
    const [form] = Form.useForm();

    useEffect(() => {
      if (product.product.product) {
        const {
          brand,
          category,
          description,
          image,
          price,
          stock,
        } = product.product.product;
        form.setFieldsValue({ brand, category, description, image, price, stock });
      }
    }, [form,product.product]);

  
    const history = useHistory();
  
    const handleSubmit = (e) => {
      dispatch(editProduct(e, id));
      history.push("/admin");
    };
    
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    };

  
    return form.getFieldValue().brand ? (
    
        <Form
          {...formItemLayout}
          name="basic"
          form={form}
          initialValues={{brand:"",category:"",description:"",image:"",price:"",stock:""}}
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
              {category.categories.map((category) => (
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
            <Input.TextArea placeholder="Açıklama giriniz." rows={4} />
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
              Ürünü düzenle
            </Button>
          </Form.Item>
        </Form>
      
    ): null;
}
