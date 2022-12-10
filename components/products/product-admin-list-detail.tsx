import { GrMoney } from "react-icons/gr";
import { AiOutlineNumber } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
              src={product.images && product.images[0]?.data}
            />
          </div>
        </td>
        <td className="">
          <div className="flex items-center pl-5">
            <p className="text-base font-medium leading-none text-gray-700 mr-2 break-words whitespace-normal">
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
          <div className="flex justify-end pr-3 space-x-3">
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
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
              className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none mr-2 hidden md:table-cell"
              onClick={() => {
                setSelectedProduct(product);
                setOpen(true);
              }}
            >
              Editar
            </button>

            <div className="flex justify-end pr-5 mt-1 md:hidden">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center">
                    <BsThreeDotsVertical
                      size={20}
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={() => {
                              setSelectedProduct(product);
                              setOpen(true);
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Editar
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </td>
      </tr>
      <tr className="h-3"></tr>
    </>
  );
};
