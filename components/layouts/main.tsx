import React, { ReactNode, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { BsPersonCircle } from "react-icons/bs";
import { ContextAuth } from "../../contexts/auth";
import { useRouter } from "next/router";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Main = ({ children, title = "This is the default title" }: Props) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { token, logOut } = useContext(ContextAuth);
  const [selectedItem, setSelectedItem] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSelectedItem(router.asPath);
  }, [router]);

  const handleClickLogOut = async () => {
    logOut();
    setOpenMenu(false);
    await router.push("/companies");
  };

  const renderMenu = () => {
    return token ? (
      <>
        <a
          href="components/layouts/main#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          id="user-menu-item-0"
        >
          Meu Perfil
        </a>
        <a
          href="components/layouts/main#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          id="user-menu-item-0"
        >
          Minhas Lojas
        </a>

        <a
          href="/companies"
          onClick={handleClickLogOut}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          id="user-menu-item-2"
        >
          Sair
        </a>
      </>
    ) : (
      <a
        href="/auth/login"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
        id="user-menu-item-2"
      >
        Entrar
      </a>
    );
  };

  const checkSelectedItem = (item) => item === selectedItem && "text-red-500";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-h-full">
        {!["Entrar", "Cadastrar-se"].includes(title) && (
          <nav className="bg-white">
            <div className="mx-auto border-b-gray-200 border px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div
                  onClick={() => setOpenMenu(false)}
                  className="flex items-center flex-1"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <a
                        href="/companies"
                        className={`text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium ${checkSelectedItem(
                          "/companies"
                        )}`}
                      >
                        Início
                      </a>

                      <a
                        href="/companies?type=restaurant"
                        className={`text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium ${checkSelectedItem(
                          "/companies?type=restaurant"
                        )}`}
                      >
                        Restaurantes
                      </a>

                      <a
                        href="/companies?type=market"
                        className={`text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium ${checkSelectedItem(
                          "/companies?type=market"
                        )}`}
                      >
                        Mercados
                      </a>

                      <a
                        href="/companies?type=beer"
                        className={`text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium ${checkSelectedItem(
                          "/companies?type=beer"
                        )}`}
                      >
                        Bebidas
                      </a>

                      <a
                        href="/companies?type=chemistry"
                        className={`text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium ${checkSelectedItem(
                          "/companies?type=chemistry"
                        )}`}
                      >
                        Farmácias
                      </a>
                      <a
                        href="/companies?type=pets"
                        className={`text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium ${checkSelectedItem(
                          "/companies?type=pets"
                        )}`}
                      >
                        Pets
                      </a>
                      <a
                        href="/companies?type=shopping"
                        className={`text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium ${checkSelectedItem(
                          "/companies?type=shopping"
                        )}`}
                      >
                        Shopping
                      </a>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="relative ml-3">
                    <BsPersonCircle
                      onClick={() => setOpenMenu((open) => !open)}
                      size={30}
                      className="text-gray-500 cursor-pointer"
                    />

                    <div
                      className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                        openMenu || "hidden"
                      }`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      {renderMenu()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3 overflow-x-auto">
                <a
                  href="components/layouts/main#"
                  className="text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium"
                  aria-current="page"
                >
                  Início
                </a>

                <a
                  href="components/layouts/main#"
                  className="text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium"
                >
                  Restaurantes
                </a>

                <a
                  href="components/layouts/main#"
                  className="text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium"
                >
                  Mercados
                </a>

                <a
                  href="components/layouts/main#"
                  className="text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium"
                >
                  Bebidas
                </a>

                <a
                  href="components/layouts/main#"
                  className="text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium"
                >
                  Farmácias
                </a>
                <a
                  href="components/layouts/main#"
                  className="text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium"
                >
                  Pets
                </a>
                <a
                  href="components/layouts/main#"
                  className="text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-xs font-medium"
                >
                  Shopping
                </a>
              </div>
            </div>
          </nav>
        )}
        <main onClick={() => setOpenMenu(false)}>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
