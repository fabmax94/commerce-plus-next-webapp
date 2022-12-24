import { Product } from "../../interfaces/product";
import React from "react";
import { User } from "../../interfaces/user";
import { Carousel } from "react-responsive-carousel";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import "react-responsive-carousel/lib/styles/carousel.min.css";

type ProductDetailParam = {
  product: Product;
  owner: User;
};

export const ProductDetail = ({ product, owner }: ProductDetailParam) => {
  if (!product) {
    return null;
  }
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="p-3">
          <Carousel showThumbs={false} showStatus={false}>
            {product.images?.map((image) => (
              <div>
                <img
                  src={image.data}
                  className="object-cover object-center w-24 mr-5 rounded-lg"
                  style={{ height: "30rem" }}
                  alt="Imagem do produto"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col px-3">
          <h3 className="text-lg mb-3 text-center">{product.name}</h3>
          <span className="text-sm font-light text-zinc-500 mb-1">
            {product.description}
          </span>
          <span className="text-sm font-light">R${product.price}</span>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex-row-reverse space-x-2 flex flex-row">
        <a
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${owner.phone}&text=Olá, gostaria de tirar uma dúvida sobre o produto ${product.name}.`}
          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-2"
        >
          <FaRegMoneyBillAlt
            style={{ marginTop: "1px" }}
            className="mr-2"
            size={18}
          />
          Comprar
        </a>

        <a
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${owner.phone}&text=Olá, me interessei pelo produto ${product.name} e gostaria de comprá-lo.`}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <AiOutlineQuestionCircle
            style={{ marginTop: "1px" }}
            className="mr-2"
            size={18}
          />
          Tire dúvidas
        </a>
      </div>
    </>
  );
};
