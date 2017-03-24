'use strict';
angular.module('softvFrostApp')
//.controller('ReportesCtrl', ['$http','uiGridConstants', 'reportesFactory', function ( $http, uiGridConstants, reportesFactory)
.controller('Reportes_TokenCtrl', ['$http', 'reportesFactory','$timeout', function ( $http, reportesFactory, $timeout){
//function ReportesCtrl(reportesFactory) {
 
	var vm = this;
    vm.filename = "Reporte_de_tokens";
    var reportHeaderPdf = "Reporte de Tokens";
    var fechaInicioYMD;
    var fechaFinYMD; 
    var idAux = 1;  	

//----------------------------------------------
    this.$onInit = function() {

        getReporteTokens(); //No se ha seleccionado una fecha, se muestran todos los datos   

    }

  vm.csvUnoHide = true; //Button no mostrar
  vm.csvDosHide = true; //Button no mostrar

    var arrayTokens = [];   
    vm.getReporteTokens = getReporteTokens;
    function getReporteTokens()
    {                     
        getFechas();  
           console.log(vm.fechaInicio);
           console.log('fechaFin ' + fechaFinYMD);  

        if (vm.fechaInicio > vm.fechaFin){
            console.log('La fecha de inicio debe ser anterior a la fecha fin');
        }       
        else {
            reportesFactory.mostrarReporteTokens(idAux, fechaInicioYMD, fechaFinYMD).then(function(data) {
                console.log(data);
                arrayTokens = data.GetReporte_TokensListResult;
                vm.itemsByPage = 5; 
                vm.rowCollection4 = arrayTokens;  
                console.log(vm.rowCollection4);
            });
        }  
    }


    function getFechas(){
        if ( vm.fechaInicio == null ){
                console.log('fechaInicio es nulo o undefined');
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

    vm.clearInicio = clearInicio;
    function clearInicio(){
        console.log('limpia ini');
        fechaInicioYMD = null;
        vm.fechaInicio = fechaInicioYMD;        
  
    }

    vm.clearFin = clearFin;
    function clearFin(){
        console.log('limpia clearFin');    
        vm.fechaFin = null;
        fechaFinYMD = null; 
    }



    //CSV 
    vm.order = [ 'Beam', 'Cliente', 'Suscriptor', 'SAN', 'PlanServ', 'ESN', 'Detalle1', 'FechaIngreso', 'Latitud', 'Longitud', 'FechaAlta','Usuario'];

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


    function initArray (){
      vm.arrayReporte = []; //array vacío   
         // Posición 0 del arrayReporte (ENCABEZADOS)
        vm.arrayReporte =     [{
                "Beam": "Beam",
                "Cliente": "Cliente",
                "Suscriptor": "Suscriptor",
                "SAN": "SAN",
                "PlanServ": "Plan de Servicio",
                "ESN": "ESN",
                "Detalle1": "Token (MB)",
                "FechaIngreso": "Fecha Ingreso Token",            
                "Latitud": "Latitud",
                "Longitud": "Longitud", 
                "FechaAlta": "Fecha Alta",               
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
    var columns = ["Beam", "Cliente", "Suscriptor", "SAN", "Plan de Servicio", "ESN", "Token (MB)", "Fecha Ingreso Token", "Latitud", "Longitud", "Fecha Alta", "Usuario"];

    // expand to have the correct amount or rows
    for( var i=r; i<ro; i++ ) {         
      rows.push( [] );
    }

    // expand all rows to have the correct amount of cols
    for (var i = 0; i < ro; i++)
    {    
        if ( pdfAcrear =='todo') // ALL DATA
        {   //replace row 0
            rows[i][0] = vm.rowCollection4[i].Beam;
            rows[i][1] = vm.rowCollection4[i].Cliente;
            rows[i][2] = vm.rowCollection4[i].Suscriptor;
            rows[i][3] = vm.rowCollection4[i].SAN;
            rows[i][4] = vm.rowCollection4[i].PlanServ;
            rows[i][5] = vm.rowCollection4[i].ESN;
            rows[i][6] = vm.rowCollection4[i].Detalle1;
            rows[i][7] = vm.rowCollection4[i].FechaIngreso;
            rows[i][8] = vm.rowCollection4[i].Latitud;
            rows[i][9] = vm.rowCollection4[i].Longitud;
            rows[i][10] = vm.rowCollection4[i].FechaAlta;
            rows[i][11] = vm.rowCollection4[i].Usuario;  
        }else //VISIBLE DATA
        {           
            rows[i][0] = vm.displayedCollection4[i].Beam;
            rows[i][1] = vm.displayedCollection4[i].Cliente;
            rows[i][2] = vm.displayedCollection4[i].Suscriptor;
            rows[i][3] = vm.displayedCollection4[i].SAN;
            rows[i][4] = vm.displayedCollection4[i].PlanServ;
            rows[i][5] = vm.displayedCollection4[i].ESN;
            rows[i][6] = vm.displayedCollection4[i].Detalle1;
            rows[i][7] = vm.displayedCollection4[i].FechaIngreso;
            rows[i][8] = vm.displayedCollection4[i].Latitud;
            rows[i][9] = vm.displayedCollection4[i].Longitud;
            rows[i][10] = vm.displayedCollection4[i].FechaAlta;
            rows[i][11] = vm.displayedCollection4[i].Usuario;  
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