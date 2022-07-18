import { IAttribute } from "types";

const Details: React.FC<any> = ({data}) => {
  const dataObj = data[0]
  const attr: IAttribute[] = dataObj.attributes
    return (
      <div className="grid grid-cols-3 gap-4">
        {attr.map((data, idx) => {
            return (
              <div key={idx} className="bg-[#131313] rounded-lg p-4">
                <small className="block text-white font-light tracking-wide text-[10px] capitalize">
                  {data.key}
                </small>
                <span className="line-clamp-1 text-white">{data.value}</span>
                <small className="text-xs text-white/60 font-light">
                  5% rarity
                </small>
              </div>
            );
          })
        }
      </div>
    );
  };
  
  export default Details;
  