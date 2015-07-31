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
    email = db.Column(db.String(64), nullable=True)
    password = db.Column(db.String(64), nullable=True)
    fname = db.Column(db.String(15), nullable=False)

    @classmethod
    def user_auth(cls, email, password):
        """Get ID of User whoes email and password is given in the arguments"""
        current_user_id = db.session.query(cls.user_id, cls.email).filter(cls.email==email, cls.password==password).first()
        return current_user_id



    def user_details(self, user_id):
        """Get user details to load onto profile page"""
        current_user_info = db.session.query.filter(User.user_id = user_id).first()
        return current_user_info


    def __repr__(self):
        """Provide helpful representation when printed."""

        return "<user_id= %s email= %s fname = %s>" % (self.user_id, self.email, self.fname)


class Measurement_Chart(db.Model):
    """Movie Table of ratings website."""
    
    __tablename__ = "Measurement_Charts"

    chart_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    nickname = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String(100), nullable=False)
    bust = db.Column(db.Integer, nullable=False)
    waist = db.Column(db.Integer, nullable=False)
    cflength = db.Column(db.Integer, nullable=False)

    # Define relationship to user
    user = db.relationship("User",
                           backref=db.backref("Measurement_Charts", order_by=rating_id))

    def __repr__(self):
        """Provide helpful representation when printed."""

        return "<Chart Id= %s Release Date= user_id>" % (self.chart_id, self.released_at)

    # TODO EXPLAND THIS FUNCTION TO ADD MORE MEASUREMENTS
    @classmethod
    def add_chart_to_db(cls, nickname, user_id, bust, waist, cflength):
        chart_to_add = cls(nickname, user_id, bust, waist, cflength)
        db.session.add(chart_to_add)


# class Rating(db.Model):
#     """User Ratings of ratings website."""
    
#     __tablename__ = "Ratings"

#     rating_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
#     movie_id = db.Column(db.Integer, db.ForeignKey('Movies.movie_id'))
#     user_id = db.Column(db.Integer, db.ForeignKey('Users.user_id'))
#     score = db.Column(db.Integer, nullable=False)

#      # Define relationship to user
#     user = db.relationship("User",
#                            backref=db.backref("Ratings", order_by=rating_id))

#     # Define relationship to movie
#     movie = db.relationship("Movie",
#                             backref=db.backref("Ratings", order_by=rating_id))


#     def __repr__(self):
#         """Provide helpful representation when printed."""

#         return "<Movie ID= %s User ID= %s Score= %s>" % (self.movie_id, self.user_id, self.score)

    # @classmethod
    # def add_rating_to_db(cls, score, user_id, movie_id):
    #     score_to_add = cls(movie_id, user_id, score)
    #     db.session.add(score_to_add)


# Helper functions

def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our SQLite database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ratings.db'
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    from server import app
    connect_to_db(app)
    print "Connected to DB."