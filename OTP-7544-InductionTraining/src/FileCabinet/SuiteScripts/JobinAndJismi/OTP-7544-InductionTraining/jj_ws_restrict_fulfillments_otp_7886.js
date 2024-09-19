/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/ui/message'],
    
    (message) => {
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


            alert ("Hiiiii........")
            // let myMsg3 = message.create({
            //     title: 'My Title 3',
            //     message: 'My Message 3',
            //     type: message.Type.WARNING,
            //     duration: 20000
            // });
            // myMsg3.show(); // will disappear after 20s


        }

        return {onAction};
    });
