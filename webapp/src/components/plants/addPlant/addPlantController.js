
(function() {

    'use strict';

    angular.module('sprinkle').controller("plantController", plantController);

    plantController.$inject = ['$mdDialog', 'locals', 'toastr', '$window', '$mdSidenav', 'planSortService', 'planTypeService'];

    function plantController($mdDialog, locals, toastr, $window, $mdSidenav, planSortService, planTypeService) {

        /* jshint validthis: true */
        var vmPlant = this;


        vmPlant.addBool = false;

        vmPlant.buttonTitle = locals.buttonTitle;
        vmPlant.plantTitle = 'Nova sadnica';

        // todo: treba toto?
        vmPlant.months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Octobar", "Novembar", "Decembar"];

        vmPlant.types = [];
        vmPlant.sorts = [];
        vmPlant.plant = {

            icon    : '',
            label   : '',

            notes : '',
            description : '',
            withdrawal  : '',

            color: '#ffffff',
            sizeX: 1,
            sizeY: 3,
            col: 1,
            row: 1,

            sort    : '',
            datePlanting: new Date(),
            logSprinkle : [],

            numberOfPlants: 1,
            grid: locals.gridId

        };


        vmPlant.step = 1;
        vmPlant.stepTitle = [ 'Tip', 'Sorta', 'Oznaka i Broj sadnica', 'Datum', 'Beleske' ];


        function initNewSortAndType(){
            vmPlant.plantSort = {
                "name" : '',
                "icon" : 'assets/icons/ic_fingerprint_white_24px.svg',
                "type" : '',
                "color" : '',
                "taste" : '',
                "dateBlooming": new Date(),
                "dateHarvest": new Date()
            };
            vmPlant.plantType = {
                "name" : '',
                "icon" : 'assets/icons/ic_fingerprint_white_24px.svg',
                "sorts": []
            };
        }

        vmPlant.chooseType = function (type) {
            vmPlant.plant.icon = type.icon.slice(0, -4);
            vmPlant.plant.type = type.name;

            vmPlant.typeId = type._id;

            planTypeService.getSortsByType(type._id).$promise.then(function(type){
                vmPlant.sorts = type.sorts;
            }).catch(function(err){
                console.log(err);
            });
            vmPlant.step++;
        };
        vmPlant.openSidenav = function (navId) {
            initNewSortAndType();
            $mdSidenav(navId).toggle();
        };
        vmPlant.addType = function() {
            vmPlant.plantType.icon = 'assets/icons/ic_fingerprint_white_24px';
            $mdSidenav('rightType').close().then(function () {
                planTypeService.createType(vmPlant.plantType).then(function(response){
                    if (response.data.success==false) {
                        toastr.error(response.data.message, 'Gre\u0161ka');
                    } else {
                        toastr.success('novog tipa vocke.', 'Uspe\u0161no dodavanje ');
                        vmPlant.types.push(response.data);
                        $window.localStorage.setItem('types', JSON.stringify(vmPlant.types));
                    }
                });
            });
        };
        vmPlant.addSort = function() {
            vmPlant.plantSort.icon = 'assets/icons/ic_fingerprint_white_24px';
            $mdSidenav('rightSort').close().then(function () {
                vmPlant.plantSort.type = vmPlant.typeId;
                planSortService.createSort(vmPlant.plantSort).then(function(response){
                    if (response.data.success==false) {
                        toastr.error(response.data.message, 'Gre\u0161ka');
                    } else {
                        toastr.success('nove sorte.', 'Uspe\u0161no dodavanje ');
                        vmPlant.sorts.push(response.data);
                    }
                });
            });
        };
        vmPlant.chooseSort = function (sort) {
            //if(vmPlant.plantSort.icon === 'assets/icons/ic_fingerprint_white_24px') {

            //} else {
            //    vmPlant.plant.icon = vmPlant.plantSort.icon;
            //}
            vmPlant.plant.sort = sort._id;
            vmPlant.step++;
        };


        vmPlant.nextStep = function () {
            vmPlant.step++;
            vmPlant.step++;
        };
        vmPlant.savePlant = function () {
            $mdDialog.hide(vmPlant.plant);
        };


        init();
        function init() {

            vmPlant.types = JSON.parse($window.localStorage.getItem('types'));

            // View
            if (locals.plant && locals.view) {
                vmPlant.plantTitle = 'Prikaz Sadnica';
                vmPlant.plant = locals.plant;
            } else {

                // Edit
                if (locals.plant) {
                    vmPlant.plantTitle = 'Izmeni Sadnicu';
                    vmPlant.plant = angular.copy(locals.plants[0]);
                } else {
                    // Create

                }


            }
        }

        vmPlant.cancel = function() {
            $mdDialog.cancel();
        };

        vmPlant.categoryAction = function(plant) {

            switch (vmPlant.buttonTitle) {
                case 'view':
                    $mdDialog.hide();
                    break;
                case 'create':
                    $mdDialog.hide(plant);
                    break;
                case 'update':
                    // locals.plants[0] - moze bilo koji, ali ne valja ovako, prolly
                    if (angular.equals(locals.plants[0], plant)) {
                        toastr.pop('warning', 'Warning', 'No change in category.');
                        vmPlant.editDisabled = true;
                        vmPlant.categoryForm.$setPristine()
                    } else {
                        $mdDialog.hide(plant);
                        break;
                    }
            }

        };

    }

})();