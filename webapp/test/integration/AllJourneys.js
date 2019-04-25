jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"eventPlanner/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"eventPlanner/test/integration/pages/Worklist",
		"eventPlanner/test/integration/pages/Object",
		"eventPlanner/test/integration/pages/NotFound",
		"eventPlanner/test/integration/pages/Browser",
		"eventPlanner/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "eventPlanner.view."
	});

	sap.ui.require([
		"eventPlanner/test/integration/WorklistJourney",
		"eventPlanner/test/integration/ObjectJourney",
		"eventPlanner/test/integration/NavigationJourney",
		"eventPlanner/test/integration/NotFoundJourney",
		"eventPlanner/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});