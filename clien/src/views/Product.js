import React from "react";
import { useParams } from "react-router-dom";

import PageLayout from "./SiteLayout";
import ProductDetail from "../components/ProductDetail";

function Product() {
  const { id } = useParams();

  return (
    <PageLayout>
      <ProductDetail id={id} />
    </PageLayout>
  );
}

export default Product;
