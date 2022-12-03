import { readFileSync } from 'fs';

export function readFile(file: string) {
  try { 
    const data = readFileSync(file, 'utf8');
    return data.toString();
  } catch(e: any) {
    console.log('Error:', e.stack);
  }  
} 