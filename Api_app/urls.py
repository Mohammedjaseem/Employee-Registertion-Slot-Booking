from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from Api_app import views
# from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('' , views.employeeList.as_view()),
    path('pending/' , views.pendingEmployeeList.as_view()),
    path('UserRegister/', views.UserRegisterView.as_view()),
    path('employee/<int:pk>' , views.employeeUpdate.as_view()),
    path('employee/delete/<int:pk>' , views.deleteEmployee.as_view()),
    path('UserLogin/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('employeeListAdmin/', views.employeeListAdmin),
    path('admin_approval/', views.admin_approval),
    path('rejectedList/', views.rejectedList),
    path('availableSlots/', views.availableSlot),
    path('slotBooking/', views.slotBooking),
    path('allSlotList/', views.allSlotList),
    path('superuserlogin/', views.superuserlogin),
    # path('verify_token/', views.TokenRefreshView.as_view(), name='token_obtain_pair'),

        # path('login/', views.userlogin),
        # path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
        # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]