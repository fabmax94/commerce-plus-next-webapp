import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFetch } from "../../../../hooks/fetch";
import { ContextLayout } from "../../../../contexts/layout";
import { Modal } from "../../../../components/modal";
import { ProductForm } from "../../../../components/products/product-form";
import { usePush } from "../../../../hooks/push";
import { ProductAdminListDetail } from "../../../../components/products/product-admin-list-detail";
import { Product } from "../../../../interfaces/product";
import { Company } from "../../../../interfaces/company";

const filterCssSelected =
  "rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 mr-2 py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full";
const filterCssUnSelected =
  "rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 mr-2 py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full";

const MyProducts = () => {
  const { query } = useRouter();
  const { data: company } = useFetch<Company>(`companies/${query.id}`);
  const { data: products, reValidate } = useFetch<Product[]>(
    `companies/${query.id}/products`
  );
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product>(null);
  const { setTitle } = useContext(ContextLayout);
  const { pushData, isLoading } = usePush(
    selectedProduct ? `products/${selectedProduct?.id}` : "products",
    selectedProduct ? "PUT" : "POST"
  );

  useEffect(() => setTitle("Lojas"), []);

  if (!company || !products || !query.id) {
    return null;
  }

  const handleSave = async (product) => {
    await pushData({
      ...product,
      companyId: query.id,
    });
    setOpen(false);
    await reValidate();
  };

  const productsFiltered = products
    ?.sort((a, b) => a.id - b.id)
    .filter(
      (product) =>
        (filter === true && !product.isInactive) ||
        (filter === false && product.isInactive) ||
        filter === null
    );

  return (
    <div className="sm:px-6 w-full">
      <div className="px-4 md:px-10 py-4 md:py-7">
        <div className="flex items-center justify-between">
          <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            {company.name}
          </p>
        </div>
      </div>
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="sm:flex items-center justify-between">
          <div className="flex items-center overflow-x-auto h-16 p-1">
            <button
              onClick={() => setFilter(null)}
              className={
                filter === null ? filterCssSelected : filterCssUnSelected
              }
            >
              Tudo
            </button>
            <button
              onClick={() => setFilter(true)}
              className={
                filter === true ? filterCssSelected : filterCssUnSelected
              }
            >
              Ativos
            </button>
            <button
              onClick={() => setFilter(false)}
              className={
                filter === false ? filterCssSelected : filterCssUnSelected
              }
            >
              Inativos
            </button>
          </div>
          <button
            onClick={() => {
              setOpen(true);
              setSelectedProduct(null);
            }}
            className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded text-sm font-medium leading-none text-white cursor-pointer"
          >
            Adicionar Poduto
          </button>
        </div>
        <div className="mt-7 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <tbody>
              {productsFiltered.map((product) => (
                <ProductAdminListDetail
                  product={product}
                  setSelectedProduct={setSelectedProduct}
                  setOpen={setOpen}
                  handleSave={handleSave}
                />
              ))}
            </tbody>
          </table>
        </div>
        {products?.length === 0 && (
          <span className="text-base font-medium leading-none text-gray-700 m-auto mt-10 flex justify-center">
            Nenhum produto encontrado
          </span>
        )}
      </div>
      <Modal open={open} setOpen={setOpen}>
        <ProductForm
          handleSave={handleSave}
          isSaving={isLoading}
          initProduct={selectedProduct}
        />
      </Modal>
    </div>
  );
};

export default MyProducts;
