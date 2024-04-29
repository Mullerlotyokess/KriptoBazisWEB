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
        else{
            let data = {
                'email': email,
                'pass': CryptoJS.SHA1(pass).toString()
            }

            axios.post($rootScope.serverUrl + '/db/logincheck', data).then(res=>{
                console.log(res.data.data)
                if (res.data.data[0].token != ''){
                    sessionStorage.setItem('access_token', JSON.stringify(res.data.data[0].token));
                    console.log("Van token!")
                    token = JSON.parse(sessionStorage.getItem('access_token'));
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    

                    $rootScope.loggedUser = $rootScope.getLoggedUserData(token);

                    $rootScope.loggedIn = true;
                    $location.path('/profile');
                    $scope.$apply();
                }
                else{
                    console.log("Nincs token!")
                    toastcontent.innerText = "Nem jó adatokat adott meg!"
                    toastBootstrap.show()
                }

            });
           
        }
    }


    $scope.emailSend = function()
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

       

        axios.get(`${$rootScope.serverUrl}/db/users/email/eq/${email}`).then(res =>{
            if (res.data.data.length <= 0) {
                toastcontent.innerText = "Nincs ilyen E-mail cím regisztrálva!"
                toastBootstrap.show()
                
            }

            else{
                axios.get(`${$rootScope.serverUrl}/db/users/email/eq/${email}`).then(res =>{
                    let message = `<body><h1>Elfelejtett adatok</h1> <br> Jelszó visszaszerzéséhez keresse fel a vezetőséget E-mailen keresztül! <br> Felhasználónév:  ${res.data.data[0].username} <br> E-mail:  ${res.data.data[0].email}  <br> Jelszó: (titkosított):  ${res.data.data[0].pass} </body>`;

                    let data = {
                        to: email,
                        subject: 'Elfelejtett adatok - Kripto Bázis',
                        message: message
                    }

                    axios.post($rootScope.serverUrl + '/email/send', data).then(res=>{
                        console.log(res.data)   
                
                    })
                

                    toastcontent.innerText = "Jelszó emlékeztető Email elküldve!"
                    toastBootstrap.show()
                })
            }


          
        });
            
        
        
    
    }
});

