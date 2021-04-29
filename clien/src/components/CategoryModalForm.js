import React, { useState } from "react";
import { Form, Modal, Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { createCategory, getCategories } from "../redux/actions/categoryAction";

export default function CategoryModalForm({ isOpen, closeModal }) {
    const [categoryName, setCategoryName] = useState("");
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      dispatch(createCategory(e.name));

      dispatch(getCategories());
      

      closeModal();
    };
    const [form] = Form.useForm();
  
    return (<>
     <Modal
        visible={isOpen}
        title="Kategori Oluştur"
        okText="Oluştur"
        cancelText="İptal"
        onCancel={closeModal}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleSubmit(values);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <Form
          form={form}
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Bu alan boş bırakılamaz!" }]}
          >
            <Input placeholder="Kategori ekle" />
          </Form.Item>
        </Form>
      </Modal>
      </>
    );
}
