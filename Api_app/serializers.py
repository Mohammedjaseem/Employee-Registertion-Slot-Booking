from rest_framework import serializers
from .models import Employee, Account

class EmployeeSerializer(serializers.ModelSerializer):

    # send data as view which is_arrpoved = True
    class Meta:
        model = Employee
        fields = '__all__'



        

# serialize custom user register 

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = Account.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user


