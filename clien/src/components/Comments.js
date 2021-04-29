import React from "react";
import { useSelector } from "react-redux";
import { Rate, List, Comment, Typography, Divider } from "antd";

export default function Comments() {
  const { product } = useSelector((state) => state.product);

  return (
    <List
      style={{ backgroundColor: "#f8f9fa", padding: "1rem" }}
      header={`${product.product.reviews.length} Değerlendirme`}
      itemLayout="horizontal"
      dataSource={product.product.reviews}
      renderItem={(item) => (
        <li>
          <Comment
            style={{ fontSize: "16px" }}
            author={`${item.user.name} ${item.user.surname}`}
            content={
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    verticalAlign: "bottom",
                  }}
                >
                  <div>
                    <Rate
                      value={item.rating}
                      disabled
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                  <Typography.Text
                    style={{ marginLeft: "1rem", paddingTop: "0.1rem" }}
                  >
                    {item.comment}
                  </Typography.Text>
                </div>
                <Divider />
              </>
            }
          />
        </li>
      )}
    />
  );
}
