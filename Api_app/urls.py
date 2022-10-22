from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from Api_app import views
# from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    
    #user login jwt token
    path('UserLogin/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    #token refresh
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #all approved employess
    path('' , views.employeeList.as_view()),
    
    #pending employess
    path('pending/' , views.pendingEmployeeList.as_view()),
    
    #new user registration
    path('UserRegister/', views.UserRegisterView.as_view()),
    
    #Update employee profile
    path('employee/<int:pk>' , views.employeeUpdate.as_view()),
    
    #cancel employee approval 
    path('cancelEmployee/' , views.cancelEmployee.as_view()),
    
    #approve employee
    path('approveEmployee/' , views.approveEmployee.as_view()),
    
    #Delete employee
    path('employee/delete/<int:pk>' , views.deleteEmployee.as_view()),
    
    # all employes list ( approved and non approved)
    path('employeeListAdmin/', views.employeeListAdmin),
    
    # giving approval for user
    path('admin_approval/', views.admin_approval),
    
    # fetch rejcted employee list
    path('rejectedList/', views.rejectedList),
    
    # fetch available slots
    path('availableSlots/', views.availableSlot),
    
    # book slot
    path('slotBooking/', views.slotBooking),
    
    # list all slot
    path('allSlotList/', views.allSlotList),
    
    # admin login api
    path('superuserlogin/', views.superuserlogin),

    # fetch slot booked by user details & slot details
    path('slotBookingDetails/', views.slotBookingDetails),

    # clearr a slot
    path('slotCleanUp/', views.slotCleanUp),

    # count of all data to navbar api
    path('navbarCounter/', views.navbarCounter),

    # testing of img upload ( working fine )
    path('imgUpload/', views.imgUpload),

    # fetch single user profile with email
    path('user/', views.User),

    # is user had allready alloted a slot
    path('isSlotAlloted/', views.isSlotAlloted),

    # edit user profile
    path('editEmployee/', views.editEmployee),

    #recject employee
    path('rejectEmployee/', views.rejectEmployee),

    # get all employee list
    path('allEmployeeList/', views.allEmployees),

    # new slot add
    path('addNewSlot/', views.addSlot),
    
    # search employee
    path('searchEmployee/', views.searchEmployee),
    
] 