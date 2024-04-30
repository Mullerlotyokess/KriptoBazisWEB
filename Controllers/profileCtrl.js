app.controller("profileCtrl", function($scope, $rootScope, $location) {
    $scope.profile = {}

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

    let toastcontent = document.getElementById('toastcontent');

    const {serverUrl, loggedUser} = $rootScope;


        $scope.profilmodositas = function()
        {
                let {nickname, statusmsg, location, social} = $scope.profile;

                if (nickname == null || statusmsg == null || location == null || social == null) {
                    toastcontent.innerText = "Hiányzó adatok!"
                    toastBootstrap.show()
                    return;
                }

                newProfile = {
                    'userID': loggedUser.ID,
                    'nickname': nickname,
                    'statusmsg': statusmsg,
                    'location': location,
                    'social': social
                }

                axios.get(`${$rootScope.serverUrl}/db/profiles/userID/eq/${loggedUser.ID}`).then(res =>{
                    
                    
                    if (res.data.data.length > 0) {
                        axios.patch(`${$rootScope.serverUrl}/db/profiles/userID/eq/${loggedUser.ID}`, newProfile).then(res =>{

                            toastcontent.innerText = "Adatok mentve!"
                            toastBootstrap.show();
                            $scope.profile = {};
                        })
                    }
                    else{
                            axios.post(`${$rootScope.serverUrl}/db/profiles`, newProfile).then(res =>
                            {
                                toastcontent.innerText = "Adatok mentve!"
                                toastBootstrap.show();
                
                                $scope.profile = {};
                                
                            })
                    }
                })
        }

    
        if (loggedUser.privilege == "admin") {
            $rootScope.ifAdmin = true
        }
        else{
            $rootScope.ifAdmin = false
        }
        
});