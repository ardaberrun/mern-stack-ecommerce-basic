import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageLayout from "./SiteLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import "./Membership.css";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/actions/userAction";
import { Button, Tabs } from "antd";
import UserSettings from "../components/UserSettings";

export default function Membership() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <PageLayout>
      {state.user ? (
        <UserSettings />
      ) : (
        <>
          <div style={{ textAlign: "center", marginTop: "2rem", padding: "0" }}>
            <h2>Merhaba,</h2>
            <p>Hesabına giriş yap veya kayıt ol, indirimleri kaçırma!</p>
          </div>

          <Tabs type="card" style={{ width: "400px", margin: "1rem auto" }}>
            <Tabs.TabPane tab="Giriş Yap" key="login">
              <Login />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Kayıt Ol" key="register">
              <Register />
            </Tabs.TabPane>
          </Tabs>
        </>
      )}
    </PageLayout>
  );
}
