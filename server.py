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



@app.route('/start')
def measure_page():
    """Allow input of measurements to find side template pattern"""

    return render_template("basic-measure-page.html")

@app.route('/pattern', methods=["POST"])
def pattern_page():
	"""Save measurement chart and image of pattern to db"""

	return render_template("canvas.html")

@app.route('/front-draft')
def front_draft_page():
    """Use template measurements to draft a frotn block and allow users to change block to fit them using inputs"""
    bust_input = request.args.get("bust")
    waist_input = request.args.get("waist")
    return render_template("front-draft.html", bust_input=bust_input, waist_input=waist_input)

@app.route('/back-draft')
def back_draft_page():
    """Save measurement chart and image of pattern to db"""
    bust_input = request.args.get("bust")
    waist_input = request.args.get("waist")
    full_length_input = request.args.get("full-length")
    center_front_input = request.args.get("center-front")
    front_shoulder_slope_input = request.args.get("front-shoulder-slope")
    strap_input = request.args.get("strap")
    front_across_shoulder_input = request.args.get("front-across-shoulder")
    across_chest_input = request.args.get("across-chest")
    bust_depth_input = request.args.get("bust-depth")
    shoulder_length_input = request.args.get("shoulder-length")
    bust_arc_input = request.args.get("bust-arc")
    bust_span_input = request.args.get("bust-span")
    waist_arc_input = request.args.get("waist-arc")
    dart_placement_input = request.args.get("dart-placement")
    side_length_input = request.args.get("side-length")


    return render_template("back-draft.html", 
                            bust_input=bust_input, 
                            waist_input=waist_input,
                            full_length_input=full_length_input,
                            center_front_input=center_front_input,
                            front_shoulder_slope_input=front_shoulder_slope_input,
                            strap_input=strap_input,
                            front_across_shoulder_input=front_across_shoulder_input,
                            across_chest_input=across_chest_input,
                            bust_depth_input=bust_depth_input,
                            shoulder_length_input=shoulder_length_input,
                            bust_arc_input=bust_arc_input,
                            bust_span_input=bust_span_input,
                            waist_arc_input=waist_arc_input,
                            dart_placement_input=dart_placement_input,
                            side_length_input=side_length_input
                            )

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
        if pword_input != customer.password:
            flash("Incorrect password")
            return redirect("/login")
        else:
            flash("Login successful!!")
            session['logged_in_customer_email'] = email_input
            return render_template("profile.html", user=customer)
        
    else:
        iflash("No such email")
        return redirect("/login")




@app.route('/profile')
def user_profile_page():
    """Display user information and saved blocks"""

    user_email = session['logged_in_customer_email']
    user = User.query.filter(User.email == user_email).one()

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
