/*
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
*/

package com.sap.bi.da.extension.googleanalyticsextension;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.EnumSet;
import java.util.Set;

import com.sap.bi.da.extension.sdk.DAEWorkflow;
import com.sap.bi.da.extension.sdk.DAException;
import com.sap.bi.da.extension.sdk.IDAEAcquisitionJobContext;
import com.sap.bi.da.extension.sdk.IDAEAcquisitionState;
import com.sap.bi.da.extension.sdk.IDAEClientRequestJob;
import com.sap.bi.da.extension.sdk.IDAEDataAcquisitionJob;
import com.sap.bi.da.extension.sdk.IDAEEnvironment;
import com.sap.bi.da.extension.sdk.IDAEMetadataAcquisitionJob;
import com.sap.bi.da.extension.sdk.IDAEProgress;
import com.sap.bi.da.extension.sdk.IDAExtension;

import org.json.JSONObject;

public class GoogleAnalyticsExtension implements IDAExtension {
    
	static public final String EXTENSION_ID = "sap.bi.da.extension.googleanalyticsextension";
    private IDAEEnvironment environment;

    public GoogleAnalyticsExtension() {
    }

    @Override
    public void initialize(IDAEEnvironment environment) {
    	this.environment = environment;
    	// This function will be called when the extension is initially loaded
    	// This gives the extension to perform initialization steps, according to the provided environment
    }

    @Override
    public IDAEAcquisitionJobContext getDataAcquisitionJobContext (IDAEAcquisitionState acquisitionState) {
        return new GoogleAnalyticsExtensionAcquisitionJobContext(environment,acquisitionState);
    }

    @Override
    public IDAEClientRequestJob getClientRequestJob(String request) {
        return new GoogleAnalyticsExtensionClientRequestJob(request);
    }

    private static class GoogleAnalyticsExtensionAcquisitionJobContext implements IDAEAcquisitionJobContext {

        private IDAEAcquisitionState acquisitionState;
		private IDAEEnvironment environment;

        GoogleAnalyticsExtensionAcquisitionJobContext(IDAEEnvironment environment, IDAEAcquisitionState acquisitionState) {
            this.environment = environment;
        	this.acquisitionState = acquisitionState;
        }

        @Override
        public IDAEMetadataAcquisitionJob getMetadataAcquisitionJob() {
            return new GoogleAnalyticsExtensionMetadataRequestJob(acquisitionState);
        }

        @Override
        public IDAEDataAcquisitionJob getDataAcquisitionJob() {
            return new GoogleAnalyticsExtensionDataRequestJob(environment, acquisitionState);
        }

        @Override
        public void cleanup() {
        	// Called once acquisition is complete
        	// Provides the job the opportunity to perform cleanup, if needed
        	// Will be called after both job.cleanup()'s are called
        }
    }

    private static class GoogleAnalyticsExtensionDataRequestJob implements IDAEDataAcquisitionJob
    {
        IDAEAcquisitionState acquisitionState;
        IDAEEnvironment environment;
        GoogleAnalyticsExtensionDataRequestJob (IDAEEnvironment environment,IDAEAcquisitionState acquisitionState) {
            this.acquisitionState = acquisitionState;
            this.environment = environment;
        }

        @Override
        public File execute(IDAEProgress callback) throws DAException {
            try {
                JSONObject infoJSON = new JSONObject(acquisitionState.getInfo());
                File dataFile = File.createTempFile(GoogleAnalyticsExtension.EXTENSION_ID, ".CSV", environment.getTemporaryDirectory());
                dataFile.deleteOnExit();
                FileOutputStream os = new FileOutputStream(dataFile);
                final PrintStream printStream = new PrintStream(os);
                printStream.print(infoJSON.getString("csvContent"));
                printStream.close();
                return dataFile;
            } catch (Exception e) {
                throw new DAException("exec-"+e.toString(), e);
            }
        }

        @Override
        public void cancel() {
        	// Cancel is currently not supported
        }

        @Override
        public void cleanup() {
        	// Called once acquisition is complete
        }
    }

    private static class GoogleAnalyticsExtensionMetadataRequestJob implements IDAEMetadataAcquisitionJob {
        IDAEAcquisitionState acquisitionState;

        GoogleAnalyticsExtensionMetadataRequestJob (IDAEAcquisitionState acquisitionState) {
            this.acquisitionState = acquisitionState;
        }

        @Override
        public String execute(IDAEProgress callback) throws DAException {
            try {
                JSONObject infoJSON = new JSONObject(acquisitionState.getInfo());
                String metadata = infoJSON.getString("csvHeader");
                return metadata;
            } catch (Exception e) {
            	
                throw new DAException("meta-"+e.toString(), e);
            }
        }

        @Override
        public void cancel() {
        	// Cancel is currently not supported
        }

        @Override
        public void cleanup() {
        	// Called once acquisition is complete
        }
    }

    private class GoogleAnalyticsExtensionClientRequestJob implements IDAEClientRequestJob {

        String request;

        GoogleAnalyticsExtensionClientRequestJob(String request) {
            this.request = request;
        }

        @Override
        public String execute(IDAEProgress callback) throws DAException {
            if ("ping".equals(request)) {
                return "pong";
            }
            return null;
        }

        @Override
        public void cancel() {
        	// Cancel is currently not supported
        }

        @Override
        public void cleanup() {
        	// This function is NOT called
        }

    }

    @Override
    public Set<DAEWorkflow> getEnabledWorkflows(IDAEAcquisitionState acquisitionState) {
    	// If the extension is incompatible with the current environment, it may disable itself using this function
    	// return EnumSet.allOf(DAEWorkflow.class) to enable the extension
    	// return EnumSet.noneOf(DAEWorkflow.class) to disable the extension
    	// Partial enabling is not currently supported
        return EnumSet.allOf(DAEWorkflow.class);
    }
}
