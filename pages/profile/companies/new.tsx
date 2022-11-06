import { usePush } from "../../../hooks/push";
import {
  CompanyFormType,
  FormCompany,
} from "../../../components/companies/form";

const CreateCompany = () => {
  const { pushData } = usePush("companies");

  const handleSave = async (company: CompanyFormType) => {
    await pushData(company);
  };

  return (
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
        <FormCompany handleSave={handleSave} />
      </div>
    </div>
  );
};

export default CreateCompany;
