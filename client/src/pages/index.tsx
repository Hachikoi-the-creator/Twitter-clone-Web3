import { BsImage } from "react-icons/bs";
import TripleLayout from "~/components/TripleLayout";
import MainSection from "~/components/home/MainSection";

// * place holders
const className = "bg-blue-950 outline outline-1 min-h-[60vh]";
function left() {
  return <h1 className={className}>hewo world</h1>;
}
function middle() {
  return <h1 className={className}>main content</h1>;
}
function right() {
  return <h1 className={className}>some ads nobody cares about</h1>;
}

export default function App() {
  return (
    <div>
      <TripleLayout Left={left} Main={MainSection} Right={right} />
    </div>
  );
}
