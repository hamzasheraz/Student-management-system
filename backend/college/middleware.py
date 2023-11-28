# from django.urls import resolve
# from django.conf import settings


# class ChangeUserModelMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         match = resolve(request.path)
#         print(match.app_name)
#         if match.app_name == "college":
#             print(1)
#             settings.AUTH_USER_MODEL = 'college.Student'
#         else:
#             settings.AUTH_USER_MODEL = 'auth.User'
#             print(2)
#         return self.get_response(request)
