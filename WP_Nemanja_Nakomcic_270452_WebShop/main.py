import datetime
import flask
from flask import Flask
from utils.db_connection import mysql
from flask import request
from flask import session


from blueprints.simple_login import simple_login
from blueprints.registration_services import registration_services
from blueprints.item_services import item_services
from blueprints.category_services import category_services
from blueprints.adminpanel_services import adminpanel_services
from blueprints.user_services import user_services

app = Flask(__name__, static_url_path="")


app.secret_key = "RANDOM"


app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "root"
app.config["MYSQL_DATABASE_DB"] = "webshop"
app.config["MYSQL_DATABASE_HOST"] = "localhost"

mysql.init_app(app)


app.register_blueprint(simple_login)
app.register_blueprint(registration_services)
app.register_blueprint(user_services, url_prefix="/users")
app.register_blueprint(category_services, url_prefix="/categories")
app.register_blueprint(item_services, url_prefix="/item")
app.register_blueprint(adminpanel_services, url_prefix="/adminpanel")




@app.route("/")
@app.route("/index")
@app.route("/index.html")
def home():
    return app.send_static_file("index.html")
if __name__== '__main__':
	app.run("0.0.0.0", 5000, threaded=True,debug=True)