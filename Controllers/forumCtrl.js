app.controller("forumCtrl", function($scope, $rootScope, $location) {
    $scope.post = {};
    $scope.posts = [];

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    let toastcontent = document.getElementById('toastcontent');
   
    const {serverUrl, loggedUser} = $rootScope;
    
    $scope.uploadPost = function()
    {
        let {title, content} = $scope.post

        

        if (title == null || content == null){
            toastcontent.innerText = "Tölts ki minden mezőt!";
            toastBootstrap.show();

        }
        else{

            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
            
                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;
            
                return [year, month, day].join('-');
            }

            data = {
                'date': formatDate(new Date().toDateString()),
                'content': content,
                'title': title,
                'author': loggedUser.username
            }

            axios.post(`${$rootScope.serverUrl}/db/forumposts`, data).then(res =>{
                console.log(res.data.data)
                toastcontent.innerText = "Sikeres Feltöltés!"
                toastBootstrap.show();

                $scope.new = {};
            })
        }
    }
});