import flask
from flask import Blueprint
from flask import request
from utils.db_connection import mysql

adminpanel_services = Blueprint("adminpanel_services", __name__)

@adminpanel_services.route("/users", methods=["GET"])
def get_users():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@adminpanel_services.route("/changeProfile", methods=["PUT"])
def update_user():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE user SET username=%s, name=%s, lastname=%s, email=%s, moneyy=%s WHERE id=%s'''
    cursor.execute(q, (data["username"], data["name"], data["lastname"], data["email"],data["moneyy"], data["id"]))
    db.commit()

    return flask.jsonify({"status": "done"}), 201

@adminpanel_services.route("/changeItem", methods=["PUT"])
def update_item():
     data = request.json
     db = mysql.get_db()
     cursor = db.cursor()
     q = '''UPDATE items SET name=%s, description=%s, image=%s, price=%s, quantity=%s WHERE id=%s'''
     cursor.execute(q, (data["name"], data["description"], data["image"], data["price"], data["quantity"], data["id"]))
     db.commit()

     return flask.jsonify({"status": "done"}), 201



@adminpanel_services.route("/deleteUser/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
     db = mysql.get_db()
     cursor = db.cursor()
     cursor.execute("DELETE FROM user WHERE id=%s", (user_id))
     db.commit()

     return ""

@adminpanel_services.route("/deleteItem/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
     db = mysql.get_db()
     cursor = db.cursor()
     cursor.execute("DELETE FROM items WHERE id=%s", (item_id,))
     db.commit()
     return ""

@adminpanel_services.route("/changeCategory", methods=["PUT"])
def update_category():
     data = request.json
     db = mysql.get_db()
     cursor = db.cursor()
     q = '''UPDATE categories SET category_name=%s WHERE id=%s'''
     cursor.execute(q, (data["category_name"], data["id"]))
     db.commit()

     return flask.jsonify({"status": "done"}), 201

@adminpanel_services.route("/addCategory", methods=["POST"])
def add_category():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute('''INSERT INTO categories(category_name)VALUES(%s)''', (data["category_name"]))
    db.commit()

    return flask.jsonify({"status": "done"}), 201

@adminpanel_services.route("/deleteCategory/<int:categories_id>", methods=["DELETE"])
def delete_category(categories_id):
     db = mysql.get_db()
     cursor = db.cursor()
     cursor.execute("SELECT id FROM categories WHERE id=%s", (categories_id))
     cursor.execute("DELETE FROM categories WHERE id=%s", (categories_id))
     db.commit()
     return ""

