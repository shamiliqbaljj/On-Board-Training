/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/record', 'N/runtime','N/email'],
    /**
 * @param{record} record
 * @param{runtime} runtime
 */
    (record, runtime, email) => {
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
            var newRecord = scriptContext.newRecord;
            var oldRecord = scriptContext.oldRecord;
            var newCreditLimit = newRecord.getValue({
                subtabId : 'financials',
                fieldId : 'creditlimit'
            });
            var oldCreditLimit = oldRecord.getValue({
                subtabId : 'financials',
                fieldId : 'creditlimit'
            });
    
         
            if (newCreditLimit !== oldCreditLimit) {
                
                newRecord.setValue({
                    fieldId: 'custentity1',
                    value: 'Credit Limit Updated'
                });
    
             
                if (newCreditLimit > 50000) {
                   
                    newRecord.setValue({
                        fieldId: 'custentity2',
                        value: true
                    });
    
                   
                    var salesRepId = newRecord.getValue('salesrep');

                    var salesRep = record.load({
                        type: record.Type.EMPLOYEE,
                        id: salesRepId
                    });

                    var salesRepEmail = salesRep.getText('email');
    
                    email.send({
                        author: runtime.getCurrentUser().id,
                        recipients: salesRepEmail,
                        subject: 'Customer Credit Limit Updated',
                        body: 'The credit limit for customer ' + newRecord.getValue('entityid') + ' has been updated to ' + newCreditLimit
                    });
                }
                else{
                    newRecord.setValue({
                        fieldId: 'custentity2',
                        value: false
                    });
                }
            }

        }

        return {onAction};
    });
