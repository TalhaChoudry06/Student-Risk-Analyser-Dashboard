from flask import Flask, request
from flask_restful import Resource, Api
import joblib
import pandas as pd
classifier = joblib.load("XGBoostModel/FlaskAPIServer/xgb_pipeline_model.joblib")

app = Flask(__name__)
api = Api(app)

def ensure_scalar(val):
    if isinstance(val, list):
        return val[0] if val else None
    return val


class HelloWorld(Resource):
    def get(self):
        return {'message': 'Hello, World!'}

class XGBoostClassifier(Resource):
    def post(self):
        data = request.get_json()
        print("Incoming data:", data)
        for key, value in data.items():
            print(f"{key}: {value} (type: {type(value)})")
        age = int(ensure_scalar(data.get('age')))
        gender = ensure_scalar(data.get('gender'))
        major = ensure_scalar(data.get('major'))
        GPA = float(ensure_scalar(data.get('GPA')))
        course_load = ensure_scalar(data.get('course_load'))
        avg_course_grade = float(ensure_scalar(data.get('avg_course_grade')))
        attendance_rate = float(ensure_scalar(data.get('attendance_rate')))
        enrollment_status = ensure_scalar(data.get('enrollment_status'))
        lms_logins_past_month = int(ensure_scalar(data.get('lms_logins_past_month')))
        avg_session_duration_minutes = float(ensure_scalar(data.get('avg_session_duration_minutes')))
        assignment_submission_rate = float(ensure_scalar(data.get('assignment_submission_rate')))
        forum_participation_count = int(ensure_scalar(data.get('forum_participation_count')))
        video_completion_rate = float(ensure_scalar(data.get('video_completion_rate')))

        feature_names = [
            'age',
            'gender',
            'major',
            'GPA',
            'course_load',
            'avg_course_grade',
            'attendance_rate',
            'enrollment_status',
            'lms_logins_past_month',
            'avg_session_duration_minutes',
            'assignment_submission_rate',
            'forum_participation_count',
            'video_completion_rate'
        ]

        raw_features = age,gender,major,GPA,course_load,avg_course_grade,attendance_rate,enrollment_status,lms_logins_past_month,avg_session_duration_minutes,assignment_submission_rate,forum_participation_count,video_completion_rate
        input_df = pd.DataFrame([raw_features], columns=feature_names)
        prediction = classifier.predict(input_df)

        if prediction == 0:
            return {"risk_level": "High"}, 200
        elif prediction == 1:
            return {"risk_level": "Medium"}, 200
        elif prediction == 2:
            return {"risk_level": "Low"}, 200
        else:
            return {"risk_level": "Unknown"}, 400
    
api.add_resource(HelloWorld, '/api')
api.add_resource(XGBoostClassifier, '/api/classifier')
if __name__ == '__main__':
    app.run(debug=True)
