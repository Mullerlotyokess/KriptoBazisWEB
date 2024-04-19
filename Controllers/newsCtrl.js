app.controller("newsCtrl", function($scope, $rootScope, $location) {

    $scope.new = {};
    $scope.news = {};

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    let toastcontent = document.getElementById('toastcontent');

    $scope.insert = function(){

        if ($scope.new.title == null || $scope.new.author == null || $scope.new.date == null || $scope.new.content == null){
            toastcontent.innerText = "Nem adtál meg minden adatot!";
            toastBootstrap.show();

        }
        else{

            let data = {
                'title': $scope.new.title,
                'author': $scope.new.author,
                'date': $scope.new.date,
                'content': $scope.new.content
            }

            axios.post($rootScope.serverUrl + '/db/news', data).then(res =>{
                console.log(res.data.data)
            })
        }

        console.log($rootScope.news)
        console.log($scope.new)
    }
});