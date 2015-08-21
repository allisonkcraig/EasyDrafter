"""Models and database functions for Ratings project."""

from flask_sqlalchemy import SQLAlchemy

# This is the connection to the SQLite database; we're getting this through
# the Flask-SQLAlchemy helper library. On this, we can find the `session`
# object, where we do most of our interactions (like committing, etc.)


db = SQLAlchemy()


class User(db.Model):
    """User of ratings website."""

    __tablename__ = "Users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fb_id = db.Column(db.String(64), unique=True, nullable=True)
    email = db.Column(db.String(64), unique=True, nullable=False)
    password = db.Column(db.String(64), nullable=True)
    fname = db.Column(db.String(15), nullable=False)

    @classmethod
    def add_user(cls, email, fname,  password=None, fb_id=None):
        """Insert a new user into the users table"""
        user = cls(email=email, password=password, fname=fname, fb_id=fb_id)
        db.session.add(user)
        db.session.commit()


    def __repr__(self):
        """Provide helpful representation when printed."""

        return "<user_id= %s email= %s fname = %s>" % (self.user_id, self.email, self.fname)


class Measurement_Chart_Top(db.Model):
    """Measurement Charts for specific users."""
    
    __tablename__ = "Measurement_Chart_Tops"

    chart_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    nickname = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String(100), db.ForeignKey('Users.user_id'))
    bust = db.Column(db.Integer, nullable=False)
    waist = db.Column(db.Integer, nullable=False)

    full_length = db.Column(db.Integer, nullable=False) 
    center_front = db.Column(db.Integer, nullable=False)
    front_shoulder_slope = db.Column(db.Integer, nullable=False)
    strap = db.Column(db.Integer, nullable=False)
    front_across_shoulder = db.Column(db.Integer, nullable=False)
    across_chest = db.Column(db.Integer, nullable=False)
    bust_depth = db.Column(db.Integer, nullable=False)
    shoulder_length = db.Column(db.Integer, nullable=False)
    bust_arc = db.Column(db.Integer, nullable=False)
    bust_span = db.Column(db.Integer, nullable=False)
    waist_arc = db.Column(db.Integer, nullable=False)
    dart_placement = db.Column(db.Integer, nullable=False)
    side_length = db.Column(db.Integer, nullable=False)

    full_length_back = db.Column(db.Integer, nullable=False)
    center_back = db.Column(db.Integer, nullable=False)
    back_shoulder_slope = db.Column(db.Integer, nullable=False)
    across_back = db.Column(db.Integer, nullable=False)
    back_arc = db.Column(db.Integer, nullable=False)
    waist_arc_back = db.Column(db.Integer, nullable=False)
    back_neck = db.Column(db.Integer, nullable=False)
    back_across_shoulder = db.Column(db.Integer, nullable=False)
    back_dart_intake = db.Column(db.Integer, nullable=False)


    # Define relationship to user
    user = db.relationship("User",
                           backref=db.backref("Measurement_Chart_Tops"))

    def __repr__(self):
        """Provide helpful representation when printed."""

        return "<Chart Id= %s User Id= %s>" % (self.chart_id, self.user_id)


    # TODO EXPAND THIS FUNCTION TO ADD MORE MEASUREMENTS
    @classmethod
    def add_chart_to_db_top(cls, 
                        chart_id,
                        nickname,
                        user_id,
                        bust,
                        waist,

                        full_length,
                        center_front,
                        front_shoulder_slope,
                        strap,
                        front_across_shoulder,
                        across_chest,
                        bust_depth,
                        shoulder_length,
                        bust_arc,
                        bust_span,
                        waist_arc,
                        dart_placement,
                        side_length,

                        full_length_back,
                        center_back,
                        back_shoulder_slope,
                        across_back,
                        back_shoulder_length,
                        back_arc,
                        waist_arc_back,
                        back_neck,
                        back_across_shoulder,
                        back_dart_intake):
        chart_to_add = cls(
            chart_id, nickname, user_id, bust, waist, 
            full_length, center_front, front_shoulder_slope, strap, front_across_shoulder, across_chest, bust_depth, shoulder_length, bust_arc, bust_span, waist_arc, dart_placement, side_length,
            full_length_back, center_back, back_shoulder_slope, across_back, back_shoulder_length, back_arc, waist_arc_back, back_neck, back_across_shoulder, back_dart_intake)
        db.session.add(chart_to_add)
        db.session.commit()


