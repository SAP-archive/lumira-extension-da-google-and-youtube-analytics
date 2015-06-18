jQuery.sap.require("com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils");
jQuery.sap.includeStyleSheet(sap.ui.resource("com.sap.bi.da.extension.googleanalyticsextension.themes.default", "style.css"));

define(["service!sap.bi.da.extension.sdk.clientRequestService", "GoogleAnalyticsExtensionUIController","GoogleAnalyticsApi","tree"], function (ClientRequestService, GoogleAnalyticsExtensionUIController, GoogleAnalyticsApi, tree) {
    "use strict";
    
    var ExtensionUtils = new com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils();
    
    function GoogleAnalyticsExtension() {

        var EXTENSION_ID = "com.sap.bi.da.extension.googleanalyticsextension";
    	var gaApi = new GoogleAnalyticsApi(ExtensionUtils);

    	
        var fServiceCall = function(request, fSuccess, fFailure) {
        	// The ClientRequestService is a way for the extension to communicate to its Java backend
        	// request will be passed to getClientRequestJob()
        	// The value returned by clientRequestJob.execute() will be passed to the fSucess callback
        	// If an error occurs, the fFailure callback will be called
        	ClientRequestService.callClientRequestService(EXTENSION_ID, request, fSuccess, fFailure);
        };

        var createGoogleAnalyticsExtensionUIWorkflow = function(acquisitionState, workflow) {
            var oDeferred = new jQuery.Deferred();
            
            var uiController = null;
            
           
            uiController = new GoogleAnalyticsExtensionUIController(acquisitionState, oDeferred, fServiceCall, workflow, gaApi, ExtensionUtils);
            
            var funcApiReady = function () {
            	//determine ds type == yes i know but if user did not select a channel then no need to show youtube
            	var dsCount = 0;
            	var oCombo = sap.ui.getCore().byId("oGASelect");
            	var bDatePicker = sap.ui.getCore().byId("startDatePicker");
            	var eDatePicker = sap.ui.getCore().byId("endDatePicker");
            	gaApi.getGAProfileId(function(profiles){
            		
            		for (var i=0;i<profiles.length;++i) {
            			oCombo.addItem(new sap.ui.core.ListItem("ga"+profiles[i].id,{text:"Google Analytics", additionalText: "Profile:"+profiles[i].id}));
            		}
            		
        			gaApi.getYTChannelId(function(channels){
        				
        				for (var i=0;i<channels.length;++i) {
        					oCombo.addItem(new sap.ui.core.ListItem("yt"+channels[i].id,{text:"YouTube Analytics", additionalText: "Channel:"+channels[i].id}));
                		}
        				
        				if (acquisitionState.info) {
        					
	           				 if (workflow=="EDIT") {
	           		            var info = JSON.parse(acquisitionState.info);
								bDatePicker.setYyyymmdd(info.begDate);
	   			            	eDatePicker.setYyyymmdd(info.endDate);
	   			            	oCombo.setSelectedItemId(info.datasetType);
	   			            	oCombo.fireChange();

	           				 }
	           				
           			 	}
        			});	
        			 
        			
            	});
        	};

            gaApi.init(funcApiReady);
           
            
            return oDeferred.promise();
        };

    	// This function will be called during a create dataset workflow
        // This function must immediately return a promise object
        // When the extension is finished performing UI tasks, resolve the promise with the acquisitionState and dataset name
        // Other workflows do not need the dataset name
        // The resolved acquisitionState will be passed to the extension Java backend getDataAcquisitionJobContext()
        this.doCreateWorkflow = function(acquisitionState) {
        	
            return createGoogleAnalyticsExtensionUIWorkflow(acquisitionState, "CREATE");
        };

    	// This function will be called during an edit dataset workflow
        this.doEditWorkflow = function(acquisitionState) {
            return createGoogleAnalyticsExtensionUIWorkflow(acquisitionState, "EDIT");
        };

        // This function will be called during a refresh workflow
        // This function should refresh the dataset with existing parameters
        // Minimal UI should be shown, if any
        this.doRefreshWorkflow = function(acquisitionState) {
            var oDeferred = new jQuery.Deferred();
            oDeferred.resolve(acquisitionState);
            return oDeferred.promise();
        };
    }

    // Functions that do not need to access private variables can be declared as part of the prototype

    // This function must return an Object with properties Title and SubTitle, determined by the provided acquisitionState
    // This will be displayed as an entry in the Most Recently Used pane
    GoogleAnalyticsExtension.prototype.getConnectionDescription = function(acquisitionState) {
        var info = JSON.parse(acquisitionState.info);
        return {
            Title: info.datasetName,
            SubTitle: info.csv
        };
    };

    // getIcon## must return a path to an image with size 48px*48px
    GoogleAnalyticsExtension.prototype.getIcon48 = function() {
        return "/img/48.png";
    };
    GoogleAnalyticsExtension.prototype.getIcon32 = function() {
        return "/img/32.png";
    };
    // The white version of the icon will be displayed when the extension is highlighted in the New Dataset dialog
    GoogleAnalyticsExtension.prototype.getIcon32_white = function() {
        return "/img/32_w.png";
    };
    GoogleAnalyticsExtension.prototype.getIcon24 = function() {
        return "/img/24.png";
    };
    GoogleAnalyticsExtension.prototype.getIcon16 = function() {
        return "/img/16.png";
    };

    return GoogleAnalyticsExtension;
});