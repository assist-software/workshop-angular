# Angular authentication using JWT
    
A demo app to demonstrate how to implement basic authentication using AngularJS. 

The app includes:
* basic authentication
* use local storage to persist token
* decode token and use the inside information
* intercept HTTP calls and attach the access token
* resolvers to protect private routes
    
## Get started
    
```
git clone git@github.com:assist-software/workshop-angular.git
bower install
```
    
    You will need a HTTP server to serve the files from the project directory.
    Also the back-end service is not provided, you can use a 3rd party auth provider. 
    Just change the URL in the config module:
    
```
app/js/app.js
.constant('urls', {
    BASE: 'https://your-backend.com/',
    BASE_API: 'https://your-backend.com/api'
});
```
     
## Licence
    The MIT License (MIT)
