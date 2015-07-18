from flask import Flask, request, render_template
import os

app = Flask(__name__)

@app.route('/')
def home_page():
	return render_template('/splash-page.html')



@app.route('/measure')
def measure_page():
	return render_template("canvas.html")



if __name__ == "__main__":
	port = int(os.environ.get("PORT", 5000))
	app.run(debug=True, port=port)
