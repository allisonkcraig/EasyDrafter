from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'Users'

    user_id = db.Column(db.Integer, primary_key=True)
    fb_id = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    fname = db.Column(db.String(255))

    # Relationships
    size_chart_top = db.relationship('SizeChartTop', backref='user', cascade='all, delete-orphan')
    size_chart_skirt = db.relationship('SizeChartSkirt', backref='user', cascade='all, delete-orphan')
    measurement_chart_top = db.relationship('MeasurementChartTop', backref='user', cascade='all, delete-orphan')
    measurement_chart_skirt = db.relationship('MeasurementChartSkirt', backref='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<User id={self.user_id} email={self.email}>"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class BetaKey(db.Model):
    __tablename__ = 'Beta_Keys'

    beta_id = db.Column(db.Integer, primary_key=True)
    beta_key = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<BetaKey id={self.beta_id}>"


class SizeChartTop(db.Model):
    __tablename__ = 'Size_Chart_Top'

    chart_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.user_id'))
    style_name = db.Column(db.String(255), nullable=False)
    bust=db.Column(db.Float)
    waist=db.Column(db.Float)

    full_length=db.Column(db.Float) 
    center_front=db.Column(db.Float)
    front_shoulder_slope=db.Column(db.Float)
    strap=db.Column(db.Float)
    front_across_shoulder=db.Column(db.Float)
    across_chest=db.Column(db.Float)
    bust_depth=db.Column(db.Float)
    shoulder_length=db.Column(db.Float)
    bust_arc=db.Column(db.Float)
    bust_span=db.Column(db.Float)
    waist_arc=db.Column(db.Float)
    dart_placement=db.Column(db.Float)
    side_length=db.Column(db.Float)

    full_length_back=db.Column(db.Float)
    center_back=db.Column(db.Float)
    back_shoulder_slope=db.Column(db.Float)
    across_back=db.Column(db.Float)
    back_arc=db.Column(db.Float)
    waist_arc_back=db.Column(db.Float)
    back_neck=db.Column(db.Float)
    back_across_shoulder=db.Column(db.Float)
    back_dart_intake=db.Column(db.Float)

    def __repr__(self):
        return f"<SizeChartTop id={self.chart_id} style={self.style_name}>"


class SizeChartSkirt(db.Model):
    __tablename__ = 'Size_Chart_Skirt'

    chart_id = db.Column(db.Integer, primary_key=True)
    style_name = db.Column(db.String(255), nullable=False)
    waist = db.Column(db.Float)
    hip = db.Column(db.Float)
    length = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.user_id'))

    def __repr__(self):
        return f"<SizeChartSkirt id={self.chart_id} style={self.style_name}>"


class MeasurementChartTop(db.Model):
    __tablename__ = 'Measurement_Chart_Top'

    chart_id = db.Column(db.Integer, primary_key=True)
    bust = db.Column(db.Float)
    waist = db.Column(db.Float)
    shoulder = db.Column(db.Float)
    armhole = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.user_id'))

    def __repr__(self):
        return f"<MeasurementChartTop id={self.chart_id}>"


class MeasurementChartSkirt(db.Model):
    __tablename__ = 'Measurement_Chart_Skirt'

    chart_id = db.Column(db.Integer, primary_key=True)
    waist = db.Column(db.Float)
    hip = db.Column(db.Float)
    length = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.user_id'))

    def __repr__(self):
        return f"<MeasurementChartSkirt id={self.chart_id}>"


def connect_to_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///easy_drafter.db'  # customize this if needed
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    with app.app_context():
        db.create_all()
