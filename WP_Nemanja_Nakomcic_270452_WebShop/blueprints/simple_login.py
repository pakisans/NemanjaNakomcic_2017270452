import flask
import os
import fnmatch
from flask import Blueprint
from flask import request
from flask import session

from utils.db_connection import mysql

simple_login = Blueprint("simple_login", __name__)

@simple_login.route("/login", methods=["POST"])
def login():
    login_user = request.json
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user WHERE username=%s AND password=%s", (login_user["username"], login_user["password"]))
    user = cursor.fetchone()

    if user is not None:
        session["user"] = user
        return flask.jsonify({"success": True})

    return flask.jsonify({"success": False})

@simple_login.route("/isLoggedin", methods=["GET"])
def is_loggedin():

    return flask.jsonify(session.get("user") is not None)

@simple_login.route("/loggedInUser", methods=["GET"])
def logged_in_user():
    if session.get("user") is not None:
        login_user = request.json
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM user WHERE id=%s", (session.get("user")["id"]))
        user = cursor.fetchone()


        files = os.listdir("static/media/avatars")
        avatar = fnmatch.filter(files, "user_{0}.*".format(user["id"]))
        if avatar != []:
            user["avatar"] = avatar[0]
        
        return flask.jsonify(user)
    else:
        return "Access denied!", 401

@simple_login.route("/logout", methods=["GET"])
def logout():
    session.pop("user", None)
    return flask.jsonify({"success": True})
