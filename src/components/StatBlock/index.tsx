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
        className="flex items-stretch justify-center gap-1 border-b-2 border-dashed border-white bg-red py-2 data-[val='0']:border-inactive"
      >
        {props.icon}
        <p className="font-hand text-lg">{props.name}</p>
      </div>

      <p
        data-val={props.value}
        className="bg-white py-2 text-center text-2xl text-dark data-[val='0']:bg-inactive"
      >
        {props.value !== 0 && props.value}
      </p>
    </div>
  );
};

export default StatBlock;
