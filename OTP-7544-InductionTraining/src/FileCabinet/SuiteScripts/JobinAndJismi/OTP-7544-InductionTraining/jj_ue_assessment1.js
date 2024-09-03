/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/search'],
    /**
 * @param{search} search
 */
    (search) => {
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
            try{
                let mySearch = search.create ({
                    type : search.Type.SALES_ORDER,
                    title : "Pending Fulfillment",
                    filters : ['status','anyof','SalesOrd:B'],
                    columns: [
                        search.createColumn({ name: 'tranid', label: 'Document Number' }),
                        search.createColumn({ name: 'trandate', label: 'Date' }),
                        search.createColumn({ name: 'entity', label: 'Customer Name' }),
                        search.createColumn({ name: 'Subsidiary', label: 'Subdidiary' }),
                        search.createColumn({ name: 'amount', label: 'Amount' })
                    ]
                });
                let searchResult = mySearch.run().getRange({
                    start : 0,
                    end : 50
                })
                mySearch.save();
                searchResult.forEach(result => {
                    log.debug("Sales Order Details", {
                        'Document Number': result.getValue({ name: 'tranid' }),
                        'Date': result.getText({ name: 'trandate' }),
                        'Customer Name': result.getText({name : 'entity'}),
                        'Subsidiary' : result.getText({name : 'subsidiary'}),
                        'Amount': result.getValue({ name: 'amount' }),
                        
                    });
                });
            }
            catch (e){
                log.debug("Error Fetching Data",e)
            }

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
