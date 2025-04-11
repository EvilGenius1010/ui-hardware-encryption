"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { useState, useRef, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type FPGADataStruct = {
  encrypted_data: string,
  roundkeys: number[]
}

export default function Home() {
  const [phrase, setPhrase] = useState<string>("");
  const [isLoader, setLoader] = useState(false);
  const [fpgaData, setFpgaData] = useState<FPGADataStruct|null>(null);
  const phraseRef = useRef<HTMLInputElement>(null);

  const handleEncrypt = async () => {
    const phraseValue = phraseRef.current?.value || "";
    setPhrase(phraseValue);
    setLoader(true);
    
    try {
      const response = await fetch('./api/fpgadata');
      if (!response.ok) {
        throw new Error('Failed to fetch FPGA data');
      }
      const data = await response.json();
      
      setFpgaData({
        encrypted_data: data.encrypted_data,
        roundkeys: data.roundkeys
      });
    } catch (error) {
      console.error('Error fetching FPGA data:', error);
      // Fallback to mock data if API fails
      setFpgaData({
        encrypted_data: `ENCRYPTED_${phraseValue}`,
        roundkeys: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {isLoader && <div className="flex flex-rows items-center min-h-screen justify-center"><BounceLoader color="#ffffff" /></div>}
      
      {!isLoader && !fpgaData && (
        <>
          <h1 className="text-7xl font-bold text-white flex items-center justify-center pt-8">Superfast!</h1>
          <main className="flex min-h-screen flex-col items-center justify-center text-white space-y-6">
            <div className="flex flex-row justify-between space-x-4">
              <Card className="border bg-black p-6 text-white">
                <CardContent>
                  <Input 
                    type="text" 
                    placeholder="Enter a phrase to encrypt!" 
                    className="text-4xl" 
                    ref={phraseRef}
                  />
                </CardContent>
              </Card>
              <Card className="border bg-black p-6 text-white">
                <CardContent>
                  <Input 
                    type="password" 
                    placeholder="Enter a password(optional)" 
                    className="text-4xl" 
                  />
                </CardContent>
              </Card>
            </div>
            <Button className="text-4xl" onClick={handleEncrypt}>
              Encrypt
            </Button>
          </main>
        </>
      )}

      {!isLoader && fpgaData && (
        <div className="min-h-screen p-8 text-white">
          <div className="text-4xl mb-8">Encrypted Data: {fpgaData.encrypted_data}</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Round</TableHead>
                <TableHead>Key Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fpgaData.roundkeys.map((key: number, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{key}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button 
            className="text-4xl mt-8" 
            onClick={() => {
              setFpgaData(null);
              setPhrase("");
            }}
          >
            Encrypt Again
          </Button>
        </div>
      )}
    </>
  );
}

//encrypted text
/*

*/
