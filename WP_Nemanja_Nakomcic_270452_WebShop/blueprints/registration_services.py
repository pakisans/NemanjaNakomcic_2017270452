import flask
from flask import Blueprint
from flask import request
from utils.db_connection import mysql

registration_services = Blueprint("registration_services", __name__)

@registration_services.route("/registration", methods=["POST"])
def addUser():
    
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    
    query = ("INSERT INTO user(username, password, name,lastname, email)VALUES(%(username)s,%(password)s,%(name)s,%(lastname)s,%(email)s)")
    cursor.execute(query,data)

    #cursor.execute((data["name"], data["lastname"], data["username"], data["email"], data["password"]))
    db.commit()
    

    return flask.jsonify({"status": "done"}), 201
