This extension provides a working example of consuming GoogleAnalytics Core Reporting and YouTube Analytic Reports in Lumira 1.25 and above.



Install the  Extension
-----------------
* Open Extension Manager, `File > Extensions`
* Click `Manual Installation`
* Select the zip file from `\target`
* Restart SAP Lumira Desktop
* If you do not have a Google API Client ID and API Key (required) please create them:
by going to: https://console.developers.google.com/

You will need to create a Public API access Key and Create a Client ID for web applications.

CLIENT_ID will look like this:
316210287153-i8h2lo6c0r03dv1gv6nt00l9ouhbvhr1.apps.googleusercontent.com (NOT A REAL ID, DO NOT USE)

<b>API_KEY will look like this:</b>
AIzaSyD0JV78vSPTh50sLUo51wu-jdhAOdCm_8w (NOT A REAL KEY, DO NOT USE)

You also need to add a javascript origin (e.g. http://127.0.0.1:8082) 
(the port depends on what SAP Lumira Desktop is using could also be: 64783, etc , you can look up the port by searching the 'general.persistent' file in the '.sapvi/preferences/' directory for 'preferredHttpPort' )

Once you have both the API KEY and CLIENT ID add them in:

‘WebContent\com\sap\bi\da\extension\googleanalyticsextension\ExtensionUtils.js’ like this:
![My image](https://github.com/SAP/lumira-extension-da-google-and-youtube-analytics/blob/master/imagesforreadme/s9.png)

Now you are ready to enjoy the extension!

* Back in SAP Lumira Desktop Select `File > New Dataset`
* Select `Google Analytics and YouTube Analytics` from the list of connectors:
 
![My image](https://github.com/SAP/lumira-extension-da-google-and-youtube-analytics/blob/master/imagesforreadme/s1.png)

* The Google login dialog will open: (enter user/password)
 ![My image](https://github.com/SAP/lumira-extension-da-google-and-youtube-analytics/blob/master/imagesforreadme/s2.png)

•	Depending on what you have access to, you will see either a GA Web Profile or YouTube Channel or both(pick one depending which you want to access). Another dialog may open asking you to authorize Lumira to access the selected account’s data:

 ![My image](https://github.com/SAP/lumira-extension-da-google-and-youtube-analytics/blob/master/imagesforreadme/s3.png)


•	If you picked Google Analytics the metadata will be queried and the dimension/metric selection dialog will open where you can choose the data elements and date range: 
![My image](https://github.com/SAP/lumira-extension-da-google-and-youtube-analytics/blob/master/imagesforreadme/s5.png)





 

* Click OK to acquire the data and create a new visualization:
 	![My image](https://github.com/SAP/lumira-extension-da-google-and-youtube-analytics/blob/master/imagesforreadme/s6.png)

•	If you picked YouTube the metadata will look like this:
 ![My image](https://github.com/SAP/lumira-extension-da-google-and-youtube-analytics/blob/master/imagesforreadme/s7.png)
 * Click OK to acquire the data and create a new visualization:
![My image](https://github.com/SAP/lumira-extension-da-google-and-youtube-analytics/blob/master/imagesforreadme/s8.png)

For More info on the types of queries you can run please go to: (https://developers.google.com/youtube/analytics/v1/available_reports)



Development Environment Setup
-----------------
* Requirements
 + SAP Lumira 1.25
 + Java Development Kit 7, Update 75 or later
 + Eclipse Luna IDE for Java EE Developers
* Edit `docs\eclipse.bat`
 + Set `ECLIPSE_HOME` to your eclipse installation
 + Set `JAVA_HOME` to your JDK installation

Build the Extension
------------------
* Import project into eclipse
 + Open the file `platform.target`
 + Click `Set as Target Platform` button in the top right
 + Ignore any errors displayed on `plugin.xml` 
* Run `export.xml` using Ant `Run As > Ant Build`
* Install the extension zip generated in the `target` folder 

Resources
-----------
* Documentation - [help.sap.com/lumira](http://help.sap.com/lumira)
* Developer Guide - [SAP Lumira v2 Data Access Extension SDK Developer guide](http://help.sap.com/businessobject/product_guides/vi01/en/lum_125_dae_dev_en.pdf)
* SCN Blog post - [Coming soon](http://www.sap.com)

License
---------

    Copyright 2015, SAP SE

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

 [1]: https://github.com/SAP/lumira-extension-da-sample




