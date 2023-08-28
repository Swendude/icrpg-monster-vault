import { ReactNode } from "react";

interface StatBlockProps {
  name: string;
  value: number;
  icon: ReactNode;
}

const StatBlock = (props: StatBlockProps) => {
  return (
    <div className="flex flex-1 flex-col items-stretch overflow-hidden rounded-xl text-white">
      <div
        data-val={props.value}
        className="flex items-stretch justify-center gap-1 border-b-2 border-dashed border-white bg-red py-2"
      >
        {props.icon}
        <p className="font-hand text-lg">{props.name}</p>
      </div>

      <p className="bg-white py-2 text-center font-hand text-4xl text-dark ">
        {props.value}
      </p>
    </div>
  );
};

export default StatBlock;
