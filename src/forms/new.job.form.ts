export  const newJobForm ={
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_cake_size":{
                    "$ref":"#/definitions/element-input",
                    "options":{
                        "label":"Cake size",
                        "placeholder":"Insert size",
                        "message":"Cake size will be either S, M or L"
                    }
                },
                "block_key_textarea":{
                    "$ref":"#/definitions/element-textarea",
                    "options":{
                        "label":"Additional instructions",
                        "placeholder":"Write \"Happy Birthday!\" on the cake!",
                        "message":"What would you like to have on your cake?",
                        "resize":true
                    }
                },
                "block_key_separator":{
                    "$ref":"#/definitions/element-separator"
                },
                "block_key_flavors":{
                    "$ref":"#/definitions/element-checkbox-group",
                    "options":{
                        "label":"Flavor",
                        "value":[
                            "cranberry"
                        ],
                        "items":[
                            {
                                "value":"vanilla",
                                "label":"Vanilla"
                            },
                            {
                                "value":"chocolate",
                                "label":"Chocolate",
                                "isDisabled":true
                            },
                            {
                                "value":"cranberry",
                                "label":"Cranberry"
                            }
                        ]
                    }
                },
                "block_key_delivery_date":{
                    "$ref":"#/definitions/element-datepicker",
                    "options":{
                        "label":"Delivery date",
                        "value":"2020-02-27",
                        "message":"Cakes will be ready by 12:00 on selected date",
                        "placeholder":"Date",
                        "allowClear":true,
                        "isRequired":true
                    }
                },
                "block_key_delivery_method":{
                    "$ref":"#/definitions/element-select",
                    "options":{
                        "label":"Delivery method",
                        "placeholder":"Select method",
                        "message":"Please, specify how the delivery will be done",
                        "isRequired":true,
                        "items":[
                            {
                                "label":"Standard",
                                "value":1
                            },
                            {
                                "label":"Accelerated",
                                "value":2
                            }
                        ]
                    }
                },
                "block_key_is_gift":{
                    "$ref":"#/definitions/element-radio-group",
                    "options":{
                        "label":"Wrap as gift?",
                        "items":[
                            {
                                "value":"yes",
                                "label":"Yes"
                            },
                            {
                                "value":"no",
                                "label":"No"
                            }
                        ]
                    }
                },
                "block_key_info":{
                    "$ref":"#/definitions/element-text",
                    "options":{
                        "value":"Thank you for using the cake ordering app!"
                    }
                }
            }
        },
        "actions":{
            "type":"object",
            "properties":{
                "cancel_action":{
                    "$ref":"#/definitions/action-secondary",
                    "options":{
                        "label":"Cancel",
                        "handler":"cancel"
                    }
                },
                "submit_action":{
                    "$ref":"#/definitions/action-primary",
                    "options":{
                        "label":"Save",
                        "handler":"request"
                    }
                }
            }
        }
    }
}