app.controller("authCtrl", function($scope, $rootScope, ngNotify) {

    $scope.passReset = function()
    {
        const toastTrigger = document.getElementById('liveToastBtn')
        const toastLiveExample = document.getElementById('liveToast')
        
        if (toastTrigger) {
          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
          toastTrigger.addEventListener('click', () => {
            toastBootstrap.show()
          })
        }
    
    }
})