import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="h-full flex flex-col justify-center items-center">
      <Navbar />
      <Image 
        src={'/loading-spinner.gif'}
      
        width={300}
        height={500}
        alt="loading spinner"
        style={{objectFit: "contain"}}
      />

    </main>
  )
}