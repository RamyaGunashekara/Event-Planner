/*global location*/
sap.ui.define([
	"eventPlanner/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"eventPlanner/model/formatter"
], function(BaseController, JSONModel, MessageToast, History, formatter) {
	"use strict";

	return BaseController.extend("eventPlanner.controller.Object", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: true,
					delay: 0
				});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				// Restore original busy indicator delay for the object view
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});

			//attachments
			// this.getView().byId("attachment").setCount(this.getView().byId("UploadCollection").getItems().length);

			var sPath = jQuery.sap.getModulePath("eventPlanner.JSONModel", "/uploadCollection.json");
			var oModel_attchments = new JSONModel(sPath);
			this.getView().setModel(oModel_attchments, "attachments");

			// this.getView().byId("UploadCollection").addEventDelegate({
			// 	onBeforeRendering: function() {
			// 		this.getView().byId("attachmentTitle").setText(this.getAttachmentTitleText());
			// 	}.bind(this)
			// });

			//Dynamic Layouts ID

			this.LayoutNo = 1;
			this.ITDLayoutNo = 1;

			this.facility1VerticalLayout = [];
			this.facility1_1VerticalLayout = [];
			this.facility2VerticalLayout = [];
			this.facility3VerticalLayout = [];
			this.deletedLayouts = [];

			this.ITD1VerticalLayout = [];
			this.ITD2VerticalLayout = [];
			this.ITD3VerticalLayout = [];
			this.deletedITDLayouts = [];

			this.facilityComboBoxId = "facility";
			this.facilityItemComboBoxId = "facilityItem";
			this.quantityComboBoxId = "quantity";
			this.facilityDestroyId = "destroyId";
			
			this.ITDComboBoxId = "ITeq";
			this.ITDInputId = "ITDetail";
			this.ITDInputLabelId = "ITDetailLabel";

			this.ITDDestroyId = "ITDdestroyId";


			this.gfmFeedListID = [];
			this.gfmFeedListID[1] = "feedList1";
			this.gfmFeedList = "feedList";
			this.gfmFeedListNo = 1;
			this.gfmChatCount = 0;

			this.roomFeedListID = [];
			this.roomFeedListID[1] = "feedList1";
			this.roomFeedList = "feedList";
			this.roomFeedListNo = 1;
			this.roomChatCount = 0;

			this.parkingFeedListID = [];
			this.parkingFeedListID[1] = "feedList1";
			this.parkingFeedList = "feedList";
			this.parkingFeedListNo = 1;
			this.parkingChatCount = 0;

		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		
		 */

		onSave: function(oEvent) {
			var event = this.getView().byId("client").getValue();
			var peopleNo = this.getView().byId("people").getValue();
			var fromDate = this.getView().byId("fromDate").getValue();
			var toDate = this.getView().byId("toDate").getValue();

			var room = this.getView().byId("room").getValue();
			var startTimeRoom = this.getView().byId("startTime").getValue();
			var endTimeRoom = this.getView().byId("endTime").getValue();

			
			var facility = [];
			var facilityItem = [];
			var itemQuantity = [];

			facility[1] = this.getView().byId("facilities").getValue();
			facilityItem[1] = this.getView().byId("facilityItem").getValue();
			itemQuantity[1] = this.getView().byId("quantity").getValue();

			for (var i = 2, j=2; i <= this.LayoutNo; i++, j++) {
				
				if(this.deletedLayouts[i] !== 1)
				{
					
				var facilityId = "facility" + i;
				var facilityItemId = "facilityItem" + i;
				var quantityId = "quantity" + i;

				facility[j] = sap.ui.getCore().byId(facilityId).getValue();
				facilityItem[j] = sap.ui.getCore().byId(facilityItemId).getValue();
				itemQuantity[j] = sap.ui.getCore().byId(quantityId).getValue();

				var facilityId = "facility";
				var facilityItemId = "facilityItem";
				var quantityId = "quantity";
				}
				else
				{
					j = j-1;
				}

			}
			var noOfFacilities = j-1;

			var parkingNos = this.getView().byId("parkingNos").getValue();
			var startTimeParking = this.getView().byId("startTimeParking").getValue();
			var endTimeParking = this.getView().byId("endTimeParking").getValue();

			if (event === "" || peopleNo === "" || fromDate === "" || toDate === "") {
				MessageToast.show("Please fill all the Primary Details of the event");
			} else {
				var aUrl = 'https://sliblra7eac59ae.hana.ondemand.com/Event_Planner/services/InsertOperation.xsjs?user=1&event=' + event +
					'&people=' + peopleNo + '&fromDate=' + this.jsonDate(fromDate) + '&toDate=' + this.jsonDate(toDate) + '&category=REQUEST';
				this.ajaxCall(aUrl);

			}

			if (room !== "" || startTimeRoom !== "" || endTimeRoom !== "") {
				if (room === "" || startTimeRoom === "" || endTimeRoom === "") {
					MessageToast.show("Please fill all the details for booking room or clear all details if you don't requier room");
				} else {
					var aUrl = 'https://sliblra7eac59ae.hana.ondemand.com/Event_Planner/services/InsertOperation.xsjs?user=1&event=' + event +
						'&roomNum=' + room + '&startTym=' + this.jsonTime(startTimeRoom) + '&endTym=' + this.jsonTime(endTimeRoom) + '&category=ROOM';
					this.ajaxCall(aUrl);

				}
			}


			for(var i=1; i <= noOfFacilities; i++)
			{
				// facility[i] = sap.ui.getCore().byId(facilityId).getValue();
				// facilityItem[i] = sap.ui.getCore().byId(facilityItemId).getValue();
				// itemQuantity[i] = sap.ui.getCore().byId(quantityId).getValue();

			
			if (facility[i] !== "") {
				
						if (facilityItem[i] === "" || itemQuantity[i] === "") {
							MessageToast.show("Please enter all, the details of the facilities required");
						} else {
							switch (facility[i]) {
								case "Cafeteria":
							var aUrl = 'https://sliblra7eac59ae.hana.ondemand.com/Event_Planner/services/InsertOperation.xsjs?user=1&event=' 
										+ event + '&people=' + peopleNo + '&startTym=' + this.jsonTime(startTimeRoom) + '&endTym=' 
											+ this.jsonTime(endTimeRoom) + '&category=CAFETERIA';
							this.ajaxCall(aUrl);
						break;

					case "Snacks":
							var aUrl = 'https://sliblra7eac59ae.hana.ondemand.com/Event_Planner/services/InsertOperation.xsjs?user=1&event=' 
										+ event + '&item=' + facilityItem[i] + '&quantity=' + itemQuantity[i] + '&startTym=' 
										+ this.jsonTime(startTimeRoom) + '&endTym=' + this.jsonTime(endTimeRoom) 
										+ '&category=SNACKS';
							this.ajaxCall(aUrl);
						break;
					case "Stationary":
							var aUrl = 'https://sliblra7eac59ae.hana.ondemand.com/Event_Planner/services/InsertOperation.xsjs?user=1&event=' 
										+ event + '&item=' + facilityItem[i] + '&quantity=' + itemQuantity[i] + '&startTym=' 
										+ this.jsonTime(startTimeRoom) + '&endTym=' + this.jsonTime(endTimeRoom) 
										+'&category=STATIONARY';
							this.ajaxCall(aUrl);
						break;
					default:
						MessageToast.show("This Facility does not exist");
				}

			}
			}
		}
		},

		ajaxCall: function(url) {
			var aUrl = url;
			jQuery.ajax({
				url: aUrl,
				xhrFields: {
					withCredentials: true
				},
				method: 'GET',
				dataType: 'jsonp',
				success: this.onSaveSuccess,
				error: this.onErrorCall
			});
		},

		jsonTime: function(uiTime) {
			var hour = uiTime[0] + uiTime[1];
			var minute = uiTime[3] + uiTime[4];
			var second = "00";
			var ampm = uiTime[6] + uiTime[7];

			if (ampm === "pm") {
				hour = Number(hour) + 12;
			}

			var jsonTime = hour + ":" + minute + ":" + second;

			return jsonTime;

		},

		jsonDate: function(uiDate) {
			var year = "";
			var month = "";
			var date = "";
			var jsonDate = "";
			var i;

			var l = uiDate.length;
			for (i = 0; uiDate[i] !== "/" && i < l; i++) {
				month = month + uiDate[i];
			}
			for (i = i + 1; uiDate[i] !== "/" && i < l; i++) {
				date = date + uiDate[i];
			}
			for (i = i + 1; i < l; i++) {
				year = year + uiDate[i];
			}
			jsonDate = "20" + year + "-" + month + "-" + date;
			return jsonDate;
		},

		onSendRequest: function() {
			var aUrl =
				'https://sliblra7eac59ae.hana.ondemand.com/Event_Planner/services/mail.xsjs?EmailSubject=Event Planner : Test mail&attachment=myfile.txt&link=www.google.com&category=IT';
			jQuery.ajax({
				url: aUrl,
				xhrFields: {
					withCredentials: true
				},
				method: 'GET',
				dataType: 'json',
				success: this.onMailSuccess,
				error: this.onErrorCall
			});
		},

		onSaveSuccess: function(status) {
			var saveStatus = status;
			MessageToast.show("Saved Successfully");
		},

		onMailSuccess: function(status) {
			var mailStatus = status;
			MessageToast.show("Request Sent Successfully");
		},

		onErrorCall: function(jqXHR, textStatus, errorThrown) {
			// sap.m.MessageBox.show(jqXHR.responseText, 
			//     	"ERROR",
			//     	"Service Call Error" );	
			return;

		},

		handleIconTabBarSelect: function(oEvent) {
			var sKey = oEvent.getParameter("key");
			if (sKey === "chat") {
				var chatTab = this.getView().byId("gfmChatTab");
				chatTab.setCount(0);
			}
		},

		handleChatExpand: function(oEvent) {
			var chatTab = this.getView().byId("gfmChatTab");

		},

		onPostGFM: function() {

			this.gfmFeedListNo = this.gfmFeedListNo + 1;
			this.gfmFeedListID[this.gfmFeedListNo] = this.gfmFeedList + this.gfmFeedListNo;

			var feedlist = this.getView().byId("gfmChat");
			var userTextfeed = this.getView().byId("chatInput").getValue();
			var userFeed = new sap.m.FeedListItem(this.gfmFeedListID[this.gfmFeedListNo], {
				sender: "Mahati",
				icon: "you.png",
				senderPress: "onSenderPress",
				iconPress: "onIconPress",
				iconDensityAware: false,
				info: "",
				timestamp: this.chatTime(),
				text: userTextfeed
			});
			feedlist.addItem(userFeed);
			this.getView().byId("chatInput").setValue("");

			this.gfmChatCount = this.gfmChatCount + 1;
			this.getView().byId("gfmChatTab").setCount(this.gfmChatCount);

			var aUrl = 'https://sliblra7eac59ae.hana.ondemand.com/Event_Planner/services/InsertOperation.xsjs?user=1&event=' + event + '&sender=' +
				userFeed.getSender() + '&reciever= &time=' + this.chatJsonTime(userFeed.getTimestamp()) + '&message=' + userFeed.getText() +
				'&category=GFM_CHAT';
			this.ajaxCall(aUrl);
		},

		onPostRoom: function() {

			this.roomFeedListNo = this.roomFeedListNo + 1;
			this.roomFeedListID[this.gfmFeedListNo] = this.roomFeedList + this.roomFeedListNo;

			var feedlist = this.getView().byId("roomChat");
			var userTextfeed = this.getView().byId("roomChatInput").getValue();
			var userFeed = new sap.m.FeedListItem(this.roomFeedListID[this.roomFeedListNo], {
				sender: "Mahati",
				icon: "you.png",
				senderPress: "onSenderPress",
				iconPress: "onIconPress",
				iconDensityAware: false,
				info: "",
				timestamp: this.chatTime(),
				text: userTextfeed
			});
			feedlist.addItem(userFeed);
			this.getView().byId("roomChatInput").setValue("");

			this.roomChatCount = this.roomChatCount + 1;
			this.getView().byId("roomChatTab").setCount(this.roomChatCount);
		},

		onPostParking: function() {

			this.parkingFeedListNo = this.parkingFeedListNo + 1;
			this.parkingFeedListID[this.gfmFeedListNo] = this.parkingFeedList + this.parkingFeedListNo;

			var feedlist = this.getView().byId("parkingChat");
			var userTextfeed = this.getView().byId("parkingChatInput").getValue();
			var userFeed = new sap.m.FeedListItem(this.parkingFeedListID[this.parkingFeedListNo], {
				sender: "Mahati",
				icon: "you.png",
				senderPress: "onSenderPress",
				iconPress: "onIconPress",
				iconDensityAware: false,
				info: "",
				timestamp: this.chatTime(),
				text: userTextfeed
			});
			feedlist.addItem(userFeed);
			this.getView().byId("parkingChatInput").setValue("");

			this.parkingChatCount = this.parkingChatCount + 1;
			this.getView().byId("parkingChatTab").setCount(this.parkingChatCount);
		},

		chatJsonTime: function(chatTime) {
			var time, chatJsonTime;
			var i;
			var l = chatTime.length;
			for (i = l - 7; i < l; i++) {
				time = time + chatTime[i];
			}
			chatJsonTime = this.jsonTime(time);
			return (chatJsonTime);
		},

		chatTime: function() {
			var date = new Date();

			var d = date.getDate();
			var y = date.getFullYear();

			var month = new Array();
			month[0] = "January";
			month[1] = "February";
			month[2] = "March";
			month[3] = "April";
			month[4] = "May";
			month[5] = "June";
			month[6] = "July";
			month[7] = "August";
			month[8] = "September";
			month[9] = "October";
			month[10] = "November";
			month[11] = "December";
			var mo = month[date.getMonth()];

			var h = date.getHours();
			var m = date.getMinutes();
			var s = date.getSeconds();
			var t = "am";
			if (h > 12) {
				h = h - 12;
				t = "pm";
			}
			var chatTime = d.toString() + "-" + mo.toString() + "-" + y.toString() + " " + h.toString() + ":" + m.toString() + " " + t;

			return chatTime;
		},

		onChatPostSuccess: function() {

		},

		getAttachmentTitleText: function() {
			var aItems = this.getView().byId("UploadCollection").getItems();
			return "Uploaded (" + aItems.length + ")";
		},

		formatAttribute: function(sValue) {
			jQuery.sap.require("sap.ui.core.format.FileSizeFormat");
			if (jQuery.isNumeric(sValue)) {
				return sap.ui.core.format.FileSizeFormat.getInstance({
					binaryFilesize: false,
					maxFractionDigits: 1,
					maxIntegerDigits: 3
				}).format(sValue);
			} else {
				return sValue;
			}
		},

		onChange: function(oEvent) {
			var oUploadCollection = oEvent.getSource();
			// Header Token
			var oCustomerHeaderToken = new UploadCollectionParameter({
				name: "x-csrf-token",
				value: "securityTokenFromModel"
			});
			oUploadCollection.addHeaderParameter(oCustomerHeaderToken);
		},

		onFileDeleted: function(oEvent) {
			this.deleteItemById(oEvent.getParameter("documentId"));
			MessageToast.show("FileDeleted event triggered.");
		},

		deleteItemById: function(sItemToDeleteId) {
			var oData = this.getView().byId("UploadCollection").getModel("attachments").getData();
			var aItems = jQuery.extend(true, {}, oData).items;
			jQuery.each(aItems, function(index) {
				if (aItems[index] && aItems[index].documentId === sItemToDeleteId) {
					aItems.splice(index, 1);
				}
			});
			this.getView().byId("UploadCollection").getModel("attachments").setData({
				"items": aItems
			});
			this.getView().byId("attachmentTitle").setText(this.getAttachmentTitleText());
		},

		onFilenameLengthExceed: function(oEvent) {
			MessageToast.show("FilenameLengthExceed event triggered.");
		},

		onFileRenamed: function(oEvent) {
			var oData = this.getView().byId("UploadCollection").getModel("attachments").getData();
			var aItems = jQuery.extend(true, {}, oData).items;
			var sDocumentId = oEvent.getParameter("documentId");
			jQuery.each(aItems, function(index) {
				if (aItems[index] && aItems[index].documentId === sDocumentId) {
					aItems[index].fileName = oEvent.getParameter("item").getFileName();
				}
			});
			this.getView().byId("UploadCollection").getModel("attachments").setData({
				"items": aItems
			});
			MessageToast.show("FileRenamed event triggered.");
		},

		onFileSizeExceed: function(oEvent) {
			MessageToast.show("FileSizeExceed event triggered.");
		},

		onTypeMissmatch: function(oEvent) {
			MessageToast.show("TypeMissmatch event triggered.");
		},

		onBeforeUploadStarts: function(oEvent) {
			// Header Slug
			var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
				name: "slug",
				value: oEvent.getParameter("fileName")
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
			MessageToast.show("BeforeUploadStarts event triggered.");
		},

		onUploadComplete: function(oEvent) {
			var oData = this.getView().byId("UploadCollection").getModel("attachments").getData();
			var aItems = jQuery.extend(true, {}, oData).items;
			var oItem = {};
			var sUploadedFile = oEvent.getParameter("files")[0].fileName;
			// at the moment parameter fileName is not set in IE9
			if (!sUploadedFile) {
				var aUploadedFile = (oEvent.getParameters().getSource().getProperty("value")).split(/\" "/);
				sUploadedFile = aUploadedFile[0];
			}
			oItem = {
				"documentId": jQuery.now().toString(), // generate Id,
				"fileName": sUploadedFile,
				"mimeType": "",
				"thumbnailUrl": "",
				"url": "",
				"attributes": [{
					"title": "Uploaded By",
					"text": "You"
				}, {
					"title": "Uploaded On",
					"text": new Date(jQuery.now()).toLocaleDateString()
				}, {
					"title": "File Size",
					"text": "505000"
				}]
			};

			oItem.visibleEdit = true;
			oItem.visibleDelete = true;

			aItems.unshift(oItem);
			this.getView().byId("UploadCollection").getModel("attachments").setData({
				"items": aItems
			});
			// Sets the text to the label
			this.getView().byId("attachmentTitle").setText(this.getAttachmentTitleText());

			this.getView().byId("attachment").setCount(this.getView().byId("UploadCollection").getItems().length);

			// delay the success message for to notice onChange message
			setTimeout(function() {
				MessageToast.show("UploadComplete event triggered.");
			}, 4000);

			// this.getView().byId("UploadCollection").setBusy(false);
		},

		onUploadTerminated: function(oEvent) {
			// get parameter file name
			var sFileName = oEvent.getParameter("fileName");
			// get a header parameter (in case no parameter specified, the callback function getHeaderParameter returns all request headers)
			var oRequestHeaders = oEvent.getParameters().getHeaderParameter();
		},

		onDeleteSelectedItems: function() {
			var aSelectedItems = this.getView().byId("UploadCollection").getSelectedItems();
			this.deleteMultipleItems(aSelectedItems);
			if (this.getView().byId("UploadCollection").getSelectedItems().length < 1) {
				this.getView().byId("selectAllButton").setPressed(false);
				this.getView().byId("selectAllButton").setText("Select all");
			}
			MessageToast.show("Delete selected items button press.");
		},

		onSearch: function(oEvent) {
			MessageToast.show("Search feature isn't available in this sample");
		},

		onClearAll: function() {

			this.getView().byId("client").setValue("");
			this.getView().byId("people").setValue("");
			this.getView().byId("fromDate").setValue("");
			this.getView().byId("toDate").setValue("");

			this.getView().byId("room").setValue("");
			this.getView().byId("startTime").setValue("");
			this.getView().byId("endTime").setValue("");

			this.getView().byId("facilities").setValue("");
			this.getView().byId("facilityItem").setValue("");
			this.getView().byId("quantity").setValue("");

			for (var i = 2; i <= this.LayoutNo; i++) {
				// var facilityId = "facility" + i;
				// var facilityItemId = "facilityItem" + i;
				// var quantityId = "quantity" + 1;

				// this.getView().byId(facilityId).setValue("");
				// this.getView().byId(facilityItemId).setValue("");
				// this.getView().byId(quantityId).setValue("");

				// var facilityId = "facility";
				// var facilityItemId = "facilityItem";
				// var quantityId = "quantity" ;

				var layout1 = this.facility1VerticalLayout[i];
				var layout1_1 = this.facility1_1VerticalLayout[i];
				var layout2 = this.facility2VerticalLayout[i];
				var layout3 = this.facility3VerticalLayout[i];

				layout1.destroy();
				layout1_1.destroy();
				layout2.destroy();
				layout3.destroy();
				
				this.deletedLayouts[i]=1;

			}
			this.LayoutNo = 1;

			this.getView().byId("parkingNos").setValue("");
			this.getView().byId("startTimeParking").setValue("");
			this.getView().byId("endTimeParking").setValue("");
		},

		onCollapseAll: function() {
			this.getView().byId("roomRequest").setExpanded(false);
			this.getView().byId("gfmRequest").setExpanded(false);
			this.getView().byId("parkingRequest").setExpanded(false);
			this.getView().byId("financeRequest").setExpanded(false);
			this.getView().byId("itRequest").setExpanded(false);
		},

		addFacilities: function() {

			this.LayoutNo = this.LayoutNo + 1;

			this.facilityComboBoxId = this.facilityComboBoxId + this.LayoutNo;
			this.facilityItemComboBoxId = this.facilityItemComboBoxId + this.LayoutNo;
			this.quantityComboBoxId = this.quantityComboBoxId + this.LayoutNo;
			this.facilityDestroyId = this.facilityDestroyId + this.LayoutNo;

			this.oHL = new sap.m.HBox({
				width: "100%"
			});

			this.facility1VerticalLayout[this.LayoutNo] = new sap.m.VBox({
				width: "100%",
				direction: "Column"
			});
			this.facility1_1VerticalLayout[this.LayoutNo] = new sap.m.VBox({
				width: "100%",
				direction: "Column"
			});
			this.facility2VerticalLayout[this.LayoutNo] = new sap.m.VBox({
				width: "100%",
				direction: "Column"
			});
			this.facility3VerticalLayout[this.LayoutNo] = new sap.m.VBox({
				width: "100%",
				direction: "Column"
			});

			this.oVL_1 = this.facility1VerticalLayout[this.LayoutNo];
			this.oVL_1_1 = this.facility1_1VerticalLayout[this.LayoutNo];
			this.oVL_2 = this.facility2VerticalLayout[this.LayoutNo];
			this.oVL_3 = this.facility3VerticalLayout[this.LayoutNo];

			var oComboBox1 = new sap.m.ComboBox(this.facilityComboBoxId, {
				placeholder: "select",
				width: "75%"
			});
			var oLabel1 = new sap.m.Label({
				text: "Facility",
				design: "Bold",
				textAlign: "Left",
				width: "100%"
			});

			this.oVL_1.addItem(oLabel1);
			this.oVL_1.addItem(oComboBox1);

			var oComboBox1_1 = new sap.m.Input(this.facilityItemComboBoxId, {
				placeholder: "",
				width: "75%"
			});
			var oLabel1_1 = new sap.m.Label( {
				text: "Item",
				design: "Bold",
				textAlign: "Left",
				width: "100%"
			});

			this.oVL_1_1.addItem(oLabel1_1);
			this.oVL_1_1.addItem(oComboBox1_1);

			var oComboBox2 = new sap.m.ComboBox(this.quantityComboBoxId, {
				placeholder: "select",
				width: "75%"
			});
			var oLabel2 = new sap.m.Label({
				text: "Quantity",
				design: "Bold",
				textAlign: "Left",
				width: "100%"
			});

			this.oVL_2.addItem(oLabel2);
			this.oVL_2.addItem(oComboBox2);

			var destroyButton = new sap.m.Button(this.facilityDestroyId, {
				icon: "sap-icon://delete",
				press: function(oEvent) {
					var id = oEvent.getParameters("").id;
					var destroyLayoutNo = "";
					for (var i = 9; i < id.length; i++) {
						destroyLayoutNo = destroyLayoutNo + id[i];
					}
					var layout1 = this.facility1VerticalLayout[destroyLayoutNo];
					var layout1_1 = this.facility1_1VerticalLayout[destroyLayoutNo];
					var layout2 = this.facility2VerticalLayout[destroyLayoutNo];
					var layout3 = this.facility3VerticalLayout[destroyLayoutNo];
					layout1.destroy();
					layout1_1.destroy();
					layout2.destroy();
					layout3.destroy();
					this.deletedLayouts[destroyLayoutNo]=1;
				}.bind(this)
			});
			var oLabel3 = new sap.m.Label({
				text: "",
				design: "Bold",
				textAlign: "Left",
				width: "100%"
			});

			this.oVL_3.addItem(oLabel3);
			this.oVL_3.addItem(destroyButton);

			this.oHL.addItem(this.oVL_1);
			this.oHL.addItem(this.oVL_1_1);
			this.oHL.addItem(this.oVL_2);
			this.oHL.addItem(this.oVL_3);

			this.getView().byId("gfmRequest").addContent(this.oHL);

			this.facilityComboBoxId = "facility";
			this.facilityItemComboBoxId = "facilityItem";
			this.quantityComboBoxId = "quantity";
			this.facilityDestroyId = "destroyId";

		},
		
		addIT: function()
		{

			this.ITDLayoutNo = this.ITDLayoutNo + 1;

			this.ITDComboBoxId = this.ITDComboBoxId + this.ITDLayoutNo;
			this.ITDInputId = this.ITDInputId + this.ITDLayoutNo;
			this.ITDInputLabelId = this.ITDInputLabelId + this.ITDLayoutNo;
			this.ITDDestroyId = this.ITDDestroyId + this.ITDLayoutNo;

			this.oHL_ITD = new sap.m.HBox({
				width: "100%"
			});

			this.ITD1VerticalLayout[this.ITDLayoutNo] = new sap.m.VBox({
				width: "100%",
				direction: "Column"
			});
			this.ITD2VerticalLayout[this.ITDLayoutNo] = new sap.m.VBox({
				width: "100%",
				direction: "Column"
						});
			this.ITD3VerticalLayout[this.ITDLayoutNo] = new sap.m.VBox({
				width: "100%",
				direction: "Column"
			});

			this.oVL_1 = this.ITD1VerticalLayout[this.ITDLayoutNo];
			this.oVL_2 = this.ITD2VerticalLayout[this.ITDLayoutNo];
            this.oVL_3 = this.ITD3VerticalLayout[this.ITDLayoutNo];
            
            this.oVL_2.setVisible(false);

			var oComboBox1 = new sap.m.ComboBox(this.ITDComboBoxId, {
				placeholder: "select",
				width: "75%"
						});
			var oLabel1 = new sap.m.Label({
				text: "Facility",
				design: "Bold",
				textAlign: "Left",
				width: "100%"
			});

			this.oVL_1.addItem(oLabel1);
			this.oVL_1.addItem(oComboBox1);

			var oInput2 = new sap.m.Input(this.ITDInputId, {
				placeholder: "",
				width: "75%"
			});
			var oLabel2 = new sap.m.Label(this.ITDInputLabelId, {
				text: "",
				design: "Bold",
				textAlign: "Left",
				width: "100%"
			});

			this.oVL_2.addItem(oLabel2);
			this.oVL_2.addItem(oInput2);

			var destroyButton = new sap.m.Button(this.ITDdestroyId, {
				icon: "sap-icon://delete",
				press: function(oEvent) {
					var id = oEvent.getParameters("").id;
					var destroyLayoutNo = "";
					for (var i = 11; i < id.length; i++) {
						destroyLayoutNo = destroyLayoutNo + id[i];
					}
					var layout1 = this.ITD1VerticalLayout[destroyLayoutNo];
					var layout2 = this.ITD2VerticalLayout[destroyLayoutNo];
					var layout3 = this.ITD3VerticalLayout[destroyLayoutNo];
					layout1.destroy();
					layout2.destroy();
					layout3.destroy();
					this.deletedITDLayouts[destroyLayoutNo]=1;
				}.bind(this)
			});
			var oLabel3 = new sap.m.Label({
				text: "",
				design: "Bold",
				textAlign: "Left",
				width: "100%"
			});

			this.oVL_3.addItem(oLabel3);
			this.oVL_3.addItem(destroyButton);

			this.oHL_ITD.addItem(this.oVL_1);
			this.oHL_ITD.addItem(this.oVL_2);
			this.oHL_ITD.addItem(this.oVL_3);

			this.getView().byId("itRequest").addContent(this.oHL_ITD);

			this.ITDComboBoxId = "ITeq";
			this.ITDInputId = "ITDetail";
			this.ITDInputLabelId = "ITDetailLabel";
			this.ITDDestroyId = "ITDdestroyId";
		    
		},
		
		ITSelect: function()
		{
		   var ITequip = this.getView().byId("it").getValue();
		   
		   if(ITequip === "Laptop" || ITequip === "Mike" || ITequip === "Speaker" || ITequip === "Laptop")
		   {
            this.getView().byId("itQuantityLable").setText("Quantity");
            this.getView().byId("slideChangerVB").setVisible(false);
            this.getView().byId("confMed").setVisible(false);
           }
		   else if(ITequip === "Conference" || ITequip === "SAP Connect")
		   {
		   this.getView().byId("itQuantityLable").setText("Participant Code");
		   this.getView().byId("slideChangerVB").setVisible(false);
		   this.getView().byId("confMed").setVisible(false);
		    if(ITequip === "Conference")
		    {
		        this.getView().byId("confMed").setVisible(true);
		    }
		    else{
		        this.getView().byId("confMed").setVisible(false);
		    }
		   }
		   else{
		    this.getView().byId("itQuantityLable").setText("Quantity");     
		    this.getView().byId("slideChangerVB").setVisible(true);
		    this.getView().byId("confMed").setVisible(false);
		   }
		   this.getView().byId("quantityIT").setVisible(true);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */
		onShareInJamPress: function() {
			var oViewModel = this.getModel("objectView"),
				oShareDialog = sap.ui.getCore().createComponent({
					name: "sap.collaboration.components.fiori.sharing.dialog",
					settings: {
						object: {
							id: location.href,
							share: oViewModel.getProperty("/shareOnJamTitle")
						}
					}
				});
			oShareDialog.open();
		},

		/**
		 * Event handler  for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
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

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then(function() {
				var sObjectPath = this.getModel().createKey("Categories", {
					CategoryID: sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView: function(sObjectPath) {
			var oViewModel = this.getModel("objectView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: sObjectPath,
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
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

			var oResourceBundle = this.getResourceBundle(),
				oObject = oView.getBindingContext().getObject(),
				sObjectId = oObject.CategoryID,
				sObjectName = oObject.CategoryName;

			// Everything went fine.
			oViewModel.setProperty("/busy", false);
			oViewModel.setProperty("/saveAsTileTitle", oResourceBundle.getText("saveAsTileTitle", [sObjectName]));
			oViewModel.setProperty("/shareOnJamTitle", sObjectName);
			oViewModel.setProperty("/shareSendEmailSubject",
				oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage",
				oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
		}

	});

});