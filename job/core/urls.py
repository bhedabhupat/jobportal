from django.urls import path
from core.views import *

urlpatterns = [
    path('jobs/', JobsLists.as_view(), name="job-lists"),
    path('job/<int:pk>/', jobs_detail, name="job-lists"),
    path('category/', CategoryLists.as_view(), name="category-lists"),
]