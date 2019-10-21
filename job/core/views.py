from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from rest_framework.settings import api_settings
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .serializers import *
from .models import JobDetails, JobCategory


class JobsLists(generics.RetrieveAPIView):

    serializer_class = JobsSerializer
    permission_classes = (AllowAny,)
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

    __doc__ = """
        Get job lists
    """
    queryset = JobDetails.objects.all()

    def get(self, request):
        instance = self.get_queryset()
        paginator = self.pagination_class()
        paginator.default_limit = 10
        page = paginator.paginate_queryset(instance, request)
        serializer = self.get_serializer(instance, context={'request': request}, many=True)
        if page is not None:
            serializer = self.get_serializer(page, context={'request': request}, many=True)
            return paginator.get_paginated_response(serializer.data)
        return Response(serializer.data)


class CategoryLists(generics.RetrieveAPIView):

    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)

    __doc__ = """
        Get job count as per category lists
    """
    queryset = JobCategory.objects.all()

    def get(self, request):
        instance = self.get_queryset()
        serializer = self.get_serializer(instance, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def jobs_detail(request, pk):
    """
    Retrieve jobs by id/pk.
    """
    try:
        jobs = JobDetails.objects.get(pk=pk)
    except JobDetails.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JobsSerializer(jobs,context={'request': request})
        return Response(serializer.data)