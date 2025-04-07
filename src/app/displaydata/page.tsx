"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";

export default function DisplayData() {
  const searchParams = useSearchParams();
  const phrase = searchParams.get('phrase');
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fpgadata');
        const data = await response.json();
        if (data.success) {
          console.log(data.data)
          setApiData(data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-rows items-center min-h-screen justify-center">
        <BounceLoader color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Encryption Results</h1>
      <p className="text-xl mb-8">Original phrase: {phrase}</p>

      {apiData && (
        <div className="space-y-8">
          <Card className="border bg-black p-6">
            <CardContent>
            <h2 className="text-2xl text-white">Encrypted Data</h2>
              <p className="text-xl break-all p-4 rounded text-white">
                {apiData.encrypted_data}
            </p>
            </CardContent>
          </Card>

          <Card className="border bg-black p-6">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Round Keys</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Round</TableHead>
                    <TableHead className="text-white">Key Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiData.round_keys.map((key: string, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="text-white">{index + 1}</TableCell>
                      <TableCell className="text-white break-all font-mono">
                        {key}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
