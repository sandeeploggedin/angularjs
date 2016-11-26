(function () {
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {
		$scope.dishes = "";
		$scope.dietMessage = "";
		$scope.colour = "initial";

		$scope.checkDiet = function () {

			var dishList = $scope.dishes.split(',');  
			var dishCount = 0;


			if (dishList.length == 1 && dishList[0].length == 0){
				$scope.colour = "red";
				$scope.dietMessage = "Please enter data first";

				return;
			}

			for (var i = 0; i < dishList.length; i++){
				if (dishList[i].trim().length != 0){
					dishCount++;
				}
			}

			$scope.colour = "green";

			if (dishCount <= 3){
				$scope.dietMessage = "Enjoy!";
			}else{
				$scope.dietMessage = "Too much!";
			}

		};
	}

})();