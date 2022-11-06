import { useFetch } from "../../../hooks/fetch";
import { useContext, useEffect, useState } from "react";
import { ContextLayout } from "../../../contexts/layout";
import { AiOutlineStar } from "react-icons/ai";
import { FaStoreAlt } from "react-icons/fa";
import { Modal } from "../../../components/modal";
import { CompanyForm } from "../../../components/companies/company-form";
import { usePush } from "../../../hooks/push";
import { CgTemplate } from "react-icons/cg";
import { Company } from "../../../interfaces/company";

const MyCompanies = () => {
  const { data: companies, reValidate } = useFetch<Array<Company>>("companies");
  const { pushData } = usePush("companies");
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>(null);
  const { setTitle } = useContext(ContextLayout);

  useEffect(() => setTitle("Lojas"), []);

  const handleSave = async (company: Company) => {
    await pushData(company);
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
        <div className="mt-7 overflow-x-auto">
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
                          {company.type}
                        </p>
                      </div>
                    </td>
                    <td className="pl-5 hidden md:table-cell">
                      <div className="flex items-center">
                        <CgTemplate />
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          {company.subType}
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
                      <div className="flex justify-end items-center mr-3">
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
                    </td>
                  </tr>
                  <tr className="h-3"></tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <CompanyForm handleSave={handleSave} initCompany={selectedCompany} />
      </Modal>
    </div>
  );
};

export default MyCompanies;
