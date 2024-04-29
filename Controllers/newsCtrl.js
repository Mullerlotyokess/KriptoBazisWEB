app.controller("newsCtrl", function($scope, $rootScope, $location) {

    $scope.new = {};
    $scope.news = [];

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    let toastcontent = document.getElementById('toastcontent');

    $scope.insert = function(){

        let { title, author, date, content } = $scope.new;

        if (title == null || author == null || date == null || content == null){
            toastcontent.innerText = "Tölts ki minden mezőt!";
            toastBootstrap.show();

        }
        else{

            data = {
                'title': title,
                'author': author,
                'date': date,
                'content': content
            }

            axios.post(`${$rootScope.serverUrl}/db/news`, data).then(res =>{
                toastcontent.innerText = "Sikeres hírfeltöltés!"
                toastBootstrap.show();

                $scope.new = {};
            })
        }

       
    }

    $scope.refreshNews = function()
    {
        document.getElementById('newsloader').style.visibility = "visible";


        setTimeout(() => {
            axios.get(`${$rootScope.serverUrl}/db/news`).then(res => {

                $scope.news = res.data.data;
                
                toastcontent.innerText = "Hírek frissítve!";
                toastBootstrap.show();
                $scope.$apply();

            });
        }, 2000);
       
    }

    $scope.delete = function()
    {
        $scope.new.title = ""
        $scope.new.author = ""
        $scope.new.date = ""
        $scope.new.content = ""

        toastcontent.innerText = "Mezők ürítve!"
        toastBootstrap.show()
    }
});