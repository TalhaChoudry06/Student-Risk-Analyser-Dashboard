import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import tkinter as tk
from tkinter import ttk

# Load your data
studentdata = pd.read_csv('../../data/college_student_management_data.csv')
sns.set_theme(style="whitegrid")

risk_level_map = {'Low': 0, 'Medium': 1, 'High': 2}
studentdata['risk_level_num'] = studentdata['risk_level'].map(risk_level_map)

numeric_cols = [
    'age', 'GPA', 'course_load', 'avg_course_grade', 'attendance_rate',
    'lms_logins_past_month', 'avg_session_duration_minutes',
    'assignment_submission_rate', 'forum_participation_count', 'video_completion_rate'
]

pairs_to_plot = [
    (col, 'risk_level_num') for col in [
        'attendance_rate',
        'avg_course_grade',
        'assignment_submission_rate',
        'lms_logins_past_month',
        'avg_session_duration_minutes'
    ]
]

categorical_cols = ['gender', 'major', 'enrollment_status', 'risk_level']

# Plot functions for individual plots

def plot_histogram(col):
    plt.figure(figsize=(8, 4))
    sns.histplot(studentdata[col], kde=True, bins=30)
    plt.title(f'Distribution of {col}')
    # plt.show()

def plot_boxplot_major(col):
    plt.figure(figsize=(10, 5))
    sns.boxplot(x='major', y=col, data=studentdata)
    plt.title(f'{col} by Major')
    plt.xticks(rotation=45)
    # plt.show()

def plot_scatter(x_col, y_col):
    plt.figure(figsize=(7, 5))
    sns.regplot(x=x_col, y=y_col, data=studentdata, scatter_kws={'alpha':0.5})
    ylabel = "Risk Level (numeric)" if y_col == 'risk_level_num' else y_col
    plt.title(f'{ylabel} vs {x_col}')
    plt.ylabel(ylabel)
    # plt.show()

def plot_cat_count(col):
    plt.figure(figsize=(6, 4))
    sns.countplot(x=col, data=studentdata)
    plt.title(f'Count of {col}')
    plt.xticks(rotation=45)
    # plt.show()

def plot_boxplot_risk(col):
    plt.figure(figsize=(10, 5))
    sns.boxplot(x='risk_level', y=col, data=studentdata)
    plt.title(f'{col} by Risk Level')
    # plt.show()

def plot_pairplot():
    sns.pairplot(studentdata, vars=['GPA', 'attendance_rate', 'assignment_submission_rate'], hue='risk_level', corner=True)
    plt.suptitle('Pairplot by Risk Level', y=1.02)
    # plt.show()

def plot_violin_gender(col):
    plt.figure(figsize=(10, 5))
    sns.violinplot(x='gender', y=col, data=studentdata)
    plt.title(f'{col} distribution by Gender')
    # plt.show()

def plot_correlation_heatmap():
    plt.figure(figsize=(12, 10)),
    sns.heatmap(studentdata[numeric_cols].corr(), annot=True, cmap='coolwarm', fmt=".2f", square=True),
    plt.title('Correlation Matrix'),
    plt.show()

def plot_pie_chart(col):
    counts = studentdata[col].value_counts()
    total = counts.sum()
    threshold = 0.05 * total
    large = counts[counts >= threshold]
    small = counts[counts < threshold]
    if not small.empty:
        large['Other'] = small.sum()
    plt.figure(figsize=(7, 7))
    plt.pie(large, labels=large.index, autopct='%1.1f%%', startangle=140)
    plt.title(f'Distribution of {col}')
    plt.axis('equal')
    # plt.show()

special_pairs = [
    ('risk_level_num', 'GPA')
]

categories = {
    "Histograms": [(col, lambda c=col: plot_histogram(c)) for col in numeric_cols],
    "Boxplots by Major": [(col, lambda c=col: plot_boxplot_major(c)) for col in numeric_cols],
    "Scatter & Regression": (
        [(f'{y} vs {x}', lambda x=x, y=y: plot_scatter(x, y)) for x,y in pairs_to_plot] +
        [(f'{y} vs {x}', lambda x=x, y=y: plot_scatter(x, y)) for x,y in special_pairs]
    ),
    "Correlation Heatmap": [("Correlation Heatmap", plot_correlation_heatmap)],
    "Categorical Counts": [(col, lambda c=col: plot_cat_count(c)) for col in categorical_cols],
    "Boxplots by Risk Level": [(col, lambda c=col: plot_boxplot_risk(c)) for col in numeric_cols],
    "Pairplot": [("Pairplot", plot_pairplot)],
    "Violin Plots by Gender": [(col, lambda c=col: plot_violin_gender(c)) for col in ['GPA', 'attendance_rate']],
    "Pie Charts" :[(col, lambda c=col: plot_pie_chart(c)) for col in ['risk_level', 'enrollment_status', 'gender', 'major']]
}
# Tkinter GUI
# if __name__ == '__main__':

#     root = tk.Tk()
#     root.title("Data Visualization Selector")

#     frame = ttk.Frame(root, padding=10)
#     frame.grid(row=0, column=0, sticky="nsew")

#     def clear_frame():
#         for widget in frame.winfo_children():
#             widget.destroy()

#     def show_main_menu():
#         clear_frame()
#         ttk.Label(frame, text="Select a plot category:", font=("Arial", 14)).grid(row=0, column=0, pady=10)
#         for i, category in enumerate(categories.keys(), start=1):
#             btn = ttk.Button(frame, text=category, width=30, command=lambda c=category: show_sub_menu(c))
#             btn.grid(row=i, column=0, pady=5)

#     def show_sub_menu(category):
#         clear_frame()
#         ttk.Label(frame, text=f"{category} plots:", font=("Arial", 14)).grid(row=0, column=0, pady=10)
#         subplots = categories[category]

#         for i, (name, func) in enumerate(subplots, start=1):
#             btn = ttk.Button(frame, text=name, width=40, command=func)
#             btn.grid(row=i, column=0, pady=3)

#         back_btn = ttk.Button(frame, text="Back", width=20, command=show_main_menu)
#         back_btn.grid(row=len(subplots) + 1, column=0, pady=15)

#     show_main_menu()

#     root.mainloop()
