import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { history } from "../..";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  // const [product, setProduct] = useState<Product | null>(null);
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id)
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  // const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(0);
  // const [submitting] = useState(false);
  const item = basket?.items.find((i) => i.productId === product?.id);

  // useEffect(() => {
  //   if (item) setQuantity(item.quantity);

  //   agent.Catalog.details(parseInt(id))
  //     .then((response) => setProduct(response))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }, [id, item]);

  useEffect(() => {
    if (item) setQuantity(item.quantity);

    if (!product) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  const handleInputChage = (event: any) => {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  };

  const handleUpdateCart = () => {
    console.log("handleUpdateCart clicked");
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      console.log("quantity", quantity);
      console.log("item.quantity", item?.quantity);
      console.log("updatedQuantity1", updatedQuantity);
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      console.log("updatedQuantity2", updatedQuantity);
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  };

  // if (loading) return <LoadingComponent message="Loading Product..." />;
  if (productStatus.includes("pending"))
    return <LoadingComponent message="Loading Product..." />;
  // if (!product) return <h3>Product Not Found</h3>;
  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Button onClick={() => history.push("/catalog")}>
                    Go back to catalog
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChage}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              onClick={handleUpdateCart}
              loading={status.includes("pending")}
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
