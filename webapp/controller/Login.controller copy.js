sap.ui.define([
		"eventPlanner/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"eventPlanner/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
		"use strict";

		return BaseController.extend("eventPlanner.controller.Login", {

			formatter: formatter,
			
			onInit: function()
			{
				
			},
		onSignIn: function() {
			var username = this.getView().byId("username");
			var password = this.getView().byId("password");
			this.getRouter().navTo("rolebased");
		}

	});

});