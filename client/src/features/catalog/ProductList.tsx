import { Grid } from "@mui/material";
import { Product } from "../../app/models/products";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}
const ProductList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((p) => (
        <Grid item xs={4} key={p.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={p} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
