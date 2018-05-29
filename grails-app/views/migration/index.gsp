<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="layout" content="custom">
</head>
<body>

    <div class="dialog">



        <div class="button-bar">
            <div id="migration-status" class="right tag tag-info">None</div>
            <g:link class="button" action="index"><g:message code="default.list.label" args="[g.message(code:'migrations.label', default: 'Migrations')]"/></g:link>
        </div>
        <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
        </g:if>
        <div id="status">
            <div id="message"></div>
        </div>

        <div class="box">
            <h2><g:message code="dataMigration.label" default="Data Migration"/></h2>

            <table>
                <thead>
                <tr>
                    <th>Data</th>
                    <th>Count</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>
                        Organizations
                    </td>
                    <td>N/A</td>
                    <td>
                        <g:link controller="organization" action="index" class="button">List</g:link>
                        %{--<g:remoteLink action="migrateOrganizations" params="[preview:true]" class="button" update="status"--}%
                                      %{--onLoading="onLoading()" onComplete="onComplete()">Preview</g:remoteLink>--}%
                        <g:remoteLink action="migrateOrganizations" class="button" update="status"
                            onLoading="onLoading()" onComplete="onComplete()">Migrate</g:remoteLink>
                        <g:remoteLink action="deleteOrganizations" class="button" update="status">Delete</g:remoteLink>
                    </td>
                </tr>
                <tr>
                    <td>
                        Product Suppliers
                    </td>
                    <td>N/A</td>
                    <td>
                        <g:link controller="productSupplier" action="index" class="button">List</g:link>
                        %{--<g:remoteLink action="migrateProductSuppliers" params="[preview:true]" class="button" update="status"--}%
                                      %{--onLoading="onLoading()" onComplete="onComplete()">Preview</g:remoteLink>--}%
                        <g:remoteLink action="migrateProductSuppliers" class="button" update="status"
                                      onLoading="onLoading()" onComplete="onComplete()">Migrate</g:remoteLink>
                        <g:remoteLink action="deleteProductSuppliers" class="button" update="status"
                                      onLoading="onLoading()" onComplete="onComplete()">Delete</g:remoteLink>
                    </td>
                </tr>
                <tr>
                    <td>Inventory Transactions</td>
                    <td>${inventoryTransactionCount}</td>
                    <td>

                        <div class="button-group">
                            <g:link controller="migration" action="nextInventoryTransaction" params="[max:1]" class="button" target="_blank">Next Product</g:link>
                            <g:link controller="migration" action="migrateInventoryTransactions" params="[max:1, performMigration:false]" class="button" target="_blank">Preview Migration</g:link>
                            <g:link controller="migration" action="locationsWithInventoryTransactions" class="button" target="_blank">View All Locations</g:link>
                        </div>
                        <div class="button-group">
                            <g:link controller="migration" action="migrateInventoryTransactions" params="[performMigration:true, format: 'json']" class="button" target="_blank">Migrate Current Location (.json)</g:link>
                            <g:link controller="migration" action="migrateInventoryTransactions" params="[performMigration:true, format: 'csv']" class="button" target="_blank">Migrate Current Location (.csv)</g:link>
                            <g:link controller="migration" action="migrateAllInventoryTransactions" class="button">Migrate All Locations</g:link>
                        </div>
                        <div class="button-group">
                            <g:link controller="migration" action="currentInventory" params="[format: 'csv']" class="button" target="_blank">Download Current Inventory (.csv)</g:link>
                        </div>
                    </td>
                </tr>


                </tbody>
            </table>
        </div>


    </div>

<g:javascript>

    function onLoading() {
        $("#status").hide();
        $("#migration-status").text("Starting migration...")

    }

    function onComplete() {
        $("#status").show();
        $("#migration-status").text("Completed migration! ")
    }

</g:javascript>

</body>

</html>

