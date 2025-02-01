import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// Function to open the SQLite database
const openDB = async () => {
  return open({
    filename: path.join(process.cwd(), "components/data/attendance.db"), // Adjust path if needed
    driver: sqlite3.Database,
  });
};

// API Route to fetch attendance data
export async function GET() {
  try {
    const db = await openDB();
    // Use the correct column names: "rfid_uid" and "user"
    const attendanceRecords = await db.all("SELECT rfid_uid, user FROM attendance");

    return NextResponse.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return NextResponse.json({ error: "Failed to fetch attendance data" }, { status: 500 });
  }
}
