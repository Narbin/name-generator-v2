'use strict';

(function () {
	angular.module('nameGenerator', ['nameGenerator.controllers']);

	angular.module('nameGenerator.controllers', []).controller('AppController', function ($scope) {});

	angular.module('nameGenerator.controllers').controller('GeneratorController', function ($scope) {
		// setup
		$scope.length = 6;
		$scope.gender = "male";
		$scope.generatedName = "";

		// constants
		$scope.consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];
		$scope.vowels = ["a", "e", "i", "o", "u", "y"];

		$scope.generateName = function () {
			var nextLetter = void 0,
			    tempName = "",
			    con = $scope.consonants,
			    vow = $scope.vowels;

			if ($scope.randomNumber() === 0) {
				// drawing the first letter
				nextLetter = "vowel";
			} else {
				nextLetter = "consonant";
			}

			for (var i = 0; i < $scope.length; i += 1) {
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
						if ($scope.length - 1 === i) {
							// reverse name bcs we want 'a' on the end
							tempName = tempName.split("").reverse().join("");
						}
					}
				} else if ($scope.gender === "male") {
					if (nextLetter === "consonant") {
						tempName += con[$scope.randomNumber(con.length)];
						nextLetter = "vowel";
					} else if ($scope.length - 1 === i) {
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

		$scope.randomNumber = function () {
			var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
			var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			return Math.floor(Math.random() * to) + from;
		};
	});

	angular.module('nameGenerator.controllers').controller('CopyController', function ($scope) {
		$scope.copyToClipboard = function () {
			var nameContainer = document.getElementById("name").select(); //first select name
			document.execCommand("copy", nameContainer); // now copy from container
		};
	});
})();