from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)
# database configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'mysql2024'
app.config['MYSQL_DB'] = 'chatapp'
# this is the instantiation
mysql = MySQL(app)  

#user method test - render admin page -user list
@app.route('/Users')
def users():
    cur = mysql.connection.cursor()
    cur.execute("SELECT firstName FROM chatapp.users")
    fetchData = cur.fetchall()
    cur.close()
    return str(fetchData)

# first render login page
@app.route('/')
def homepage():
    return render_template('index.html')

# register user
@app.route('/Register', methods=['GET','POST'])
def register_user():
    if request.method == 'POST':
        data = request.get_json()
        firstname    = data[0]['fname'] #request.form['fname']
        lastname     = data[1]['lname']
        emailaddress = data[2]['femail']
        password     = data[3]['fpassword']

        cursor = mysql.connection.cursor()
        cursor.execute(''' INSERT INTO users (firstName,lastName,emailAddress,password) VALUES(%s,%s,%s,%s)''',(firstname,lastname,emailaddress,password))
        mysql.connection.commit()
        cursor.close()
    return jsonify("success")

# @app.route('/login', methods=['GET','POST'])
# def login_user():
#     if request.method == 'POST':
#         data = request.get_json()
#         email    = data[0]['useremail']#request.form['useremail']
#         password = data[1]['userpassword']#request.form['userpassword']
#         cursor = mysql.connection.cursor()
#         cursor.execute("select * from users where emailAddress = %s ",(email,))
#         # Fetch one record and return the result
#         account = cursor.fetchone()
#         cursor.close()
#         # cursor.close()
#         # if result > 0:
#         #     message = "success"
#         # else :
#         #     message = "NoData" 
#     return" account"
#     #return render_template('login.html')

if __name__ == "__main__":
    app.run(debug=True)