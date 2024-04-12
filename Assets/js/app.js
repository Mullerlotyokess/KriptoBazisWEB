var app = angular.module('KriptoBazisAPP', ['ngRoute', 'ngNotify']);

app.run(($rootScope) => {
    $rootScope.loggedIn = false;
    $rootScope.pageTitle = "Kripto Bázis";

    $rootScope.emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    $rootScope.passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    $rootScope.serverUrl = 'http://localhost:8000';
    $rootScope.appUrl = 'http://127.0.0.1:5500/index.html';

    if (sessionStorage.getItem('access_token')) {
        $rootScope.loggedIn = true;
        token = JSON.parse(sessionStorage.getItem('access_token'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    $rootScope.kijelentkezes = function(){
        sessionStorage.removeItem('access_token');
        axios.defaults.headers.common['Authorization'] = ``;
        $rootScope.loggedIn = false;
        $location.path('/login');
    }

    $rootScope.getLoggedUserData = function(token){
        
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        user = JSON.parse($window.atob(base64));

        loggedUser = {
            ID: user.ID,
            name: user.username,
            email: user.email
        }

        return  loggedUser;
    }
});

app.config(($routeProvider) => {
    $routeProvider
        .when('/main', {
            templateUrl: 'Views/main.html',
        })
        .when('/login', {
            templateUrl: 'Views/login.html',
            controller: 'logCtrl'
        })
        .when('/register', {
            templateUrl: 'Views/register.html',
            controller: 'regCtrl'
        })
        .when('/wiki', {
            templateUrl: 'Views/wiki.html',
            controller: 'wikiCtrl',
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/news', {
            templateUrl: 'Views/news.html',
            controller: 'newsCtrl',
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }
            
        })
        .when('/currencies', {
            templateUrl: 'Views/currencies.html',
            controller: 'currenciesCtrl',
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/forum', {
            templateUrl: 'Views/forum.html',
            controller: 'forumCtrl',
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/profile', {
            templateUrl: 'Views/profile.html',
            controller: 'profileCtrl',
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }
        })
        .otherwise({
            redirectTo: '/main'
        });
}
);

app.directive('fileModel', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});

app.service('fileUpload', function($q) {

    this.uploadFileToUrl = function(file, uploadUrl, uploadName) {
        var fd = new FormData();
        fd.append(uploadName, file);
     
        var deffered = $q.defer();
     
        axios.post(uploadUrl+'?uploadName='+uploadName, fd).then(
            function(res) {
                deffered.resolve(res);
            },
            function(err) {
                deffered.reject(err);
            }
        );
     
        return deffered.promise;
    }
});
