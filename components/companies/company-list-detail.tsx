import { AiFillStar } from "react-icons/ai";
import { SubType, Type } from "../../interfaces/company";

const CompanyListDetail = ({
  id,
  image,
  name,
  type,
  subType,
  averageRate,
  averagePrice,
  onClick,
}) => {
  return (
    <div
      className="flex flex-row hover:shadow-lg hover:rounded-lg p-2.5 cursor-pointer transition duration-300 hover:delay-150"
      onClick={() => onClick(id)}
    >
      <img
        className="object-cover object-center w-24 mr-2.5 rounded-lg"
        alt="Imagem da loja"
        src={image}
      />
      <div className="space-y-2 self-center">
        <div>
          <span className="text-base">{name}</span>
        </div>
        <div className="flex flex-row text-sm text-slate-500 font-light space-x-1">
          <span className="text-orange-500">
            <AiFillStar style={{ display: "inline" }} className="mr-1" />
            {averageRate}
          </span>
          <span>•</span>
          <span>R${averagePrice}</span>
        </div>
        <div className="flex flex-row text-sm text-slate-500 font-light space-x-1">
          <span>{Type[type]}</span>
          <span>•</span>
          <span>{SubType[subType]}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyListDetail;
