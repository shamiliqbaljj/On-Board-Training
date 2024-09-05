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
            try {
                let myRecord = scriptContext.newRecord;
                let user_email = myRecord.getValue({ fieldId: "email" });
                let internId = myRecord.getValue({ fieldId: "id" });
                let conName = myRecord.getValue({ fieldId : "entityid"});

                let recordType = scriptContext.newRecord.type;
                let companyname;
                companyname = myRecord.getValue({ fieldId: "companyname" });
                if (recordType === 'contact')
            {
                let body_of_mail;
                if (scriptContext.type === "create") {
                    body_of_mail = `Record created,
                    Entity type: ${recordType}
                    Internal ID: ${internId}
                    Contact name: ${conName}`;
                    log.debug({ title: 'Email Body', details: body_of_mail });
                    email.send({
                        author: 7633,
                        recipients: user_email,
                        subject: scriptContext.type,
                        body: body_of_mail
                    });
                }
                if (scriptContext.type === "delete") {
                    body_of_mail = `Record deleted,
                    Internal ID: ${internId}
                    Entity type: ${recordType}`;
                    log.debug({ title: 'Email Body', details: body_of_mail });
                    email.send({
                        author: 7633,
                        recipients: user_email,
                        subject: scriptContext.type,
                        body: body_of_mail
                    });
                }
            }

            } catch (err) {
                log.error({ title: 'Error sending email', details: err });
            }
        

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
