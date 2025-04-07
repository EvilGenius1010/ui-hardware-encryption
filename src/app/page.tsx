"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { BounceLoader } from "react-spinners";

export default function Home() {
  const router = useRouter();
  const [isLoader, setLoader] = useState(false);
  const phraseRef = useRef<HTMLInputElement>(null);

  return (<>
    {isLoader && <div className="flex flex-rows items-center min-h-screen justify-center"><BounceLoader color="#ffffff" /></div>}
    {!isLoader && <>
      <h1 className="text-7xl font-bold text-white flex items-center justify-center pt-8">Hardware Encryption</h1>
      <main className="flex min-h-screen flex-col items-center justify-center text-white space-y-6">
        <div className="flex flex-row justify-between space-x-4">
          <Card className="border bg-black p-6 text-white">
            <CardContent>
              <Input 
                type="email" 
                placeholder="Enter a phrase to encrypt!" 
                className="text-4xl" 
                ref={phraseRef}
              />
            </CardContent>
          </Card>

          <Card className="border bg-black p-6 text-white">
            <CardContent>
              <Input 
                type="email" 
                placeholder="Enter a password(optional)" 
                className="text-4xl" 
              />
            </CardContent>
          </Card>
        </div>

        <Button className="text-4xl" onClick={() => {
          const phraseValue = phraseRef.current?.value || "";
          setLoader(true);
          router.push(`/displaydata?phrase=${encodeURIComponent(phraseValue)}`);
        }}>
          Encrypt
        </Button>
      </main>
    </>}
  </>);
}
