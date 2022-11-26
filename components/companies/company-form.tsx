import { BiCurrentLocation } from "react-icons/bi";
import React, { ChangeEvent, useState } from "react";
import { Company, SubType, Type } from "../../interfaces/company";
import Compressor from "compressorjs";
import { FaSpinner } from "react-icons/fa";

type CompanyFormProps = {
  handleSave: (e: Company) => void;
  initCompany?: Company;
  isSaving: boolean;
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const CompanyForm = ({
  handleSave,
  initCompany = null,
  isSaving,
}: CompanyFormProps) => {
  const [company, setCompany] = useState<Company>(initCompany);

  const handleChangeForm = (key, value) => {
    setCompany({ ...company, [key]: value });
  };

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.4,
      success: async (compressedResult) => {
        const fileBase64 = await toBase64(compressedResult);
        handleChangeForm("image", fileBase64);
      },
    });
  };

  return (
    <>
      <div className="bg-white px-4 pb-4 sm:px-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="space-y-6 bg-white py-5 w-full">
            <div>
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeForm("name", e.target.value)
                  }
                  value={company?.name}
                  className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de loja
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChangeForm("type", e.target.value)
                  }
                  value={company?.type}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  {Object.entries(Type).map((item) => (
                    <option value={item[0]}>{item[1]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-gray-700"
              >
                Categoria da loja
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChangeForm("subType", e.target.value)
                  }
                  value={company?.subType}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  {Object.entries(SubType).map((item) => (
                    <option value={item[0]}>{item[1]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-gray-700"
              >
                Endereço
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                  <BiCurrentLocation />
                </span>
                <input
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeForm("location", e.target.value)
                  }
                  value={company?.location}
                  className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagem
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center flex flex-col items-center">
                  {company?.image ? (
                    <img
                      alt="Imagem da loja"
                      className="object-cover object-center w-24 rounded-lg"
                      src={company?.image}
                    />
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Escolha uma foto</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        onChange={handleCompressedUpload}
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          onClick={() => handleSave(company)}
          disabled={isSaving}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isSaving && <FaSpinner className="spinner mr-2" />}
          Salvar
        </button>
      </div>
    </>
  );
};
