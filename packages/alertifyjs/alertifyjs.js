if (typeof Package !== "undefined") alertify = this.alertify;

/**
 * Create new alertify
 */
createNewAlertify = function (names, options) {
    var alerts = _.isArray(names) ? names : [names];
    options = _.isUndefined(options) ? {} : options;

    // Set default options
    _.defaults(options, {transition: 'zoom', size: 'df'});

    // Create
    _.each(alerts, function (element) {
        var name = element;

        if (!alertify[name]) {
            alertify.dialog(name, function () {
                return {
                    main: function (title, message) {
                        this.setting('title', title);
                        this.message = message;

                        if (message.html && message.instance) {
                            this.message = message.html;
                            this.instance = message.instance;
                        }
                    },
                    setup: function () {
                        return {
                            options: {
                                maximizable: true,
                                closableByDimmer: false,
                                resizable: false,
                                transition: options.transition,
                                /*disable autoReset, to prevent the dialog from resetting it's size on window resize*/
                                autoReset: false
                            }
                        };
                    },
                    prepare: function () {
                        this.setContent(this.message);
                        this.elements.footer.style.display = "none";
                    },
                    hooks: {
                        onshow: function () {
                            if (options.size == 'lg') {
                                this.elements.dialog.style.maxWidth = 'none';
                                this.elements.dialog.style.width = '85%';
                            }
                        },
                        onclose: function () {
                            if (this.instance) {
                                Blaze.remove(this.instance);
                            }
                        }
                    }
                };
            }, false, 'alert');
        }

    });
};
