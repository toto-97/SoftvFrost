'use strict';
angular.module('softvFrostApp')
//.controller('ReportesCtrl', ['$http','uiGridConstants', 'reportesFactory', function ( $http, uiGridConstants, reportesFactory)
.controller('Reportes_MigracionCtrl', ['$http', 'reportesFactory','$timeout', function ( $http, reportesFactory, $timeout){
//function ReportesCtrl(reportesFactory) {
 
	var vm = this;
    vm.filename = "Reporte_de_migraciones";
    var reportHeaderPdf = "Reporte de Migraciones";
    var fechaInicioYMD;
    var fechaFinYMD; 
    var idAux = 1;  	

//----------------------------------------------
    this.$onInit = function() {

        getReporteMigra(); //No se ha seleccionado una fecha, se muestran todos los datos   

    }

  vm.csvUnoHide = true; //Button no mostrar
  vm.csvDosHide = true; //Button no mostrar

    var arrayTokens = [];   
    vm.getReporteMigra = getReporteMigra;
    function getReporteMigra()
    {                     
            getFechas();         

            console.log(vm.fechaInicio);
            console.log('fechaFin ' + fechaFinYMD);   

            reportesFactory.mostrarReporteMigraciones(idAux, fechaInicioYMD, fechaFinYMD).then(function(data) {
                console.log(data);
                arrayTokens = data.GetReporte_MigracionesListResult;
                vm.itemsByPage = 5; 
                vm.rowCollection4 = arrayTokens;  
                console.log(vm.rowCollection4);

            });
    }


    function getFechas(){
        if ( vm.fechaInicio == null ){
                fechaInicioYMD = null;
        }
        else {                
                var D1 = vm.fechaInicio; // no se usa porque tiene formato con zona horaria
                var month = D1.getUTCMonth() + 1; //months from 1-12
                var day = D1.getUTCDate();
                var year = D1.getUTCFullYear();
                fechaInicioYMD = year + "/" + month + "/" + day;
        }
        if ( vm.fechaFin == null ){
                console.log('fechaFin es nulo o undefined');
                fechaFinYMD = null;
        }else{
                var D2 = vm.fechaFin; // no se usa porque tiene formato con zona horaria
                var month = D2.getUTCMonth() + 1; //months from 1-12
                var day = D2.getUTCDate();
                var year = D2.getUTCFullYear();
                fechaFinYMD = year + "/" + month + "/" + day;
        }
    }

    //CSV 
    vm.order = [ 'SAN', 'Cliente', 'Suscriptor', 'PlanInicial', 'PlanFinal', 'FechaMigracion', 'ESN', 'Latitud', 'Longitud','Usuario'];

    // CREAR CSV VISIBLE DATA -- filters
    vm.crearVisibleAsCsv = crearVisibleAsCsv;
    function crearVisibleAsCsv() {
        $timeout(function() {

        // Elimina las propiedades que no se usan
        for (var i = 0; i < vm.displayedCollection4.length; i++) //todos los distribuidores de la tabla
            { 
                delete vm.displayedCollection4[i].BaseIdUser;
                delete vm.displayedCollection4[i].BaseRemoteIp;
                delete vm.displayedCollection4[i].$$hashKey;
            } 

            initArray();
       
          for (var i = 0; i < vm.displayedCollection4.length; i++) 
            {   //copia cada objeto del array de la tabla en el arry del reporte
                vm.arrayReporte.push(vm.displayedCollection4[i]); // Copia array de tabla displayedCollection4  
            } 
           //FIN DE PROPIEDADES
        angular.element('#csvUno').triggerHandler('click'); //llama al botón para crear csv del arrayReporte
      });
    };


    // CREAR CSV ALL DATA 
    vm.crearTodoAsCsv = crearTodoAsCsv;
    function crearTodoAsCsv() {
      $timeout(function() {

        // Elimina las propiedades que no se usan
        for (var i = 0; i < vm.rowCollection4.length; i++) //table total
            { 
                delete vm.rowCollection4[i].BaseIdUser;
                delete vm.rowCollection4[i].BaseRemoteIp;
                delete vm.rowCollection4[i].$$hashKey;
            } 

            initArray();
       
          for (var i = 0; i < vm.rowCollection4.length; i++) 
            {   //copia cada objeto del array de la tabla en el arry del reporte
                vm.arrayReporte.push(vm.rowCollection4[i]); // Copia array de tabla displayedCollection4  
            } 
           //FIN DE PROPIEDADES
        angular.element('#csvDos').triggerHandler('click'); //llama al botón para crear csv del arrayReporte
      });
    };



//Site Id Cliente Suscriptor  Plan Inicial    Plan Final  Fecha Migracion No. de Serie    Latitud Longitud    Usuario
    //CSV 
    vm.order = [ 'SAN', 'Cliente', 'Suscriptor', 'PlanInicial', 'PlanFinal', 'FechaMigracion', 'ESN', 'Latitud', 'Longitud', 'Usuario'];

    function initArray (){
      vm.arrayReporte = []; //array vacío   
         // Posición 0 del arrayReporte (ENCABEZADOS)
        vm.arrayReporte =     [{
                "SAN": "Site Id",
                "Cliente": "Cliente",
                "Suscriptor": "Suscriptor",
                "PlanInicial": "Plan Inicial",
                "PlanFinal": "Plan Final",
                "FechaMigracion": "Fecha Migración",
                "ESN": "No. de Serie",          
                "Latitud": "Latitud",
                "Longitud": "Longitud", 
                "Usuario": "Usuario"
                }];
    } 


// Create TABLE PDF -- All / Visible 
vm.createPdfTodo = createPdfTodo;
function createPdfTodo(pdfAcrear){
    console.log('pdfAcrear '+pdfAcrear);

    var rows = [ [0,0,0,0,0,0,0,0,0,0,0,0] ]; // no. column
    // rows 0
    var r = 1; //start from rows 1
    var c = 0; //start from col 5

    var ro = 0; // length array of objects
      if ( pdfAcrear =='todo')
        { ro = vm.rowCollection4.length; }
        else 
        { ro = vm.displayedCollection4.length; }


    var cols = 12; // column number
    var columns = ["Site Id", "Cliente", "Suscriptor", "Plan Inicial", "Plan Final", "Fecha Migración", "ESN", "Latitud", "Longitud", "Usuario"];

    // expand to have the correct amount or rows
    for( var i=r; i<ro; i++ ) {         
      rows.push( [] );
    }

    // expand all rows to have the correct amount of cols
    for (var i = 0; i < ro; i++)
    {    
        if ( pdfAcrear =='todo') // ALL DATA
        {   //replace row 0
            rows[i][0] = vm.rowCollection4[i].SAN;
            rows[i][1] = vm.rowCollection4[i].Cliente;
            rows[i][2] = vm.rowCollection4[i].Suscriptor;
            rows[i][3] = vm.rowCollection4[i].PlanInicial;
            rows[i][4] = vm.rowCollection4[i].PlanFinal;
            rows[i][5] = vm.rowCollection4[i].FechaMigracion;
            rows[i][6] = vm.rowCollection4[i].ESN;
            rows[i][7] = vm.rowCollection4[i].Latitud;
            rows[i][8] = vm.rowCollection4[i].Longitud;
            rows[i][9] = vm.rowCollection4[i].Usuario;  
        }else //VISIBLE DATA
        {           
            rows[i][0] = vm.displayedCollection4[i].SAN;
            rows[i][1] = vm.displayedCollection4[i].Cliente;
            rows[i][2] = vm.displayedCollection4[i].Suscriptor;
            rows[i][3] = vm.displayedCollection4[i].PlanInicial;
            rows[i][4] = vm.displayedCollection4[i].PlanFinal;
            rows[i][5] = vm.displayedCollection4[i].FechaMigracion;
            rows[i][6] = vm.displayedCollection4[i].ESN;
            rows[i][7] = vm.displayedCollection4[i].Latitud;
            rows[i][8] = vm.displayedCollection4[i].Longitud;
            rows[i][9] = vm.displayedCollection4[i].Usuario;  
        } 
    } 


    // Create document
    var doc = new jsPDF({
    orientation: 'landscape',
    format: 'A4'
    });

    //Page number 
    var totalPagesExp = "{total_pages_count_string}";
    var pageContent = function (data) {    
            // FOOTER
            var str = "Page " + data.pageCount;
            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            doc.setFontSize(10);
            doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
        };

    doc.setFontSize(16);    
    doc.text(8, 15, reportHeaderPdf);
    doc.setPage(1);
    doc.autoTable( columns, rows, {
       // startY:160, //draw table here
        fontSize: 6.5,    //    setFontSize: 8,     
        overflow: 'linebreak', // visible, hidden, ellipsize or linebreak   
        styles:{
            //columnWidth: 'wrap' // 'auto', 'wrap' or a number       
            //   fillColor: [100, 255, 255]
        },
        columnStyles: { 
              1: {columnWidth: 12} //width 
            ,17: {columnWidth: 14} //width 
        },
         margin: {top: 25, right: 5, bottom: 20, left: 5},
         addPageContent: pageContent //page number
    });
       // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages( totalPagesExp);
    }

    doc.save(vm.filename+'.pdf');    
  }












    }

]);