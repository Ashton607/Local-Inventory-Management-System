from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='category_products')
    supplier = models.ForeignKey('Supplier', on_delete=models.SET_NULL, null=True, blank=True, related_name='supplier_products')
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    
class Transaction(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_transactions')
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=50)  # in or out

    def __str__(self):
        return f"Transaction of {self.product.name} on {self.date}"

class User(models.Model):
    name = models.CharField(max_length=100)
    username = models.IntegerField(unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=50)

    def __str__(self):
        return str(self.username)