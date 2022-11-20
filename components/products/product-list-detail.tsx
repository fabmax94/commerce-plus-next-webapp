import { Product } from "../../interfaces/product";

type ProductListDetailParam = {
  product: Product;
  onClick: (e: Product) => void;
};

const ProductListDetail = ({ product, onClick }: ProductListDetailParam) => {
  const { name, description, price, image } = product;
  return (
    <div
      className="flex flex-row hover:shadow-lg p-2.5 cursor-pointer transition duration-300 hover:delay-150 shadow-md border border-gray-300"
      onClick={() => onClick(product)}
    >
      <div className="flex flex-col flex-1">
        <h3 className="text-lg mb-3">{name}</h3>
        <span className="text-sm font-light text-zinc-500 mb-5">
          {description}
        </span>
        <span className="text-base">R${price}</span>
      </div>
      <img
        alt="Imagem do produto"
        className="object-cover object-center w-24 mr-5 rounded-lg"
        src={image}
      />
    </div>
  );
};

export default ProductListDetail;
