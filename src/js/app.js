(() => {
	angular.module('nameGenerator', [
		'nameGenerator.controllers'
	]);

	angular.module('nameGenerator.controllers', []).controller('app', ($scope) => {
		$scope.length = 6;
		$scope.generatedName = '';
		$scope.gender = "male";
	});
})();
