import { FaHtml5, FaCss3Alt, FaJs, FaUniversalAccess } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { SiTypescript } from "react-icons/si";

import { Switch } from "@headlessui/react";
import Question from "./components/Question";
import { useState } from "react";
import { useEffect } from "react";
import api from "./service/service"

interface quiz{
  id:number,
  titulo:string;
}

const App = () => {
  const [enabled, setEnabled] = useState(false);
  const [quiz, setquiz] = useState<quiz[]>([]);

  const buscar = async () =>{
     try{
       const response = await api.get('/quizzes')
       console.log(response.data)
       setquiz(response.data)
     }catch(error){
        console.log(error)
     }
  }

  useEffect(()=>{
    buscar()
  },[])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      {/* Toggle Theme Switch */}
      <div className="absolute top-4 right-4 flex items-center">
        <Switch
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition data-[checked]:bg-blue-600"
          checked={enabled}
          onChange={setEnabled}
        >
          <span className="sr-only" aria-hidden="true">
            Toggle Theme
          </span>
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center">
        Welcome to the <br />{" "}
        <span className="text-blue-400">Frontend Quiz!</span>
      </h1>
      <p className="text-gray-400 mt-2">Pick a subject to get started.</p>

      {/* Quiz Options */}
      <div className="mt-6 w-full max-w-xs space-y-4">
        {[
          { label: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
          { label: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
          { label: "Javascript", icon: <FaJs className="text-yellow-500" /> },
          {
            label: "Accessibility",
            icon: <BiLogoTypescript className="text-blue-500" />,
          },
        ].map((item, index) => (
          <button
            key={index}
            className="flex cursor-pointer items-center w-full p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            <span className="mr-3 text-2xl">{item.icon}</span>
            <span className="text-lg font-medium">{item.label}</span>
          </button>
        ))}
        {/* <Question nome="HTML" icon={<FaHtml5 />}/> */}
        {quiz.length > 0 && (
            quiz.map((quiz)=>(
              <button
            key={quiz.id}
            className="flex cursor-pointer items-center w-full p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            {/* <span className="mr-3 text-2xl">{item.icon}</span> */}
            <span className="text-lg font-medium">{quiz.titulo}</span>
          </button>
            )) 

            )
        }
      </div>
    </div>
  );
};

export default App;
