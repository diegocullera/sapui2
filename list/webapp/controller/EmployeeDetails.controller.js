sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "list/model/formatter"
], function (Controller, formatter) {




     function onInit() {
        this._oEventBus = sap.ui.getCore().getEventBus();
    }

    function onSaveIncidence (oEvent) {

        var incidence = oEvent.getSource().getParent().getParent();
        var incidenceRow = incidence.getBindingContext("incidenceModel");
        var object = incidenceRow.getObject();
        var temp = incidenceRow.sPath.replace('/','');
        console.log(temp);
        this._oEventBus.publish("incidence", "onSaveIncidence", object );

    }

    function onCreateIncidence () {

        var tableIncidence = this.getView().byId("tableIncidence");
        var newIncidence = new sap.ui.xmlfragment("list.fragment.NewIncidence", this);
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var index = odata.length;
        odata.push({ index : index + 1 });
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index);
        tableIncidence.addContent(newIncidence);
    }

    function onDeleteIncidence (oEvent) {

        var contextObj = oEvent.getSource().getBindingContext("incidenceModel").getObject();
        this._oEventBus.publish("incidence", "onDeleteIncidence", {
            IncidenceId: contextObj.IncidenceId,
            SapId: contextObj.SapId,
            EmployeeId: contextObj.EmployeeId
        });
        
    }

    function updateIncidenceCreationDate(oEvent) {
        var context = oEvent.getSource().getBindingContext("incidenceModel");
        var contextObj = context.getObject();
        contextObj.CreationDateX = true;
    }

    function updateIncidenceReason(oEvent) {
        var context = oEvent.getSource().getBindingContext("incidenceModel");
        var contextObj = context.getObject();
        contextObj.ReasonX = true;
    }

    function updateIncidenceType(oEvent) {
        var context = oEvent.getSource().getBindingContext("incidenceModel");
        var contextObj = context.getObject();
        contextObj.TypeX = true;
    }


    return Controller.extend("list.controller.EmployeeDetails", {

        onInit: onInit,
        onCreateIncidence: onCreateIncidence,
        Formatter: formatter,
        onDeleteIncidence:onDeleteIncidence,
        onSaveIncidence: onSaveIncidence,
        updateIncidenceCreationDate: updateIncidenceCreationDate,
        updateIncidenceReason: updateIncidenceReason,
        updateIncidenceType: updateIncidenceType

    });

});