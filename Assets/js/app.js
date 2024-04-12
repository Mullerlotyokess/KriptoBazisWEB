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
        $rootScope.loggedIn = false
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
            /*resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }*/
        })
        .when('/news', {
            templateUrl: 'Views/news.html',
            controller: 'newsCtrl',
            /*resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }*/
            
        })
        .when('/currencies', {
            templateUrl: 'Views/currencies.html',
            controller: 'currenciesCtrl',
            /*resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }*/
        })
        .when('/forum', {
            templateUrl: 'Views/forum.html',
            controller: 'forumCtrl',
            /*resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }*/
        })
        .when('/profile', {
            templateUrl: 'Views/profile.html',
            controller: 'profileCtrl',
            /*resolve: {
                function($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            }*/
        })
        .otherwise({
            redirectTo: '/main'
        });
}
);