from flask import Flask, request, render_template, redirect, flash, session
import os
# from flask_debugtoolbar import DebugToolbarExtension
import jinja2

import model

from model import User, connect_to_db, db


app = Flask(__name__)

app.secret_key = os.environ['SECRET_KEY'] 
#much source secrets.sh each time you enter virtual env, will go away after each session

app.jinja_env.undefined = jinja2.StrictUndefined

@app.route('/')
def home_page():
	return render_template('/splash-page.html')



@app.route('/measure')
def measure_page():
    """Allow input of measurements for pattern draft"""

    return render_template("measure.html")

@app.route('/pattern', methods=["POST"])
def pattern_page():
	"""Save measurement chart and image of pattern to db"""

	return render_template("canvas.html")

@app.route('/print')
def print_pattern():
    """Query image of pattern and scale up to print via AJAX"""

    return render_template("print.html")


@app.route("/login", methods=["GET"])
def show_login():
    """Show login form."""

    return render_template("login.html")


@app.route("/login", methods=["POST"])
def process_login():
    """Log user into site.
    Find the user's login credentials look up the user, and store them in the session.
    """
    email_input = request.form.get("email")
    pword_input = request.form.get("password")
    print "before line"
    customer = User.query.filter_by(email = email_input).first()

    print "after line"
    if customer:
        flash("No such email")
        return redirect("/login")
    else:
        if pword_input != user.password:
            flash("Incorrect password")
            return redirect("/login")
        else:
            flash("Login successful!!")
            session['logged_in_customer_email'] = email_input

    return render_template("profile.html")


@app.route('/profile')
def user_profile_page(id_user):
    """Display user information and saved blocks"""

    user_id = id_user
    user = User.query.filter(User.user_id == user_id).one()

    return render_template("profile.html", user=user)


@app.route("/logout")
def process_logout():
    del session['logged_in_customer_email']
    flash("You have been logged out")
    return redirect("/")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    connect_to_db(app)
    app.run(debug=True, port=port)
