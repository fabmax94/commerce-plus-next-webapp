const CompanyListDetail = ({ image, name, subType }) => {
  return (
    <div className="flex flex-row hover:shadow-lg hover:rounded-lg py-2.5 cursor-pointer transition duration-300 hover:delay-150">
      <img
        className="object-cover object-center w-24 mr-2.5 rounded-lg"
        src={image}
      />
      <div className="space-y-2 self-center">
        <div>
          <span className="text-base">{name}</span>
        </div>
        <div className="flex flex-row text-sm text-slate-500 font-light space-x-1">
          <span>4.8</span>
          <span>•</span>
          <span>{subType}</span>
          <span>•</span>
          <span>3.9 km</span>
        </div>
        <div className="flex flex-row text-sm text-slate-500 font-light space-x-1">
          <span>43-53 min</span>
          <span>•</span>
          <span>R$9,99</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyListDetail;
