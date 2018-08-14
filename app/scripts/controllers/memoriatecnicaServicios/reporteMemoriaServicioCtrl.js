'use strict';
angular.module('softvFrostApp')
  .controller('reporteMemoriaServicioCtrl', function ($http, reportesFactory, $timeout, ngNotify, $state, memoriaFactory, memoriaServicioFactory) {
    var vm = this;
    vm.filename = "Reporte";
    var reportHeaderPdf = "Reporte Memoria técnica ";
    Getdata();
    vm.crearTodoAsCsv = crearTodoAsCsv;
    vm.createPdfTodo = createPdfTodo;
    var img = new Image();
    img.crossOrigin = "";
    getImageDataURL();

    function Getdata() {
      memoriaServicioFactory.GetReporteMemoria().then(function (data) {
        vm.rowCollection4 = data.GetReporteMemoriaServicioResult;
      });
    }

    function getImageDataURL() {
      var url = document.getElementById("pdflogoimage").src;
      var data, canvas, ctx;
      img.onload = function () {
        canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        // Get canvas data URL
        data = canvas.toDataURL();

      }
      // Load image URL.    
      img.src = url;
    }




    function crearTodoAsCsv(crear) {

      var info = (crear === 'todo') ? vm.rowCollection4 : vm.displayedCollection4;

      $timeout(function () {
        for (var i = 0; i < info.length; i++) {
          delete info[i].BaseIdUser;
          delete info[i].BaseRemoteIp;
          delete info[i].$$hashKey;
        }
        vm.arrayReporte = [];
        vm.order = ['Clv_Queja','Folio','Plaza','Compania','Plataforma','Estatus','Usuario','fechacheck','fechaejecucion'];
        // ENCABEZADOS
        vm.arrayReporte = [{
          "Clv_Queja": "Reporte",
          "Folio": "Folio",
          "Plaza": "Distribuidor",
          "Compania": "Plaza",
          "Plataforma": "Plaforma",
          "Estatus": "Estatus",
          "Usuario": "Usuario",
          "fechacheck": "fechacheck",
          "fechaejecucion": "fechaejecucion",

        }];

        for (var i = 0; i < info.length; i++) {
          vm.arrayReporte.push(info[i]);
        }

        angular.element('#csvDos').triggerHandler('click');
      });
    };







    function createPdfTodo(pdfAcrear) {
      var rows = [];
      var columns = ['Reporte', 'Folio', 'Usuario', 'Fecha Check', 'Fecha Ejecucion', 'Distribuidor', 'Plaza', 'Plataforma', 'Estatus'];

      var info = (pdfAcrear === 'todo') ? vm.rowCollection4 : vm.displayedCollection4;


      for (var i = 0; i < info.length; i++) {
        var row = [];
        row.push(info[i].Clv_Queja);
        row.push(info[i].Folio);
        row.push(info[i].Usuario);
        row.push(info[i].fechacheck);
        row.push(info[i].fechaejecucion);
        row.push(info[i].Plaza);
        row.push(info[i].Compania);
        row.push(info[i].Plataforma);
        row.push(info[i].Estatus);
        rows.push(row);
      }

      // Create document
      var doc = new jsPDF({
        orientation: 'landscape',
        format: 'A4'
      });

      //Page number 
      var totalPagesExp = '{total_pages_count_string}';
      var pageContent = function (data) { // FOOTER
        var str = 'Página ' + data.pageCount;
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' de ' + totalPagesExp;
        }
        doc.setFontSize(9);
        doc.text(doc.internal.pageSize.width - 28, doc.internal.pageSize.height - 8, str);
      };

      doc.addImage(img, 'jpeg', 5, 5, 40, 15);

      // Encabezado 
      doc.setFontSize(14);
      doc.setFontType("bold");
      var fontSize = doc.internal.getFontSize(); // Get current font size
      var pageWidth = doc.internal.pageSize.width;
      var txtWidth = doc.getStringUnitWidth(reportHeaderPdf) * fontSize / doc.internal.scaleFactor;
      var x = (pageWidth - txtWidth) / 2; // Calculate text's x coordinate    
      doc.text(reportHeaderPdf, x, 14); // Posición text at x,y

      doc.setFontSize(11);
      doc.setFontType("normal");
      doc.text(doc.internal.pageSize.width - 45, 20, '09/10/2017');
      doc.setPage(1);
      // Custom table 
      jsPDF.autoTableSetDefaults({
        headerStyles: {
          fontSize: 7.2,
        },
        bodyStyles: {
          fontSize: 6.4
        }
      });

      doc.autoTable(columns, rows, {
        startY: 27,
        theme: 'plain',
        styles: {
          overflow: 'linebreak',
        },
        margin: {
          top: 10,
          right: 5,
          bottom: 16,
          left: 5
        },
        addPageContent: pageContent //page number
      });
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }

      doc.save(vm.filename + '.pdf');
    }
  }

  );
