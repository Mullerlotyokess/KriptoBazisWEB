app.controller("forumCtrl", function($scope, $rootScope, $location) {
    $scope.post = {};
    $scope.posts = [];
    $scope.reply = {};
    $scope.replies = [];

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    let toastcontent = document.getElementById('toastcontent');
   
    
    $scope.uploadPost = function()
    {
        let {title, content} = $scope.post

        if (title == null || content == null){
            toastcontent.innerText = "Tölts ki minden mezőt!";
            toastBootstrap.show();

        }
        else{

            data = {
                'title': title,
                'content': content
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