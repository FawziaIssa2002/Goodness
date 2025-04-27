import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np
import matplotlib.pyplot as plt  # تصحيح natplotlib إلى matplotlib
from sklearn.linear_model import LinearRegression  # استيراد LinearRegression بشكل صحيح
from sklearn.preprocessing import OneHotEncoder
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
from flask import Flask, request, jsonify
import json

import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report

# إعداد البيانات
data = pd.read_excel('Salaries4(1).xlsx')
data = data.drop_duplicates()

# استخراج الميزات والهدف
features = data.drop(columns=['accept'])
target = data['accept']

# تقسيم البيانات إلى مجموعة التدريب والاختبار
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.4, random_state=42)

# تدريب نموذج الانحدار الخطي
lm = LinearRegression()
lm.fit(X_train, y_train)

# التنبؤ باستخدام نموذج الانحدار الخطي
y_pred_lr = lm.predict(X_test)
y_pred_lr_binary = np.where(y_pred_lr >= 0.5, 1, 0)

# تدريب نموذج SVM
svm_model = SVC()
svm_model.fit(X_train, y_train)

# التنبؤ باستخدام نموذج SVM
y_pred_svm = svm_model.predict(X_test)

# تقييم نموذج الانحدار الخطي
accuracy_lr = accuracy_score(y_test, y_pred_lr_binary)
report_lr = classification_report(y_test, y_pred_lr_binary)

# تقييم نموذج SVM
accuracy_svm = accuracy_score(y_test, y_pred_svm)
report_svm = classification_report(y_test, y_pred_svm)

# عرض النتائج
print("دقة نموذج الانحدار الخطي:", accuracy_lr)
print("تقرير التصنيف لنموذج الانحدار الخطي:\n", report_lr)

print("دقة نموذج SVM:", accuracy_svm)
print("تقرير التصنيف لنموذج SVM:\n", report_svm)

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle
from sklearn.linear_model import LinearRegression


df = pd.read_excel('Salaries4(1).xlsx')
print(df.head())




filename='trained_model.sav'
f=open(filename, 'wb')
pickle.dump(lm,f)
f.close()