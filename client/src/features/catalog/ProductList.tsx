import { Grid } from "@mui/material";
import { Product } from "../../app/models/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}
const ProductList = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map((p) => (
        <Grid item xs={3} key={p.id}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
