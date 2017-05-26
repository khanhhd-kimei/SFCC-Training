'use strict';

var formValidation = require('../components/form-validation');

var url;

module.exports = {
    removePayment: function () {
        $('.remove-payment').on('click', function (e) {
            e.preventDefault();
            url = $(this).data('url') + '?UUID=' + $(this).data('id');
            $('.payment-to-remove').empty().append($(this).data('card'));

            $('.delete-confirmation-btn').click(function (f) {
                f.preventDefault();
                $('.remove-payment').trigger('payment:remove', f);
                $.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        $('#uuid-' + data.UUID).remove();
                        if (data.message) {
                            var toInsert = '<div><h3>' +
                            data.message +
                            '</h3><div>';
                            $('.paymentInstruments').after(toInsert);
                        }
                    }
                });
            });
        });
    },

    submitPayment: function () {
        $('form.payment-form').submit(function (e) {
            var $form = $(this);
            e.preventDefault();
            url = $form.attr('action');
            $form.spinner().start();
            $('form.payment-form').trigger('payment:submit', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function (data) {
                    $form.spinner().stop();
                    if (!data.success) {
                        formValidation($form, data);
                    } else {
                        location.href = data.redirectUrl;
                    }
                },
                error: function (err) {
                    if (err.responseJSON.redirectUrl) {
                        window.location.href = err.responseJSON.redirectUrl;
                    }
                    $form.spinner().stop();
                }
            });
            return false;
        });
    }
};
