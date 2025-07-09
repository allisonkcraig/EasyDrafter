from flask import Flask, request, jsonify, render_template, redirect, flash, session, g, url_for
import os
# from flask_debugtoolbar import DebugToolbarExtension
import jinja2
import json


from model import (
    User,
    BetaKey,
    SizeChartTop,
    connect_to_db,
    db
)

app = Flask(__name__)


app.secret_key = os.environ['SECRET_KEY'] 
#much sure to source secrets.sh each time you enter virtual env, will go away after each session

app.jinja_env.undefined = jinja2.StrictUndefined

@app.route('/')
def home_page():
    """Render Homepage, adding name if user is logged in."""
    if 'logged_in_customer_email' in session:
        user_email = session.get('user_email')  # or however you're tracking
        user = User.query.filter(User.email == user_email).first()
        return render_template('splash-page.html', user=user)
    else:
        return render_template('/splash-page.html')


@app.route('/videos')
def video_page():
    """Render page with videos relating to pattern drafting."""

    return render_template('/video-page.html')

@app.route('/about-drafting')
def about_page():
    """Renders page which explains pattern drafting."""

    return render_template('/about-drafting.html')

@app.route('/testing')
def testing_page():
    """Renders page with Jasmine Testing."""

    return render_template('/testing.html')

@app.route('/choose-block')
def choose_block_page():
    """User decides which block to draft"""

    return render_template("block-choice.html")

@app.route('/start-top')
def measure_top_page():
    """Allow input of measurements to find size of template pattern from DB"""
    
    return render_template("/basic-measure-page.html")


@app.route('/start-skirt')
def measure_skirt_page():
    """Allow input of measurements to find size of template pattern from DB"""
    
    return render_template("/basic-measure-page-skirt.html")

@app.route('/skirt-draft')
def skirt_draft_page():
    """Use template measurements to draft a skirt that closest fits user and allows users to edit measurements in inputs"""

    hip_input = int(request.args.get("hip"))
    waist_input = int(request.args.get("waist"))

    if hip_input < 35.5: 
        hip_input = 35.5
    elif hip_input > 44:
        hip_input = 44


    if waist_input < 24:
        waist_input = 24 
    elif waist_input > 32.5:
        waist_input = 32.5

    if float(hip_input) / float(waist_input) > 1.30: # the largest ratio of waist to hip in my standard sizes
        size_chart = Size_Chart_Skirt.query.filter(Size_Chart_Skirt.hip >= float(hip_input), Size_Chart_Skirt.hip > float(hip_input) -1 ).first()
        size_chart_dictionary = size_chart.__dict__
        del size_chart_dictionary['_sa_instance_state']
        session['measurements'] = size_chart_dictionary    
    else:
        size_chart = Size_Chart_Skirt.query.filter(Size_Chart_Skirt.waist >= float(waist_input), Size_Chart_Skirt.waist > float(waist_input) -1 ).first()
        size_chart_dictionary = size_chart.__dict__
        del size_chart_dictionary['_sa_instance_state']
        session['measurements'] = size_chart_dictionary
 
    # session['measurements']['nickname'] = request.args.get("nickname")
    session['measurements']['hip'] = hip_input
    session['measurements']['waist'] = waist_input

    print(session['measurements'])
    return render_template("skirt-draft.html", size_chart=session['measurements'])


@app.route('/front-draft')
def front_draft_page():
    """Use template measurements to draft a front block that closest fits user and allow users to change block to fit them using inputs """
    
    bust_input = float(request.args.get("bust", 37.5))
    waist_input = float(request.args.get("waist", 37.5))

    if bust_input < 34:
        bust_input = 34
    elif bust_input > 42.5:
        bust_input = 42.5


    if waist_input < 24:
        waist_input = 24
    elif waist_input > 32.5:
        waist_input = 32.5
      
    if float(bust_input) / float(waist_input) > 1.30: # the largest ratio of waist to bust in my standard sizes
        size_chart =  SizeChartTop.query.filter(SizeChartTop.bust >= float(bust_input), SizeChartTop.bust > float(bust_input) -1 ).first()
        size_chart_dictionary = size_chart.__dict__
        del size_chart_dictionary['_sa_instance_state']
        session['measurements'] = size_chart_dictionary  
    else:
        size_chart = SizeChartTop.query.filter(SizeChartTop.waist >= float(waist_input), SizeChartTop.waist > float(waist_input) -1 ).first()
        size_chart_dictionary = {
            column.name: getattr(size_chart, column.name)
            for column in size_chart.__table__.columns
        }
        del size_chart_dictionary['_sa_instance_state']
        session['measurements'] = size_chart_dictionary
 
    # session['measurements']['nickname'] = request.args.get("nickname")
    session['measurements']['bust'] = bust_input
    session['measurements']['waist'] = waist_input


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
    """Checks for type of block and send measurements to session. 
    Shows drafts and allows you to imput a nickname to save and buttons to save to PDF"""

    block_type = request.args.get("block-type")
    print(block_type)

    if block_type == "top":
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

    elif block_type =="skirt":
        session['measurements']['center_front_hip_depth'] = request.args.get("center-front-hip-depth")
        session['measurements']['front_hip_arc'] = request.args.get("front-hip-arc")
        session['measurements']['center_back_hip_depth'] = request.args.get("center-back-hip-depth")
        session['measurements']['back_hip_arc'] = request.args.get("back-hip-arc")
        session['measurements']['dart_placement'] = request.args.get("dart-placement")

        return render_template("canvas-skirt.html", size_chart=session['measurements'])

