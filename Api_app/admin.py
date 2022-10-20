from django.contrib import admin
from .models import Employee, Account, Slot, ImgUpload

# Register your models here.

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'email', 'designation')
    list_filter = ('name', 'age', 'email', 'designation')
    search_fields = ('name', 'age', 'email', 'designation')

admin.site.register(Employee, EmployeeAdmin)

class AccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'username')
    list_filter = ('email', 'username')
    search_fields = ('email', 'username')

admin.site.register(Account, AccountAdmin)

class SlotAdmin(admin.ModelAdmin):
    list_display = ('slot_row', 'slot_number', 'is_booked', 'booked_by')
    list_filter = ('slot_row', 'slot_number', 'is_booked', 'booked_by')
    search_fields = ('slot_row', 'slot_number', 'is_booked', 'booked_by')

admin.site.register(Slot, SlotAdmin)

class ImgUploadAdmin(admin.ModelAdmin):
    list_display = ('img', )
    list_filter = ('img', )
    search_fields = ('img', )

admin.site.register(ImgUpload, ImgUploadAdmin)



