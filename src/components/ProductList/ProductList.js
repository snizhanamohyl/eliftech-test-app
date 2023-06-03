import ProductCard from "../ProductCard";
import { Сatalog, List } from "./ProductList.styled.js";

export default function ProductList({ products }) {
  return (
    <Сatalog>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Сatalog>
  );
}