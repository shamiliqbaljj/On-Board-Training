/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record','N/ui/serverWidget'],
    /**
 * @param{record} record
 */
    (record,serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
                if (scriptContext.request.method === 'GET')
                {
                    var form = serverWidget.createForm({
                    title: 'Custom Record',
                    });
    
                    form.addField({
                        id: 'custpage_firstname',
                        type: serverWidget.FieldType.TEXT,
                        label: 'First Name'
                    });
                    form.addField({
                        id: 'custpage_lastname',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Last Name'
                    });
                    form.addField({
                        id: 'custpage_email',
                        type: serverWidget.FieldType.EMAIL,
                        label: 'E mail'
                    });
                    form.addField({
                        id: 'custpage_phone',
                        type: serverWidget.FieldType.PHONE,
                        label: 'Phone Number'
                    });
                    form.addField({
                        id: 'custpage_dob',
                        type: serverWidget.FieldType.DATE,
                        label: 'Date Of Birth'
                    });
                    form.addField({
                        id: 'custpage_accntmanager',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Account Manager'
                    });
                    form.addSubmitButton({
                        label: "Submit"
                    });
                    scriptContext.response.writePage(form);
                    form.clientScriptModulePath = 'SuiteScripts/JobinAndJismi/OTP-7544-InductionTraining/jj_cs_dl_assessment_otp_7544.js'


        }
    }

        return {onRequest}

    });
