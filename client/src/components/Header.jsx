import React from "react";
import { Link} from "react-router-dom";


export default function () {



  

  return (
    <div className="bg-gradient-to-r from-[#1e52fd] to-[#f3f8f3] via-white">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/vote">
          <h1 className="font-medium text-white text-xl ">Sound</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="font-serif text-xl text-slate-700 hover:text-slate-900">Text to speech</li>
          </Link>
          <Link to="/eff">
            <li className="font-serif text-xl text-slate-700 hover:text-slate-900">Sound Effect</li>
          </Link>

         

          
         

            
            
        
        </ul>
      </div>
    </div>
  );
}