/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record','N/ui/serverWidget', 'N/search'],
    /**
 * @param{record} record
 */
    (record, serverWidget, search) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {


            if (scriptContext.request.method === 'GET')
                {
                    var form = serverWidget.createForm({
                        title: 'Sales Rep Commission',
                        });

            var salesRep = form.addField({
                id: 'custpage_salesrep_commission',
                type: serverWidget.FieldType.SELECT,
                label: 'Sales Rep'
            });
            var salesRepSearch = search.create({
                type: search.Type.EMPLOYEE,
                filters: ['role', 'anyof', 'salesrep'],
                columns: ['internalid','firstname']
            });

            salesRep.addSelectOption({
                value : ' ',
                text : ' '
            });
            salesRepSearch.run().each(result => {
                salesRep.addSelectOption({
                    value : result.getValue('internalid'),
                    text: result.getValue('firstname')
                });
                return true;
            })
                form.addField({
                    id: 'custpage_commission',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Commission Percentage',
                });
                form.addField({
                    id: 'custpage_commissionamount',
                    type: serverWidget.FieldType.FLOAT,
                    label: 'Commission Amount',
                });

                form.addSubmitButton({
                    label: "Submit"
                });
            

                scriptContext.response.writePage(form);
                form.clientScriptModulePath = 'SuiteScripts/JobinAndJismi/OTP-7544-InductionTraining/jj_cs_da_commission_otp_7544.js';
            

        }

        // else if (scriptContext.request.method === 'POST')
        //     {
        //         let netTotal = 0;
        //         var repName = scriptContext.request.parameters.custpage_salesrep_commission;
        //         var commissinPercent = scriptContext.request.parameters.custpage_commission;
    

        //         var mySearch = search.create({
        //             title: "Sales Rep Commission8",
        //             type: search.Type.SALES_ORDER,
        //             filters: [['mainline','is','T'],'AND',['salesrep','anyOf',repName]],
        //             columns: ['total']
        //         });
        //         let searchResult = mySearch.run().getRange({
        //             start: 0,
        //             end: 50
        //         });
        //         searchResult.forEach((result) => {
        //             var total = parseFloat(result.getValue({ name: 'total' })) || 0; 
        //             netTotal += total;
        //         });
        //         // let commissinPercent = currentRecord.getValue('custpage_commission');

        //         let totalCommission = netTotal * (commissinPercent / 100)
            
                


        //         var customRecord = record.create({
        //             type: record.Type.SALES_REP_COMMISSION,
        //             isDynamic: true
        //         });
        //         customRecord.setValue({ fieldId: 'custrecord_jj_salesrep', value: subName });
        //         customRecord.setValue({ fieldId: 'custrecord_jj_commission_percentag', value: commissinPercent });
        //         customRecord.setValue({ fieldId: 'custrecord_jj_total_amount', value: netTotal });
            
        //     customerId = customRecord.save();

        //         let html = `<html>
        //                     <body>
        //                     <h1> Customer Information</h1>
        //                     <p><strong>Customer Name:</strong> ${repName}</p>
        //                     <p><strong>Customer Email:</strong> ${commissinPercent}</p>
        //                     <p><strong>Customer Phone Number:</strong> ${totalCommission}</p>
                            
        //                     </body>
        //                     </html>`;
        //         scriptContext.response.write(html);
        //     }
    }

        return {onRequest}

    });
