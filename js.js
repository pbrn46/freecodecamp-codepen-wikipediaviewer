var app = angular.module('wikiViewer', []);

app.factory('resultsService', function () {
  var data = {
    r: null
  };

  function set(key, value) {
    data[key] = value;
  }

  return {
    set: set,
    data: data
  };
});


app.controller('searchList', function resultListControllerController ($scope, resultsService) {
  $scope.r = resultsService.data;
});

app.controller('searchCtrl', function ($http, $sce, $scope, resultsService) {
  var self = this;

  $scope.searchClick = function () {
    var url = "https://en.wikipedia.org/w/api.php";
    var searchValue = $scope.wikiSearchValue;
    var qs = 'action=opensearch&format=json&search=' + searchValue;
    url = url + "?" + qs;
    url = $sce.trustAsResourceUrl(url);
    searchValue = encodeURIComponent(searchValue);
    $http.jsonp(url, {
    })
      .then(function (response) {
        resultsService.set('r', response.data);
        $('html, body').animate({
          scrollTop: $("#search-input").offset().top
        }, 500);how();
      });
  };

  $scope.closeSearchClick = function () {
    resultsService.set('r', {});
  };
});
