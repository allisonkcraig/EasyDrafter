from flask import Flask, request, jsonify, render_template, redirect, flash, session, g, url_for
import os
# from flask_debugtoolbar import DebugToolbarExtension
import jinja2
import json
import model

from flask_oauth import OAuth


from model import User, Size_Chart, Measurement_Chart, connect_to_db, db


app = Flask(__name__)

oauth = OAuth()
app.secret_key = os.environ['SECRET_KEY'] 
fb_client_id = os.environ['FB_CLIENT_ID'] 
fb_client_secret = os.environ['FB_CLIENT_SECRET'] 

#much source secrets.sh each time you enter virtual env, will go away after each session

app.jinja_env.undefined = jinja2.StrictUndefined



facebook = oauth.remote_app('facebook',
            base_url='https://graph.facebook.com/',
            request_token_url=None,
            access_token_url='/oauth/access_token',
            authorize_url='https://www.facebook.com/dialog/oauth',
            consumer_key=fb_client_id,
            consumer_secret=fb_client_secret,
            request_token_params={'scope': 'email'}
)


@app.route('/fb-login')
def facebook_login():
    """send user data through facebook oauth to retreive user information"""
    print "facebook_login"
    return facebook.authorize(callback=url_for('facebook_authorized',
                                               next=request.args.get(
                                                   'next') or request.referrer or None,
                                               _external=True))


@app.route('/fb-login/authorized')
@facebook.authorized_handler
def facebook_authorized(response):
    """Process login and get user information"""
    print "facebook_authorized"
    next_url = request.args.get('next') or url_for('index')

    if response is None:
        flash("Invalid Login")
        return render_template("/")

    #adds information about our user to the session
    session['logged_in'] = True
    session['oauth_token'] = (response['access_token'], '')
    me = facebook.get('/me')
    #calls function to create or retrieve user object, adds additional info to the session
    user = add_new_user()
    session['current_user_id'] = user.id
    session['user_name'] = me.data['first_name']
    # session['favorites'] = [""]

    return redirect('/profile')


def add_new_user():
    """ Uses FB id to check for exisiting user in db. If none, adds new user."""

    # names facebook me object as fb_user
    fb_user = facebook.get('/me').data

    # queries database comparing user id with the ids in users table
    existing_user = User.query(model.User).filter(
        User.facebook_id == fb_user['id']).first()

    # if user not present, instantiates new user object
    if existing_user is None:
        new_user = model.User()
        new_user.fb_id = fb_user['id']
        new_user.fname = fb_user['first_name']
        new_user.email = fb_user['email']


        # commit new user to database
        model.session.add(new_user)
        model.session.commit()

        # Go get that new user
        current_user = User.query.filter(User.fb_id == fb_user['id']).first()

    
        return current_user

    #work with queried user
    else:
        return existing_user


@facebook.tokengetter
def get_facebook_oauth_token():

    return session.get('oauth_token')


@app.route('/')
def home_page():
    """Render Homepage."""
    return render_template('/splash-page.html')


@app.route('/choose-block')
def choose_block_page():
    """User decides which block to draft"""

    return render_template("block-choice.html")

@app.route('/start')
def measure_page():
    """Allow input of measurements to find size of template pattern from DB"""
    block_choice = request.args.get("block-choice")
    if block_choice == "top":
        session['measurements']
        return render_template("/basic-measure-page.html")
    elif block_choice == "skirt":
        session['measurements']
        return render_template("skirt-draft.html")

@app.route('/skirt-draft')
def skirt_draft_page():

    return render_template("skirt-draft.html")

@app.route('/front-draft')
def front_draft_page():
    """Use template measurements to draft a front block that closest fit them and allow users to change block to fit them using inputs """
    
    bust_input = request.args.get("bust")
    waist_input = request.args.get("waist")

    if float(bust_input) / float(waist_input) > 1.40: # the largest ratio of waist to bust in my standard sizes
        size_chart = Size_Chart.query.filter(Size_Chart.bust >= float(bust_input), Size_Chart.bust > float(bust_input) -1 ).first()
        size_chart_dictionary = size_chart.__dict__
        del size_chart_dictionary['_sa_instance_state']
        session['measurements'] = size_chart_dictionary
       
    else:
        size_chart = Size_Chart.query.filter(Size_Chart.waist >= float(waist_input), Size_Chart.waist > float(waist_input) -1 ).first()
        size_chart_dictionary = size_chart.__dict__
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
    """Send Back Draft measurements to session and show both drafts side by side"""
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
                            

