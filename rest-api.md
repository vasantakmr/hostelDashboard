REST API: set of rules which every developer has to follow. 

1. client server architecture: makes a request to a particular URL(URI)


URL: Endpoints
URL: https://api.github.com/users/taniarascia/repos?per_page=100

https://api.github.com: domain name

users/taniarascia/repos: path

?per_page=100 : query parameters, & is used as a separator for query parameters

Rest API allows programs to talk to each other.


Request is made of 4 things:

1. Endpoint: path to resource

2. Methods: CRUD operations
    HTTP methods: GET: Read, PUT/Patch: update, Post: create, Delete: delete

3. Headers: Additional information that has to be sent as part of request

    Accept: what is the client expecting in a response 
    Content-type: what format is the request body is in. 

4. Data/body: contains the data which client wants to send to the server.


Response Contains: 

1. Headers: 

2. Status code: Http status code: 
    200's: successful response 
    300's: request is redirected to other URL
    400's: something wrong with the client
    500's: something wrong with the server

3. body/payload: contains the data client has requested for. 







2. REST is stateless. no prior data about the client is stored with he server.
3. REST cacheability