class Measurement_Chart_Skirt(db.Model):
    """Measurement Charts for specific users."""
    
    __tablename__ = "Measurement_Chart_Skirts"

    chart_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    nickname = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String(100), db.ForeignKey('Users.user_id'))
    waist = db.Column(db.Integer, nullable=False)
    hip = db.Column(db.Integer, nullable=False)

    center_front_hip_depth = db.Column(db.Integer, nullable=False) 
    back_hip_arc = db.Column(db.Integer, nullable=False)
    center_back_hip_depth = db.Column(db.Integer, nullable=False)
    front_hip_arc = db.Column(db.Integer, nullable=False)
    dart_placement = db.Column(db.Integer, nullable=False)
    

    # Define relationship to user
    user = db.relationship("User",
                           backref=db.backref("Measurement_Chart_Skirts"))

    def __repr__(self):
        """Provide helpful representation when printed."""

        return "<Chart Id= %s User Id= %s>" % (self.chart_id, self.user_id)


    # TODO EXPAND THIS FUNCTION TO ADD MORE MEASUREMENTS
    @classmethod
    def add_chart_to_db_skirt(cls, 
                        chart_id,
                        nickname,
                        user_id,
                        waist,
                        hip,
                        center_front_hip_depth,
                        back_hip_arc,
                        center_back_hip_depth,
                        front_hip_arc,
                        dart_placement):

        chart_to_add = cls(
                        chart_id,
                        nickname,
                        user_id,
                        waist,
                        hip,
                        center_front_hip_depth,
                        back_hip_arc,
                        center_back_hip_depth,
                        front_hip_arc,
                        dart_placement)
        db.session.add(chart_to_add)
        db.session.commit()



class Size_Chart_Top(db.Model):
    """Measurement Charts for specific users."""
    
    __tablename__ = "Size_Chart_Tops"

    size_id = db.Column(db.Integer, primary_key=True)
    bust = db.Column(db.Integer, nullable=False)
    waist = db.Column(db.Integer, nullable=False)

    full_length = db.Column(db.Integer, nullable=False) 
    center_front = db.Column(db.Integer, nullable=False)
    front_shoulder_slope = db.Column(db.Integer, nullable=False)
    strap = db.Column(db.Integer, nullable=False)
    front_across_shoulder = db.Column(db.Integer, nullable=False)
    across_chest = db.Column(db.Integer, nullable=False)
    bust_depth = db.Column(db.Integer, nullable=False)
    shoulder_length = db.Column(db.Integer, nullable=False)
    bust_arc = db.Column(db.Integer, nullable=False)
    bust_span = db.Column(db.Integer, nullable=False)
    waist_arc = db.Column(db.Integer, nullable=False)
    dart_placement = db.Column(db.Integer, nullable=False)
    side_length = db.Column(db.Integer, nullable=False)

    full_length_back = db.Column(db.Integer, nullable=False)
    center_back = db.Column(db.Integer, nullable=False)
    back_shoulder_slope = db.Column(db.Integer, nullable=False)
    across_back = db.Column(db.Integer, nullable=False)
    back_arc = db.Column(db.Integer, nullable=False)
    waist_arc_back = db.Column(db.Integer, nullable=False)
    back_neck = db.Column(db.Integer, nullable=False)
    back_across_shoulder = db.Column(db.Integer, nullable=False)
    back_dart_intake = db.Column(db.Integer, nullable=False)


    def __repr__(self):
        """Provide helpful representation when printed."""

        return "<Chart Size= %s>" % (self.size_id)


class Size_Chart_Skirt(db.Model):
    """Measurement Charts for specific users."""
    
    __tablename__ = "Size_Chart_Skirts"

    size_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    waist = db.Column(db.Integer, nullable=False)
    hip = db.Column(db.Integer, nullable=False)

    center_front_hip_depth = db.Column(db.Integer, nullable=False) 
    back_hip_arc = db.Column(db.Integer, nullable=False)
    center_back_hip_depth = db.Column(db.Integer, nullable=False)
    front_hip_arc = db.Column(db.Integer, nullable=False)
    dart_placement = db.Column(db.Integer, nullable=False)
    


    def __repr__(self):
        """Provide helpful representation when printed."""

        return "<Size Id= %s>" % (self.size_id)

# Helper functions

def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our SQLite database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///drafter.db'
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    from server import app
    connect_to_db(app)
    print "Connected to DB."