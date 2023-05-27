import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFetch } from "../../../../hooks/fetch";
import { ContextLayout } from "../../../../contexts/layout";
import { AiFillStar } from "react-icons/ai";
import ProductListDetail from "../../../../components/products/product-list-detail";
import { Product } from "../../../../interfaces/product";
import { Company, SubType, Type } from "../../../../interfaces/company";
import { Modal } from "../../../../components/modal";
import { ProductDetail } from "../../../../components/products/product-detail";
import { Rates } from "../../../../components/rates";

const Loading = () => (
  <div className="border shadow rounded-md p-4 max-w-sm w-full mx-auto mt-5">
    <div className="animate-pulse flex space-x-4">
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
      <div className="rounded-md bg-slate-700 h-20 w-20"></div>
    </div>
  </div>
);
const CompanyDetail = () => {
  const { query, push } = useRouter();
  const { data: company, reValidate } = useFetch<Company>(
    `companies/${query.id}`
  );
  const { data: products } = useFetch<Product[]>(
    `companies/${query.id}/products`
  );
  const [selectedProductId, setSelectedProductId] = useState<number>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { setTitle } = useContext(ContextLayout);

  const handleClickDetail = async (product: Product) => {
    await push(`/companies/${query.type}/2?productId=${product.id}`);
  };

  const handleOpen = async (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      await push(`/companies/${query.type}/${query.id}`);
    }
  };

  const getProductById = useCallback(
    () => products.find((product) => product.id === selectedProductId),
    [products, selectedProductId]
  );

  useEffect(() => setTitle(company?.name), [company]);

  useEffect(() => {
    if (query.productId) {
      setSelectedProductId(Number(query.productId));
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [query]);

  if (!company || !products || !query.id) {
    return (
      <>
        <Loading />
        <Loading />
      </>
    );
  }

  return (
    <div className="flex flex-col lg:max-w-6xl md:max-w-4xl m-auto">
      <div className="flex flex-col items-start sm:flex-row sm:items-center">
        <div className="flex flex-row items-center">
          <img
            alt="Imagem da loja"
            className="object-cover object-center w-12 mr-2.5 rounded-lg"
            src={company.image}
          />
          <h1 className="text-4xl">{company.name}</h1>
        </div>
        <div className="flex flex-row text-sm text-slate-500 font-light space-x-1 mt-1 sm:ml-5">
          <span
            className="text-orange-500 cursor-pointer"
            onClick={() => setOpenDrawer(true)}
          >
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
        {products
          ?.filter((product) => !product.isInactive)
          ?.map((product) => (
            <ProductListDetail onClick={handleClickDetail} product={product} />
          ))}
      </div>
      <Modal open={open} setOpen={handleOpen}>
        <ProductDetail product={getProductById()} owner={company.owner} />
      </Modal>
      <Rates
        isOpen={openDrawer}
        setIsOpen={setOpenDrawer}
        company={company}
        refresh={reValidate}
      />
    </div>
  );
};
export default CompanyDetail;
