import { Product } from "../../interfaces/product";
import React from "react";

type ProductListDetailParam = {
  product: Product;
  onClick: (e: Product) => void;
};

const ProductListDetail = ({ product, onClick }: ProductListDetailParam) => {
  const { name, description, price, images } = product;
  return (
    <div
      className="flex flex-row hover:shadow-lg p-2.5 cursor-pointer transition duration-300 hover:delay-150 shadow-md border border-gray-300"
      onClick={() => onClick(product)}
    >
      <div className="flex flex-col flex-1">
        <h3 className="text-lg mb-3">{name}</h3>
        <span
          className="text-sm font-light text-zinc-500 mb-1"
          style={{ whiteSpace: "break-spaces" }}
        >
          {description.substring(0, 100)} {description.length > 100 && "..."}
        </span>
        <span className="text-base">R${price}</span>
      </div>
      <img
        alt="Imagem do produto"
        className="object-cover object-center w-24 mr-5 rounded-lg"
        style={{ height: "6rem" }}
        src={images && images[0]?.data}
      />
    </div>
  );
};

export default ProductListDetail;
