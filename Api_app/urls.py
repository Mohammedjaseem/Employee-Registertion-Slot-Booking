from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from Api_app import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('' , views.employeeList.as_view()),
    path('login/', views.userlogin),
    path('employee/<int:pk>' , views.employeeUpdate.as_view()),
    path('employee/delete/<int:pk>' , views.deleteEmployee.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]