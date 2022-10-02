import Layout from "../../components/Layout";
import { useFetch } from "../../hooks/fetch";
import CompanyListDetail from "../../components/companies/company-list-detail";

interface Company {
  id: number;
  name: string;
  subType: string;
  type: string;
  location: string;
  image: string;
  averageRate: number;
}

const Companies = () => {
  const { data: companies } = useFetch<Array<Company>>("companies");

  return (
    <Layout title="Lojas">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
        {companies?.map((company) => (
          <CompanyListDetail
            averageRate={company.averageRate}
            name={company.name}
            subType={company.subType}
            image={company.image}
          />
        ))}
      </div>
    </Layout>
  );
};
export default Companies;
