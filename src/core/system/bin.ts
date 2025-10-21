import { exec } from "ags/process"

export function commandExists(command: string): boolean {
  try {
    exec(`which ${command}`);
    return true;
  } catch (error) {
    console.error(`Command [${command}] doesn't exist`)
    return false;
  }
}
