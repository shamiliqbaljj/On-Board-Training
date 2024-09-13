/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search','N/log','N/ui/message'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search, log, message) => {
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

            log.debug("Hello");
            let myMsg3 = message.create({
                title: 'My Title 3',
                message: 'My Message 3',
                type: message.Type.WARNING,
                duration: 20000
            });
            myMsg3.show();

            

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
            let myRecord = scriptContext.newRecord;
            let custName = myRecord.getValue({ fieldId : 'entity'});
            let customerOverdue = record.load({
                type : record.Type.CUSTOMER,
                id : custName
            });
            let amountOverdue = customerOverdue.getValue('overduebalance');
            if (amountOverdue > 0)
            {
                let myMsg3 = message.create({
                    title: 'My Title 3',
                    message: 'My Message 3',
                    type: message.Type.WARNING,
                    duration: 20000
                });
                myMsg3.show();
            }
            else
            {
                log.debug('No Overdue')
            }


         


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
