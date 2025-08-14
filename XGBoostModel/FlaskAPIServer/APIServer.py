from flask import Flask, request
from flask_restful import Resource, Api
import joblib
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
from flask import request, jsonify
import sys
import os
from flask_cors import CORS
from DataVisualization import (plot_pie_chart,plot_histogram,plot_boxplot_major,plot_scatter,plot_cat_count,plot_boxplot_risk,plot_pairplot,plot_violin_gender,plot_correlation_heatmap)
classifier = joblib.load("xgb_pipeline_model.joblib")

app = Flask(__name__)
api = Api(app)
CORS(app)

def ensure_scalar(val):
    if isinstance(val, list):
        return val[0] if val else None
    return val

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


class ChartGenerator(Resource):
    def post(self):
        data = request.get_json()
        category = data.get('category')
        item = data.get('item')

        print(f"Received request for category: {category}, item: {item}")

        try:
            if category == 'Pie Charts':
                plot_pie_chart(item)

            elif category == 'Histograms':
                plot_histogram(item)

            elif category == 'Boxplots by Major':
                plot_boxplot_major(item)

            elif category == 'Scatter & Regression':
                if ' vs ' in item:
                    x, y = item.split(' vs ')
                    plot_scatter(x.strip(), y.strip())
                else:
                    return {"error": f"Invalid scatter item format: {item}"}, 400

            elif category == 'Correlation Heatmap':
                plot_correlation_heatmap()

            elif category == 'Categorical Counts':
                plot_cat_count(item)

            elif category == 'Boxplots by Risk Level':
                plot_boxplot_risk(item)

            elif category == 'Pairplot':
                plot_pairplot()

            elif category == 'Violin Plots by Gender':
                plot_violin_gender(item)

            else:
                return {"error": f"Unknown category: {category}"}, 400

            img = io.BytesIO()
            plt.savefig(img, format='png')
            img.seek(0)
            img_base64 = base64.b64encode(img.read()).decode('utf-8')
            plt.close()
            return {"image": img_base64}, 200

        except Exception as e:
            print(f"Chart generation error: {e}")
            return {"error": str(e)}, 500


api.add_resource(XGBoostClassifier, '/api/classifier')
api.add_resource(ChartGenerator, '/api/generate_chart')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
