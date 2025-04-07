import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() { // Change this to export specifically for GET method
  try {
    // Read data from Vivado-exported file (e.g., JSON)
    const filePath = '/app/src/app/fpgadata.json'
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(data);

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
