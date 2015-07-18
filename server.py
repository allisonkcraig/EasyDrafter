from flask import Flask, request, render_template
import os

app = Flask(__name__)

@app.route('/')
def home_page():
	return render_template('/splash-page.html')



@app.route('/measure')
def measure_page():
	choice = request.args.get('play')
	if choice == 'easy':
		print "******************* choice 1"
		return render_template("canvas.html")
	else:
		print "CHoice 2"
		return render_template("canvas.html")


if __name__ == "__main__":
	port = int(os.environ.get("PORT", 5000))
	app.run(debug=True, port=port)
