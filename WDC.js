(function () {
    var myConnector = tableau.makeConnector();

myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "segment",
        alias: "Customer Segment",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "opportunityValue",
        alias: "Opportunity Value",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "opportunityAge",
        alias: "Opportunity Age",
        dataType: tableau.dataTypeEnum.float
    }];

    var tableSchema = {
        id: "dataFeed",
        alias: "IM1",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://raw.githubusercontent.com/HakkiKaanSimsek/datapane/master/q9.geojson", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "segment": feat[i].properties.segment,
                "opportunityValue": feat[i].properties.opportunityValue,
                "opportunityAge": feat[i].properties.opportunityAge,
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};


    tableau.registerConnector(myConnector);

    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "IM1 Data Feed";
        tableau.submit();
    });
});

})();

