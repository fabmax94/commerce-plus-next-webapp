import { usePush } from "../../hooks/push";
import React, { useContext, useEffect, useState } from "react";
import { ContextLayout } from "../../contexts/layout";
import { User } from "../../interfaces/user";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";

const SingUp = () => {
  const { pushData, isLoading } = usePush("auth/signup");
  const [user, setUser] = useState<User>();
  const { setTitle } = useContext(ContextLayout);
  const router = useRouter();

  useEffect(() => setTitle("Cadastre-se"), []);

  const handleSave = async () => {
    await pushData(user);
    await router.push("/auth/login");
  };

  const handleChangeForm = (key: string, value: string) => {
    setUser({ ...user, [key]: value });
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Commerce Plus
          </h2>
        </div>
        <div className="space-y-2 rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Nome
            </label>
            <input
              type="text"
              autoComplete="name"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Nome"
              onChange={(e) => handleChangeForm("name", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Endereço
            </label>
            <input
              type="text"
              autoComplete="address"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Endereço"
              onChange={(e) => handleChangeForm("address", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              Telefone
            </label>
            <input
              type="tel"
              autoComplete="phone"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Telefone"
              onChange={(e) => handleChangeForm("phone", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email"
              onChange={(e) => handleChangeForm("email", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Senha
            </label>
            <input
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Senha"
              onChange={(e) => handleChangeForm("password", e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            onClick={handleSave}
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <FaSpinner className="spinner mr-2" />
            ) : (
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            )}
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};
export default SingUp;
