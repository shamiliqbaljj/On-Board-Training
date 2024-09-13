/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/search', 'N/ui/serverWidget'],
    /**
     * @param{record} record
     * @param{search} search
     * @param{serverWidget} serverWidget
     */
    (record, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {

            if (scriptContext.request.method === 'GET') {

                var form = serverWidget.createForm({
                    title: 'Sales Order Form',
                });
                
                var subList = form.addSublist({
                    id: 'salessublist',
                    type: serverWidget.SublistType.LIST,
                    label: 'Sales Order Sublist',
                });

                subList.addField({
                    id: 'custpage_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer Name'
                });
                subList.addField({
                    id: 'custpage_subsidiary',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Subsidiary'
                });

                subList.addField({
                    id: 'custpage_documentnumber',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Document Number'
                });
                subList.addField({
                    id: 'custpage_txndate',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Transaction Date'
                });

                var mySearch = search.create({
                    type: search.Type.SALES_ORDER,
                    filters: ['mainline', 'is', 'T'],
                    columns: ['entity', 'subsidiary','tranid','trandate']
                });

                let searchResult = mySearch.run().getRange({
                    start: 0,
                    end: 50
                });


                searchResult.forEach((result, index) => {
                    var Name = result.getText({ name: 'entity' });
                    var subsidiary = result.getText({ name: 'subsidiary' });
                    var docNumber = result.getValue({ name : 'tranid'});
                    var txnDate = result.getValue({ name : 'trandate'});
                    


                    subList.setSublistValue({
                        id: 'custpage_name',
                        line: index,
                        value: Name
                    });
                    subList.setSublistValue({
                        id: 'custpage_subsidiary',
                        line: index,
                        value: subsidiary
                    });
                    subList.setSublistValue({
                        id: 'custpage_documentnumber',
                        line: index,
                        value: docNumber
                    });
                    subList.setSublistValue({
                        id: 'custpage_txndate',
                        line: index,
                        value: txnDate
                    });
                });

                scriptContext.response.writePage(form);
            }
        };

        return { onRequest };
    }
);
