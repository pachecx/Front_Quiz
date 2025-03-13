import { FaHtml5, FaCss3Alt, FaJs, FaUniversalAccess } from "react-icons/fa";

interface typeQuestion{
  nome: string,
  icon: string
}

const Question = ({nome, icon}:typeQuestion) => {
  return (
    <div className="mt-6 w-full max-w-xs space-y-4">
      <button className="flex cursor-pointer items-center w-full p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition">
        <span className="mr-3 text-2xl">
          {icon}
        </span>
        <span className="text-lg font-medium">{nome}</span>
      </button>
    </div>
  );
};

export default Question;
