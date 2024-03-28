var app = angular.module('KriptoBazisAPP', ['ngRoute', 'ngNotify']);

app.run(($rootScope) => {
    $rootScope.loggedIn = false;
    $rootScope.pageTitle = "Kripto Bázis";

    $rootScope.emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    $rootScope.passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    $rootScope.serverUrl = 'http://localhost:5000';
    $rootScope.appUrl = 'http://127.0.0.1:5500/index.html';

    if (sessionStorage.getItem('access_token')) {
        $rootScope.loggedIn = true;
        token = JSON.parse(sessionStorage.getItem('access_token'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
});

app.config(($routeProvider) => {
    $routeProvider
        .when('/main', {
            templateUrl: 'Views/main.html'
        })
        .when('/login', {
            templateUrl: 'Views/login.html',
            controller: 'authCtrl'
        })
        .when('/register', {
            templateUrl: 'Views/register.html',
            controller: 'authCtrl'
        })
        .when('/wiki', {
            templateUrl: 'Views/wiki.html',
            controller: 'wikiCtrl'
        })
        .when('/news', {
            templateUrl: 'Views/news.html',
            controller: 'newsCtrl'
        })
        .when('/currencies', {
            templateUrl: 'Views/currencies.html',
            controller: 'currenciesCtrl'
        })
        .when('/forum', {
            templateUrl: 'Views/forum.html',
            controller: 'forumCtrl'
        })
        .when('/profile', {
            templateUrl: 'Views/profile.html',
            controller: 'profileCtrl'
        })
        .otherwise({
            redirectTo: '/main'
        });
}
);