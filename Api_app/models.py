from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.


#view of employee register 
class Employee(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    is_approved = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)

    def __str__(self):
        return self.name

# user register model 
class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email    =self.normalize_email(email),
            username =username,
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email    =self.normalize_email(email),
            password =password,
            username =username,
        )
        user.is_admin     = True
        user.is_active    = True
        user.is_staff     = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser):
    username      = models.CharField(max_length=50)#removed uniq due to diffrent doamins and auto generation of id in the mails
    email         = models.EmailField(max_length=255, unique=True)
   
    #required fields for AbstractBaseUser
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login  = models.DateTimeField(auto_now=True)
    is_admin    = models.BooleanField(default=False)
    is_active   = models.BooleanField(default=True)
    is_staff    = models.BooleanField(default=False)
    is_superuser= models.BooleanField(default=False)
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin 

    def has_module_perms(self, app_label):
        return True


# slot model

class Slot(models.Model):
    row_choices = (
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
    )
    slot_row = models.CharField(max_length=1, choices=row_choices)
    slot_number = models.IntegerField()
    is_booked = models.BooleanField(default=False)
    booked_by = models.CharField(max_length=100, default="", blank=True)

    
    def __int__(self):
        return self.slot_number




