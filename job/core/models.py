from django.db import models

class JobCategory(models.Model):
    title = models.CharField(max_length=250)

    def __str__(self):
        return self.title

class JobDetails(models.Model):
    title = models.CharField(max_length=250)
    jobid = models.IntegerField()
    category = models.ForeignKey(JobCategory, on_delete=models.CASCADE)
    url = models.CharField(max_length=250, blank=True, null=True)
    address = models.CharField(max_length=250, blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    post_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    qualifications = models.TextField(blank=True, null=True)
    education = models.TextField(blank=True, null=True)
    

    def __str__(self):
        return self.title