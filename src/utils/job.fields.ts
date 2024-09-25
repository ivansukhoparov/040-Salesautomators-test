export const newDealFields = {
    name: "job",
    field_type: "set",
    options: [{
        name: "client",
        field_type: "set",
        options: [
            {
                name: "first_name",
                field_type: "varchar"
            },
            {
                name: "last_name",
                field_type: "varchar"
            },
            {
                name: "phone",
                field_type: "varchar"
            },
            {
                name: "email",
                field_type: "varchar"
            }
        ],
        add_visible_flag: true
    }, {
        name: "type",
        field_type: "set",
        options: [
            {
                name: "job_type",
                field_type: "varchar"
            },
            {
                name: "job_source",
                field_type: "varchar"
            },
            {
                name: "job_description",
                field_type: "varchar"
            }
        ],
        add_visible_flag: true
    }, {
        name: "location",
        field_type: "set",
        options: [
            {
                name: "address",
                field_type: "varchar"
            },
            {
                name: "city",
                field_type: "varchar"
            },
            {
                name: "state",
                field_type: "varchar"
            },
            {
                name: "zip_code",
                field_type: "varchar"
            },
            {
                name: "area",
                field_type: "area"
            }
        ],
        add_visible_flag: true
    },
        {
            name: "schedule",
            field_type: "set",
            options: [
                {
                    name: "date",
                    field_type: "varchar"
                },
                {
                    name: "start_time",
                    field_type: "varchar"
                },
                {
                    name: "end_time",
                    field_type: "varchar"
                },
                {
                    name: "test",
                    field_type: "varchar"
                }
            ],
            add_visible_flag: true
        }
    ],
    add_visible_flag: true
}