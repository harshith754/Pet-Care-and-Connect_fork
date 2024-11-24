const PlansSection = () => {
  return (
    <div className=" w-full flex flex-col py-[60px] items-center justify-center bg-[url('/plans@3x.png')] bg-cover bg-[center] sm:hidden">
      
      <div className=" w-full  leading-[48px] font-medium text-center text-[45px] text-darkslategray font-radio-canada">
        Planning to adopt a pet?
      </div>
  
      <div className=" bg-darkslategray w-[28%] min-w-[200px] h-[2px] mt-3 mb-8" />


      <div className="mt-5 flex flex-wrap px-10 py-0 items-center justify-center gap-[25px] text-[30px] font-istok-web text-darkslategray">

        <div className="w-[300px] h-[120px] flex flex-col items-center justify-center">
            <b className="  tracking-[0.05em] leading-[32px] flex items-center">
              
                <p className="[margin-block-start:0] [margin-block-end:30px] leading-[40px] text-center">
                  Checklist for new Adopters
                </p>
                
              
            </b>
            <div className="  text-xl leading-[24px] font-jua">
              Help make the transition, as smooth as possible
            </div>
          
        </div>

        <div className="w-[340px] h-[150px] flex flex-col items-center justify-start ">
            <b className="  tracking-[0.05em] leading-[32px] flex items-center">
             
                <p className="[margin-block-start:0] [margin-block-end:30px] leading-[40px] text-center">
                  Pet Adoption FAQs
                </p>
                
             
            </b>
            <div className="  text-xl leading-[24px] font-jua">
              Get answers to questions you have never thought of
            </div>
        
        </div>
        
        <div className="w-[340px] h-[150px] flex flex-col items-center justify-center  ">
            <b className="  tracking-[0.05em] leading-[32px] flex items-center">
             
                <p className="[margin-block-start:0] [margin-block-end:30px] leading-[40px] text-center">
                  Vaccination and Healthcare                
                </p>
                
             
            </b>
            <div className="  text-xl leading-[24px] font-jua">
               Keep your companion healthy and cheerful
            </div>  
        </div>

      </div>
    </div>
  );
};

export default PlansSection;
