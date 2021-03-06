// Module
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Sample = {
    name: 'Sample System',
    version: '1.0.0',
    summary: 'Sample Management System is ...',
    roles: [
        'setting',
        'data-new',
        'data-edit',
        'data-delete',
        'report'
    ],
    dump: {
        setting: [
            'sample_location'
        ],
        data: [
            'sample_customer',
            'sample_order'
        ]
    }
};
