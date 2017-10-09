'use strict';
angular.module('softvFrostApp')
  .controller('reporteMemoriaCtrl', function ($http, reportesFactory, $timeout, ngNotify, $state, memoriaFactory) {
      var vm = this;
      vm.filename = "Reporte";
      var reportHeaderPdf = "Reporte de Ordenes";
      Getdata();
      vm.crearTodoAsCsv = crearTodoAsCsv;
      vm.createPdfTodo = createPdfTodo;
      var img = new Image();
      img.crossOrigin = "";
      getImageDataURL();

      function Getdata() {
        memoriaFactory.GetReporteMemoria().then(function (data) {
          vm.rowCollection4 = data.GetReporteMemoriaResult;         
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




      function crearTodoAsCsv() {
        $timeout(function () {
          for (var i = 0; i < vm.rowCollection4.length; i++) {
            delete vm.rowCollection4[i].BaseIdUser;
            delete vm.rowCollection4[i].BaseRemoteIp;
            delete vm.rowCollection4[i].$$hashKey;
          }
          vm.arrayReporte = [];
          // ENCABEZADOS
          vm.arrayReporte = [{
            "Clv_orden": "Clv_orden",
            "Folio": "Folio",
            "Usuario": "Usuario",
            "fechaactivacion": "fechaactivacion",
            "fechacheck": "fechacheck",
            "fechaejecucion": "fechaejecucion",

          }];

          for (var i = 0; i < vm.rowCollection4.length; i++) {
            vm.arrayReporte.push(vm.rowCollection4[i]);
          }

          angular.element('#csvDos').triggerHandler('click');
        });
      };




      function createPdfTodo(pdfAcrear) {
        var rows = [];
        var columns = ['Clv_orden', 'Folio', 'Usuario', 'Fecha Activacion', 'Fecha Check', 'Fecha Ejecucion'];
        for (var i = 0; i < vm.rowCollection4.length; i++) {
          var row = [];
          row.push(vm.rowCollection4[i].Clv_orden);
          row.push(vm.rowCollection4[i].Folio);
          row.push(vm.rowCollection4[i].Usuario);
          row.push(vm.rowCollection4[i].fechaactivacion);
          row.push(vm.rowCollection4[i].fechacheck);
          row.push(vm.rowCollection4[i].fechaejecucion);
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
