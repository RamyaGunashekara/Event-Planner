sap.ui.define([
	"eventPlanner/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"eventPlanner/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function(BaseController, JSONModel, formatter, Filter, FilterOperator, History) {
	"use strict";

	return BaseController.extend("eventPlanner.controller.RoleBased", {

		formatter: formatter,

		onInit: function() {

			// this.getRouter().getRoute("rolebased").attachPatternMatched(this._onRoleMatched, this);

			var oTable_all = this.byId("table1");
			var oTable_new = this.byId("table2");
			var oTable_process = this.byId("table3");
			var oTable_completed = this.byId("table4");

			// Put down worklist table's original value for busy indicator delay,
			// so it can be restored later on. Busy handling on the table is
			// taken care of by the table itself.
			this._oTable_all = oTable_all;
			this._oTable_new = oTable_new;
			this._oTable_process = oTable_process;
			this._oTable_completed = oTable_completed;

			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.setModel(oViewModel, "roleBasedView");
			this.listId = "allList";
			this.status = "NEW";

		},

		_onRoleMatched: function(oEvent) {
			var sRoleId = oEvent.getParameter("arguments").roleId;
			this.getModel().metadataLoaded().then(function() {
				var sRoleBasedPath = this.getModel().createKey("Request", {
					RoleID: sRoleId
				});
				this._bindView("/" + sRoleBasedPath);
			}.bind(this));
		},

		rejectDilog: function() {
		    
		  var oButton2 = new sap.m.Button("Save", {
                    text: "Save",
                    press: "onRejectSave"
                   
             });
 
             var oButton3 = new sap.m.Button("Cancel", {
 
                    text: "Cancel",
                    press: "onRejectCancel"
 
             });

			this.oDialog = new sap.m.Dialog("Dialog1", {

				title: "State Reason for Rejection",
				modal: true,
				contentWidth: "1em",
				buttons: [oButton2, oButton3],
				content: [
					new sap.m.Label({
						text: "Reason"
					}),
					new sap.m.Input({

						maxLength: 100,
						id: "reason"

					})
				]
			});
			
			
		},
        
        onRejectSave: function()
        {
            this.oDialog.close();
        }.bind(this),

        onRejectCancel: function()
        {
            this.oDialog.close();
        }.bind(this),

        onApprove: function()
        {
            this.rejectDilog();
           this.oDialog.open();
        },

		onCreateRequest: function() {
			this.getRouter().navTo("object");
		},

		onPanelExpand: function(oEvent) {
			var eventId = oEvent.getSource().getBindingContext().getObject().EVENT_ID;
			// 	  var table = this.table;
			//       var filter = [];    	

			//     var tableBinding = table.getBinding("items");  
			//     var eventFilter = new sap.ui.model.Filter("EVENT_ID", "EQ", eventId);  
			//     var statusFilter = new sap.ui.model.Filter("STATUS", "EQ", this.status);
			//     tableBinding.filter([eventFilter, statusFilter]); 

			//     	 var oViewModel = this.getModel("roleBasedView");

			// 		if (oTableSearchState.length !== 0) {
			// 					oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			// 		}

			// 	 var oTable = new sap.ui.table.Table({
			//     	title: "",
			//     	visibleRowCount: 5,
			//     	selectionMode: sap.ui.table.SelectionMode.Single,
			//     	selectionBehavior: sap.ui.table.SelectionBehavior.Row});

			//     	       // var cboValueHelpModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/CUAN_COMMON_SRV/");
			//     //  oTable.setModel(cboValueHelpModel,"help");
			//      var oFilters=null;
			//   var oFilters = [ new sap.ui.model.Filter("ObjectType","EQ", "I_SCBO_BO") ];

			//     //Define the columns and the control templates to be used
			//     var oColumn_id = new sap.ui.table.Column("id",{
			//      	label: new sap.ui.commons.Label({text: "ID"}),
			//     	template: new sap.ui.commons.TextView({text: "{help>Code}"}),//.bindProperty("text", "id"),
			//     	sortProperty: "help>Code",
			//     	filterProperty: "Code",
			//     	width: "100px"
			//     });
			//     oTable.addColumn(oColumn_id);	

			//     var oColumn_desc = new sap.ui.table.Column("desc",{
			//     	label: new sap.ui.commons.Label({text: "Description"}),
			//     	template: new sap.ui.commons.TextView({text: "{help>Description}"}),//.bindProperty("text", "description"),
			//     	sortProperty: "help>Description",
			//     	filterProperty: "Description",
			//      	width: "100px"
			//     });  
			//     oTable.addColumn(oColumn_desc);
			//     oTable.addStyleClass("cboDescriptionColumn");

			// oTable.bindRows({path : "help>/ValueHelps", filters : oFilters});

			//     //Initially sort the table
			//     oTable.sort(oTable.getColumns()[0]);

			  	 var aUrl = "https://sliblra7eac59ae.hana.ondemand.com/Event_Planner/services/PastRequests.xsjs?user=1";

						jQuery.ajax({
							url: aUrl,
							xhrFields: {
								withCredentials: true
							},
							method: 'GET',
							dataType: 'jsonp',
							success: function(oData, textStatus, jqXHR){
							    var userEvents = new sap.ui.model.json.JSONModel(oData.results);
							    sap.m.MessageToast.show(status);  
							},
							error: function(jqXHR, textStatus, errorThrown){
							    sap.m.MessageToast.show(textStatus);
							}
						});
		},

		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("worklist", {}, bReplace);
			}
		},

		_bindView: function(sRoleBasedPath) {
			var oViewModel = this.getModel("roleBasedView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: sRoleBasedPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oDataModel.metadataLoaded().then(function() {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange: function(oEvent) {
			var oView = this.getView(),
				oViewModel = this.getModel("roleBasedView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

			var oResourceBundle = this.getResourceBundle(),
				oRole = oView.getBindingContext().getObject(),
				sRoleId = oRole.RoleID,
				sRoleName = oRole.RoleName;

			// Everything went fine.
			oViewModel.setProperty("/busy", false);
		},

		handleIconTabBarSelect: function(oEvent) {
			var sKey = oEvent.getParameter("key");
			var oTableSearchState = "";

			if (sKey === "all") {
				this.table = this._oTable_all;
				this.listId = "allList";
				this.status = "";
				//do nothing    
			} else {
				if (sKey === "new") {
					this.table = this._oTable_new;
					this.listId = "newList";
					oTableSearchState = new Filter("STATUS", FilterOperator.Contains, "new");
					this.status = "NEW";

				} else if (sKey === "inProgress") {
					this.table = this._oTable_process;
					// this.listId = "progressList";
					oTableSearchState = new Filter("STATUS", FilterOperator.Contains, "inprocess");
					this.status = "inProcess";
				} else if (sKey === "completed") {
					this.table = this._oTable_completed;
					// this.listId = "completedList";
					oTableSearchState = new Filter("STATUS", FilterOperator.Contains, "complete");
					this.status = "Completed";
				} else {
					//do nothing
				}
				// 	this._applySearch(oTableSearchState, this.Table);
			}
		},

		onSearch: function(oEvent) {
				var filters = [];
				var searchString = this.getView().byId("searchField").getValue();
				if (searchString && searchString.length > 0) {
					filters = [new sap.ui.model.Filter("EVENT_ID",
						sap.ui.model.FilterOperator.Contains, searchString)];
				}

				// update list binding
				this.getView().byId(this.listId).getBinding("items").filter(filters);

			}
			// 			_applySearch: function(oTableSearchState, Table) {
			// 				var oViewModel = this.getModel("roleBasedView");
			// 				Table.getBinding("items").filter(oTableSearchState, "Application");
			// 				// changes the noDataText of the list in case there are no filter results
			// 				if (oTableSearchState.length !== 0) {
			// 					oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			// 				}
			// 			}
	});

});