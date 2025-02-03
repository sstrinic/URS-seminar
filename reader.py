import sqlite3
import time

import board
import busio
from adafruit_pn532.i2c import PN532_I2C

i2c = busio.I2C(board.SCL, board.SDA)
pn532 = PN532_I2C(i2c, debug=False)

conn = sqlite3.connect("attendance.db")
cursor = conn.cursor()

cursor.execute(
    """CREATE TABLE IF NOT EXISTS attendance (
                     user TEXT,
                     rfid_uid TEXT,
                     timestamp TEXT,
                     room TEXT)"""
)

user_mapping = {
    "04bdb502": "Roko Quokka",
    "93e1122d": "Jurica Pađen",
    "04371e02751590": "Robert X",
    "0244a132": "Sinjski Zet",
    "0447b002751590": "Stipo X",
    "044e5fe2a47080": "Roko Busic",
    "99a711eb": "Stari Robo",
    "af0f7f0e": "Robo Purger",
}

room = "B510"


def log_attendance(rfid_uid):
    user = user_mapping.get(rfid_uid, "Unknown User")
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute(
        "INSERT INTO attendance (user, rfid_uid, timestamp, room) VALUES (?, ?, ?, ?)",
        (user, rfid_uid, timestamp, room),
    )
    conn.commit()

    print(f"Logged attendance for {user} with UID {rfid_uid} at {timestamp}")


while True:
    print("Waiting for card...")
    uid = pn532.read_passive_target(timeout=0.5)

    if uid is None:
        print("No card detected.")
    else:
        rfid_uid = uid.hex()
        log_attendance(rfid_uid)

    time.sleep(1)
