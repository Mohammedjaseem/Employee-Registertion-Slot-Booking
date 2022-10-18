from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from. models import Employee, Account, Slot
from. serializers import EmployeeSerializer, UserRegisterSerializer, availableSlotsSerializer
from django.http import JsonResponse

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

# login required decorator
from django.contrib.auth.decorators import login_required
import jwt



# Create your views here.


class employeeList(APIView):
    def get(self, request):
        # send data as view which is_arrpoved = True
        employee = Employee.objects.filter(is_approved=True)
        employee = employee.filter(is_rejected=False)
        serializer = EmployeeSerializer(employee, many=True)
        return Response (serializer.data)

    def post(self, request):
        name = request.data.get('name')
        age = request.data.get('age')
        email = request.data.get('email')
        designation = request.data.get('designation')

        employee = Employee(name=name, age=age, email=email, designation=designation)
        employee.save()

        return Response(status=status.HTTP_201_CREATED)

#pending employee list
class pendingEmployeeList(APIView):
    def get(self, request):
        # send data as view which is_arrpoved = Flase
        employee = Employee.objects.all() #change here for admin
        serializer = EmployeeSerializer(employee, many=True)
        return Response (serializer.data)



class employeeUpdate(APIView):
    def get_object(self, pk):
        try:
            return Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        employee = self.get_object(pk)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    def put(self, request, pk):
        employee = self.get_object(pk)
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class deleteEmployee(APIView):
    def get_object(self, pk):
        try:
            return Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        employee = self.get_object(pk)
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# user register view
class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# user login view
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        return(token)
    
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# class TokenRefreshView(TokenRefreshView):
#     serializer_class = MyTokenObtainPairSerializer
        


# user login view
@api_view(['POST'])
def userlogin(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        if username and password:
            user = Account.objects.filter(username=username).first()
            if user:
                if user.check_password(password):
                    serializer = UserRegisterSerializer(user)
                    return Response({'token': str(token.access_token),'user': str(user) }, status=status.HTTP_200_OK)
                return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

# login as superuser
@api_view(['POST'])
def superuserlogin(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        if username and password:
            user = Account.objects.filter(username=username).first()
            if user:
                if user.check_password(password):
                    if user.is_superuser:
                        serializer = UserRegisterSerializer(user)
                        token = MyTokenObtainPairSerializer.get_token(user)
                        user = Account.objects.filter(username=username).first()
                        return Response({'token': str(token.access_token),'user': str(user) }, status=status.HTTP_200_OK)
                    return Response({'errormessage': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
                return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)



# data for admin to approve
@api_view(['GET'])
def employeeListAdmin(request):
    if request.method == 'GET':
        employee = Employee.objects.all()
        serializer = EmployeeSerializer(employee, many=True)
        return Response (serializer.data)

# admin approval for registeres user
@api_view(['POST'])
def admin_approval(request):
    if request.method == 'POST':
        email = request.data.get('email')
        if email:
            user = Account.objects.filter(email=email).first()
            if user:
                user.is_approved = True
                user.save()
                return Response({'success': 'User Approved'}, status=status.HTTP_200_OK)
            return Response({'error': 'User Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Please provide email'}, status=status.HTTP_400_BAD_REQUEST)

# rejected list 
@api_view(['GET'])
def rejectedList(request):
    if request.method == 'GET':
        employee = Employee.objects.filter(is_rejected=True)
        serializer = EmployeeSerializer(employee, many=True)
        return Response (serializer.data)

#all slot list

@api_view(['GET'])
def allSlotList(request):
    if request.method == 'GET':
        slot = Slot.objects.all()
        serializer = availableSlotsSerializer(slot, many=True)
        return Response (serializer.data)

# avilable slot 

@api_view(['GET'])
def availableSlot(request):
    if request.method == 'GET':
        slot = Slot.objects.filter(is_booked=False)
        serializer = availableSlotsSerializer(slot, many=True)
        return Response (serializer.data)


# slot booking

@api_view(['POST'])
def slotBooking(request):
    if request.method == 'POST':
        email = request.data.get('email')
        slot_row = request.data.get('slot_row')
        slot_number = request.data.get('slot_number')
        booked_by = request.data.get('booked_by')
        if email and slot_row and slot_number and booked_by:
            user = Employee.objects.filter(email=email).first()
            if user:
                slot = Slot.objects.filter(slot_row=slot_row, slot_number=slot_number).first()
                if slot:
                    if slot.is_booked == False:
                        slot.is_booked = True
                        slot.booked_by = booked_by
                        slot.save()
                        return Response({'success': 'Slot Booked'}, status=status.HTTP_200_OK)
                    return Response({'error': 'Slot Not Available'}, status=status.HTTP_400_BAD_REQUEST)
                return Response({'error': 'Slot Not Found'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': 'User Not Found'}, status=status.HTTP_400_BAD_REQUEST)



        

        
