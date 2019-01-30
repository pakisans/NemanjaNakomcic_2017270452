import flask
import json
import os
import fnmatch
from flask import request
from flask import Blueprint
from utils.db_connection import mysql

user_services = Blueprint("user_services", __name__)

@user_services.route("/", methods=["GET"])
def users():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT id, username, name, lastname,moneyy FROM user")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@user_services.route("/<int:user_id>", methods=["GET"])
def user(user_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT id, username, name, lastname, moneyy FROM user WHERE id=%s", user_id)
    row = cursor.fetchone()

    return flask.jsonify(row)

@user_services.route("/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = dict(request.json)
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE user SET username=%(username)s,password=%(password)s, name=%(name)s,lastname=%(lastname)s,email=%(email)s WHERE id=%(id)s",data)
    db.commit()
        

    return flask.jsonify({"success": True})


@user_services.route("/<int:user_id>", methods=["PUT"])
def user_update(user_id):
   data = request.json
   db = mysql.get_db()
   cursor = db.cursor()
   cursor.execute('''UPDATE user SET moneyy=%s WHERE id=%s''', (data["moneyy"], user_id))
   db.commit()
   return ""
