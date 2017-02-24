import $ from "jquery";

const UpdateTable = function() {
    $(".formatted thead th").each(function(index, th) {
        $(this).width($(this).closest("table").find("tbody tr:first td:nth("+index+")").width())
    });

    var tbodyHeight = $("#AppContent").height();
    tbodyHeight = tbodyHeight - $(".formatted thead").outerHeight();
    tbodyHeight = tbodyHeight - $(".formatted tfoot").outerHeight();
    $(".formatted tbody").css({"height": tbodyHeight});
}

export default UpdateTable;
