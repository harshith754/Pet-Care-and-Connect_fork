"use client"
import { Button } from "antd";
import DogCard from "@/components/DogCard";
import { useEffect, useState } from "react";



const PetDisplay = ({sectionTitle, pets}) => {

  const [displayedPets,setDisplayedPets] = useState(5);
  const [showButton,setShowButton]=useState(pets.length <= 5? false : true);
  
  useEffect(()=>{
    if(pets.length > 5) setShowButton(true);
  },[pets])
  
  const handleLoadClick= ()=>{
    if(displayedPets+2 < pets.length ){
      setDisplayedPets((prev)=>prev+2)
    }
    else if(displayedPets+2 === pets.length){
      setDisplayedPets((prev)=>prev+2)
      setShowButton(false)
    }
    else {
      setDisplayedPets(pets.length)
      setShowButton(false)
    }
  }

  return (
    <div className="bg-aliceblue-100 flex flex-col items-center justify-center py-[60px]">
      
      <div className="flex flex-col py-0 px-[30px] items-center justify-center ">
        <div className="relative leading-[48px] text-[45px] text-darkslategray font-radio-canada">
          {sectionTitle}
        </div>
      </div>

      <div className="relative bg-deepskyblue w-[28%] min-w-[200px] h-[2px] mt-2 mb-8" />
      
      {
        pets?.length===0 && (
          <div className="font-mono text-darkslategray text-[18px]">
            No pets found of specified parameters.
            Please re-enter the paremeters.
          </div>
        )
          
      }
      
      <div className="flex flex-row flex-wrap justify-center gap-5  px-5">
        
        
        {
          pets?.slice(0,displayedPets).map((pet)=>
            (
              <DogCard 
                pet={pet}
                key={pet._id}
              />
            )
          )
        }
          
      
      </div>
      
      
      {
        showButton &&
        <Button
        className=" mt-10 flex justify-center cursor-pointer items-center text-[18px] text-white font-jua rounded-xl bg-deepskyblue"
        style={{ width: "220px",height:"50px"}}
        type="primary"
        size="middle"
        shape="default"
        onClick={handleLoadClick}
        >
          Show More

        </Button>
      }
    </div>
  );
};

export default PetDisplay;
