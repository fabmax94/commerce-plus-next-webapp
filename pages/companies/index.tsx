import Layout from "../../components/Layout";
import { useFetch } from "../../hooks/fetch";
import { Company } from "../../interfaces";
import CompanyListDetail from "../../components/companies/company-list-detail";

const Companies = () => {
  const { data: companies } = useFetch<Array<Company>>("companies");

  return (
    <Layout title="Lojas">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
        {companies?.map((company) => (
          <CompanyListDetail
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
