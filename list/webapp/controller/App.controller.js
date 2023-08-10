sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        function myCheck() {
            var inputEmployee = this.byId("inputEmployee");
            var valueEmploye = inputEmployee.getValue();

            if (valueEmploye.length === 6) {
               // inputEmployee.setDescription("OK");
               this.getView().byId("labelCountry").setVisible(true);
               this.getView().byId("slCountry").setVisible(true);
            } else {
               // inputEmployee.setDescription("Not OK");
               this.getView().byId("labelCountry").setVisible(false);
               this.getView().byId("slCountry").setVisible(false);
            }
        }

        return Controller.extend("list.controller.App", {
            onInit: function () {

            },

            onValidate: myCheck
        });
    });
