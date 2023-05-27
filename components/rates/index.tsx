import { Drawer } from "../drawer";
import { usePush } from "../../hooks/push";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { Company } from "../../interfaces/company";
import { ContextAuth } from "../../contexts/auth";

type ScoreProps = {
  setScore: (e: number) => void;
  score: number;
};

const Score = ({ score, setScore }: ScoreProps) => {
  const options = Array.from({ length: 5 }, (x, i) => i);
  return (
    <div>
      {options.map((option) =>
        score >= option ? (
          <AiFillStar
            style={{ display: "inline" }}
            size={20}
            className="mr-1 cursor-pointer text-orange-500"
            onClick={() => setScore(option)}
          />
        ) : (
          <AiOutlineStar
            style={{ display: "inline" }}
            size={20}
            className="mr-1 cursor-pointer text-orange-500"
            onClick={() => setScore(option)}
          />
        )
      )}
    </div>
  );
};

type RatesProps = {
  setIsOpen: (e: boolean) => void;
  isOpen: boolean;
  company: Company;
  refresh: () => void;
};

export const Rates = ({ setIsOpen, isOpen, company, refresh }: RatesProps) => {
  const { rates } = company;
  const { profile } = useContext(ContextAuth);
  const [score, setScore] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const { pushData, isLoading } = usePush(`rates`, "PUT");

  const handleSave = async () => {
    await pushData({
      score,
      text,
      companyId: company.id,
      userId: profile.id,
    });
    await refresh();
  };

  const alreadyRating = rates.some((rate) => rate.user.id === profile?.id);

  return (
    <Drawer
      title={
        <div className="flex flex-col flex-1 items-center p-4">
          <span className="text-base font-sans">Avaliações da Loja</span>
          <span className="text-slate-500 font-light text-xs">
            {company.name}
          </span>
          <span className="text-orange-500 cursor-pointer mt-3 mb-1">
            <AiFillStar style={{ display: "inline" }} className="mr-1" />
            {company.averageRate}
          </span>
          <span className="text-slate-500 font-light text-xs">
            {rates.length === 1
              ? `${rates.length} avaliação`
              : `${rates.length} avaliações`}{" "}
            no total
          </span>
        </div>
      }
      setIsOpen={setIsOpen}
      isOpen={isOpen}
    >
      <div className="flex flex-col mr-10 ml-10">
        {rates.map((rate) => (
          <div className="border border-r-0 border-l-0 border-b-0 border-t-1 pt-3 pb-5">
            <div className="space-x-2">
              <span className="text-lg text-gray-700 font-normal">
                {rate.user.name}
              </span>
              <span className="text-orange-500 cursor-pointer align-top">
                <AiFillStar style={{ display: "inline" }} className="mr-1" />
                {rate.score}
              </span>
            </div>
            <span className="text-sm font-light text-zinc-500 mb-1">
              {rate.text}
            </span>
          </div>
        ))}
      </div>
      {profile && !alreadyRating && (
        <div className="mr-10 ml-10">
          <label
            htmlFor="company-website"
            className="block text-sm font-medium text-gray-700"
          >
            Sua avaliação
          </label>
          <div>
            <Score score={score} setScore={setScore} />
          </div>
          <div className="mt-1">
            <textarea
              rows={3}
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
            <div className="sm:flex sm:flex-row-reverse mt-5">
              <button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 items-center"
              >
                {isLoading && <FaSpinner className="spinner mr-2" />}
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
