from rest_framework import serializers
from .models import JobDetails, JobCategory

class JobsSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = JobDetails 
        fields = ('id', 'jobid', 'title', 'category', 'url', 'address', 'summary', 'post_date', 'description', 'qualifications', 'education')

    def get_category(self, obj):
        return obj.category.title


class CategorySerializer(serializers.ModelSerializer):
    total_jobs = serializers.SerializerMethodField()

    class Meta:
        model = JobCategory 
        fields = ('id', 'title', 'total_jobs', )

    def get_total_jobs(self, obj):
        return JobDetails.objects.filter(category=obj).count()