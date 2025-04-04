"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { useState,useRef } from "react";
import { BounceLoader } from "react-spinners";

export default function Home() {
  const router = useRouter();

  const [phrase, setPhrase] = useState<string|null>(null);
  const [isLoader,setLoader] = useState(false);
  const phraseRef = useRef<HTMLInputElement>(null);

  return (<>
  {isLoader && <div className="flex flex-rows items-center min-h-screen justify-center "><BounceLoader color="#ffffff" /></div>}
  {!isLoader && <>
      <h1 className="text-7xl font-bold text-white flex items-center justify-center pt-8">Superfast!</h1>
    <main className="flex min-h-screen flex-col items-center justify-center text-white space-y-6">
      
      <div className="flex flex-row justify-between space-x-4 ">
      <Card className="border  bg-black p-6 text-white  ">
        <CardContent>
        <Input type="email" placeholder="Enter a phrase to encrypt!" className="text-4xl" 
        ref={phraseRef} // Assign input to the ref
        />
        </CardContent>
      </Card>

      {/* <div className="w-full px-0">
  <Input type="email" placeholder="Enter a phrase to encrypt!" className="w-full text-4xl" />
</div> */}

<Card className="border  bg-black p-6 text-white ">
        <CardContent>
        <Input type="email" placeholder="Enter a password(optional)" className="text-4xl" />
        </CardContent>
      </Card>

      {/* <div className="w-full">
      <Input type="email" placeholder="Enter a password(optional)" className="text-4xl" />
      </div> */}
      </div>

      <Button className="text-4xl " onClick={
        ()=>{
          // router.push("/loading")
          const phraseValue = phraseRef.current?.value || "";
          setPhrase(phraseValue);
          console.log(phraseValue);
          setLoader(true)}
        }>Encrypt</Button>
    </main>
        </>}

        </>
  );
}

//encrypted text
/*

*/
