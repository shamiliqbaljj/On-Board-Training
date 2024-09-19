/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/runtime', 'N/url', 'N/search', 'N/ui/message'],
    /**
 * @param{email} email
 * @param{record} record
 */
    (email, record, runtime, url, search, message) => {
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
             
            if (scriptContext.type !== scriptContext.UserEventType.CREATE) {
                return;
            }
    
            let currentRecord = scriptContext.newRecord;
            let salesRepId = currentRecord.getValue('salesrep');
            let custId = currentRecord.getValue('entity');
            let salesOrderId = currentRecord.id;
    
            let salesOrderUrl = `https://td2932833.app.netsuite.com/app/accounting/transactions/salesord.nl?id=${salesOrderId}&whence=`;
            let custRecord = loadCustomer(custId);
            let amountOverdue = custRecord.getValue('overduebalance');
    
            if (amountOverdue > 0) {
                // Load employee record (sales rep)
                let empRecord = loadEmployee(salesRepId);
                let supervisorId = empRecord.getValue('supervisor');
                
                if (supervisorId) {
                    // Load supervisor record
                    let supervisorRecord = loadEmployee(supervisorId);
                    let supervisorEmail = supervisorRecord.getValue('email');
                    
                    if (supervisorEmail) {
                        let currentUserId = runtime.getCurrentUser().id;
                        sendEmail(supervisorEmail, currentUserId, salesOrderUrl);
                    } else {
                        showMessage("Error", "Supervisor email address is missing.");
                    }
                } else {
                    showMessage("Error", "Supervisor ID is missing.");
                }
            }
    
            function loadEmployee(employeeId) {
                return record.load({
                    type: record.Type.EMPLOYEE,
                    id: employeeId
                });
            }
    
            function loadCustomer(custId) {
                return record.load({
                    type: record.Type.CUSTOMER,
                    id: custId
                });
            }
    
            function sendEmail(supervisorEmail, authorId, salesOrderUrl) {
                email.send({
                    author: authorId, // Use the current user ID as the author
                    recipients: supervisorEmail,
                    subject: "Sales Order Alert",
                    body: `A sales order has been created for a customer with an overdue balance. Please review.
                    Click on the link: ${salesOrderUrl}`,
                });
            }
    
            function showMessage(title, msg) {
                message.create({
                    title: title,
                    message: msg,
                    type: message.Type.ERROR
                }).show();
            }
    
            return true; // Assuming saveRecord should return true to allow record save
        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
