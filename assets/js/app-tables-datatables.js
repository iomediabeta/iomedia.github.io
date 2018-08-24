var App = (function () {
  'use strict';

  App.dataTables = function () {
    // Get data
    //https://api.mlab.com/api/1/databases/vsyscali1/collections/trash?apiKey=rT_GFFPSlEq7vFifcx-4KOJvOuH2W_nO&l=100

    const mlab = "https://api.mlab.com/api/1/databases/vsyscali1/collections/trash?apiKey=rT_GFFPSlEq7vFifcx-4KOJvOuH2W_nO"

    function convertDate(datetime) {
      const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/;
      const subst = `$3/$2/$1 $4:$5:$6`;
      return datetime != "" ? datetime.replace(regex, subst) : datetime;
    }

    $.get(mlab + "&l=1000", (data) => {
      let row = "";

      data.forEach(d => {
        row += `<tr class="gradeA"><td>${d.id}</td><td>${convertDate(d.t.$date)}</td><td>${d.c1}</td><td class="center">${d.c2}</td><td class="center">${d.c3}</td><td class="center">${d.c4}</td><td class="center">${d.c5}</td></tr>`;
      });

      $("#mlab-row").html(row);
      //console.log(data);

      //We use this to apply style to certain elements
      $.extend(true, $.fn.dataTable.defaults, {
        dom:
          "<'row be-datatable-header'<'col-sm-6'l><'col-sm-6'f>>" +
          "<'row be-datatable-body'<'col-sm-12'tr>>" +
          "<'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
      });

      //Enable toolbar button functions
      $("#table-mlab").dataTable({
        buttons: [
          'copy', 'excel', 'pdf', 'print'
        ],
        "lengthMenu": [[6, 10, 25, 50, -1], [6, 10, 25, 50, "All"]],
        dom: "<'row be-datatable-header'<'col-sm-6'l><'col-sm-6 text-right'B>>" +
          "<'row be-datatable-body'<'col-sm-12'tr>>" +
          "<'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
      });

    });

  };

  return App;
})(App || {});
