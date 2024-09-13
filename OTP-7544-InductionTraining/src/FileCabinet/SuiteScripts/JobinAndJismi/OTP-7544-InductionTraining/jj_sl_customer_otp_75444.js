/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget','N/search','N/record','N/redirect'],
    /**
 * @param{serverWidget} serverWidget
 */
    (serverWidget,search,record,redirect) => {
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
                    title: 'Customer Information Form',
                    });
                form.addField({
                    id: 'custpage_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer Name'
                });
                form.addField({
                    id: 'custpage_email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Customer Email'
                });
                form.addField({
                    id: 'custpage_phone',
                    type: serverWidget.FieldType.PHONE,
                    label: 'Customer Phone Number'
                });
                var salesRep = form.addField({
                    id: 'custpage_salesrep',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Sales Rep'
                });
                var salesRepSearch = search.create({
                    type: search.Type.EMPLOYEE,
                    filters: ['role', 'anyof', 'salesrep'],
                    columns: ['internalid','firstname']
                });
                salesRepSearch.run().each(result => {
                    salesRep.addSelectOption({
                        value : result.getValue('internalid'),
                        text: result.getValue('firstname')
                    });
                    return true;
                })
                var subsidiaryField = form.addField({
                    id: 'custpage_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary'
                });

                var subsidiarySearch = search.create({
                    type: search.Type.SUBSIDIARY,
                    columns: ['internalid', 'name']
                });

                subsidiarySearch.run().each(result => {
                    subsidiaryField.addSelectOption({
                        value: result.getValue('internalid'),
                        text: result.getValue('name')
                    });
                    return true;
                });
                form.addSubmitButton({
                    label: "Submit"
                });
                
                scriptContext.response.writePage(form);
                

            }
            else if (scriptContext.request.method === 'POST')
            {
                var subName = scriptContext.request.parameters.custpage_name;
                var subEmail = scriptContext.request.parameters.custpage_email;
                var subPhone = scriptContext.request.parameters.custpage_phone;
                var subSalesRep = scriptContext.request.parameters.custpage_salesrep;
                var subSubsidiary = scriptContext.request.parameters.custpage_subsidiary;
                var subSalesRepName = search.lookupFields({
                    type: search.Type.EMPLOYEE,
                    id: subSalesRep,
                    columns: ['firstname']
                }).firstname;
    
                var subSubsidiaryName = search.lookupFields({
                    type: search.Type.SUBSIDIARY,
                    id: subSubsidiary,
                    columns: ['name']
                }).name;


                var customerRecord = record.create({
                    type: record.Type.CUSTOMER,
                    isDynamic: true
                });
            customerRecord.setValue({ fieldId: 'companyname', value: subName });
            customerRecord.setValue({ fieldId: 'email', value: subEmail });
            customerRecord.setValue({ fieldId: 'phone', value: subPhone });
            customerRecord.setValue({ fieldId: 'salesrep', value: subSalesRep });
            customerRecord.setValue({ fieldId: 'subsidiary', value: subSubsidiary });
            customerId = customerRecord.save();

                let html = `<html>
                            <body>
                            <h1> Customer Information</h1>
                            <p><strong>Customer Name:</strong> ${subName}</p>
                            <p><strong>Customer Email:</strong> ${subEmail}</p>
                            <p><strong>Customer Phone Number:</strong> ${subPhone}</p>
                            <p><strong>Sales Rep:</strong> ${subSalesRepName}</p>
                            <p><strong>Subsidiary:</strong> ${subSubsidiaryName}</p>
                            </body>
                            </html>`;
                scriptContext.response.write(html);
                

            


            

            

                // scriptContext.response.writePage(html);
                // redirect.toRecord({
                //     type: record.Type.CUSTOMER,
                //     id: customerId
                // });

            }

        }

        return {onRequest}

    });




    // var form = serverWidget.createForm({
                //     title: 'Submitted Customer Information'
                // });

                // form.addField({
                //     id: 'custpage_name',
                //     type: serverWidget.FieldType.TEXT,
                //     label: 'Customer Name'
                // }).defaultValue = subName,isDisabled=true;
                // form.addField({
                //     id: 'custpage_email',
                //     type: serverWidget.FieldType.EMAIL,
                //     label: 'Customer Email'
                // }).defaultValue = subEmail;
                // form.addField({
                //     id: 'custpage_phone',
                //     type: serverWidget.FieldType.PHONE,
                //     label: 'Customer Phone Number'
                // }).defaultValue = subPhone;
                // form.addField({
                //     id: 'custpage_salesrep',
                //     type: serverWidget.FieldType.TEXT,
                //     label: 'Sales Rep'
                // }).defaultValue = subSalesRep;
                // form.addField({
                //     id: 'custpage_subsidiary',
                //     type: serverWidget.FieldType.TEXT,
                //     label: 'Subsidiary'
                // }).defaultValue = subSubsidiary;