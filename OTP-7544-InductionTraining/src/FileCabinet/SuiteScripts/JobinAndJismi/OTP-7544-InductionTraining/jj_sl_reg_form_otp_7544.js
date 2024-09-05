/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],
    /**
 * @param{serverWidget} serverWidget
 */
    (serverWidget) => {
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
                title: 'Registration Form',
                });

                form.addField({
                    id: 'name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                });
                form.addField({
                    id: 'age',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Age'
                });
                form.addField({
                    id: 'phonenumber',
                    type: serverWidget.FieldType.PHONE,
                    label: 'Phone Number'
                });
                form.addField({
                    id: 'email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'E Mail'
                });
                form.addField({
                    id: 'fathername',
                    type: serverWidget.FieldType.TEXT,
                    label: 'father name'
                });
                form.addField({
                    id: 'address',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Address'
                });

                form.addSubmitButton({
                    label: "Submit"
                });

                scriptContext.response.writePage(form);
            }
        }

        return {onRequest};

    });

