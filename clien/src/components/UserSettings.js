import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Collapse, Button } from "antd";
import UserForm from "./UserForm";
import RePassword from './RePassword';
import { logout } from "../redux/actions/userAction";

export default function UserSettings() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <Collapse style={{ marginTop: "1rem" }} defaultActiveKey={["1"]}>
        <Collapse.Panel header="Hesabım" key="1">
          <UserForm />
        </Collapse.Panel>
        <Collapse.Panel header="Şifreni Değiştir" key="2">
         <RePassword/>
        </Collapse.Panel>
        <Collapse.Panel header="Siparişlerim" key="3">
          <p>Siparişlerim</p>
        </Collapse.Panel>
      </Collapse>
      <Button
        type="primary"
        style={{ marginTop: "1rem" }}
        onClick={() => dispatch(logout(history))}
      >
        Çıkış Yap
      </Button>
    </>
  );
}
