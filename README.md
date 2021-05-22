#Steps:

    1. python -m venv myenv
    2. source myenv/Scripts/activate
    3. pip install django
    4. pip install djangorestframework
    5. django-admin startproject DjangoAPI
    6. cd DjangoAPI
    7. python manage.py runserver
    8. pip install django-cors-headers
    9. Add 'corsheaders', line in INSTALLED_APPS array and add 'corsheaders.middleware.CorsMiddleware', line in MIDDLEWARE array within settings.py file
    10. Add two lines in settings.py file, in between INSTALLED_APPS and MIDDLEWARE arrays:
        CORS_ORIGIN_ALLOW_ALL = True (False, if we don't want to allow for all)
        CORS_ORIGIN_WHITELIST = ('whitelisting_url')
    11. python manage.py startapp EmployeeApp
    12. Register new app in settings.py: Add
        'EmployeeApp.apps.EmployeeappConfig',
        'rest_framework', in INSTALLED_APPS array
    13. python manage.py makemigrations EmployeeApp
    14. python manage.py migrate EmployeeApp
    15. Create a serializer by creating a file serializers.py in EmployeeApp
    16. Create a new file within EmployeeApp called as urls.py to add routes

    URLs:
    http://localhost:8000/Employee/SaveFile : body: {myFile: "image_path"}
    http://localhost:8000/employee: Get, Post and put works, delete needs /:id
    http://localhost:8000/department: Get, Post and put works, delete needs /:id
    for post and put add JSON file as body, Put needs id also in JSON, post don't need id in JSON
