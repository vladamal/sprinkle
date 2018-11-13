
(function(){

    'use strict';

    angular.module('sprinkle').factory( "plantService", plantService );

    plantService.$inject = [ "restResourceService", "$mdDialog", "plantService" ];

    function plantService( restResourceService, $mdDialog, plantService ){

        var items = [
            {"id" : "1",
                "label" : "jabuka zasad 2017",
                "type" : "jabuka",
                "sort" : "gala",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#b2dfdb",
                "sizeX": 1,
                "sizeY": 3,
                "row": 1,
                "col":1,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_flip_to_back_white_18px"
            },

            { "id" : "2",
                "label" : "kruska zasad 2017",
                "type" : "kruška",
                "sort" : "viljamovka",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#ff8a80",
                "sizeX": 1,
                "sizeY": 1,
                "row": 1,
                "col":2,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_language_white_18px"
            },

            { "id" : "3",
                "label" : "grozdje zasad 2014",
                "type" : "grož?e",
                "sort" : "shardone",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#ff6e40",
                "sizeX": 2,
                "sizeY": 1,
                "row": 1,
                "col":3,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_extension_white_18px"
            },

            { "id" : "4",
                "label" : "grozdje zasad 2016",
                "type" : "grozdje",
                "sort" : "shardone",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#64ffda",
                "sizeX":1,
                "sizeY":3,
                "row": 1,
                "col":4,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_extension_white_18px"
            },

            { "id" : "5",
                "label" : "test",
                "type" : "kruska",
                "sort" : "viljamovka",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#689f38",
                "sizeX": 1,
                "sizeY": 1,
                "row": 1,
                "col":5,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_language_white_18px"
            },

            { "id" : "6",
                "label" : "op op",
                "type" : "grozdje",
                "sort" : "shardone",
                "withdrawal" : "",
                "plantingDate" : "4/14/2015 5:22:24 PM",
                "sprinkleDate" : "8/14/2016 5:22:24 PM",
                "bloomingDate" : "6/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#64ffda",
                "sizeX": 1,
                "sizeY": 1,
                "row": 1,
                "col":6,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_extension_white_18px"
            },

            { "id" : "7",
                "label" : "jabuka zasad 2013",
                "type" : "jabuka",
                "sort" : "delises",
                "withdrawal" : "",
                "plantingDate" : "3/4/2015 5:22:24 PM",
                "sprinkleDate" : "8/14/2016 5:22:24 PM",
                "bloomingDate" : "2/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#64ffda",
                "sizeX":4,
                "sizeY":1,
                "row": 1,
                "col":7,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_markunread_mailbox_white_18px"
            },

            { "id" : "8",
                "label" : "Category 8",
                "type" : "jabuka",
                "sort" : "gala",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#009688",
                "sizeX":4,
                "sizeY":2,
                "row": 1,
                "col":8,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_flip_to_back_white_18px"
            },

            { "id" : "9",
                "label" : "Category 9",
                "type" : "kruska",
                "sort" : "viljamovka",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#ffea00",
                "sizeX":1,
                "sizeY":4,
                "row": 1,
                "col":9,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_language_white_18px"
            },

            { "id" : "10",
                "label" : "Category 10",
                "type" : "grozdje",
                "sort" : "shardone",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#4dd0e1",
                "sizeX":3,
                "sizeY":3,
                "row": 1,
                "col":1,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_extension_white_18px"
            },

            { "id" : "11",
                "label" : "Category 11",
                "type" : "grozdje",
                "sort" : "shardone",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "lastSprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#ffcc80",
                "sizeX":2,
                "sizeY":3,
                "row": 1,
                "col":1,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_extension_white_18px"
            },

            { "id" : "12",
                "label" : "Category 12",
                "type" : "kruska",
                "sort" : "viljamovka",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#80cbc4",
                "sizeX":1,
                "sizeY":1,
                "row": 1,
                "col":1,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_language_white_18px"
            },

            { "id" : "13",
                "label" : "Category 13",
                "type" : "grozdje",
                "sort" : "shardone",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#00bcd4",
                "sizeX":2,
                "sizeY":2,
                "row": 1,
                "col":1,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_extension_white_18px"
            },

            { "id" : "14",
                "label" : "Category 14",
                "type" : "jabuka",
                "sort" : "delises",
                "withdrawal" : "",
                "plantingDate" : "12/14/2016 5:22:24 PM",
                "sprinkleDate" : "12/14/2016 5:22:24 PM",
                "bloomingDate" : "12/14/2016 5:22:24 PM",
                "harvestDate" : "11/14/2016 5:22:24 PM",
                "logSprinkle" : [ "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM", "11/14/2016 5:22:24 PM"],

                "color": "#795548",
                "sizeX":1,
                "sizeY":1,
                "row": 1,
                "col":1,

                "description" : "category description",
                "icon" : "assets/icons/inkoop/ic_markunread_mailbox_white_18px"
            }
        ];

        return {
            getPlants   : getPlants,
            showModal   : showModal

        };


        function getPlants() {
            return items;
            //return restResourceService.resource("plant").query();
        }

        function showModal() {
            return $mdDialog.show({
                controller: 'addLinkDialogController',
                templateUrl: 'components/categories/addLink/addLinkDialogView.html',
                clickOutsideToClose:false
            });
        }



    }
}());