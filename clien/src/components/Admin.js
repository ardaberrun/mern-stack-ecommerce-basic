import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Row, Col } from "antd";
import { getProducts, removeProduct } from "../redux/actions/productAction";
import { useHistory } from "react-router-dom";
import CategoryModalForm from "./CategoryModalForm";



export default function Admin() {
    const state = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      dispatch(getProducts());
    }, [dispatch]);
  
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
  
    return (

        <Row style={{marginTop:"2rem"}}>
          {showModal ? (
            <CategoryModalForm closeModal={closeModal} isOpen={showModal} />
          ) : null}
          <Col xs={24} style={{display:"flex",justifyContent:"flex-end"}}>
            <Button
              variant="info"
              onClick={openModal} 
              style={{marginRight:"0.5rem"}}         
            >
              Kategori Oluştur
            </Button>
            <Button onClick={() => history.push("/admin/product")}>
              Ürün Oluştur
            </Button>
          </Col>
          <Col xs={24} style={{marginTop:"1rem"}}>
            <Table dataSource={state.products} pagination={false}>
              <Table.Column title="ID" dataIndex="_id" key="_id" />
              <Table.Column title="MARKA" dataIndex="brand" key="brand" />
              <Table.Column title="FİYAT" dataIndex="price" key="price" />
              <Table.Column title="STOK" dataIndex="stock" key="stock" />
              <Table.Column
                title="KATEGORİ"
                dataIndex="category"
                key="category"
              />
              <Table.Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <>
                    <Button
                      onClick={() => history.push(`/admin/product/${record._id}`)}
                    >
                      Düzenle
                    </Button>
                    <Button onClick={() => dispatch(removeProduct(record._id))}>
                      Sil
                    </Button>
                  </>
                )}
              />
            </Table>
          </Col>
        </Row>
    );
}
