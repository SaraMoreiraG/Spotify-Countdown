"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
import datetime
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

countdown_end_time = None

@api.route('/start-countdown', methods=['POST'])
def start_countdown():
    global countdown_end_time

    data = request.json
    duration = int(data.get('duration'))  # Parse duration as an integer

    if duration is None:
        return jsonify({"error": "Duration not provided"}), 400

    current_time = datetime.datetime.now()
    countdown_end_time = current_time + datetime.timedelta(seconds=duration)

    return jsonify({"message": "Countdown started", "end_time": countdown_end_time}), 200

@api.route('/get-countdown', methods=['GET'])
def get_countdown():
    global countdown_end_time

    if countdown_end_time is None:
        return jsonify({"message": "Countdown not started"}), 400

    current_time = datetime.datetime.now()
    time_remaining = max(0, (countdown_end_time - current_time).total_seconds())
    
    # Round the time_remaining value to the nearest integer
    rounded_time_remaining = round(time_remaining)

    return jsonify({"time_remaining": rounded_time_remaining}), 200

