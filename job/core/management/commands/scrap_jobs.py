from django.core.management.base import BaseCommand, CommandError
import requests, datetime
from bs4 import BeautifulSoup
from core.models import JobDetails, JobCategory

class Command(BaseCommand):
	
    def get_cleandata(self, soup, id):
        try:
            text = soup.find(id=id).get_text()
        except:
            text = ""
            pass
        return text
        
    def get_jobdetails(self, url):
        get_jobs = requests.get(url)
        soup = BeautifulSoup(get_jobs.content, 'html.parser')
        title = self.get_cleandata(soup, "jdPostingTitle")
        address = self.get_cleandata(soup, "job-location-name")
        category = self.get_cleandata(soup, "job-team-name")
        summary = self.get_cleandata(soup, "jd-job-summary")
        jobid = self.get_cleandata(soup, "jobNumber")
        post_date = self.get_cleandata(soup, "jobPostDate")
        qualifications = self.get_cleandata(soup, "jd-key-qualifications")
        description = self.get_cleandata(soup, "jd-description")
        education = self.get_cleandata(soup, "jd-education-experience")

        return {
            "jobid": jobid,
            "url": url,
            "title" : title,
            "address": address,
            "category" : category,
            "summary": summary,
            "post_date": post_date,
            "qualifications": qualifications,
            "description": description,
            "education": education
        }

    def get_jobs(self, url, jobdetails, count_page):
        try:
            get_jobs = requests.get(url)
            soup = BeautifulSoup(get_jobs.content, 'html.parser')
            tableResult = soup.findAll(id="tblResultSet")
            tbody = tableResult[0].select('tbody')
            for tr in list(tbody):
                firsttr = tr.select('tr')
                firsta = firsttr[0].select('a')
                detail_url = "https://jobs.apple.com"+firsta[0].get("href")
                jobdetails.append(self.get_jobdetails(detail_url))
            pagination = soup.find(class_="results-pagination")
            next_url = pagination.find(class_="pagination__next")
            a = next_url.select('a')[0].get("href")
            if a and count_page < 6:
                print("next url", a)
                return self.get_jobs(a, jobdetails, count_page + 1)
        except Exception as e:
            print(str(e))
        
        return jobdetails


    def handle(self, *args, **options):
        jobdetails = [] 
        self.get_jobs("https://jobs.apple.com/en-us/search", jobdetails, 1)
        for key, value in enumerate(jobdetails):
            print(value['title'], value['post_date'])
            post_date = ""
            if value['post_date']:
                post_date = datetime.datetime.strptime(value['post_date'], "%b %d, %Y")

            try:
                jobcat = JobCategory.objects.filter(title=value['category']).first()
                if not jobcat:
                    jobcat = JobCategory.objects.create(title=value['category'])
                check_exists = JobDetails.objects.filter(jobid=value['jobid']).first()
                if not check_exists:
                    
                    JobDetails.objects.create(
                        title=value['title'],
                        jobid = value['jobid'],
                        category = jobcat,
                        url = value['url'],
                        address = value['address'],
                        summary = value['summary'],
                        post_date = post_date,
                        description = value['description'],
                        qualifications = value['qualifications'],
                        education = value['education'],
                    )
            except Exception as e:
                print(str(e))

