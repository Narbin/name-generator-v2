(() => {
	angular.module('nameGenerator', [
		'nameGenerator.controllers'
	]);

	angular.module('nameGenerator.controllers', []).controller('AppController', ($scope) => {

	});

	angular.module('nameGenerator.controllers').controller('GeneratorController', ($scope) => {
		// setup
		$scope.length = 6;
		$scope.gender = "male";
		$scope.generatedName = "";

		// constants
		$scope.consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];
		$scope.vowels = ["a", "e", "i", "o", "u", "y"];
		
		$scope.generateName = () => {
			let nextLetter,
				tempName = "",
				con = $scope.consonants,
				vow = $scope.vowels;

			if ($scope.randomNumber() === 0) {
				// drawing the first letter
				nextLetter = "vowel";
			} else {
				nextLetter = "consonant";
			}
			
			for (let i = 0; i < $scope.length; i += 1) {
				if ($scope.gender === "female") {
					if (i === 0) {
						// female names are ending with 'a'
						tempName += "a";
						nextLetter = "consonant";
					} else {
						if (nextLetter === "consonant") {
							tempName += con[$scope.randomNumber(con.length)];
							nextLetter = "vowel";
						} else {
							tempName += vow[$scope.randomNumber(vow.length)];
							nextLetter = "consonant";
						}
						if (($scope.length - 1) === i) {
							// reverse name bcs we want 'a' on the end
							tempName = tempName.split("").reverse().join("");
						}
					}
				} else if ($scope.gender === "male") {
					if (nextLetter === "consonant") {
						tempName += con[$scope.randomNumber(con.length)];
						nextLetter = "vowel";
					} else if (($scope.length - 1) === i) {
						// we are avoiding 'a' on the end of male names
						tempName += vow[$scope.randomNumber(vow.length - 1, 1)];
						nextLetter = "consonant";
					} else {
						tempName += vow[$scope.randomNumber(vow.length)];
						nextLetter = "consonant";
					}
				}
			}

			$scope.generatedName = tempName; // setting name in model
		};

		$scope.randomNumber = (to = 2, from = 0) => {
			return Math.floor(Math.random() * to) + from;
		};
	});
})();
