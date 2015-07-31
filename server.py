from flask import Flask, request, render_template, redirect, flash, session
import os
from flask_debugtoolbar import DebugToolbarExtension
import jinja2
import secrets #check that this is correct
import model

app = Flask(__name__)

app.secret_key = secrets.secret_key #check that this is correct

app.jinja_env.undefined = jinja2.StrictUndefined

@app.route('/')
def home_page():
	return render_template('/splash-page.html')



@app.route('/measure')
def measure_page():
	choice = request.args.get('play')
	if choice == 'easy':
		return render_template("canvas.html")
	else:
		return render_template("canvas.html")

@app.route('/pattern')
def patter_page():
	
	return render_template("canvas.html")


@app.route("/login", methods=["GET"])
def show_login():
    """Show login form."""

    return render_template("login.html")


@app.route("/login", methods=["POST"])
def process_login():
    """Log user into site.
    Find the user's login credentials located in the 'request.form'
    dictionary, look up the user, and store them in the session.
    """

    email_input = request.form.get("email")
    pword_input = request.form.get("password")

    customer = model.User.get_by_email(email_input)
    if customer is None:
        flash("No such email")
        return redirect("/login")
    else:
        if pword_input != customer.pword:
            flash("Incorrect password")
            return redirect("/login")
        else:
            flash("Login successful!!")
            session['logged_in_customer_email'] = email_input
            return redirect("/")


@app.route("/logout")
def process_logout():
    del session['user_id']
    flash("You have been logged out")
    return redirect("/")


if __name__ == "__main__":
	port = int(os.environ.get("PORT", 5000))
	app.run(debug=True, port=port)
