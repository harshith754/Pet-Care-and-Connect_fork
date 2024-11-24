"use client"

import { Button } from "antd";

import NavbarH from "@/components/NavbarH";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

import { useRouter } from "next/navigation";

const HeroSection = () => {
  

  const router= useRouter()
  const [city,setCity] = useState("");
  const [petType,setPetType] = useState("");

  const handleSelect = (value, identifier) => {
    if (identifier === "city") {
      setCity(value);
    } else if (identifier === "petType") {
      setPetType(value);
    } 
  }
  
  const handleSubmit = ()=>{
    const queryParams ={
      city,
      petType,
    }
    const queryString = Object.entries(queryParams)
      .filter(([key, value]) => value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');


    router.push(`/find-pets?${queryString}`)
  }
  

  return ( 
    <header className="w-full flex flex-col py-[22px] items-center justify-center bg-[url('/header1@3x.png')] bg-cover bg-[top]">
      
      <NavbarH />



      <div className="flex flex-col w-full py-[40px] items-center justify-center">
        <div className=" w-full flex flex-col items-center justify-center gap-[30px]">
          
          <div className="w-full flex flex-col items-center justify-center ">
            <div className="relative leading-[80px] font-semibold text-[50px] text-white font-radio-canada mt-[60px] text-center sm:text-[38px] sm:leading-[45px]">
              Find your new soulmate
            </div>
            <div className="relative text-[white] text-[28px] text-center leading-[60px] font-puritan sm:text-[23px] sm:leading-[30px] sm:mt-5 px-5">
  
              Your Journey to Furry Companionship Begins Here
            </div>
          </div>

      
          <div className="w-[70%] flex flex-row sm:flex-col rounded-lg bg-white py-1.5 px-0 pr-1.5 items-center justify-between sm:justify-center sm:py-3 sm:gap-2">
            <div className="w-full flex flex-wrap items-center justify-between sm:justify-center gap-2 text-sm px-5 sm:px-3">
              <DropdownMenu
                value={city}
                options={[
                  { label: "Mumbai City"  ,value: "Mumbai City" },
                  { label: "Mumbai Suburban"  ,value: "Mumbai Suburban" },
                  { label: "Pune"  ,value: "Pune" },
                  {label: "Others"  , value: "Others" },
                ]}
                placeholder={"Enter your city"}
                handleClick={(value) => handleSelect(value, "city")} 
              />

              <DropdownMenu               
                value={petType}
                options={[
                  { label:"Dog", value: "Dog" },
                  { label:"Cat",  value: "Cat" },
                  { label:"Bird", value: "Bird" },
                  { label:"Others", value: "Others" },
                ]}
                placeholder={"Select pet type"}
                handleClick={(value) => handleSelect(value, "petType")} 
              />
              
            </div>
            <Button
              className="flex justify-center cursor-pointer items-center text-[18px] text-white font-jua rounded-lg bg-deepskyblue "
              style={{ width: "150px",height:"50px"}}
              type="primary"
              size="middle"
              shape="default"
              onClick={handleSubmit}

             
              
            >
              Search
            </Button>
          </div>
  
        </div>
      </div>
     
    </header>
  );
};

export default HeroSection;
