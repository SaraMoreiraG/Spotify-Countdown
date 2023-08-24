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

@api.route('/pause-countdown', methods=['POST'])
def pause_countdown():
    global paused_time_remaining, paused_start_time

    if countdown_end_time is None:
        return jsonify({"message": "Countdown not started"}), 400

    current_time = datetime.datetime.now()
    paused_time_remaining = (countdown_end_time - current_time).total_seconds()
    paused_start_time = current_time

    return jsonify({"message": "Countdown paused", "paused_time_remaining": paused_time_remaining}), 200

@api.route('/resume-countdown', methods=['POST'])
def resume_countdown():
    global countdown_end_time, paused_time_remaining, paused_start_time

    if paused_time_remaining is None:
        return jsonify({"message": "Countdown not paused"}), 400

    current_time = datetime.datetime.now()
    countdown_end_time = current_time + datetime.timedelta(seconds=paused_time_remaining)
    paused_time_remaining = None
    paused_start_time = None

    return jsonify({"message": "Countdown resumed", "end_time": countdown_end_time}), 200