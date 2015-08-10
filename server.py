from flask import Flask, request, jsonify, render_template, redirect, flash, session
import os
# from flask_debugtoolbar import DebugToolbarExtension
import jinja2

import model

from model import User, Size_Chart, Measurement_Chart, connect_to_db, db


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


@app.route('/front-draft')
def front_draft_page():
    """Use template measurements to draft a front block that closest fit them and allow users to change block to fit them using inputs, """


    session['basic_measurements'] = {
        'nickname_input': request.args.get("nickname"),
        'bust_input' : request.args.get("bust"),
        'waist_input' : request.args.get("waist")
    }


    if session['basic_measurements']['bust_input'] / session['basic_measurements']['waist_input'] > 1.40:
        size_chart = Size_Chart.query.filter(Size_Chart.bust >= session['basic_measurements']['bust_input'], Size_Chart.bust < session['basic_measurements']['bust_input']-1 ).one()
    else:
        pass


    size_chart = Size_Chart.query.filter(Size_Chart.size_id == 8).one()

    return render_template("front-draft.html")


@app.route('/get-measurements', methods=['GET'])
def front_draft_ajax():
    """Return canvas update"""

    print session['measurements']

    return jsonify(session['measurements'])


@app.route('/back-draft')
def back_draft_page():
    """Save measurement chart and image of pattern to db"""

    #Meaasurements From Front Draft
    session['front_measurements'] = {
    'full_length_input' : request.args.get("full-length"),
    'center_front_input' : request.args.get("center-front"),
    'front_shoulder_slope_input' : request.args.get("front-shoulder-slope"),
    'strap_input' : request.args.get("strap"),
    'front_across_shoulder_input' : request.args.get("front-across-shoulder"),
    'across_chest_input' : request.args.get("across-chest"),
    'bust_depth_input' : request.args.get("bust-depth"),
    'shoulder_length_input' : request.args.get("shoulder-length"),
    'bust_arc_input' : request.args.get("bust-arc"),
    'bust_span_input' : request.args.get("bust-span"),
    'waist_arc_input' : request.args.get("waist-arc"),
    'dart_placement_input' : request.args.get("dart-placement"),
    'side_length_input' : request.args.get("side-length")
    }


    return render_template("back-draft.html", session=session)


@app.route('/pattern')
def pattern_page():
    """Save measurement chart and image of pattern to db"""

    session['back_measurements'] = {
    "full_length_back_input" : request.args.get("full-length-back"),
    "center_back_input" : request.args.get("center-back"),
    "back_shoulder_slope_input" : request.args.get("back-shoulder-slope"),
    "across_back_input" : request.args.get("across-back"),
    "back_shoulder_length_input" : request.args.get("back-shoulder-length"),
    "back_arc_input" : request.args.get("back-arc"),
    "waist_arc_back_input" : request.args.get("waist-arc-back"),
    "back_neck_input" : request.args.get("back-neck"),
    "back_across_shoulder_input" : request.args.get("back-across-shoulder"),
    "back_dart_intake_input" : request.args.get("back-dart-intake")
    } 

    return render_template("canvas.html", session=session)
                            

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
        flash("No such email")
        return redirect("/login")




@app.route('/profile')
def user_profile_page():
    """Display user information and saved blocks"""

    user_email = session['logged_in_customer_email']
    user = User.query.filter(User.email == user_email).one()

    return render_template("profile.html", user=user)


@app.route("/logout")
def process_logout():
    """Log out user and send them to the splash page"""
    del session['logged_in_customer_email']
    flash("You have been logged out")
    return redirect("/")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    connect_to_db(app)
    app.run(debug=True, port=port)
