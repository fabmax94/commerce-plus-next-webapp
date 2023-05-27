import { useFetch } from "../../../hooks/fetch";
import CompanyListDetail from "../../../components/companies/company-list-detail";
import React, { useContext, useEffect } from "react";
import { ContextLayout } from "../../../contexts/layout";
import { useRouter } from "next/router";
import { Company } from "../../../interfaces/company";

const Loading = () => (
  <div className="border shadow rounded-md p-4 max-w-sm w-full mx-auto mt-5">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-md bg-slate-700 h-20 w-20"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-700 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

function loadUrl(type: any) {
  return type !== "home" ? `companies?type=${type}` : "companies";
}

const Companies = () => {
  const { setTitle } = useContext(ContextLayout);
  const router = useRouter();
  const { type } = router.query;
  const { data: companies } = useFetch<Array<Company>>(loadUrl(type));

  useEffect(() => setTitle("Lojas"), []);

  const onClick = async (id: number) => {
    await router.push(`/companies/${type}/${id}`);
  };

  if (!type) {
    return (
      <>
        <Loading />
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
        {companies?.map((company) => (
          <CompanyListDetail
            onClick={onClick}
            id={company.id}
            averageRate={company.averageRate}
            averagePrice={company.averagePrice}
            name={company.name}
            type={company.type}
            subType={company.subType}
            image={company.image}
          />
        ))}
      </div>
      {companies?.length === 0 && (
        <span className="text-base font-medium leading-none text-gray-700 m-auto mt-10 flex justify-center">
          Nenhuma loja encontrada
        </span>
      )}
    </>
  );
};
export default Companies;
