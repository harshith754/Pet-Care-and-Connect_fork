const Footer = () => {
  return (
    <footer className="w-full bg-deepskyblue flex flex-row py-5 items-center justify-between gap-3 sm:gap-5">
        <div className="ml-10 sm:ml-3 flex flex-row justify-start items-start">
            <img
              className="h-[40px] object-cover mx-10 sm:mx-0"
              alt=""
              src="/logo@2x.png"
            />
        </div>
        <div className="flex-1 flex flex-row items-center justify-end gap-[20px] sm:gap-1 text-[15px] sm:text-[8px] text-white font-inter mr-8 sm:mr-0">
          <div className="relative">Vaccination and Healthcare</div>
          <div className="self-stretch sm:hidden relative bg-aliceblue-100 w-[1px] " />
          <div className="relative">
            Contact :  kunderharshith3@gmail.com
            {/* <a href="https://www.linkedin.com/in/harshith-kunder-7660b822a/"
              className="no-underline text-blue-800 font-semibold px-3"
            >Linked In</a> */}
          </div>
          <div className="self-stretch sm:hidden relative bg-aliceblue-100 w-[1px] " />
          <div className="relative">{`Pet care connect© 2023 `}</div>
        </div>
   
    </footer>
  );
};

export default Footer;
