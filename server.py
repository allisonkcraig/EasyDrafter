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
    """Use template measurements to draft a front block that closest fit them and allow users to change block to fit them using inputs """
    

    session['measurements']['nickname'] = request.args.get("nickname")
    session['measurements']['bust'] = request.args.get("bust")
    session['measurements']['waist'] = request.args.get("waist")
    

    if float(session['measurements']['bust']) / float(session['measurements']['waist']) > 1.40: # the largest ratio of waist to bust in my standard sizes
        size_chart = Size_Chart.query.filter(Size_Chart.bust >= float(session['measurements']['bust']), Size_Chart.bust > float(session['measurements']['bust']) -1 ).first()
        print size_chart
        size_chart_dictionary = size_chart.__dict__
        print size_chart_dictionary
        del size_chart_dictionary['_sa_instance_state']
        session['measurements'] = size_chart_dictionary

    else:
        size_chart = Size_Chart.query.filter(Size_Chart.waist >= float(session['measurements']['waist']), Size_Chart.waist > float(session['measurements']['waist']) -1 ).first()
        print size_chart
        size_chart_dictionary = size_chart.__dict__
        print size_chart_dictionary
        del size_chart_dictionary['_sa_instance_state']
        session['measurements'] = size_chart_dictionary


    return render_template("front-draft.html", size_chart=session['measurements'])


@app.route('/back-draft')
def back_draft_page():
    """Take Front Draft measurements, save them to session, and draft a Back Draft."""

    session['measurements']['full_length'] = request.args.get('full-length')
    session['measurements']['center_front'] = request.args.get('center-front')
    session['measurements']['front_shoulder_slope'] = request.args.get('front-shoulder-slope')
    session['measurements']['strap'] = request.args.get('strap')
    session['measurements']['front_across_shoulder'] = request.args.get('front-across-shoulder')
    session['measurements']['across_chest'] = request.args.get('across-chest')
    session['measurements']['bust_depth'] = request.args.get('bust-depth')
    session['measurements']['shoulder_length'] = request.args.get('shoulder-length')
    session['measurements']['bust_arc'] = request.args.get('bust-arc')
    session['measurements']['bust_span'] = request.args.get('bust-span')
    session['measurements']['waist_arc'] = request.args.get('waist-arc')
    session['measurements']['dart_placement'] = request.args.get('dart-placement')
    session['measurements']['side_length'] = request.args.get('side-length')


    return render_template("back-draft.html", size_chart=session['measurements'])


@app.route('/pattern')
def pattern_page():
    """Send Back Draft measurements to session and save measurement chart to db"""

    session['measurements']['full_length_back'] = request.args.get("full-length-back")
    session['measurements']['center_back'] = request.args.get("center-back")
    session['measurements']['back_shoulder_slope'] = request.args.get("back-shoulder-slope")
    session['measurements']['across_back'] = request.args.get("across-back")
    session['measurements']['back_arc'] = request.args.get("back-arc")
    session['measurements']['waist_arc_back'] = request.args.get("waist-arc-back")
    session['measurements']['back_neck'] = request.args.get("back-neck")
    session['measurements']['back_across_shoulder'] = request.args.get("back-across-shoulder")
    session['measurements']['back_dart_intake'] = request.args.get("back-dart-intake")

    return render_template("canvas.html", size_chart=session['measurements'])
                            

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
    customer = User.query.filter_by(email=email_input).first()

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
