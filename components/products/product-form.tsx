import { GrMoney } from "react-icons/gr";
import { AiOutlineNumber } from "react-icons/ai";
import { ChangeEvent, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  size: number;
  description: string;
  image: string;
}

type ProductFormProps = {
  handleSave: (e: Product) => void;
  initProduct?: Product;
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
}: ProductFormProps) => {
  const [product, setProduct] = useState<Product>(initProduct);
  const handleChangeForm = (key, value) => {
    setProduct({ ...product, [key]: value });
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
                Tamanho
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                  <AiOutlineNumber />
                </span>
                <input
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeForm("size", e.target.value)
                  }
                  value={product?.size}
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 p-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagem
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center flex flex-col items-center">
                  {product?.image ? (
                    <img
                      alt="Imagem do produto"
                      className="object-cover object-center w-24 rounded-lg"
                      src={product?.image}
                    />
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
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          const fileBase64 = await toBase64(file);
                          console.log(fileBase64);
                          handleChangeForm("image", fileBase64);
                        }}
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
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          onClick={() => handleSave(product)}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Salvar
        </button>
      </div>
    </>
  );
};
