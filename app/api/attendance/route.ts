import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const openDB = async () => {
  return open({
    filename: path.join(process.cwd(), "attendance.db"),
    driver: sqlite3.Database,
  });
};

export async function GET() {
  try {
    const db = await openDB();
    const attendanceRecords = await db.all("SELECT rfid_uid, user FROM attendance");

    return NextResponse.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return NextResponse.json({ error: "Failed to fetch attendance data" }, { status: 500 });
  }
}
