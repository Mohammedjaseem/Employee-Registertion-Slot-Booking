from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from Api_app import views

urlpatterns = [
    path('' , views.employeeList.as_view()),
    path('employee/<int:pk>' , views.employeeUpdate.as_view()),
    path('employee/delete/<int:pk>' , views.deleteEmployee.as_view()),
]