/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the WorkflowAction script trigger point.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.workflowId - Internal ID of workflow which triggered this action
         * @param {string} scriptContext.type - Event type
         * @param {Form} scriptContext.form - Current form that the script uses to interact with the record
         * @since 2016.1
         */
        const onAction = (scriptContext) => {

            var newRecordId;

        try {
            // Create a new record of the custom record type
            var newRecord = record.create({
                type: 'customrecord3', // Replace with the internal ID of your custom record type
                isDynamic: true
            });

            newRecord.setValue({
                fieldId: 'custrecord_jj_cust_field_1', // Field ID for Name
                value: 'New Custom Record'
            });

            newRecord.setValue({
                fieldId: 'custrecord_jj_cust_field_2', // Field ID for Test Field
                value: 'Test Value'
            });

            // Save the record and get the ID
            newRecordId = newRecord.save({ignoreMandatoryFields : true});

            // Redirect to the newly created record
            redirect.toRecord({
                type: 'customrecord3', // Replace with the internal ID of your custom record type
                id: newRecordId
            });

        } catch (e) {
            log.error({
                title: 'Error creating record',
                details: e.message
            });
        }
    }

        return {onAction};
    });
