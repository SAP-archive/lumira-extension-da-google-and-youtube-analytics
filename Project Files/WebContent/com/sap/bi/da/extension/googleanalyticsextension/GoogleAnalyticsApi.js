define(function () {
    var GoogleAnalyticsApi = function (ExtensionUtils) {
        var readyFunc = null;
        var libs = 0;
        var ytChannelId = null;
        var gaProfileId = null;
        var _isSessionValid = function () {
            return new Date(parseInt(gapi.auth.getToken().expires_at) * 1000) > new Date();
        }

        this.init = function (clientFunc) {
            var that = this;
            readyFunc = clientFunc;
            if (typeof(gapi) != 'undefined') {
                /*    			if (typeof(gapi.client!='undefined') && typeof(gapi.client.analytics!='undefined')) {
                 if (_isSessionValid())
                 readyFunc();
                 else
                 this.checkAuth();
                 }
                 else {*/
                this.checkAuth();
                //}
            } else {
                window._ga_client_load_callback = function () {
                    gapi.client.setApiKey(ExtensionUtils.getApiKey());
                    window.setTimeout(that.checkAuth, 1);
                };

                var apiKeyCallback = function() {
                    var scripttag = document.createElement('script');
                    scripttag.setAttribute('src', 'https://apis.google.com/js/client.js?onload=_ga_client_load_callback');
                    document.head.appendChild(scripttag);
                };

                if (ExtensionUtils.getApiKey() && ExtensionUtils.getClientId()) {
                    apiKeyCallback();
                } else {
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
                    apiKeyDialog.close();
                    apiKeyCallback();
                }
                var apiKeyOnClosed = function() {

                };
                var apiKeyOkButton = new sap.ui.commons.Button({
                    press : [ apiKeyOkButtonPressed, this ],
                    text : "OK",
                    tooltip : "OK"
                });
                var apiKeyDialog = new sap.ui.commons.Dialog({
                    width : "500px",
                    height : "260px",
                    modal : true,
                    resizable : false,
                    closed : apiKeyOnClosed,
                    content: [apiKeyLayout],
                    buttons : [apiKeyOkButton]
                });
                apiKeyDialog.setTitle("Please enter your API Key and Client ID");
                apiKeyDialog.open();
            }
            }

        };
        var loadClient = function (id, version) {
            gapi.client.load(id, version, function (resp) {
                if (0 == --libs)
                    readyFunc();
            });
        };
        this.checkAuth = function () {
            var requiredLibs = ExtensionUtils.getSupportedApiClients();
            var libScope = [];
            for (var i = 0; i < requiredLibs.length; ++i) {
                if (requiredLibs[i].enabled) {
                    libScope = libScope.concat(requiredLibs[i].scope);
                    libs++;
                }
            }
            gapi.auth.authorize({client_id: ExtensionUtils.getClientId(), scope: libScope, immediate: false},
                function (authResult) {
                    if (authResult && !authResult.error) {
                        for (var i = 0; i < requiredLibs.length; ++i) {
                            if (requiredLibs[i].enabled) {
                                loadClient(requiredLibs[i].id, requiredLibs[i].version);
                            }
                        }
                    }
                    else {
                        this.handleUnauthorized();
                    }
                }
            );
        };

        this.getAccounts = function (callback) {
            gapi.client.analytics.management.accounts.list().execute(callback);
        };

        this.getGAProfileId = function (callback, accountId, webPropertyId) {

            if (accountId == null || typeof(accountId) == 'undefined') accountId = '~all';
            if (webPropertyId == null || typeof(webPropertyId) == 'undefined') webPropertyId = '~all';

            gapi.client.analytics.management.profiles.list({
                'accountId': accountId, 'webPropertyId': webPropertyId
            }).execute(function (profileResp) {
                if (profileResp && !profileResp.error) {
                    callback(profileResp.items);
                }
                else {
                    callback([]);
                }
            });
        };

        this.getWebProperties = function (accountId, callback) {

            gapi.client.analytics.management.webproperties.list({'accountId': accountId}).execute(callback);
        };

        this.execGAQuery = function (profileId, dims, metrics, sort, filters, bDate, eDate, sampleSize, queryComplete) {

            gapi.client.analytics.data.ga.get({
                'ids': 'ga:' + profileId,
                'start-date': bDate,
                'end-date': eDate,
                'metrics': metrics, 	//eg: ga:visits
                'dimensions': dims, 	//eg: ga:source,ga:keyword
                //'sort': sort, 			//eg: -ga:visits,ga:source
                //'filters': filters, 	//eg: ga:medium==organic
                'max-results': 1000
            }).execute(function (resp) {
                if (resp && !resp.error) {
                    queryComplete(resp);
                }
                else {
                    sap.ui.commons.MessageBox.alert(resp.error.message);
                }
            });


        };

        this.execYTQuery = function (ytChanelId, dims, metrics, sort, filters, bDate, eDate, sampleSize, queryComplete) {

            gapi.client.youtubeAnalytics.reports.query({
                'start-date': bDate,
                'end-date': eDate,
                ids: 'channel==' + ytChanelId,
                dimensions: dims,
                //    sort: sort,
                metrics: metrics,
                //     filters: filters
            }).execute(function (resp) {
                if (resp && !resp.error) {
                    queryComplete(resp);
                }
                else {
                    sap.ui.commons.MessageBox.alert(resp.error.message);
                }
            });

        };

        this.getYTChannelId = function (callback) {
            var request = gapi.client.youtube.channels.list({
                mine: true,
                part: 'id,contentDetails,brandingSettings'
            }).execute(function (resp) {
                if (resp && !resp.error) {
                    callback(resp.items);
                }
                else {
                    callback([]);
                }
            });
        };

        this.getReportMetadata = function (funcMetadataReady, reportType) {
            if (reportType == "ga") {
                var request = gapi.client.analytics.metadata.columns.list({
                    'reportType': reportType
                });
                request.execute(funcMetadataReady);
            }
            else if (reportType == "yt") {
                funcMetadataReady(ExtensionUtils.getYouTubeMetadata());
            }
            else {
                //impossible
                throw new Error("Not Implemented, select data source.")
            }
        };
        this.getPlaylists = function () {
            var request = gapi.client.youtube.playlists.list({
                channelId: 'UCVnIv2xF2wyMMCSKv1qF3pA',
                part: 'id,contentDetails,snippet'
            });

            request.execute(function (response) {
                console.log(JSON.stringify(response));
            });
        };
        this.handleAuthorized = function () {
            this._isReady = true;
        };

        this.handleUnauthorized = function () {
            sap.ui.commons.MessageBox.alert("Please authorize this script to access Google Analytics.");
        };

        this.handleAuthResult = function (authResult) {
            if (authResult && !authResult.error) {
                gapi.client.load(ExtensionUtils.getApiName(), ExtensionUtils.getApiVersion(), readyFunc);
            } else {
                this.handleUnauthorized();
            }
        };

        this.isAvailable = function () {
            return this._isReady;
        };

        this._isReady = false;
    }
    return GoogleAnalyticsApi;
});