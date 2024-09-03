/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/currentRecord', 'N/record'],
    /**
 * @param{currentRecord} currentRecord
 * @param{record} record
 */
    (currentRecord, record) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {
            var newRecord = scriptContext.newRecord;
            var recordType = newRecord.type;
            if (recordType === record.Type.SALES_ORDER) {
                var customerId = newRecord.getValue('entity');
                if (customerId) {
                    record.submitFields({
                        type: record.Type.CUSTOMER,
                        id: customerId,
                        values: {
                            custentity28: true
                        }
                    });
                }
            } else if (recordType === record.Type.PURCHASE_ORDER) {
                var vendorId = newRecord.getValue('entity');
                if (vendorId) {
                    record.submitFields({
                        type: record.Type.VENDOR,
                        id: vendorId,
                        values: {
                            custentity28: true
                        }
                    });
                }
            }
           
            // var salesOrder = scriptContext.newRecord;
            // var customerId = salesOrder.getValue('entity');
    
            // if (customerId) {
            //     record.submitFields({
            //         type: record.Type.CUSTOMER,
            //         id: customerId,
            //         values: {
            //             custentity28: true
            //         }
            //     })
            // }
        }

        /**
         * Defines the function definition that is executed after record is submitted.s
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
