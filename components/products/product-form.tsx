import { GrMoney } from "react-icons/gr";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import React, { ChangeEvent, useState } from "react";
import { BiErrorAlt } from "react-icons/bi";
import { Product } from "../../interfaces/product";
import Compressor from "compressorjs";
import { FaSpinner } from "react-icons/fa";

type ProductFormProps = {
  handleSave: (e: Product) => void;
  initProduct?: Product;
  isSaving: boolean;
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const ProductForm = ({
  handleSave,
  initProduct = null,
  isSaving,
}: ProductFormProps) => {
  const [product, setProduct] = useState<Product>(initProduct);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleChangeForm = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.4,
      success: async (compressedResult) => {
        const fileBase64 = await toBase64(compressedResult);
        const newImages = product.images
          ? [...product.images, { data: fileBase64 }]
          : [{ data: fileBase64 }];
        handleChangeForm("images", newImages);
      },
    });
  };

  const handleClick = async () => {
    if (
      product?.name &&
      product?.description &&
      product?.images?.length &&
      product?.price
    ) {
      await handleSave(product);
    } else {
      setErrorMessage("Preencha todos os campos corretamente");
    }
  };

  return (
    <>
      <div className="bg-white px-4 pb-4 sm:px-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="space-y-6 bg-white py-5 w-full">
            <div>
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeForm("name", e.target.value)
                  }
                  value={product?.name}
                  className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-gray-700"
              >
                Preço
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                  <GrMoney />
                </span>
                <input
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeForm("price", e.target.value)
                  }
                  value={product?.price}
                  className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-gray-700"
              >
                Descrição
              </label>
              <div className="mt-1">
                <textarea
                  onChange={(e) =>
                    handleChangeForm("description", e.target.value)
                  }
                  value={product?.description}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagem
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center flex flex-col items-center">
                  {product?.images?.length ? (
                    <div className="flex flex-row space-x-2">
                      {product.images.map((image, index) => (
                        <div className="flex flex-col">
                          <AiFillCloseCircle
                            className="self-end cursor-pointer"
                            onClick={() =>
                              handleChangeForm(
                                "images",
                                product.images.filter(
                                  (_, imageIndex) => imageIndex !== index
                                )
                              )
                            }
                          />
                          <img
                            alt="Imagem do produto"
                            className="object-cover object-center w-24 rounded-lg"
                            style={{ height: "6rem" }}
                            src={image.data}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Escolha uma foto</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        onChange={handleCompressedUpload}
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="flex items-center px-6 py-4 text-red-700 bg-red-100 rounded">
          <BiErrorAlt size={22} />
          <p className="ml-2 text-medium flex-1">{errorMessage}</p>
          <AiOutlineClose
            onClick={() => setErrorMessage("")}
            className="cursor-pointer"
            size={20}
          />
        </div>
      )}
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          onClick={handleClick}
          disabled={isSaving}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 items-center"
        >
          {isSaving && <FaSpinner className="spinner mr-2" />}
          Salvar
        </button>
      </div>
    </>
  );
};
