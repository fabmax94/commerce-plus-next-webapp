import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../../../contexts/auth";
import { User } from "../../../interfaces/user";
import { usePush } from "../../../hooks/push";
import { useRouter } from "next/router";

const Profile = () => {
  const { profile, updateProfile } = useContext(ContextAuth);
  const { pushData } = usePush(`auth/profile/${profile?.id}`, "PUT");
  const [user, setUser] = useState<User>();
  const handleChangeForm = (key: string, value: string) => {
    setUser({ ...user, [key]: value });
  };
  const router = useRouter();

  useEffect(() => {
    setUser({
      name: profile?.name,
      address: profile?.address,
      phone: profile?.phone,
    } as User);
  }, [profile]);
  const handleSave = async () => {
    const newUser = await pushData(user);
    updateProfile(newUser);
    router.reload();
  };
  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Perfil
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Preencha com suas informações.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nome
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Nome"
                        value={user?.name}
                        onChange={(e) =>
                          handleChangeForm("name", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Endereço
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Endereço"
                      value={user?.address}
                      onChange={(e) =>
                        handleChangeForm("address", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Telefone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Telefone"
                      value={user?.phone}
                      onChange={(e) =>
                        handleChangeForm("phone", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  onClick={handleSave}
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
