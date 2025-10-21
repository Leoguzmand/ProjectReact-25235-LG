import React from "react";
import ProductList from "../components/ProductList";

const Electronics = () => {
  return (
    <div className="container">
      <h1>Descuentos en productos de Electrónica</h1>
      <ProductList category="electronics" />
    </div>
  );
};

export default Electronics;
