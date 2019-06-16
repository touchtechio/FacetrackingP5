#export FLASK_APP=hello.py
#export FLASK_ENV=development
#python -m flask run --host=0.0.0.0



from flask import Flask
from flask import request
from flask_cors import CORS

#instantiate flask object when run
app = Flask(__name__)
CORS(app)

# wiring up event handler
# when post request comes in on path
@app.route('/rsvp', methods=['GET', 'POST', 'OPTIONS'])
def doPost():
    #
    print(str(request))
    data = request.data
    print(str(data))
#   print(str(request.invite))



#    return '{"msg":"hi"}'
    return data
