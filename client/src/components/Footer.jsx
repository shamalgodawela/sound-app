

export default function FooterCom() {
  return (

    <div className=" bg-gradient-to-r from-[#334dbe] to-[#f3f8f3] via-white h-full">
    <div className=" flex flex-col items-center border border-t-8 ">
      <div className="w-full max-w-7xl mx-auto ">
        <div className="flex  gap-28">
          <div className= "font-serif  ml-4  shadow-lg shadow-white bg-opacity-45  h-14   mt-5 rounded-full ">
           
            <div className="text-2xl  font-serif text-white">Sound</div>
          </div>
          <div className="flex gap-40 ml-20 justify-center items-center">
            <div className="mt-5">
              <h1 className="text-slate-900 text-lg font-serif whitespace-nowrap">AboutUs</h1>
              <hr className="w-[200px]" />
              <p className="text-slate-800">ABOUT US</p>
              <p className="text-slate-800">OUR SERVICES</p>
              <p className="text-slate-800">PRIVACY POLICY (MOBILE)</p>
            </div>

            <div className="">
              <h1 className="text-slate-900 text-lg font-serif whitespace-nowrap">ADVERTISE: </h1>
              <hr className="text-black" />
              <p className="text-slate-800 whitespace-nowrap">ADVERTISE WITH US</p>
              <p className="text-slate-800">RATE CARD (WEB)</p>
            </div>

            <div>
              <h1 className="text-slate-900 text-lg font-serif whitespace-nowrap">OTHER DIRECTORIES: </h1>
              <hr className="text-black" />
              <p className="text-slate-800 whitespace-nowrap">Collection.lk</p>
              <p className="text-slate-800 whitespace-nowrap">Touristdirectory.lk</p>
              
            </div>

            </div>
          <div className=" ml-[-750px] mt-48">
            <p className="text-slate-900 font-extralight">@copwirtgarbage.com</p>
          </div>
          
        </div>
      </div>
    </div>
    </div>
  );
}
