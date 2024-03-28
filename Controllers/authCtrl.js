app.controller("authCtrl", function($scope, $rootScope) {

    $scope.passReset = function()
    {
        const toastTrigger = document.getElementById('liveToastBtn')
        const toastLiveExample = document.getElementById('liveToast')
        
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
        
    
    }
})