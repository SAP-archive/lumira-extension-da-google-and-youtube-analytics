jQuery.sap.declare("com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils");

com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils = function() {};

com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils.prototype.getApiKey = function()
{
    return 'your api key'; //your api key from http://developers.google.com/console
};
com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils.prototype.getClientId = function()
{
    return 'your client id'; //your client id from http://developers.google.com/console
};
com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils.prototype.getYouTubeMetadata = function()
{
	return { "version":"v1","items":[
			{"id":"video","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Core Reporting","status":"PUBLIC","uiName":"Video","description":"The ID of a YouTube video","allowedInSegments":"true"}},
			{"id":"playlist","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Core Reporting","status":"PUBLIC","uiName":"Playlist","description":"The ID of a YouTube playlist","allowedInSegments":"true"}},
			{"id":"channel","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Core Reporting","status":"PUBLIC","uiName":"Channel","description":"The ID for a YouTube channel","allowedInSegments":"true"}},
			{"id":"group","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Core Reporting","status":"PUBLIC","uiName":"Group","description":"The ID of a YouTube Analytics group","allowedInSegments":"true"}},
			{"id":"views","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Core Reporting","status":"PUBLIC","uiName":"Views","description":"The number of times that a video was viewed","allowedInSegments":"true"}},
			{"id":"uniques","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Core Reporting","status":"PUBLIC","uiName":"Uniques Viewers","description":"The number of unique viewers that watched a video","allowedInSegments":"true"}},
			{"id":"viewerPercentage","kind":"yt#column","attributes":{"type":"METRIC","dataType":"PERCENT","group":"Core Reporting","status":"PUBLIC","uiName":"Viewers LoggedIn Percentage","description":"The percentage of viewers who were logged in when watching your video or playlist","allowedInSegments":"true"}},

			{"id":"country","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Geographic","status":"PUBLIC","uiName":"Country","description":"A two-letter ISO-3166-1 country code","allowedInSegments":"true"}},
			{"id":"province","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Geographic","status":"PUBLIC","uiName":"Province","description":"An ISO 3166-2 code that identifies a U.S. state","allowedInSegments":"true"}},
			{"id":"continent","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Geographic","status":"PUBLIC","uiName":"Continent","description":"Continent","allowedInSegments":"true"}},
			{"id":"subContinent","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Geographic","status":"PUBLIC","uiName":"SubContinent","description":"SubContinent","allowedInSegments":"true"}},
			{"id":"month","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Temporal","status":"PUBLIC","uiName":"Month","description":"Data in the report will be aggregated on a monthly basis","allowedInSegments":"true"}},
			{"id":"day","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Temporal","status":"PUBLIC","uiName":"Day","description":"Data in the report will be aggregated on a daily basis","allowedInSegments":"true"}},
			{"id":"7DayTotals","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Temporal","status":"PUBLIC","uiName":"7 Day Totals","description":"Data in the report will be aggregated so that each row contains data for a seven-day period","allowedInSegments":"true"}},
			{"id":"30DayTotals","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Temporal","status":"PUBLIC","uiName":"30 Day Totals ","description":"Data in the report will be aggregated so that each row contains data for a 30-day period","allowedInSegments":"true"}},
			{"id":"insightPlaybackLocationType","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Playback Location","status":"PUBLIC","uiName":"Playback Location Type","description":"Data in the report will be aggregated based on the type of page or application where video playbacks occurred","allowedInSegments":"true"}},
			{"id":"insightPlaybackLocationDetail","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Playback Location","status":"PUBLIC","uiName":"Playback Location Detail","description":"Data will be aggregated based on the page where the player is located","allowedInSegments":"true"}},
			
			{"id":"insightTrafficSourceType","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Traffic Source","status":"PUBLIC","uiName":"Traffic Source Type","description":"Data in the report will be aggregated based on the referrer type","allowedInSegments":"true"}},
			{"id":"insightTrafficSourceDetail","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Traffic Source","status":"PUBLIC","uiName":"Traffic Source Detail","description":"Data in the report will be aggregated based on the referrer type","allowedInSegments":"true"}},

			{"id":"deviceType","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Device","status":"PUBLIC","uiName":"Device Type","description":"The physical form factor of the device on which the view occurred","allowedInSegments":"true"}},
			{"id":"operatingSystem","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Device","status":"PUBLIC","uiName":"Operating System","description":"The software system of the device on which the view occurred","allowedInSegments":"true"}},
			{"id":"ageGroup","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Demographic","status":"PUBLIC","uiName":"Age Group","description":"The age group of the logged-in users associated with the report data","allowedInSegments":"true"}},
			{"id":"gender","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Demographic","status":"PUBLIC","uiName":"Gender","description":"The gender of the logged-in users associated with the report data","allowedInSegments":"true"}},
			{"id":"sharingService","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Social","status":"PUBLIC","uiName":"Sharing Service","description":"The service that was used to share videos","allowedInSegments":"true"}},
			{"id":"elapsedVideoTimeRatio","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Audience Retention","status":"PUBLIC","uiName":"Elapsed Video Time Ratio","description":"The ratio of the elapsed portion of the video to the video length","allowedInSegments":"true"}},
			{"id":"audienceType","kind":"yt#column","attributes":{"type":"DIMENSION","dataType":"STRING","group":"Audience Retention","status":"DEPRECATED","uiName":"Audience Type","description":"The type of traffic associated with the report data","allowedInSegments":"true"}},
			{"id":"audienceWatchRatio","kind":"yt#column","attributes":{"type":"METRIC","dataType":"FLOAT","group":"Audience Retention","status":"PUBLIC","uiName":"Audience Watch Ratio","description":"The absolute ratio of viewers watching the video at the given point in the video","allowedInSegments":"true"}},
			{"id":"relativeRetentionPerformance","kind":"yt#column","attributes":{"type":"METRIC","dataType":"FLOAT","group":"Audience Retention","status":"PUBLIC","uiName":"Relative Retention Performance","description":"A measurement that shows how well a video retains viewers during playbacks in comparison to all YouTube videos of similar length","allowedInSegments":"true"}},

			{"id":"estimatedMinutesWatched","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Watch Time Metrics","status":"PUBLIC","uiName":"Estimated Minutes Watched","description":"The number of minutes that users watched videos","allowedInSegments":"true"}},
			{"id":"averageViewDuration","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Watch Time Metrics","status":"PUBLIC","uiName":"Average View Duration(sec)","description":"The average length, in seconds, of video playbacks","allowedInSegments":"true"}},
			{"id":"averageViewPercentage","kind":"yt#column","attributes":{"type":"METRIC","dataType":"PERCENT","group":"Watch Time Metrics","status":"PUBLIC","uiName":"Average View Percentage","description":"The average percentage of a video watched during a video playback","allowedInSegments":"true"}},
			{"id":"comments","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Engagement Metrics","status":"PUBLIC","uiName":"User Comments","description":"The number of times that users commented on a video.","allowedInSegments":"true"}},
			{"id":"likes","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Engagement Metrics","status":"PUBLIC","uiName":"User Likes","description":"The number of times that users indicated that they liked a video by giving it a positive rating","allowedInSegments":"true"}},
			{"id":"dislikes","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Engagement Metrics","status":"PUBLIC","uiName":"User Dislikes","description":"The number of times that users indicated that they disliked a video by giving it a negative rating","allowedInSegments":"true"}},
			{"id":"shares","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Engagement Metrics","status":"PUBLIC","uiName":"User Shares","description":"The number of times that users shared a video through the Share button","allowedInSegments":"true"}},
			{"id":"subscribersGained","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Engagement Metrics","status":"PUBLIC","uiName":"Subscribers Gained","description":"The number of times that users subscribed to a channel","allowedInSegments":"true"}},
			{"id":"subscribersLost","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Engagement Metrics","status":"PUBLIC","uiName":"Subscribers Lost","description":"The number of times that users unsubscribed from a channel","allowedInSegments":"true"}},
			{"id":"videosAddedToPlaylists","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Engagement Metrics","status":"PUBLIC","uiName":"Videos Added To Playlists","description":"The number of times that videos were added to any YouTube playlists","allowedInSegments":"true"}},
			{"id":"videosRemovedFromPlaylists","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Engagement Metrics","status":"PUBLIC","uiName":"Videos Removed From Playlists","description":"The number of times that videos were removed from any YouTube playlists","allowedInSegments":"true"}},
			{"id":"playlistStarts","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Playlist Metrics","status":"PUBLIC","uiName":"Playlist Starts","description":"The number of times that viewers initiated playback of a playlist.","allowedInSegments":"true"}},
			{"id":"viewsPerPlaylistStart","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Playlist Metrics","status":"PUBLIC","uiName":"Views Per Playlist Start","description":"The average number of video views that occurred each time a playlist was initiated","allowedInSegments":"true"}},
			{"id":"averageTimeInPlaylist","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Playlist Metrics","status":"PUBLIC","uiName":"Avg Minutes In Playlist","description":"The estimated average amount of time, in minutes, that a viewer viewed videos in a playlist after the playlist was initiated","allowedInSegments":"true"}},
			{"id":"annotationImpressions","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Annotations Metrics","status":"PUBLIC","uiName":"Annotation Impressions","description":"The total number of annotation impressions","allowedInSegments":"true"}},
			{"id":"annotationClicks","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Annotations Metrics","status":"PUBLIC","uiName":"Annotation Clicks","description":"The number of clicked annotations","allowedInSegments":"true"}},
			{"id":"annotationClickableImpressions","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Annotations Metrics","status":"PUBLIC","uiName":"Annotation Clickable Impressions","description":"The number of annotations that appeared and could be clicked","allowedInSegments":"true"}},
			{"id":"annotationClickThroughRate","kind":"yt#column","attributes":{"type":"METRIC","dataType":"FLOAT","group":"Annotations Metrics","status":"PUBLIC","uiName":"Annotation Click Through Rate","description":"The ratio of annotations that viewers clicked to the total number of clickable annotation impressions","allowedInSegments":"true"}},
			{"id":"annotationCloses","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Annotations Metrics","status":"PUBLIC","uiName":"Annotation Closes","description":"The number of closed annotations","allowedInSegments":"true"}},
			{"id":"annotationClosableImpressions","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Annotations Metrics","status":"PUBLIC","uiName":"Annotation Closable Impressions","description":"The number of annotations that appeared and could be closed","allowedInSegments":"true"}},
			{"id":"annotationCloseRate","kind":"yt#column","attributes":{"type":"METRIC","dataType":"FLOAT","group":"Annotations Metrics","status":"PUBLIC","uiName":"Annotation Close Rate ","description":"The ratio of annotations that viewers closed to the total number of annotation impressions","allowedInSegments":"true"}},
			{"id":"earnings","kind":"yt#column","attributes":{"type":"METRIC","dataType":"CURRENCY","group":"Earnings Metrics","status":"PUBLIC","uiName":"Earnings(USD)","description":"The total estimated earnings (net revenue) from all Google-sold advertising sources","allowedInSegments":"true"}},
			{"id":"monetizedPlaybacks","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Ad Performance Metrics","status":"PUBLIC","uiName":"Monetized Playbacks","description":"The number of instances when a viewer played your video and was shown at least one ad impression","allowedInSegments":"true"}},
			{"id":"playbackBasedCpm","kind":"yt#column","attributes":{"type":"METRIC","dataType":"CURRENCY","group":"Ad Performance Metrics","status":"PUBLIC","uiName":"Playback Based Cpm(USD)","description":"The estimated gross revenue per thousand playbacks","allowedInSegments":"true"}},
			{"id":"impressions","kind":"yt#column","attributes":{"type":"METRIC","dataType":"INTEGER","group":"Ad Performance Metrics","status":"PUBLIC","uiName":"Impressions","description":"The number of verified ad impressions served","allowedInSegments":"true"}},
			{"id":"impressionBasedCpm","kind":"yt#column","attributes":{"type":"METRIC","dataType":"CURRENCY","group":"Ad Performance Metrics","status":"PUBLIC","uiName":"Impression Based CPM(USD)","description":"The estimated gross revenue per thousand ad impressions","allowedInSegments":"true"}},
			{"id":"grossRevenue","kind":"yt#column","attributes":{"type":"METRIC","dataType":"CURRENCY","group":"Ad Performance Metrics","status":"PUBLIC","uiName":"Gross Revenue(USD)","description":"The estimated gross revenue, in USD, from all Google-sold or DoubleClick-partner-sold advertising","allowedInSegments":"true"}},
			{"id":"primaryAdGrossRevenue","kind":"yt#column","attributes":{"type":"METRIC","dataType":"CURRENCY","group":"Ad Performance Metrics","status":"PUBLIC","uiName":"Primary Ad Gross Revenue(USD)","description":"During many video playbacks, more than one ad will be shown.","allowedInSegments":"true"}}
		]};
};
com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils.prototype.getLumDataTypeFromGA = function(gaType)
{
	switch (gaType) {
	  case "STRING":
		  return "string";
		  break;
	  case "INTEGER":
		  return "integer";
		  break;
	  case "TIME":
		  return "number";
		  break;
	  case "DATETIME":
		  return "datetime";
		  break;
	  case "CURRENCY":
		  return "number";
		  break;
	  case "PERCENT":
		  return "number";
		  break;
	  case "FLOAT":
		  return "number";
		  break;
	  default:
		  return "string";
	  	  break;
	}
};
com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils.prototype.getSupportedApiClients = function()
{
	var apiList = [];
	apiList.push({	"id":"analytics",
					"version":"v3",
					"enabled":true,
					"loaded":false,
					"prefix":"ga",
					"scope":["https://www.googleapis.com/auth/analytics"]
				});
	apiList.push({	"id":"youtube",
					"version":"v3",
					"enabled":true,
					"loaded":false,
					"prefix":"",
					"scope":["https://www.googleapis.com/auth/youtube.readonly"]
				})
	apiList.push({	"id":"youtubeAnalytics",
					"version":"v1",
					"enabled":true,
					"loaded":false,
					"prefix":"",
					"scope":["https://www.googleapis.com/auth/yt-analytics.readonly",
					         "https://www.googleapis.com/auth/yt-analytics-monetary.readonly"]
				})
	
	return apiList;
};
com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils.prototype.getApiName = function()
{
    return "analytics";
};
com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils.prototype.getApiReportType = function()
{
    return "ga";
};
com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils.prototype.getApiVersion = function()
{
    return 'v3';
};
com.sap.bi.da.extension.googleanalyticsextension.ExtensionUtils.prototype.calcLastNDaysFromToday = function(n)
{
	  var today = new Date();
	  var before = new Date();
	  before.setDate(today.getDate() - n);

	  var year = before.getFullYear();

	  var month = before.getMonth() + 1;
	  if (month < 10) {
	    month = '0' + month;
	  }

	  var day = before.getDate();
	  if (day < 10) {
	    day = '0' + day;
	  }

	  return [year, month, day].join('-');
}
