app.controller("logCtrl", function($scope, $rootScope, $location) {
    $scope.user = {};

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

    const { serverUrl } = $rootScope;
    let toastcontent = document.getElementById('toastcontent');
    

    $scope.bejelentkezes= function() {

        toastcontent.innerText = "";

        const { email, pass } = $scope.user;

        if (email == null || pass == null){
            toastcontent.innerText = "Nem adtál meg minden adatot!"
            toastBootstrap.show()
            return;
        }
        
        if (!email.includes('@')) {
          toastcontent.innerText = "Nem jó E-mail formátum!"
          toastBootstrap.show()
          return; 
        }

     
        axios.get(`${rootScope.serverUrl}/db/logincheck`).then(res =>{

        })
    }


    $scope.passReset = function()
    {
        const { email } = $scope.user;
        
        if (email == null)
        {
            toastcontent.innerText = "Hiányzó E-mail cím!"
            toastBootstrap.show()
            return;
        }

        if (!email.includes('@')) {
            toastcontent.innerText = "Nem jó E-mail formátum!"
            toastBootstrap.show()
            return; 
        }

        
            
        toastcontent.innerText = "Jelszó emlékeztető Email elküldve!"
        toastBootstrap.show()
        
    
    }
})

