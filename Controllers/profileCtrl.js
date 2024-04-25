app.controller("profileCtrl", function($scope, $rootScope, $location) {
    $scope.profile = {}

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

    let toastcontent = document.getElementById('toastcontent');

    const {serverUrl, loggedUser} = $rootScope;

    if (loggedUser.privilege == "admin") {
       $rootScope.ifAdmin = true
    }

    axios.get(`${$rootScope.serverUrl}/db/users/ID/eq/${loggedUser.ID}`).then(res =>{
        console.log(res.data.data)

        $scope.profilmodositas = function()
        {
                let {nickname, statusmsg, location, social} = $scope.profile;

                newProfile = {
                    'userID': loggedUser.ID,
                    'nickname': nickname,
                    'statusmsg': statusmsg,
                    'location': location,
                    'social': social
                }

                console.log(newProfile);

                axios.post(`${$rootScope.serverUrl}/db/profiles`, newProfile).then(res =>
                {
                    console.log(res.data.data)
                    toastcontent.innerText = "Adatok mentve!"
                    toastBootstrap.show();
    
                    $scope.profile = {};
                    
                })
        }
    })
});