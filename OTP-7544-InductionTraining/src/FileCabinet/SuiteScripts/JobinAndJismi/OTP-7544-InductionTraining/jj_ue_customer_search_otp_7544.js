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
            try {

            var mySearch = search.create({
                type: search.Type.CUSTOMER,
                title : "Customer Search",
                filters: [['subsidiary', 'anyof', '14'],
                'And',
                ['datecreated','within','lastmonth']],
                columns: [
                    search.createColumn({ name: 'entityid', label: 'Customer Name' }),
                    search.createColumn({ name: 'subsidiary', label: 'Subsidiary' }),
                    search.createColumn({ name: 'salesrep', label: 'Sales Rep' }),
                    search.createColumn({ name: 'email', label: 'Email' }),
                    search.createColumn({ name: 'datecreated', label: 'Date Created' })
                ]
            });
            

            let searchResult = mySearch.run().getRange({
                start : 0,
                end : 50
            })
            mySearch.save();
            
            searchResult.forEach(result => {
                log.debug("Customer Details", {
                    'Customer Name': result.getValue({ name: 'entityid' }),
                    'Subsidiary': result.getText({ name: 'subsidiary' }),
                    'Sales Rep': result.getText({ name: 'salesrep' }),
                    'Email': result.getValue({ name: 'email' }),
                    'Date Created': result.getValue({ name: 'datecreated' })
                });
            });
        }
        catch (e){
            log.debug("ERROR!!!!!!!!!!");
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
