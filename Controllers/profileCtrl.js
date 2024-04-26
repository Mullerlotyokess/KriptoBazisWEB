app.controller("profileCtrl", function($scope, $rootScope, $location) {
    $scope.profile = {}

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

    let toastcontent = document.getElementById('toastcontent');

    const {serverUrl, loggedUser} = $rootScope;

    if (loggedUser.privilege == "admin") {
       $rootScope.ifAdmin = true
    }


        $scope.profilmodositas = function()
        {
                let {nickname, statusmsg, location, social, pfp} = $scope.profile;

                newProfile = {
                    'userID': loggedUser.ID,
                    'nickname': nickname,
                    'statusmsg': statusmsg,
                    'location': location,
                    'social': social,
                    'pfp': pfp
                }

                console.log(newProfile);

                axios.get(`${$rootScope.serverUrl}/db/profiles/userID/eq/${loggedUser.ID}`).then(res =>{
                    console.log(res.data.data)
                    if (res.data.data.length > 0) {
                        axios.patch(`${$rootScope.serverUrl}/db/profiles/userID/eq/${loggedUser.ID}`, newProfile).then(res =>{
                            console.log(res.data.data)
                            toastcontent.innerText = "Adatok mentve!"
                            toastBootstrap.show();
                            $scope.profile = {};
                        })
                    }
                    else{
                            axios.post(`${$rootScope.serverUrl}/db/profiles`, newProfile).then(res =>
                            {
                                console.log(res.data.data)
                                toastcontent.innerText = "Adatok mentve!"
                                toastBootstrap.show();
                
                                $scope.profile = {};
                                
                            })
                    }
                })
        }
    
});