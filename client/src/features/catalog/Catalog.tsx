import { useState, useEffect } from "react";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";
import { wait } from "@testing-library/user-event/dist/utils";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  // const getData = async () => {
  //   await wait(1000);
  //   fetch("http://localhost:5000/api/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // };
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // useEffect(() => {
  //   const doGetData = async () => {
  //     await getData();
  //   };
  //   doGetData();
  // }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
