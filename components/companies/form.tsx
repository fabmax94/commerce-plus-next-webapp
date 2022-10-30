import { ChangeEvent, useEffect, useState } from "react";

export interface CompanyFormType {
  name: string;
  type: string;
  subType: string;
  location: string;
  image: string;
}

export const FormCompany = ({ handleSave, initCompany = null }) => {
  const [company, setCompany] = useState<CompanyFormType>(initCompany);

  useEffect(() => {
    setCompany(initCompany);
  }, [initCompany]);

  const handleChangeForm = (key, value) => {
    setCompany({ ...company, [key]: value });
  };

  return (
    <div className="mt-5 md:col-span-2 md:mt-0">
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeForm("name", e.target.value)
                }
                value={company?.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de loja
              </label>
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleChangeForm("type", e.target.value)
                }
                value={company?.type}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Restaurant">Restaurante</option>
                <option value="Pharmacy">Farmácia</option>
                <option value="Market">Mercado</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Categoria da loja
              </label>
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleChangeForm("subType", e.target.value)
                }
                value={company?.subType}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Meet">Carne</option>
                <option value="Chinese">Chinês</option>
              </select>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Imagem
              </label>
              <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeForm("image", e.target.value)
                }
                value={company?.image}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium text-gray-700"
              >
                Endereço
              </label>
              <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeForm("location", e.target.value)
                }
                value={company?.location}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            onClick={() => handleSave(company)}
            className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded"
          >
            <p className="text-sm font-medium leading-none text-white">
              Salvar
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
