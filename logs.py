import sqlite3

from flask import Flask, g, render_template

app = Flask(__name__)
DATABASE = "attendance.db"


def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


@app.route("/")
def index():
    db = get_db()
    cur = db.execute("SELECT * FROM attendance")
    rows = cur.fetchall()
    return render_template("index.html", rows=rows)


if __name__ == "__main__":
    app.run(debug=True)
