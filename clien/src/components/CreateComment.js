import React from "react";
import { Form, Modal,Image, Input,Rate } from "antd";
import { useDispatch } from "react-redux";
import {addComment} from '../redux/actions/productAction';


export default function CreateComment({ isOpen, closeModal,commentProduct,orderId }) {
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      dispatch(addComment(commentProduct.product._id,e,commentProduct._id,orderId))
      closeModal();
    };

    const [form] = Form.useForm();
  
    return (<>
     <Modal
        visible={isOpen}
        title="Bu Ürünü Değerlendir!"
        okText="Değerlendir"
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
          <Image src={commentProduct.product.image}/>
        <Form
          form={form}
          initialValues={{
            modifier: 'public',
          }}
        >
    <Form.Item name="rating" label="Puan Ver">
        <Rate allowHalf/>
      </Form.Item>
          <Form.Item
            name="comment"
            rules={[{ required: true, message: "Bu alan boş bırakılamaz!" }]}
          >
            <Input.TextArea placeholder="Yorum Yap!" rows={4}/>
          </Form.Item>
        </Form>
      </Modal>
      </>
    );
}
