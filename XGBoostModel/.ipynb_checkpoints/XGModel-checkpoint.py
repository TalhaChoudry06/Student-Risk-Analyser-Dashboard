from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
import pandas as pd
from category_encoders.target_encoder import TargetEncoder
from imblearn.pipeline import Pipeline
from skopt import BayesSearchCV
from skopt.space import Real, Categorical, Integer
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
import numpy as np

# Load the dataset
df = pd.read_csv('data/college_student_management_data.csv', delimiter=',')

# Step 1: Check original class distribution before encoding
print("➡️ Original risk_level value counts (before encoding):")
print(df['risk_level'].value_counts())
print()

# Step 2: Prepare features and labels
X = df.drop(columns='risk_level')
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df['risk_level'])

# Check label mapping
print("➡️ Label encoding mapping:")
print(dict(zip(label_encoder.classes_, label_encoder.transform(label_encoder.classes_))))
print()

# Step 3: Check class distribution after encoding
print("➡️ Class distribution after encoding (full dataset):")
print(pd.Series(y).value_counts())
print()

# Step 4: Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=8
)

# Step 5: Check class distribution after split
print("➡️ y_train class distribution:")
print(pd.Series(y_train).value_counts())
print()

print("➡️ y_test class distribution:")
print(pd.Series(y_test).value_counts())
print()

# Step 6: Compute sample weights
class_weights = dict(enumerate(
    len(y_train) / (len(np.unique(y_train)) * np.bincount(y_train))
))
sample_weight = np.array([class_weights[label] for label in y_train])
print("➡️ Computed class weights:")
print(class_weights)
print()

print("➡️ Sample of sample_weight values:")
print(sample_weight[:10])
print()

# Pipeline and model setup
estimatior = [
    ('encoder', TargetEncoder()),
    ('clf', XGBClassifier(random_state=8, objective='multi:softmax', eval_metric='mlogloss'))
]
pipe = Pipeline(steps=estimatior)

search_space = {
    'clf__max_depth': Integer(2,8),
    'clf__learning_rate': Real(0.001, 1.0, prior='log-uniform'),
    'clf__subsample': Real(0.5, 1.0),
    'clf__colsample_bytree': Real(0.5, 1.0),
    'clf__colsample_bylevel': Real(0.5, 1.0),
    'clf__colsample_bynode' : Real(0.5, 1.0),
    'clf__reg_alpha': Real(0.0, 10.0),
    'clf__reg_lambda': Real(0.0, 10.0),
    'clf__gamma': Real(0.0, 10.0)
}

# BayesSearchCV model
opt = BayesSearchCV(pipe, search_space, cv=5, n_iter=30, scoring='f1_macro', random_state=8) 

# Training with sample weights (passed specifically to clf)
opt.fit(X_train, y_train, clf__sample_weight=sample_weight)

# Prediction and evaluation
y_pred = opt.predict(X_test)
cm = confusion_matrix(y_test, y_pred)

print(cm)
print(classification_report(y_test, y_pred, target_names=label_encoder.classes_))
