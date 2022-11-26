import { usePush } from "../../hooks/push";
import React, { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../../contexts/auth";
import { BiErrorAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { ContextLayout } from "../../contexts/layout";
import { FaSpinner } from "react-icons/fa";

interface LogInFormType {
  password: string;
  username: string;
}

const LogIn = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const { pushData, isLoading } = usePush("auth/login");
  const [user, setUser] = useState<LogInFormType>();
  const { logIn } = useContext(ContextAuth);
  const { setTitle } = useContext(ContextLayout);

  useEffect(() => setTitle("Entrar"), []);

  const handleSave = async () => {
    const response: {
      statusCode: number;
      access_token: string;
      email: string;
      name: string;
      address: string;
      phone: string;
    } = await pushData(user);
    if (response.statusCode !== 401) {
      logIn(response);
      await router.push("/companies/home");
    } else {
      setErrorMessage("E-mail ou senha inválido");
    }
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
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email"
              onChange={(e) => handleChangeForm("username", e.target.value)}
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

        <div className="space-y-2 flex flex-col">
          <button
            type="submit"
            onClick={handleSave}
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              {isLoading ? (
                <FaSpinner className="spinner mr-2" />
              ) : (
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
              )}
            </span>
            Entrar
          </button>
          <a className="self-end" href="/auth/signup">
            Criar uma conta
          </a>
        </div>
        {errorMessage && (
          <div className="flex items-center px-6 py-4 text-red-700 bg-red-100 rounded">
            <BiErrorAlt size={22} />
            <p className="ml-2 text-medium flex-1">{errorMessage}</p>
            <AiOutlineClose
              onClick={() => setErrorMessage("")}
              className="cursor-pointer"
              size={20}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default LogIn;