@app.route('/save')
def save_pattern():
    """Save measurements to DB for current user and redirect to profile page"""

    session['measurements']['nickname'] = request.args.get("nickname")
    block_type = request.args.get("block-type")
    print(block_type)
    if block_type == "top":
        
        measurements_to_add = Measurement_Chart_Top(
            nickname=session['measurements']['nickname'],
            user_id=session['current_user_id'],
            bust=session['measurements']['bust'],   
            waist=session['measurements']['waist'],

            full_length=session['measurements']['full_length'],
            center_front=session['measurements']['center_front'],
            front_shoulder_slope=session['measurements']['front_shoulder_slope'],
            strap=session['measurements']['strap'],
            front_across_shoulder=session['measurements']['front_across_shoulder'],
            across_chest=session['measurements']['across_chest'],
            bust_depth=session['measurements']['bust_depth'],
            shoulder_length=session['measurements']['shoulder_length'],
            bust_arc=session['measurements']['bust_arc'],
            bust_span=session['measurements']['bust_span'],
            waist_arc=session['measurements']['waist_arc'],
            dart_placement=session['measurements']['dart_placement'],
            side_length=session['measurements']['side_length'],

            full_length_back=session['measurements']['full_length_back'],
            center_back=session['measurements']['center_back'],
            back_shoulder_slope=session['measurements']['back_shoulder_slope'],
            across_back=session['measurements']['across_back'],
            back_arc=session['measurements']['back_arc'],
            waist_arc_back=session['measurements']['waist_arc_back'],
            back_neck=session['measurements']['back_neck'],
            back_across_shoulder=session['measurements']['back_across_shoulder'],
            back_dart_intake=session['measurements']['back_dart_intake'])

        db.session.add(measurements_to_add)
        db.session.commit() 
      
    elif block_type == "skirt":
        measurements_to_add = Measurement_Chart_Skirt(
            nickname=session['measurements']['nickname'],
            user_id=session['current_user_id'],
            waist=session['measurements']['waist'],
            hip=session['measurements']['hip'],
            center_front_hip_depth=session['measurements']['center_front_hip_depth'],
            back_hip_arc=session['measurements']['back_hip_arc'],
            center_back_hip_depth=session['measurements']['center_back_hip_depth'],
            front_hip_arc=session['measurements']['front_hip_arc'],
            dart_placement=session['measurements']['dart_placement'])

        db.session.add(measurements_to_add)
        db.session.commit() 

    flash("Save Successful!!")
    return redirect("/profile")


@app.route('/print-top/<int:chart_id_selected>')
def print_top_page(chart_id_selected):
    """Checks chart_id of selected top measurement chart and directs you to a page where you can print"""

    current_chart = Measurement_Chart_Top.query.filter(Measurement_Chart_Top.chart_id==chart_id_selected).first()
    current_chart_dict = current_chart.__dict__
    if current_chart_dict['_sa_instance_state']:
        del current_chart_dict['_sa_instance_state']
    
    session['measurements'] = current_chart_dict
    return render_template("print-top.html", size_chart=session['measurements'])

@app.route('/print-skirt/<int:chart_id_selected>')
def print_skirt_page(chart_id_selected):
    """Checks chart_id of selected skirt measurement chart and directs you to a page where you can print"""
  
    current_chart = Measurement_Chart_Skirt.query.filter(Measurement_Chart_Skirt.chart_id==chart_id_selected).first()
    current_chart_dict = current_chart.__dict__
    if current_chart_dict['_sa_instance_state']:
        del current_chart_dict['_sa_instance_state']
    
    session['measurements'] = current_chart_dict
    return render_template("print-skirt.html", size_chart=session['measurements'])


@app.route('/edit-top/<int:chart_id_selected>')
def edit_top_page(chart_id_selected):
    """Checks chart_id of selected measurement chart and directs you to a page where you can edit the front draft"""

    current_chart = Measurement_Chart_Top.query.filter(Measurement_Chart_Top.chart_id==chart_id_selected).one()

    current_chart_dict = current_chart.__dict__

    if current_chart_dict['_sa_instance_state']:
        del current_chart_dict['_sa_instance_state']
        
    session['measurements'] = current_chart_dict

    return render_template("front-draft.html", size_chart=session['measurements'])


