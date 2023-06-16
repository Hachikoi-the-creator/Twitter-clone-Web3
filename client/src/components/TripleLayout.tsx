import { ComponentType, ReactElement, ReactNode } from "react";

type Props = {
  Left: ComponentType;
  Main: ComponentType;
  Right: ComponentType;
};

export default function TripleLayout({ Left, Main, Right }: Props) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 hidden md:block">
        <Left />
      </div>

      <div className="w-full md:w-1/2">
        <Main />
      </div>

      <div className="w-full md:w-1/4 hidden md:block">
        <Right />
      </div>
    </div>
  );
}
