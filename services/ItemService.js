app.service('ItemService', function (DataService, InventoryService, UtilService, ModalService){

    var self = this;

    this.details = function (i, isShip) {
        if (isShip) {
            var template = 'partials/ship-item.html';
        } else {
            var template = 'partials/item.html';
        }
        self.currentItemIndex = i;
        self.show(template);
    };

    this.show = function(template) {
        ModalService.showModal({
            templateUrl: template,
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
            });
        });
    };

    this.repairItem = function (i, isShip) {
        if(isShip) {
            var itemLocation = "myShip";
        } else {
            var itemLocation = "inventory";
        }

        var item = InventoryService[itemLocation][self.currentItemIndex];
        var itemComponent = item.componentsNeeded;

        if (InventoryService.componentInventory[itemComponent[i].name] < itemComponent[i].need) {
            alert("You don't have the required components to repair this item.");
        } else {
            self.componentName = itemComponent[i].name;
            var amt = itemComponent[i].need;
            InventoryService.componentInventory[itemComponent[i].name] -= amt;
            item.penalty -= amt;
            item.currentEffectiveness += amt;
            itemComponent.splice(i,1);
            item.repaired.push(self.componentName);
            if (!itemComponent.length) {
                InventoryService[itemLocation][self.currentItemIndex].repaired = [];
                item.currentValue = item.fullValue;
            } else {
                item.currentValue += amt * item.level;
            }
        }

    };

    this.damageItem = function (itemLevel) {

        const multiplier = 0.1;

        var minMult = Math.ceil(itemLevel*multiplier);
        var maxMult = Math.ceil(itemLevel/2);

        var damage = {
            componentsNeeded: [],
            penalty: 0
        };

        var numberNeeded = UtilService.random(minMult,maxMult);
        if (numberNeeded !== 0) {

            var tempArray = Object.keys(DataService.components);
            for (i=0;i<numberNeeded;i++) {
                var randomIndex = UtilService.random(-1,tempArray.length-1);
                var randomComponent = tempArray.splice(randomIndex, 1);
                var amt = UtilService.random(minMult,maxMult);
                damage.penalty += amt;
                damage.componentsNeeded.push({
                    name: randomComponent[0],
                    need: amt
                })
            }
        }

        return damage;

    };

    this.deleteItem = function (i) {

        InventoryService.inventory.splice(i, 1);

    };

});