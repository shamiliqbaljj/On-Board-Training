/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/email', 'N/record','N/ui/message','N/runtime', 'N/url','N/log'],
/**
 * @param{email} email
 * @param{record} record
 */
function(email, record, message, runtime, url, log) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {

    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {

    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    function postSourcing(scriptContext) {

    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function sublistChanged(scriptContext) {

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function lineInit(scriptContext) {

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {
        
        let currentRecord = scriptContext.currentRecord;
        let salesRepId = currentRecord.getValue('salesrep');
        let custId = currentRecord.getValue('entity');
        let salesOrderId = currentRecord.id;
        alert (salesOrderId);

        let salesOrderUrl = `https://td2932833.app.netsuite.com/app/accounting/transactions/salesord.nl?id=${salesOrderId}&whence=`;
        // log.debug('Sales Order URL', salesOrderUrl); // Log the URL to verify

        // function resolveRecordUrl(salesOrderId) {
        //     var scheme = 'https://';
        //     var host = url.resolveDomain({
        //         hostType: url.HostType.APPLICATION
        //     });
        //     var relativePath = url.resolveRecord({
        //         recordType: record.Type.SALES_ORDER,
        //         recordId: salesOrderId,
        //         isEditMode: false
        //     });
        //     let myURL = scheme + host + relativePath;
            
        //     return myURL;
        // }

        // Load customer record
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

        function sendEmail(supervisorEmail, authorId, myURL) {
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

    return {
        // pageInit: pageInit,
        // fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // sublistChanged: sublistChanged,
        // lineInit: lineInit,
        // validateField: validateField,
        // validateLine: validateLine,
        // validateInsert: validateInsert,
        // validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
