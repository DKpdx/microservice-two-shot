from django.urls import path
from .views import hats_list, hats_detail

urlpatterns = [
    path("hats/", hats_list, name="hats_list"),
    path("hats/<int:pk>/", hats_detail, name="hats_detail"),
]
