from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
import pandas as pd
from category_encoders.target_encoder import TargetEncoder
from sklearn.pipeline import Pipeline
from skopt import BayesSearchCV
from skopt.space import Real, Categorical, Integer
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
import numpy as np
from sklearn.metrics import accuracy_score
from sklearn.metrics import accuracy_score
import joblib

# Load the dataset
df = pd.read_csv('data/college_student_management_data.csv', delimiter=',')

# Step 1: Check original class distribution before encoding
print("➡️ Original risk_level value counts (before encoding):")
print(df['risk_level'].value_counts())
print()

# Prepare features and labels
X = df.drop(columns=['risk_level', '_id'])
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df['risk_level'])

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=8
)

# Compute sample weights
class_weights = dict(enumerate(
    len(y_train) / (len(np.unique(y_train)) * np.bincount(y_train))
))

sample_weight = np.array([class_weights[label] for label in y_train])

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=8
)

# Encode string labels to integers
le = LabelEncoder()
y_encoded = le.fit_transform(y)
y = le.fit_transform(df['risk_level'])

pipe = Pipeline([
    ('encoder', TargetEncoder(cols=['gender', 'major', 'enrollment_status'])),
    ('clf', XGBClassifier(
        num_class=len(le.classes_),
        eval_metric='mlogloss',
        max_depth=4,
        learning_rate=0.3,
        n_estimators=100,
        random_state=42
    ))
])

pipe.fit(X_train, y_train)

# Predict class labels
y_pred = pipe.predict(X_test)

# Predict class probabilities
y_prob = pipe.predict_proba(X_test)


print("\n Classification Report:\n",
      classification_report(y_test, y_pred, target_names=le.classes_))

joblib.dump(pipe, 'xgb_pipeline_model.joblib')
