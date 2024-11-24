"use client"

import { Button } from "antd";
import {useRouter} from "next/navigation";

const CreateAdoptionSection = () => {

  const router = useRouter();
  return (
    <div className="w-full bg-aliceblue-100 flex flex-col py-10 items-center justify-center text-center text-[50px] text-darkslategray font-radio-canada">
      <div className=" relative leading-[48px] font-medium text-center text-[45px] text-darkslategray font-radio-canada mt-5">
      Want to place pet up for adoption?
      </div>
  
      <div className="relative bg-deepskyblue w-[28%] min-w-[200px] h-[2px] mt-3 mb-8" />


        <p className="text-[30px]">

          Create pet adoption Listing
        </p>
        <div className="flex flex-col items-center justify-center z-[0]">
          
          <Button
            className="flex justify-center cursor-pointer items-center text-[20px] text-white font-jua rounded-xl px-8 py-8 mb-5 bg-deepskyblue"
            type="primary"
            size="middle"
            shape="default"
            onClick={()=>{ router.push('/create-adoption')}}
          >
            Create Now!!
          </Button>
        </div>
    </div>
  );
};

export default CreateAdoptionSection;
