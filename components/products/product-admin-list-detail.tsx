import { GrMoney } from "react-icons/gr";
import { AiOutlineNumber } from "react-icons/ai";

export const ProductAdminListDetail = ({
  product,
  handleSave,
  setSelectedProduct,
  setOpen,
}) => {
  return (
    <>
      <tr className="focus:outline-none h-16 border border-gray-100 rounded">
        <td className="hidden md:table-cell">
          <div className="flex items-center pl-5">
            <img
              alt="Imagem do produto"
              className="object-cover object-center h-20 w-20 p-1 mr-5 rounded-lg"
              src={product.image}
            />
          </div>
        </td>
        <td className="">
          <div className="flex items-center pl-5">
            <p className="text-base font-medium leading-none text-gray-700 mr-2">
              {product.name}
            </p>
          </div>
        </td>
        <td className="pl-12 hidden md:table-cell">
          <div className="flex items-center">
            <GrMoney />
            <p className="text-sm leading-none text-gray-600 ml-2">
              R${product.price}
            </p>
          </div>
        </td>
        <td className="pl-5 hidden md:table-cell">
          <div className="flex items-center">
            <AiOutlineNumber />
            <p className="text-sm leading-none text-gray-600 ml-2">
              {product.size}
            </p>
          </div>
        </td>
        <td>
          <div className="flex justify-center space-x-3">
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  handleSave({
                    ...product,
                    isInactive: !e.target.checked,
                  })
                }
                id={`toggle-${product.id}`}
                checked={!product.isInactive}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"
              />
              <label
                htmlFor={`toggle-${product.id}`}
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <button
              className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none mr-2"
              onClick={() => {
                setSelectedProduct(product);
                setOpen(true);
              }}
            >
              Editar
            </button>
          </div>
        </td>
      </tr>
      <tr className="h-3"></tr>
    </>
  );
};
