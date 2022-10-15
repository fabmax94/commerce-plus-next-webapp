import Main from "../../components/layouts/main";
import { usePush } from "../../hooks/push";
import { ChangeEvent, useState } from "react";

type CompanyFormType = {
  name: string;
  type: string;
  subType: string;
  location: string;
  image: string;
};

const CreateCompanies = () => {
  const { pushData } = usePush("companies/new");
  const [company, setCompany] = useState<CompanyFormType>();

  const handleSave = async () => {
    await pushData(company);
  };

  const handleChangeForm = (key, value) => {
    setCompany({ ...company, [key]: value });
  };

  return (
    <Main title="Nova Loja">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Nova loja
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Preencha as informações da loja.
              </p>
            </div>
          </div>
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  onClick={handleSave}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default CreateCompanies;
