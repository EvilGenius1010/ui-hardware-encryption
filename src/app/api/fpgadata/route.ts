import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/app/api/fpgadata/fpgadata.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json({
      encrypted_data: data.encrypted_data,
      roundkeys: data.round_keys
    });
  } catch (error) {
    console.error('Error reading fpgadata:', error);
    return NextResponse.json(
      { error: 'Failed to load FPGA data' },
      { status: 500 }
    );
  }
}
