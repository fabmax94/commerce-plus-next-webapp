import { usePush } from "../../../../hooks/push";
import {
  CompanyFormType,
  FormCompany,
} from "../../../../components/companies/form";
import { useRouter } from "next/router";
import { useFetch } from "../../../../hooks/fetch";

interface Company {
  id: number;
  name: string;
  subType: string;
  type: string;
  location: string;
  image: string;
  averageRate: number;
}

const EditCompany = () => {
  const { query } = useRouter();
  const { data: company } = useFetch<Company>(`companies/${query.id}`);
  const { pushData } = usePush(`companies/${query.id}/edit`, "PUT");

  const handleSave = async (company: CompanyFormType) => {
    await pushData(company);
  };

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Editar loja
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Altere as informações da loja.
            </p>
          </div>
        </div>
        <FormCompany handleSave={handleSave} initCompany={company} />
      </div>
    </div>
  );
};

export default EditCompany;
