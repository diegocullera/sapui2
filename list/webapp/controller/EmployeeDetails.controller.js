sap.ui.define([
    "list/controller/Base.controller",
    "list/model/formatter",
    "sap/m/MessageBox"
], function (Base, formatter, MessageBox) {




    function onInit() {
        this._oEventBus = sap.ui.getCore().getEventBus();
    }

    function onSaveIncidence(oEvent) {

        var incidence = oEvent.getSource().getParent().getParent();
        var incidenceRow = incidence.getBindingContext("incidenceModel");
        var object = incidenceRow.getObject();
        var temp = incidenceRow.sPath.replace('/', '');
        console.log(temp);
        this._oEventBus.publish("incidence", "onSaveIncidence", object);

    }

    function onCreateIncidence() {

        var tableIncidence = this.getView().byId("tableIncidence");
        var newIncidence = new sap.ui.xmlfragment("list.fragment.NewIncidence", this);
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var index = odata.length;
        odata.push({ index: index + 1, _ValidateDate: false, EnabledSave: false });
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index);
        tableIncidence.addContent(newIncidence);
    }

    function onDeleteIncidence(oEvent) {

        var contextObj = oEvent.getSource().getBindingContext("incidenceModel").getObject();

        MessageBox.confirm(this.getView().getModel("i18n").getResourceBundle().getText("confirmDeleteIncidence"), {
            onClose: function (oAction) {
                if (oAction === "OK") {
                    this._oEventBus.publish("incidence", "onDeleteIncidence", {
                        IncidenceId: contextObj.IncidenceId,
                        SapId: contextObj.SapId,
                        EmployeeId: contextObj.EmployeeId
                    });
                }
            }.bind(this)
        });
    }

    function updateIncidenceCreationDate(oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let contextObj = context.getObject();
        let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

        if (!oEvent.getSource().isValidValue()) {
            contextObj._ValidateDate = false;
            contextObj.CreatioDateState = "Error";
            MessageBox.error(oResourceBundle.getText("errorCreationDateValue"), {
                title: "Error",
                onClose: null,
                styleClass: "",
                actions: MessageBox.Action.Close,
                emphasizedAction: null,
                initialFocus: null,
                textDirection: sap.ui.core.TextDirection.Inherit
            });
        } else {
            contextObj.CreationDateX = true;
            contextObj._ValidateDate = true;
            contextObj.CreatioDateState = "None";
        }

        if (oEvent.getSource().isValidValue() && contextObj.Reason) {
            contextObj.EnabledSave = true;
        } else {
            contextObj.EnabledSave = false;
        }
        context.getModel().refresh();
    }

    function updateIncidenceReason(oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let contextObj = context.getObject();

        if (oEvent.getSource().getValue()) {
            contextObj.ReasonX = true;
            contextObj.ReasonState = "None";
        } else {
            contextObj.ReasonState = "Error";
        }

        if (contextObj._ValidateDate && oEvent.getSource().getValue()) {
            contextObj.EnabledSave = true;
        } else {
            contextObj.EnabledSave = false;
        }

        context.getModel().refresh();
    }

    function updateIncidenceType(oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let contextObj = context.getObject();

        if (contextObj._ValidateDate && contextObj.Reason) {
            contextObj.EnabledSave = true;
        } else {
            contextObj.EnabledSave = false;
        }

        contextObj.TypeX = true;
        context.getModel().refresh();
    }

    // function toOrderDetails(oEvent) {

    //     var orderID = oEvent.getSource().getBindingContext("odataNorthwind").getObject().OrderID;
    //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    //     oRouter.navTo("RouteOrderDetails", {
    //         OrderID: orderID
    //     });
    // }


    return Base.extend("list.controller.EmployeeDetails", {

        onInit: onInit,
        onCreateIncidence: onCreateIncidence,
        Formatter: formatter,
        onDeleteIncidence: onDeleteIncidence,
        onSaveIncidence: onSaveIncidence,
        updateIncidenceCreationDate: updateIncidenceCreationDate,
        updateIncidenceReason: updateIncidenceReason,
        updateIncidenceType: updateIncidenceType
        // toOrderDetails: toOrderDetails
    });

});