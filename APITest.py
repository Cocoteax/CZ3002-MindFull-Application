import requests
from requests.auth import HTTPBasicAuth

# # GET REQUEST
# api_url = "http://127.0.0.1:8000/api/forum/posts"
# response = requests.get(api_url)
# obj = response.json()

# print(obj[0])
# print()

# for i in range(len(obj)):
#     if len(obj[i]['comments']) >= 1:
#         # print(obj[i]['comments'])
#         for commenter, content in obj[i]['comments'].items():
#             for comment in content:
#                 print(commenter, comment, sep = ":")



# # POST REQUEST, need to pass auth into request header
# api_url = "http://127.0.0.1:8000/api/forum/posts"
# content = {'title':'This is a test', 'content':'testing from python script'}
# auth = HTTPBasicAuth('admin', 'admin123')
# response = requests.post(api_url, content, auth=auth)
# print(response.status_code)

# # DELETE REQUEST, need to pass auth into request header
# api_url = "http://127.0.0.1:8000/api/forum/posts/9"
# auth = HTTPBasicAuth('admin', 'admin123')
# response = requests.delete(api_url, auth=auth)
# print(response.status_code)