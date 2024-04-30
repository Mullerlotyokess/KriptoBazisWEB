var app = angular.module('KriptoBazisAPP', ['ngRoute']);

app.run(($rootScope, $location, $window) => {
    $rootScope.loggedIn = false;
    $rootScope.pageTitle = "Kripto Bázis";

    $rootScope.emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    $rootScope.passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    $rootScope.serverUrl = 'http://localhost:8000';
    $rootScope.appUrl = 'http://127.0.0.1:5500/index.html';

    $rootScope.loggedUser = {};
    $rootScope.ifAdmin = false;

    //bejelentkezett felhasználó adatainak lekérése
    $rootScope.getLoggedUserData = function(token) {
       
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        user = JSON.parse($window.atob(base64));

       loggedUser = {
            'ID': user.ID,
            'name': user.username,
            'email': user.email,
            'privilege': user.privilege 
        }

        return loggedUser;
    }

    //access token validálása
    if (sessionStorage.getItem('access_token')) {
        token = JSON.parse(sessionStorage.getItem('access_token'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        $rootScope.loggedIn = true;
        $rootScope.loggedUser = $rootScope.getLoggedUserData(token);
    }

    //kijelentkeztetés
    $rootScope.kijelentkezes = function(){
        sessionStorage.removeItem('access_token');
        axios.defaults.headers.common['Authorization'] = ``;
        $rootScope.loggedIn = false;
        $rootScope.loggedUser = {};
        $location.path('/main');
    }
});

//útvonalak
app.config(($routeProvider) => {
    $routeProvider
        .when('/main', {
            templateUrl: 'Views/main.html',
            controller: 'newsCtrl'
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
                    if (!$rootScope.loggedIn || $rootScope.ifAdmin == false) {
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
        .when('/mainforum', {
            templateUrl: 'Views/mainforum.html',
            controller: 'forumCtrl',
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/createforum', {
            templateUrl: 'Views/createforum.html',
            controller: 'forumCtrl',
            resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/rules', {
            templateUrl: 'Views/rules.html',
           
        })
        .otherwise({
            redirectTo: '/main'
        });
}
);


