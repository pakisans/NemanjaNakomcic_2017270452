import datetime
import flask
from flask import Blueprint
from flask import request
from utils.db_connection import mysql

item_services = Blueprint("item_services", __name__)

@item_services.route("/", methods=["GET"])
def items():
     cursor = mysql.get_db().cursor()
     cursor.execute("SELECT * FROM items LEFT JOIN categories ON categories.id = categories_id LEFT JOIN user ON user.id = user_id")
     rows = cursor.fetchall()
     return flask.jsonify(rows)

@item_services.route("/<int:id_item>", methods=["GET"])
def item(id_item):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM items WHERE id=%s", (id_item, ))
    row = cursor.fetchone()
    return flask.jsonify(row)

@item_services.route("/", methods=["POST"])
def addProduct():
    
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()

    q = ("INSERT INTO items(name, description,image, price, quantity,user_id,categories_id)VALUES(%(name)s,%(description)s,%(image)s,%(price)s,%(quantity)s,%(user_id)s,%(categories_id)s)")   


    cursor.execute(q, data)
    db.commit()
    return flask.jsonify({"status": "done"}), 201

@item_services.route("/<int:id_item>", methods=["PUT"])
def update_item(id_item):
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute('''UPDATE items SET quantity=%s WHERE id=%s''', (data["quantity"], id_item))
    db.commit()
    return ""


