import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useFetch } from "../../../../hooks/fetch";
import { ContextLayout } from "../../../../contexts/layout";
import { AiFillStar } from "react-icons/ai";
import ProductListDetail from "../../../../components/products/product-list-detail";
import { Product } from "../../../../interfaces/product";
import { Company, SubType, Type } from "../../../../interfaces/company";

const CompanyDetail = () => {
  const { query } = useRouter();
  const { data: company } = useFetch<Company>(`companies/${query.id}`);
  const { data: products } = useFetch<Product[]>(
    `companies/${query.id}/products`
  );
  const { setTitle } = useContext(ContextLayout);

  useEffect(() => setTitle(company?.name), [company]);

  if (!company || !products || !query.id) {
    return null;
  }

  return (
    <div className="flex flex-col lg:max-w-6xl md:max-w-4xl m-auto">
      <div className="flex flex-row items-center">
        <img
          alt="Imagem da loja"
          className="object-cover object-center w-12 mr-2.5 rounded-lg"
          src={company.image}
        />
        <h1 className="text-4xl">{company.name}</h1>
        <div className="flex flex-row text-sm text-slate-500 font-light space-x-1 ml-5">
          <span className="text-orange-500">
            <AiFillStar style={{ display: "inline" }} className="mr-1" />
            {company.averageRate}
          </span>
          <span>•</span>
          <span>R${company.averagePrice}</span>
          <span>•</span>
          <span>{Type[company.type]}</span>
          <span>•</span>
          <span>{SubType[company.subType]}</span>
        </div>
      </div>

      {products?.length === 0 && (
        <span className="text-base font-medium leading-none text-gray-700 m-auto mt-10">
          Nenhum produto encontrado
        </span>
      )}
      <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-4 mt-10">
        {products?.map((product) => (
          <ProductListDetail product={product} />
        ))}
      </div>
    </div>
  );
};
export default CompanyDetail;
