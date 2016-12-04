(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])//step 7.
	.controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);//step 9.

	ToBuyController.$inject = ['ShoppingListCheckOffService'];//step 9., 13.
	function ToBuyController(ShoppingListCheckOffService) {
		var toBuyList = this;

		toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
		
		toBuyList.buy = function (itemIndex) {//step 12.
			ShoppingListCheckOffService.buy(itemIndex);

			toBuyList.emptyStateMessage = ShoppingListCheckOffService.toBuyMessage;
		};
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];//step 9., 13.
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var alreadyBoughtList = this;

		alreadyBoughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
		alreadyBoughtList.emptyStateMessage = ShoppingListCheckOffService.boughtMessageObject;
	}

	function ShoppingListCheckOffService() {
		var service = this;

		var toBuyItems = [
			{ name: "curtains", quantity: 5 },
			{ name: "chairs", quantity: 10 },
			{ name: "desks", quantity: 3 },
			{ name: "shoe racks", quantity: 2 },
			{ name: "tables", quantity: 1 }
			];
		var boughtItems = [];

		//message string had to be encapsulated in an object so that 
		//AlreadyBoughtController could reference the object
		//thereby being able to capture updates made to the message string here.

		service.boughtMessageObject = {value: "Nothing bought yet."};
		
		service.buy = function (itemIndex) {
			
			var item = {
				name: toBuyItems[itemIndex].name,
				quantity: toBuyItems[itemIndex].quantity
			};

			boughtItems.push(item);

			toBuyItems.splice(itemIndex, 1);
			
			if (toBuyItems.length == 0){
				service.toBuyMessage = "Everything is bought!";
			}
			
			//redundant assignment after first item bought
			//not heavy tho'
			service.boughtMessageObject.value = null;

		};


		service.getToBuyItems = function () {
			return toBuyItems;
		};
		
		service.getBoughtItems = function () {
			return boughtItems;
		};  
	}


})();
