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
        const {nickname, status, location, social, pfp} = $scope.profile

        let data = {
            'userID': loggedUser.ID,
            'nickname': nickname,
            'status': status,
            'location': location,
            'social': social,
            'pfp': pfp
        }

        axios.post(`${$rootScope.serverUrl}/db/profiles`, data).then(res =>{
            console.log(res.data.data);
            
            toastcontent.innerText = "Adatok mentve!";
            toastBootstrap.show();
        })
    }
    })
});