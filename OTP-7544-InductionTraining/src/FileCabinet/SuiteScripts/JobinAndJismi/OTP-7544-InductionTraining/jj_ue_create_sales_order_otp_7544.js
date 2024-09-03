/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
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

            let newRecord = record.create ({
                type : record.Type.SALES_ORDER,
                isDynamic : true
            });

            newRecord.setValue({
                fieldId : 'entity',
                value : 8132
            });

            newRecord.setCurrentSublistValue({
                sublistId : 'item',
                fieldId : 'item',
                value : '3981'
            });

            newRecord.setCurrentSublistValue({
                sublistId : 'item',
                fieldId : 'quantity',
                value : '10'
            });

            newRecord.commitLine ({
                sublistId : 'item'
            });

            let recordId = newRecord.save({
                enableSourcing : false,
                ignoreMandatoryFields : true
            });

            log.debug("Sales Order Created",recordId)

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

        }

        /**
         * Defines the function definition that is executed after record is submitted.
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
