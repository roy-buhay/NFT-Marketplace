
import { BiLogOut, BiWallet } from "react-icons/bi";
import { Web3Button } from "types";

export default function Button({ type, func }: Web3Button){
  return func ? (
    <button
      onClick={func}
      className={`${
        type === "Connect" ? "bg-white/5" : "bg-red-600/80"
      } text-white font-light tracking-[0.15rem] flex items-center space-x-2 px-6 py-2 rounded-xl`}
    >
      <BiWallet className="text-xl" />{" "}
      <span className="capitalize"> {type} </span>
    </button>
  ) : (
    <button>Loading...</button>
  );
}

