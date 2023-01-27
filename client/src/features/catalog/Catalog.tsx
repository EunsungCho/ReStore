import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);
  const products = useAppSelector(productSelectors.selectAll);
  const { productLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   agent.Catalog.list()
  //     .then((products) => setProducts(products))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    if (!productLoaded) dispatch(fetchProductsAsync());
  }, [productLoaded, dispatch]);

  // if (loading) return <LoadingComponent message="Loading Products..." />;
  if (status.includes("pending"))
    return <LoadingComponent message="Loading Products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
