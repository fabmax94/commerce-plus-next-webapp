import { useFetch } from "../../../hooks/fetch";
import CompanyListDetail from "../../../components/companies/company-list-detail";
import { useContext, useEffect } from "react";
import { ContextLayout } from "../../../contexts/layout";
import { useRouter } from "next/router";

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
  const { setTitle } = useContext(ContextLayout);
  const router = useRouter();
  const { type } = router.query;

  useEffect(() => setTitle("Lojas"), []);

  const onClick = async (id: number) => {
    await router.push(`/companies/${type}/${id}`);
  };

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
      {companies?.map((company) => (
        <CompanyListDetail
          onClick={onClick}
          id={company.id}
          averageRate={company.averageRate}
          name={company.name}
          subType={company.subType}
          image={company.image}
        />
      ))}
    </div>
  );
};
export default Companies;
