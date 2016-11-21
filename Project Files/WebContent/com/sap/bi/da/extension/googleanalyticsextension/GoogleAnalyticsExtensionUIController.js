define(function() {
    "use strict";

    var GoogleAnalyticsExtensionUIController = function(acquisitionState, oDeferred, fServiceCall, workflow, gaApi,ExtensionUtils) {
    	var that = this;
    	var list = null;

		var reportType = "na";
		if (sap.ui.getCore().byId("startDatePicker")!=null){
	        	sap.ui.getCore().byId("startDatePicker").destroy();
	    }
		if (sap.ui.getCore().byId("endDatePicker")!=null){
        	sap.ui.getCore().byId("endDatePicker").destroy();
		}	
    	var oStartDatePicker = new sap.ui.commons.DatePicker("startDatePicker",{
			width: "100%",
			value: {type: new sap.ui.model.type.Date({pattern: "yyyy-MM-dd", style: "short", strictParsing: true})}
		});
    	oStartDatePicker.setYyyymmdd(ExtensionUtils.calcLastNDaysFromToday(30));
    	var oEndDatePicker = new sap.ui.commons.DatePicker("endDatePicker",{
			width: "100%",
			value: {type: new sap.ui.model.type.Date({pattern: "yyyy-MM-dd", style: "short", strictParsing: true})}
		})
    	oEndDatePicker.setYyyymmdd(ExtensionUtils.calcLastNDaysFromToday(0));
		var oStartDateLabel = new sap.ui.commons.Label({ text: "Start Date:"});
		var oEndDateLabel = new sap.ui.commons.Label({ text: "End Date:"});
		var dateLayout = new sap.ui.commons.layout.MatrixLayout({
	            layoutFixed : false,
	            columns : 4,
	            width : "100%",
	            height : "100%",
	            widths : [ "15%","35%","15%","35%"]
	        }).addStyleClass('dsAvailLayout');
        var row  = new sap.ui.commons.layout.MatrixLayoutRow();
        row.addStyleClass("dsLayoutRow");
        row.addCell(new sap.ui.commons.layout.MatrixLayoutCell({content:oStartDateLabel}));
        row.addCell(new sap.ui.commons.layout.MatrixLayoutCell({content:oStartDatePicker}));
        row.addCell(new sap.ui.commons.layout.MatrixLayoutCell({content:oEndDateLabel}));
        row.addCell(new sap.ui.commons.layout.MatrixLayoutCell({content:oEndDatePicker}));
        dateLayout.addRow(row);
        
        var mGAMetaViewLayout = new sap.ui.commons.layout.MatrixLayout({
            layoutFixed : true,
            columns : 2,
            width : "100%",
            height : "100%",
            widths : [ "50%", "50%" ]
        });
        if (sap.ui.getCore().byId("oGASelect")!=null){
        	sap.ui.getCore().byId("oGASelect").destroy();
        }
        var oGASelect = new sap.ui.commons.DropdownBox("oGASelect",{
            width: '300px',
            displaySecondaryValues: true,
            items: [
				new sap.ui.core.ListItem({text:"Select Datasource", additionalText: "no selection", disabled:true})
            ]
        }).addStyleClass('dsDropDown');
        var dsAvailLayout = new sap.ui.commons.layout.MatrixLayout({
            layoutFixed : false,
            columns : 2,
            width : "100%",
            height : "100%",
            widths : [ "30%", "70%" ]
        }).addStyleClass('dsAvailLayout');
      
        oGASelect.attachChange(function(e){
			reportType = sap.ui.getCore().byId("oGASelect").getSelectedItemId().substring(0,2);//e.getParameters().selectedItem.getId().substring(0,2);
			if (sap.ui.getCore().byId("oGASelect").getItems()[0].getText()=="Select Datasource"){
				sap.ui.getCore().byId("oGASelect").removeItem(0);
			}
			if ($("#srcCont").children() && $("#srcCont").children().length>0) {
				$("#srcCont").jstree().destroy();
			}
			if ($("#trgCont").children() && $("#trgCont").children().length>0) {
				$("#trgCont").jstree().destroy();
			}
        	

	    	var funcMetadataReady = function (response) {
	    		that.showQueryEditor(response);
	        }
            gaApi.getReportMetadata(funcMetadataReady,reportType);
        });
        
        var mGAMetaViewLabel = new sap.ui.commons.Label();
       
        mGAMetaViewLabel.setText("Available Elements:");
        mGAMetaViewLabel.addStyleClass("gaDsViewLabel");
       
        var oDataSetNameInput = new sap.ui.commons.TextField({
            editable: true,
            width: "100%",
            value: "",
            maxLength: 100
        });
        oDataSetNameInput.addStyleClass("gaMainLayoutBorders gaTextStyle gaDataSetName");
        
        var oDatasetName = new sap.ui.commons.Label({
            labelFor: oDataSetNameInput,
            width: "100%",
            tooltip:""
        });
        oDatasetName.addStyleClass("gaDsViewLabel");
        oDatasetName.setText("Dataset Name:");
        oDatasetName.addStyleClass('gaTextStyle');
        var row  = new sap.ui.commons.layout.MatrixLayoutRow();
        row.addStyleClass("dsLayoutRow");
        row.addCell(new sap.ui.commons.layout.MatrixLayoutCell({content:mGAMetaViewLabel}));
        row.addCell(new sap.ui.commons.layout.MatrixLayoutCell({content:oGASelect}));
        dsAvailLayout.addRow(row);

        row  = new sap.ui.commons.layout.MatrixLayoutRow();
        row.addStyleClass("dsLayoutRow");
        row.addCell(new sap.ui.commons.layout.MatrixLayoutCell({content:dsAvailLayout}));
        row.addCell(new sap.ui.commons.layout.MatrixLayoutCell({content:dateLayout}));
        mGAMetaViewLayout.addRow(row);

		if ($("#srcCont")!=null){
			$("#srcCont").remove();
		}
		if ($("#trgCont")!=null){
			$("#trgCont").remove();
		}
        var src = new sap.ui.core.HTML({height : "100%",content : "<div id='srcCont' style='vertical-align:top;height:100%;background-color:white;padding:0px;'></div>"});
       
        var dst = new sap.ui.core.HTML({height : "100%",content : "<div id='trgCont' style='valign:top;height:100%;background-color:white;'></div>"});

        var oDescriptionInput = new sap.ui.commons.TextArea({
            editable: false,
            width: "100%",
            height : "400px",
            value: ""
        });
     
        var vDescLayout = new sap.ui.commons.layout.VerticalLayout({
            width: "100%"
        }).addStyleClass("vDescLayout");

        vDescLayout.addContent(oDescriptionInput);
        
        var mGAMetaSearch = new sap.ui.commons.SearchField({
            width: "100%",
            enableListSuggest: false,
            enableClear: true,
            startSuggestion: 0,
            enabled: true,
            suggest: function (oEvent) {
                var eventValue = oEvent.getParameter("value");
				$("#srcCont").jstree().search (eventValue);
            }
        });
        mGAMetaSearch.addStyleClass("mGAMetaSearchField");
        var searchId = mGAMetaSearch.getId();

        mGAMetaSearch.onAfterRendering = function () {
            $('#' + searchId + '-tf-input').attr('placeholder', "Find"); 
        };
        mGAMetaViewLayout.createRow(mGAMetaSearch, oDataSetNameInput);
        mGAMetaViewLayout.createRow(src, dst);
     
        var buttonCancelPressed = function() {
			oDeferred.reject();
            dialog.close();
        };

        var buttonChangeApiKeyPressed = function() {
			var apiKeyLayout = new sap.ui.commons.layout.MatrixLayout({
				layoutFixed : true,
				columns : 2,
				width : "100%",
				height : "100%",
				widths : [ "30%", "70%" ]
			});
			var apiKeyTxt = new sap.ui.commons.TextField({"width": "100%"});
			apiKeyLayout.createRow(new sap.ui.commons.Label({"text": "API Key:"}), apiKeyTxt);
			var clientIdTxt = new sap.ui.commons.TextField({"width": "100%"});
			apiKeyLayout.createRow(new sap.ui.commons.Label({"text": "Client ID:"}), clientIdTxt);
			apiKeyLayout.createRow(new sap.ui.commons.Label({"text": "JavaScript Origin:"}), new sap.ui.commons.Label({"text": "http://" + window.location.host}));
			var apiKeyOkButtonPressed = function() {
				ExtensionUtils.persistNewKeys(apiKeyTxt.getValue(), clientIdTxt.getValue());
				gapi.client.setApiKey(ExtensionUtils.getApiKey());
				gaApi.checkAuth();
				apiKeyDialog.close();
			};
			var apiKeyCancelButtonPressed = function() {
				apiKeyDialog.close();
			};
			var apiKeyOnClosed = function() {

			};
			var apiKeyOkButton = new sap.ui.commons.Button({
				press : [ apiKeyOkButtonPressed, this ],
				text : "OK",
				tooltip : "OK"
			});

			var apiKeyCancelButton = new sap.ui.commons.Button({
				press : [ apiKeyCancelButtonPressed, this ],
				text : "Cancel",
				tooltip : "cancel"
			});

			var apiKeyDialog = new sap.ui.commons.Dialog({
				width : "500px",
				height : "260px",
				modal : true,
				resizable : false,
				closed : apiKeyOnClosed,
				content: [apiKeyLayout],
				buttons : [apiKeyOkButton, apiKeyCancelButton]
			});
			apiKeyDialog.setTitle("Please enter your API Key and Client ID");
			apiKeyTxt.setValue(ExtensionUtils.getApiKey());
			clientIdTxt.setValue(ExtensionUtils.getClientId());
			apiKeyDialog.open();
		};


        var buttonOKPressed = function() {
        	
        	var i=0;
			var dims = "";
			var msrs = "";
			var sort = "";
			var filters = "";
			var bDate = "";
			var eDate = "";
			var qryDataSourceType = "";
			var sampleSize = 1000;
        	
        	var tree  = $("#trgCont").jstree();
        	var data = tree.get_json();
        	
        	var dsMetadata = {};
			dsMetadata.version = "1.0";
			dsMetadata.columns = [];
			var id = 0;
        	for (i=0;i<data[0].children.length;++i){
        		list.reduce(function(distinctValues, obj) {
           			if (obj.attributes["uiName"]==data[0].children[i].text && obj.attributes["type"]=="DIMENSION" && obj.attributes["status"]!="DEPRECATED") {
						 dims+= obj.id+",";
						 dsMetadata.columns.push({
							"name": obj.attributes["uiName"],
							"id": 	"id"+id,
							"type": ExtensionUtils.getLumDataTypeFromGA(obj.attributes["dataType"]),
							"analyticalType": "dimension"
						});
						id++;
           			}
             		return distinctValues;
   	          	}, [])[0];
			}
        	
        	for (i=0;i<data[1].children.length;++i){
    			list.reduce(function(distinctValues, obj) {
           			if (obj.attributes["uiName"]==data[1].children[i].text && obj.attributes["type"]=="METRIC" && obj.attributes["status"]!="DEPRECATED") {
						 msrs+= obj.id+",";
						 dsMetadata.columns.push({
							"name": obj.attributes["uiName"],
							"id": 	"id"+id,
							"type": ExtensionUtils.getLumDataTypeFromGA(obj.attributes["dataType"]),
							"analyticalType": "measure",
							"aggregationFunction":"SUM"
						});
						id++;
           			}
             		return distinctValues;
   	          	}, [])[0];
			}
        	
        	var funcQueryComplete = function(queryResponse) {
        		 var info = queryResponse.profileInfo;
				//info.accountId
				//info.webPropertyId
				//info.profileId
				//info.tableId
				//info.profileName
        		 var csvContent = "";
				if (queryResponse.rows && queryResponse.rows.length) {
					queryResponse.rows.forEach(function(infoArray, index){
						var c = 0;
						var dataString="";
						for (c=0;c<infoArray.length;c++){
							if (dsMetadata.columns[c].analyticalType=="measure"){
								dataString+=+infoArray[c]+",";
							}
							else {
								if (dsMetadata.columns[c].type=="string") {
									dataString+="\""+infoArray[c]+"\",";
								}
								else {
									dataString+=infoArray[c]+",";
								}
							}
						}
						dataString = dataString.substring(0,dataString.length-1);
						csvContent += index < queryResponse.rows.length ? dataString+"\n" : dataString;
					}); 
				}
	        	
	        	
                var info = {};
                
                info.datasetName = oDataSetNameInput.getValue();
                info.datasetType = qryDataSourceType;
                info.begDate = bDate;
                info.endDate = eDate;
    			info.datasetState = data;
    			info.dimensions = dims;
    			info.metrics = msrs;
    			info.csvContent = csvContent;
    			info.csvHeader = JSON.stringify(dsMetadata);
                acquisitionState.info = JSON.stringify(info);
                
                oDeferred.resolve(acquisitionState, info.datasetName);
                dialog.close();
        	}
        	dims = dims.substring(0,dims.length-1);
        	msrs = msrs.substring(0,msrs.length-1);
        	bDate = sap.ui.getCore().byId("startDatePicker").getYyyymmdd();//ExtensionUtils.calcLastNDaysFromToday(30);
        	eDate = sap.ui.getCore().byId("endDatePicker").getYyyymmdd();//ExtensionUtils.calcLastNDaysFromToday(0);
        	qryDataSourceType = sap.ui.getCore().byId("oGASelect").getSelectedItemId();
        	
        	if (bDate.indexOf("-")==-1){
        		bDate = bDate.substr(0,4)+"-"+bDate.substr(4,2)+"-"+bDate.substr(6,2)
        	}
        	
        	if (eDate.indexOf("-")==-1){
        		eDate = eDate.substr(0,4)+"-"+eDate.substr(4,2)+"-"+eDate.substr(6,2)
        	}
        	var reportType = qryDataSourceType.substring(0,2);
        	
        	if (reportType == "ga"){
        		gaApi.execGAQuery(qryDataSourceType.substring(2), dims, msrs, sort, filters, bDate, eDate, sampleSize, funcQueryComplete);
        	}
        	else if (reportType == "yt"){
        		gaApi.execYTQuery(qryDataSourceType.substring(2), dims, msrs, sort, filters, bDate, eDate, sampleSize, funcQueryComplete);
        	}
        	
        	
			
        };

        var okButton = new sap.ui.commons.Button({
            press : [ buttonOKPressed, this ],
            text : "OK",
            tooltip : "OK"
        }).setStyle(sap.ui.commons.ButtonStyle.Accept);

        var cancelButton = new sap.ui.commons.Button({
            press : [ buttonCancelPressed, this ],
            text : "Cancel",
            tooltip : "Cancel"
        }).addStyleClass(sap.ui.commons.ButtonStyle.Default);

		var apiKeyButton = new sap.ui.commons.Button({
			press: [ buttonChangeApiKeyPressed, this],
			text : "Change API Key",
			tooltip : "Change API Key and Client ID"
		});

        var onClosed = function() {
            if (oDeferred.state() === "pending") {
                oDeferred.reject();
            }
        };

        /*
        Modify controls based on acquisitionState
        */
        var selectedData = null;
        var selectedDataSrc = null;
        var envProperties = acquisitionState.envProps;
        if (acquisitionState.info) {
            var info = JSON.parse(acquisitionState.info);
            
            if (info.datasetState) {
            	selectedData = info.datasetState;
            	selectedDataSrc = info.datasetType;
            }
            envProperties.datasetName = info.datasetName;
        }
        oDataSetNameInput.setValue(envProperties.datasetName);
        /*
        Create the dialog
        */
        var dialog = new sap.ui.commons.Dialog({
            width : "960px",
            height : "840px",
            modal : true,
            resizable : false,
            closed : onClosed,
            content: [mGAMetaViewLayout],
            buttons : [okButton, apiKeyButton, cancelButton]
        }).addStyleClass("GaDialog");
        dialog.setTitle("Google Analytics Reporting: " + envProperties.datasetName);
        dialog.open();

        this.showQueryEditor = function(response) {
        	
        	list = response.items;
        	var groups = list.reduce(function(distinctValues, obj) {
        		  if (distinctValues.indexOf(obj.attributes["group"]) === -1) {
        			  distinctValues.push(obj.attributes["group"])
        		  }
        		  return distinctValues;
        	}, []);
        	var i =0;
        	var c =0;
        	var treenodes = [];
        	for (i=0;i<groups.length;++i){
				treenodes.push({id:groups[i],text:groups[i],type: "folder", children:[]});
        		var t = list.reduce(function(distinctValues, obj) {
        			if (obj.attributes["status"]!="DEPRECATED") {
		          		  if (obj.attributes["group"]==groups[i]) {
		          			  if (obj.attributes["type"]=="DIMENSION")
		          				  treenodes[i].children.push({id:obj.id,text:obj.attributes["uiName"],type: "file",icon:"dim", gaId:obj.id});
		          			 if (obj.attributes["type"]=="METRIC")
		         				  treenodes[i].children.push({id:obj.id,text:obj.attributes["uiName"],type: "file",icon:"msr", gaId:obj.id});
		          		  }
        			}
          		  return distinctValues;
	          	}, []);
        	}
          
		$('#srcCont').on("changed.jstree", function (e, data) {
					if(data.selected.length) {
						var n = data.instance.get_node(data.selected[0]);//.text;
						
						if(n.icon=="dim") {
							var node = { id:n.id,text:n.text,icon:"dim"};
							$('#trgCont').jstree('create_node', $("#dimtarget"), node, 'last');
						}
							
						if(n.icon=="msr") {
							var node = { id:n.id,text:n.text,icon:"msr"};
							$('#trgCont').jstree('create_node', $("#msrtarget"), node, 'last');
						}
						$('#trgCont').jstree('open_all');	
					//	$("#trgCont").jstree('create_node', $("#dimtarget"), n.text, 'last');
					//	$('#trgCont').jstree("create_node", $("#dimtarget"), "first", {attr : {id: n.id}, data: n.text})
						//alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
					}
			}).jstree({
				'core' : {
				    'check_callback': function(operation, node, node_parent, node_position, more) {
	                    if (operation === "move_node") {
	                    	return false;
							/* if (node.icon=="dim") {
							 	if (node_parent.original)
	                        		return (node_parent.original.type != "file"); //only allow dropping inside nodes of type 'Parent'
							 }
							 if (node.icon=="msr") {
								 	if (node_parent.original)
		                        		return (node_parent.original.type != "file"); //only allow dropping inside nodes of type 'Parent'
								 }*/
							 	// if (node.icon=="msr")
	                        //	return (node_parent.original.type === "parent");
	                    }
						 if (operation === "copy_node") {
							 if (node.icon=="folder") return false;
							 if (node.icon=="dim")
	                        	return (node_parent.id === "dimtarget"); 
	                   		 if (node.icon=="msr")
	                        	return (node_parent.id === "msrtarget");
	                    }
	                    return true; 
	                },
					'multiple' : true,
					"html_titles" : true ,
					'data' : function (obj, callback) {
			            callback.call(this, treenodes);
			        },
					'themes' : {
						'responsive' : false,
						'variant' : 'small',
						'stripes' : false,
						 "dots" : true,
			             "icons" : true
					}
				},
				'types' : {
					'default' : { 'icon' : 'folder' },
					'file' : { 'valid_children' : [], 'icon' : 'file' }
				},
	            "themes" : {
	                "theme" : "default",
	                "dots" : true,
	                "icons" : true
	            },
	            "search" :{
	            	"show_only_matches": true
	            },
	            "dnd" : {
	            	"always_copy" : true,
	                //"drop_target" : "#test_area",
	                "drop_finish" : function (data) {
	                    if(data.o.attr("rel") === "ds") {
	                      //update chart with new data here?
	                      //using data.o.attr("id")
	                     	var dragged = $(data.o);
	        				var dropTarget = data.r;

	        			//	var fnc = dropTarget.droppable('option','drop');

	        			//	fnc(null,data); 
	                    }
	                }
	            },
	           // "crrm" : { move : { check_move : function (m) { return false; } } },
				"plugins" : ["unique","dnd", "search",  "types" ],
			});
			if (selectedData==null) {
				selectedData=[{class:"jstree-draggable",id:'dimtarget',text:"Dimensions"},
				              {class:"jstree-draggable",id:'msrtarget',text:"Metrics"},
				              {class:"jstree-draggable",id:'flttarget',text:"Filters"},
				              {class:"jstree-draggable",id:'srttarget',text:"Sort"}]
			}
			$('#trgCont').on("changed.jstree", function (e, data) {
				if(data.selected.length) {
					//alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
				}
			}).on("dnd_start", function (e, data) {
				if(data.selected.length) {
					//alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
				}
			}).jstree({
				'core' : {
					'check_callback': function(operation, node, node_parent, node_position, more) {
	                    if (operation === "move_node") {
	                    	return false;
							/* if (node.icon=="dim") {
							 	if (node_parent.original)
	                        		return (node_parent.original.type != "file"); //only allow dropping inside nodes of type 'Parent'
							 }
							 if (node.icon=="msr") {
								 	if (node_parent.original)
		                        		return (node_parent.original.type != "file"); //only allow dropping inside nodes of type 'Parent'
								 }*/
							 	// if (node.icon=="msr")
	                        //	return (node_parent.original.type === "parent");
	                    }
						 if (operation === "copy_node") {
							 if (node.icon=="folder") return false;
							 if (node.icon=="dim")
	                        	return (node_parent.id === "dimtarget" || node_parent.id === "flttarget" || node_parent.id === "srttarget"); 
	                   		 if (node.icon=="msr")
	                        	return (node_parent.id === "msrtarget");
	                    }
	                    return true; 
	                },
					'multiple' : true,
					"html_titles" : true ,
					'data' : selectedData,
					
					/*function (obj, callback) {
			            callback.call(this, [{class:"jstree-draggable",id:'dimtarget',text:"Dimensions"},{class:"jstree-draggable",id:'msrtarget',text:"Metrics"}]);
			        },*/
					'themes' : {
						'responsive' : false,
						'variant' : 'small',
						'stripes' : false,
						 "dots" : true,
			             "icons" : true
					}
				},
				'types' : {
					'default' : { 'icon' : 'folder' },
					'file' : { 'valid_children' : ['file'], 'icon' : 'file' }
				},
	            "themes" : {
	                "theme" : "default",
	                "dots" : true,
	                "icons" : true
	            },
	            "dnd" : {
	                //"drop_target" : "#test_area",
	                "dnd_stop" : function (data) {
	                    if(data.o.attr("rel") === "ds") {
	                      //update chart with new data here?
	                      //using data.o.attr("id")
	                     	var dragged = $(data.o);
	        				var dropTarget = data.r;
	
	        			//	var fnc = dropTarget.droppable('option','drop');
	
	        			//	fnc(null,data); 
	                    }
	                },
	                "drag_stop" : function (data) {
	                    if(data.o.attr("rel") === "ds") {
	                     	var dragged = $(data.o);
	        				var dropTarget = data.r;
	
	                    }
	                }
	            },
	           // "crrm" : { move : { check_move : function (m) { return false; } } },
				"plugins" : ["unique","dnd", "types" ],
			});
			$(document)
            .on('dnd_move.vakata', function (e, data) {
                var t = $(data.event.target);
				if (data.data.origin.get_container().attr("id")=="trgCont"){
					
				}
				if (data.data.origin.get_container().attr("id")=="srcCont"){
					if(!t.closest('.jstree').length) {
						if(t.closest('.drop').length) {
							data.helper.find('.jstree-icon').removeClass('jstree-er').addClass('jstree-ok');
						}
						else {
							data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');
						}
                	}
				}
                
            })
            .on('dnd_stop.vakata', function (e, data) {
                var t = $(data.event.target);
                if(data.data.jstree && data.data.origin) {
                	console.log(data.data.origin.get_node(data.element)); 
					if (data.data.origin.get_container().attr("id")=="trgCont"){
						for (var i=0;i<data.data.nodes.length;++i){
							if (data.data.nodes[i]!="msrtarget" && data.data.nodes[i]!="dimtarget") {
								$("#trgCont").jstree().delete_node(data.data.origin.get_node(data.data.nodes[i]));
							}
						}
					 	 
					}
                }
                if(!t.closest('.jstree').length) {
                    if(t.closest('.drop').length) {
                        $(data.element).clone().appendTo(t.closest('.drop'));
                        // node data: 
                        // if(data.data.jstree && data.data.origin) { console.log(data.data.origin.get_node(data.element); }
                    }
                }
                $('#trgCont').jstree('open_all');
            });
        };

    };
    return GoogleAnalyticsExtensionUIController;
});