@app.route('/save')
def save_pattern():
    """Save measurements to DB for speific user and redirect to profile page"""
    session['measurements']['nickname'] = request.args.get("nickname")
    print request.args.get("nickname")
    print session['measurements']['nickname']

    measurements_to_add = Measurement_Chart(
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
  
    flash("Save Successful!!")
    return redirect("/profile")


@app.route('/print/<int:chart_id_selected>')
def print_page(chart_id_selected):
    """Checks chart_id of selected measurement chart and directs you to a page where you can print"""

    current_chart = Measurement_Chart.query.filter(Measurement_Chart.chart_id==chart_id_selected).first()

    current_chart_dict = current_chart.__dict__

    if current_chart_dict['_sa_instance_state']:
        del current_chart_dict['_sa_instance_state']
    
    session['measurements'] = current_chart_dict

    return render_template("canvas.html", size_chart=session['measurements'])


@app.route('/edit/<int:chart_id_selected>')
def edit_page(chart_id_selected):
    """Checks chart_id of selected measurement chart and directs you to a page where you can print"""
    current_chart = Measurement_Chart.query.filter(Measurement_Chart.chart_id==chart_id_selected).first()

    current_chart_dict = current_chart.__dict__

    if current_chart_dict['_sa_instance_state']:
        del current_chart_dict['_sa_instance_state']
    
    session['measurements'] = current_chart_dict

    return render_template("front-draft.html", size_chart=session['measurements'])

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
            flash("Login successful!")
            current_user = User.query.filter_by(email=email_input).first()
            current_user_dict = current_user.__dict__
            session['current_user_id'] = current_user_dict['user_id']
            print session['current_user_id']
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
    pword_input = request.form.get("password")
    fname_input = request.form.get("fname")

    user_to_add = User(
        email=email_input,
        password=pword_input,
        fname=fname_input
        )

    db.session.add(user_to_add)
    db.session.commit() 


    # add_user(email_input, password_input, fname_input)
    session['logged_in_customer_email'] = email_input

    flash("Thanks for registering!")

    user = User.query.filter(User.email == email_input).first()

    session['current_user_id'] = user.user_id

    return redirect("/profile")


    # if user:
    #     if pword_input != user.password:
    #         flash("Incorrect password")
    #         return redirect("/login")
    #     else:
    #         flash("Login successful!")
    #         current_user = User.query.filter_by(email=email_input).first()
    #         current_user_dict = current_user.__dict__
    #         session['current_user_id'] = current_user_dict['user_id']
    #         print session['current_user_id']
    #         session['logged_in_customer_email'] = email_input
    #         return redirect("/profile")
        
    # else:
    #     flash("No such email")
    #     return redirect("/login")


@app.route('/profile')
def user_profile_page():
    """Display user information and saved blocks"""

    user_email = session['logged_in_customer_email']

    user = User.query.filter(User.email==user_email).one()
    current_user_id = user.user_id


    saved_blocks = Measurement_Chart.query.filter(Measurement_Chart.user_id==current_user_id).all()

    return render_template("profile.html", user=user, session=session, savedblocks=saved_blocks)


@app.route("/delete-block", methods=["POST"])
def delete_block():
    chart_id_input = request.form.get("chart-id")
    print chart_id_input, "+++++++++++++++++++++"
    chart_in_db = Measurement_Chart.query.filter(Measurement_Chart.chart_id==chart_id_input).first()
    db.session.delete(chart_in_db)
    db.session.commit()
    return jsonify({'status':'ok'})


@app.route("/logout")
def process_logout():
    """Log out user and send them to the splash page. Delete session information for logged in user"""
    session.clear()
       
    flash("You have been logged out")
    return redirect("/")


@app.route('/logbutton')
def logbutton():
    """You get here if you click the login/logout button from any page other than login/signup"""
    
    if 'current_user_id' in session:
        del session['current_user_id']
        flash("Logout successful!")
    if 'current_acces_token' in session:
        del session['current_acces_token']
        flash("You have logged out of Facebook")
     
    return redirect("/login")


JS_TESTING_MODE = False

@app.before_request
def add_tests():
    g.jasmine_tests = JS_TESTING_MODE


if __name__ == "__main__":
    _external=True
    port = int(os.environ.get("PORT", 5000))
    import sys
    if sys.argv[-1] == "jstest":
        JS_TESTING_MODE = True
    connect_to_db(app)
    app.run(debug=True, host="0.0.0.0", port=port)
