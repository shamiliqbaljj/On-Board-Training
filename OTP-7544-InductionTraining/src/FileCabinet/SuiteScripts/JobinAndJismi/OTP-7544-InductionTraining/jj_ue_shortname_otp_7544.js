/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
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
                    columns: ['internalid', 'companyname', 'datecreated']
                });

                mySearch.run().each(function(result) {
                    let internalId = result.getValue({ name: 'internalid' });
                    let name = result.getValue({ name: 'companyname' });
                    let dateCreated = result.getValue({ name: 'datecreated' });

                    if (name && dateCreated) {
                        let date = new Date(dateCreated);
                        let month = ('0' + (date.getMonth() + 1)).slice(-2);
                        let shortName = `${name.slice(0, 2)}: ${month}`;

                        record.submitFields({
                            type: record.Type.CUSTOMER,
                            id: internalId,
                            values: {
                                custentity29: shortName
                            },
                            options: {
                                enableSourcing: false,
                                ignoreMandatoryFields: true
                            }
                        });

                        log.debug('Updated Short Name', `Customer ID: ${internalId}, Short Name: ${shortName}`);
                    }

                    return true;
                });
            } catch (err) {
                log.error('Error in beforeLoad', err);
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
