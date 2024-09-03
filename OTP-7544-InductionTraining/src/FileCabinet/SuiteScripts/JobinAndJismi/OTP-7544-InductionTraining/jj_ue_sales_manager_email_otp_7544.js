/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record'],
    /**
 * @param{email} email
 * @param{record} record
 */
    (email, record) => {
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

            let myRecord = scriptContext.newRecord;
            let custName = myRecord.getValue({ fieldId : 'entity'});
            let repName = myRecord.getValue({ fieldId : 'salesrep'});
            let salesRepRecord = record.load({
                type : record.Type.EMPLOYEE,
                id : repName
            });

            let customerOverdue = record.load({
                type : record.Type.CUSTOMER,
                id : custName
            });
            let amountOverdue = customerOverdue.getValue('overduebalance');
            let supervisorid = salesRepRecord.getValue('supervisor');

            let supervisorRecord = record.load({
                type : record.Type.EMPLOYEE,
                id: supervisorid
            });

            let supervisorEmail = supervisorRecord.getValue('email')

            if ( amountOverdue > 0)
            {
            let body_of_mail = `Sales Order created`;
                    log.debug({ title: 'Email Body', details: body_of_mail });
                    email.send({
                        author: 7530,
                        recipients: supervisorEmail,
                        subject: scriptContext.type,
                        body: body_of_mail
                    });
                }
                else{
                    log.debug("No Overdue");
                }


        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