@app.route('/edit-skirt/<int:chart_id_selected>')
def edit_skirt_page(chart_id_selected):
    """Checks chart_id of selected measurement chart and directs you the drafting page so you can change measurements."""

    current_chart = Measurement_Chart_Skirt.query.filter(Measurement_Chart_Skirt.chart_id==chart_id_selected).one()

    current_chart_dict = current_chart.__dict__

    if current_chart_dict['_sa_instance_state']:
        del current_chart_dict['_sa_instance_state']
        
    session['measurements'] = current_chart_dict

    return render_template("skirt-draft.html", size_chart=session['measurements'])

@app.route("/login", methods=["GET"])
def show_login():
    """Show login form."""

    return render_template("login.html")


@app.route("/login", methods=["POST"])
def process_login():
    """Log user into site.
    Find the user's login credentials look up the user, and store them in the session."""

    email_input = request.form.get("email")
    pword_input = request.form.get("password")

    session['logged_in_customer_email'] = email_input

    user = User.query.filter(User.email == email_input).first()

    if user:
        if pword_input != user.password:
            flash("Your email and password did not match our records.")
            return redirect("/login")
        else:
            current_user = User.query.filter_by(email=email_input).first()
            current_user_dict = current_user.__dict__
            session['current_user_id'] = current_user_dict['user_id']
            print(session['current_user_id'])
            session['logged_in_customer_email'] = email_input
            return redirect("/profile")
        
    else:
        flash("Your email and password did not match our records.")
        return redirect("/login")



@app.route("/register", methods=["GET"])
def show_registration():
    """Show register form."""

    return render_template("register.html")


@app.route("/register", methods=["POST"])
def process_registration():
    """Log user into site.
    Find the user's login credentials look up the user, and store them in the session."""

    email_input = request.form.get("email")

    
    user = User.query.filter(User.email == email_input).first()

    if user != None:
        flash("There is already a user with that email address!")
        return redirect("/register")

    beta_input = request.form.get("beta")

    beta = BetaKey.query.filter(BetaKey.beta_key == beta_input).first()

    if beta == None:
        flash('That is not a correct Beta Key')
        return redirect("/register")

    pword_input = request.form.get("password")
    fname_input = request.form.get("fname")
    

    user_to_add = User(
        email=email_input,
        password=pword_input,
        fname=fname_input
        )

    db.session.delete(beta)
    db.session.add(user_to_add)
    db.session.commit() 


    # add_user(email_input, password_input, fname_input)
    session['logged_in_customer_email'] = email_input

    flash("Thanks for registering!")



    user = User.query.filter(User.email == email_input).first()

    session['current_user_id'] = user.user_id

    return redirect("/hello")

@app.route('/request-beta')
def request_beta_page():
    """Render page with instructions on how to use the app"""

    return render_template('/request-beta-key.html')

@app.route('/hello')
def hello_page():
    """Render page with instructions on how to use the app"""

    return render_template('/hello.html')


@app.route('/profile')
def user_profile_page():
    """Display user information and saved blocks"""

    user_email = session['logged_in_customer_email']

    user = User.query.filter(User.email==user_email).one()
    current_user_id = user.user_id


    saved_blocks_tops = Measurement_Chart_Top.query.filter(Measurement_Chart_Top.user_id==current_user_id).all()
    saved_blocks_skirts = Measurement_Chart_Skirt.query.filter(Measurement_Chart_Skirt.user_id==current_user_id).all()

    return render_template("profile.html", user=user, session=session, savedblockstops=saved_blocks_tops, savedblocksskirts=saved_blocks_skirts)


@app.route("/delete-block-top", methods=["POST"])
def delete_block_top():
    """Deletes top block via AJAX call"""

    chart_id_input = request.form.get("chart-id")
    test = Measurement_Chart_Top.query.filter(Measurement_Chart_Top.chart_id==chart_id_input).first()
    chart_in_db = Measurement_Chart_Top.query.filter(Measurement_Chart_Top.chart_id==chart_id_input).first()
    db.session.delete(chart_in_db)
    db.session.commit()
    return jsonify({'status':'ok'})

@app.route("/delete-block-skirt", methods=["POST"])
def delete_block_skirt():
    """Deletes skirt block via AJAX call"""

    chart_id_input = request.form.get("skirt-id")
    print(chart_id_input)
    chart_in_db = Measurement_Chart_Skirt.query.filter(Measurement_Chart_Skirt.chart_id==chart_id_input).first()
    db.session.delete(chart_in_db)
    db.session.commit()
    return jsonify({'status':'ok'})

@app.route("/logout")
def process_logout():
    """Log out user and send them to the splash page. Delete session information for logged in user"""
    session.clear()
       
    flash("You have been logged out")
    return redirect("/")


JS_TESTING_MODE = False

@app.before_request
def add_tests():
    g.jasmine_tests = JS_TESTING_MODE


if __name__ == "__main__":
    _external=True
    port = int(os.environ.get("PORT", 5001))
    import sys
    if sys.argv[-1] == "jstest":
        JS_TESTING_MODE = True
    connect_to_db(app)
    app.run(debug=True, host="0.0.0.0", port=port)
