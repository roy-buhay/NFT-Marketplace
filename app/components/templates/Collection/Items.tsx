import { Key } from "react";
import { RegularCard } from "@module/Card";
import { INFT } from "types";

export interface IProps {
  data: INFT[]
}

export const Items:React.FC<IProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      {data && data.map((item: INFT, key: Key) => <RegularCard key={key} data={item} />)}
    </div>
  );
}
