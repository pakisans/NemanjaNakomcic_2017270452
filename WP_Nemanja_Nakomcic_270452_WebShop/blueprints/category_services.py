import flask
from flask import Blueprint
from utils.db_connection import mysql

category_services = Blueprint("category_services", __name__)

@category_services.route("/", methods=["GET"])
def categories():
     cursor = mysql.get_db().cursor()
     cursor.execute("SELECT * FROM categories")
     rows = cursor.fetchall()

     return flask.jsonify(rows)

@category_services.route("/<int:category_id>", methods=["GET"])
def category(category_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM categories WHERE id=%s", category_id)
    row = cursor.fetchone()

    return flask.jsonify(row)

@category_services.route("/<string:category_name>", methods=["GET"])
def category_product(category_name):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM items i INNER JOIN categories c ON i.categories_id=c.id AND c.category_name=%s", category_name)
    rows = cursor.fetchall()
    return flask.jsonify(rows)

