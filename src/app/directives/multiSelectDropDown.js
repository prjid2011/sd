
let dirModule = angular.module('multiselect-dropdown', []);

dirModule.directive('multiselectDropdown', ['$document',

function ($document) {

    return {
        restrict: 'AE',
        scope: {
            selectedModel: '=',
            options: '=',
            events: '=',
            title:'<'
        },
        template: function (element) {

            var template = `<div class="multiselect-parent btn-group" role="group" dropdown-multiselect">
                <button type="button" class="dropdown-toggle btn btn-outline-secondary" style="font-size: 15px;color:#000;min-width: 255px;border-radius: 0;
                border-color: #000;text-align: left;" ng-click="toggleDropdown()">Sellect {{title}}
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height :\'200px\' }" style="overflow: auto;padding:15px;min-width:255px" > 
                    <li role="presentation" ng-repeat="option in options">
                        <a role="menuitem" tabindex="-1" ng-click="setSelectedItem(option)">    
                            <div class="checkbox">
                                <label class="custom-checkbox-container"> {{option}}
                                    <input class="checkboxInput" type="checkbox"  
                                        ng-click="checkboxClick($event, option)" 
                                        ng-checked="isChecked(option)" /> 
                                        <span class="checkmark"></span>    
                                </label>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>`

            element.html(template);
        },
        link: function ($scope, $element, $attrs) {
            
            if(!$scope.selectedModel) {
                $scope.selectedModel = [];
            }
           
            let $dropdownTrigger = $element.children()[0];

            $scope.toggleDropdown = function () {
                $scope.open = !$scope.open;
            };

            $scope.checkboxClick = function ($event, id) {
                $scope.setSelectedItem(id);
                $event.stopImmediatePropagation();
            };

            $scope.externalEvents = {
                onItemSelect: angular.noop,
                onItemDeselect: angular.noop,
                onInitDone: angular.noop,
                onMaxSelectionReached: angular.noop
            };

            angular.extend($scope.externalEvents, $scope.events || []);

            function getFindObj(id) {
                let findObj = '';
                    findObj = id;
                return findObj;
            }
           
            $document.on('click', function (e) {
                let target = e.target.parentElement;
                let parentFound = false;

                while (angular.isDefined(target) && target !== null && !parentFound) {
                    if (target.classList.contains('multiselect-parent') && !parentFound) {
                        if (target === $dropdownTrigger) {
                            parentFound = true;
                        }
                    }
                    target = target.parentElement;
                }

                if (!parentFound) {
                    $scope.$apply(function () {
                        $scope.open = false;
                    });
                }
            });

            $scope.setSelectedItem = function (id, dontRemove) {
                let findObj = getFindObj(id);
                let finalObj = null;

                    finalObj = findObj;  

                dontRemove = dontRemove || false;

                let exists = $scope.selectedModel && $scope.selectedModel.findIndex(o => o === findObj) !== -1;
                
                if (!dontRemove && exists) {
                    $scope.selectedModel.splice($scope.selectedModel.findIndex(o => o === findObj), 1);
                    $scope.externalEvents.onItemDeselect(findObj);
                } else if (!exists) {
                    $scope.selectedModel.push(finalObj);
                    $scope.externalEvents.onItemSelect(finalObj); 
                }
            };

            $scope.isChecked = function (id) {
                return $scope.selectedModel && $scope.selectedModel.findIndex(o => o === getFindObj(id)) !== -1
            };

            $scope.externalEvents.onInitDone();
        }
    };
}

]);