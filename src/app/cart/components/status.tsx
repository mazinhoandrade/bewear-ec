import { Check } from "lucide-react";
import React from "react";

type Props = {
  status: string;
};
const Status = ({ status }: Props) => {
  return (
    <div className="flex items-center justify-center my-5 text-shadow-zinc-500 font-semibold gap-2">
      <div className="flex items-center gap-2 ">
        <div className="bg-green-500 rounded-full w-8 h-8 font-bold flex items-center justify-center">
          <Check size={16} color="white" />
        </div>
        Carrinho
        <div className="text-muted-foreground ">
          <hr className="bg-green-500 lg:border-t-2 lg:border-green-500 lg:my-5 rounded-full w-1.5 h-1.5 lg:w-32 lg:h-auto lg:rounded-none" />
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <div
          className={`${status === "identification" ? "border-2 border-green-300 text-green-500" : "bg-green-500 text-white"} rounded-full w-8 h-8 font-bold flex items-center justify-center `}
        >
          {status === "confirmation" ? <Check size={16} color="white" /> : 2}
        </div>
        Identificação
        <div className="text-muted-foreground ">
          <hr
            className={`${status === "confirmation" ? "lg:border-green-500 bg-green-500" : "border-gray-300"} border-t-2 border-gray-300 my-5  w-1.5 h-1.5 rounded-full lg:w-32 lg:h-auto lg:rounded-none`}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <div
          className={`${status === "confirmation" ? "border-2 border-green-300 text-green-500" : ""}border-2 border-gray-300 rounded-full w-8 h-8 font-bold flex items-center justify-center `}
        >
          3
        </div>
        Pagamento
      </div>
    </div>
  );
};

export default Status;
