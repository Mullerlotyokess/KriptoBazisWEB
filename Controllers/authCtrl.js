app.controller("authCtrl", function($scope, $rootScope, $location) {
    $scope.user = {};

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

    const { passwordRegExp, serverUrl } = $rootScope;
    let toastcontent = document.getElementById('toastcontent');
    

    $scope.regisztracio = function(){

        console.log($rootScope.serverUrl)
        console.log($scope.user.email)

        let {username, email, pass, passconfirm} = $scope.user;

        if (username == null || email == null || pass == null || passconfirm == null){
            toastcontent.innerText = "Nem adtál meg minden adatot!"
            toastBootstrap.show()
            return;
        }

        if (!email.includes('@')) {
            toastcontent.innerText = "Nem jó E-mail formátum!"
            toastBootstrap.show()
            return; 
        }
          
        if (pass != passconfirm){
            toastcontent.innerText = "A jelszavak nem egyeznek!"
            toastBootstrap.show()
            return;
        }

        if (!pass.match(passwordRegExp)){
            toastcontent.innerText = "Nem elég erős jelszó!"
            toastBootstrap.show()
            return;    
        }


        axios.get(`${$rootScope.serverUrl}/db/users/email/eq/${email}`).then(res =>{
            console.log(res.data)
            if(res.data.length > 0){
                toastcontent.innerText = "Ez az Email-cím már regisztrálva van!"
                toastBootstrap.show()
            }
            else{
                newUser = {
                    username: username,
                    email: email,
                    pass: pass,
                    privilege: "felhasználó"
                }
                
                axios.post(`${$rootScope.serverUrl}/db/users`, newUser).then(res =>{
                    toastcontent.innerText = "Sikeres regisztráció!"
                    toastBootstrap.show()
                    $scope.user = {};
                });
            }
        });

    }


    $scope.bejelentkezes= function() {

        toastcontent.innerText = "";

        let { email, pass } = $scope.user;

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

        let request = {
            logincheck: true,
            table: 'users',
            email, 
            pass: CryptoJS.SHA1(pass).toString()
        }

        axios.post(serverUrl, request).then(res => {
            if(res.data == false){
                toastcontent.innerText = "Rossz E-mail/Jelszó!"
                toastBootstrap.show()
                return;
            }
        });
    }
    $scope.passReset = function()
    {
    
      toastcontent.innerText = "Jelszó emlékeztető Email elküldve!"
      toastBootstrap.show()
        
    
    }
})