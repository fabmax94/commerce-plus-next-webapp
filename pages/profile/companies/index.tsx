import { useFetch } from "../../../hooks/fetch";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { ContextLayout } from "../../../contexts/layout";
import { AiOutlineStar } from "react-icons/ai";
import { FaStoreAlt } from "react-icons/fa";
import { Modal } from "../../../components/modal";
import { CompanyForm } from "../../../components/companies/company-form";
import { usePush } from "../../../hooks/push";
import { CgTemplate } from "react-icons/cg";
import { Company, SubType, Type } from "../../../interfaces/company";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MyCompanies = () => {
  const { data: companies, reValidate } = useFetch<Array<Company>>(
    "companies/my-companies"
  );
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>(null);
  const { setTitle } = useContext(ContextLayout);
  const { pushData, isLoading } = usePush(
    selectedCompany ? `companies/${selectedCompany?.id}` : "companies",
    selectedCompany ? "PUT" : "POST"
  );

  useEffect(() => setTitle("Lojas"), []);

  const handleSave = async (company: Company) => {
    await pushData({
      name: company.name,
      location: company.location,
      image: company.image,
      type: company.type,
      subType: company.subType,
    });
    setOpen(false);
    await reValidate();
  };

  if (!companies) {
    return null;
  }

  return (
    <div className="sm:px-6 w-full">
      <div className="px-4 md:px-10 py-4 md:py-7">
        <div className="flex items-center justify-between">
          <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Minhas Lojas
          </p>
        </div>
      </div>
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="sm:flex items-center justify-between">
          <div className="flex items-center justify-end flex-1">
            <button
              onClick={() => {
                setSelectedCompany(null);
                setOpen(true);
              }}
              className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded text-sm font-medium leading-none text-white cursor-pointer"
            >
              Adicionar Loja
            </button>
          </div>
        </div>
        <div className="mt-7 overflow-x-auto" style={{ height: "100vh" }}>
          <table className="w-full whitespace-nowrap">
            <tbody>
              {companies?.map((company) => (
                <>
                  <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                    <td className="">
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">
                          {company.name}
                        </p>
                      </div>
                    </td>
                    <td className="pl-24 hidden md:table-cell">
                      <div className="flex items-center">
                        <FaStoreAlt />
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          {Type[company.type]}
                        </p>
                      </div>
                    </td>
                    <td className="pl-5 hidden md:table-cell">
                      <div className="flex items-center">
                        <CgTemplate />
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          {SubType[company.subType]}
                        </p>
                      </div>
                    </td>
                    <td className="pl-5 hidden md:table-cell">
                      <div className="flex items-center">
                        <AiOutlineStar />
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          {company.averageRate}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="hidden md:flex justify-end items-center mr-3">
                        <a
                          href={`/profile/companies/${company.id}/products`}
                          className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none mr-2"
                        >
                          Alterar Produtos
                        </a>
                        <button
                          onClick={() => {
                            setSelectedCompany(company);
                            setOpen(true);
                          }}
                          className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                        >
                          Editar
                        </button>
                      </div>
                      <div className="flex justify-end pr-5 mt-1 md:hidden">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
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
                                        setSelectedCompany(company);
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
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href={`/profile/companies/${company.id}/products`}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Alterar Produtos
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </td>
                  </tr>
                  <tr className="h-3"></tr>
                </>
              ))}
              {companies?.length === 0 && (
                <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                  <td>
                    <div className="flex items-center pl-5 justify-center">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        Nenhuma loja encontrada
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {companies?.length === 0 && (
          <span className="text-base font-medium leading-none text-gray-700 m-auto mt-10 flex justify-center">
            Nenhuma loja encontrada
          </span>
        )}
      </div>
      <Modal open={open} setOpen={setOpen}>
        <CompanyForm
          handleSave={handleSave}
          isSaving={isLoading}
          initCompany={selectedCompany}
        />
      </Modal>
    </div>
  );
};

export default MyCompanies;
