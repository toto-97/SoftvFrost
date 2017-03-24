'use strict';
angular.module('softvFrostApp')
//.controller('ReportesCtrl', ['$http','uiGridConstants', 'reportesFactory', function ( $http, uiGridConstants, reportesFactory)
.controller('Reportes_PlantaCtrl', ['$http', 'reportesFactory','$timeout', function ( $http, reportesFactory, $timeout){
//function ReportesCtrl(reportesFactory) {
 
	var vm = this;	
    vm.filename = "Reporte_de_terminales";
    var reportHeaderPdf = "Reporte de Terminales";
//----------------------------------------------


    this.$onInit = function() {

        console.log(vm.filename);

        ReportePlanta();

        // -------------EJEMPLO LLENAR CSV 
                 //   vm.filename = "test";
                    /*
        vm.getArray = [{a: 1, b:2}, {a:3, b:4}];
                   

        vm.addRandomRow = addRandomRow;
                    function addRandomRow() {
                        vm.getArray.push({a: Math.floor((Math.random()*10)+1), b: Math.floor((Math.random()*10)+1)});
                      };

        vm.getHeader = getHeader;
                    function getHeader() {return ["A", "B"]};

        vm.clickFn = clickFn;
                    function clickFn() {
                        console.log("click click click");
        };
             var getArreglo =  [{a: 1, b:2}, {a:3, b:4}];
                    vm.getPrueba =  getArreglo; 
             //[{a: 1, b:2}, {a:3, b:4},{a:3, b:6}];
             */
    }


               
        // ---------------------------------------FIN DE EJEMPLO LLENAR CSV




        var arrayPlanta = [];   
        vm.ReportePlanta = ReportePlanta;

        function ReportePlanta()
        {           
            reportesFactory.mostrarReportePlanta().then(function(data) {
             //   vm.DistribuidoresTable = data.GetDistribuidorByUsuarioResult; //mostrar en tabla           
            //    console.log(data);
                arrayPlanta = data.GetReportes_PlantaListResult;
                vm.itemsByPage = 5;      
                vm.rowCollection4 = arrayPlanta;   //  vm.myDataPlanta = arrayPlanta;    
               // console.log(vm.rowCollection4);
                // usar el array displayedCollection4 para llenar los csv dinamicamente, solo agregar los encabezados
               // vm.getArrayPlanta = arrayPlanta; // Llenar el array del CSV
         
            });
        }


//---------------------
    //CSV 
    vm.order = [ 'SAN', 'IdSuscriptor', 'Cliente', 'Suscriptor', 'PlanDeServicio', 'Hub', 'Beam', 'Pais',
    'ESN', 'Estatus', 'EstTecnico', 'Latitud', 'Longitud', 'FechaActivacion', 'FechaAlta','FechaCancelacion',
    'FechaSuspension', 'ConsumoAnytime','ConsumoBonus','TokenDisp'];


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

    // Posición 0 del arrayReporte (ENCABEZADOS)
        initArray();

      for (var i = 0; i < vm.displayedCollection4.length; i++) 
        {   //copia cada objeto del array de la tabla en el arry del reporte
            vm.arrayReporte.push(vm.displayedCollection4[i]); // Copia array de tabla displayedCollection4  
        } 
       //FIN DE PROPIEDADES
    angular.element('#csvUno').triggerHandler('click'); //llama al botón para crear csv del arrayReporte
  });
};



    function initArray (){
      vm.arrayReporte = []; //array vacío   
         // Posición 0 del arrayReporte (ENCABEZADOS)
        vm.arrayReporte =     [{
            "Beam": "Beam",
            "Cliente": "Cliente",
            "ConsumoAnytime": "Consumo Anytime (Gb)",
            "ConsumoBonus": "Consumo Bonus (Gb)",
            "ESN": "Nro. de Serie",
            "EstTecnico": "Est. Técnico",
            "Estatus": "Est. Comercial",
            "FechaActivacion": "Fecha Activación",
            "FechaAlta": "Fecha Alta",
            "FechaCancelacion": "Fecha Cancelación",
            "FechaSuspension": "Fecha Suspension",
            "Hub": "Hub",
            "IdSuscriptor": "Cod Suscriptor",
            "Latitud": "Latitud",
            "Longitud": "Longitud", 
            "Pais": "Pais",               
            "PlanDeServicio": "Plan de Servicio",
            "SAN": "Site Id",
            "Suscriptor": "Suscriptor",
            "TokenDisp": "Token Disp (Gb)"
                }];
    } 


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


  vm.csvUnoHide = true; //Button no mostrar
  vm.csvDosHide = true; //Button no mostrar



/* // ORIGINAL
vm.clickOnUpload = clickOnUpload;
function clickOnUpload() {
  $timeout(function() {
    angular.element('#myselector').triggerHandler('click');
  });
};*/



// Create TABLE PDF -- All / Visible 
vm.createPdfTodo = createPdfTodo;
function createPdfTodo(pdfAcrear){
    console.log('pdfAcrear '+pdfAcrear);

    var rows = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ]; // no. column
    // rows 0
    var r = 1; //start from rows 1
    var c = 0; //start from col 5


    var ro = 0; // length array of objects
      if ( pdfAcrear =='todo')
        { ro = vm.rowCollection4.length; }
        else 
        { ro = vm.displayedCollection4.length; }


    var cols = 20; // column number
    var columns = ["Site Id", "Cod Suscriptor", "Cliente", "Suscriptor", "Plan de Servicio", "Hub", "Beam","Pais", "No. de Serie", "Est. Comercial", 
                    "Est. Técnico", "Latitud", "Longitud","Fecha Activación", "Fecha Alta", "Fecha Cancelación", "Fecha Suspension",  "Consumo Anytime (Gb)",  "Consumo Bonus (Gb)", "Token Disp (Gb)"];

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
            rows[i][1] = vm.rowCollection4[i].IdSuscriptor;
            rows[i][2] = vm.rowCollection4[i].Cliente;
            rows[i][3] = vm.rowCollection4[i].Suscriptor;
            rows[i][4] = vm.rowCollection4[i].PlanDeServicio;
            rows[i][5] = vm.rowCollection4[i].Hub;
            rows[i][6] = vm.rowCollection4[i].Beam;
            rows[i][7] = vm.rowCollection4[i].Pais;
            rows[i][8] = vm.rowCollection4[i].ESN;
            rows[i][9] = vm.rowCollection4[i].Estatus;
            rows[i][10] = vm.rowCollection4[i].EstTecnico;
            rows[i][11] = vm.rowCollection4[i].Latitud;
            rows[i][12] = vm.rowCollection4[i].Longitud;
            rows[i][13] = vm.rowCollection4[i].FechaActivacion;
            rows[i][14] = vm.rowCollection4[i].FechaAlta;
            rows[i][15] = vm.rowCollection4[i].FechaCancelacion;
            rows[i][16] = vm.rowCollection4[i].FechaSuspension;
            rows[i][17] = vm.rowCollection4[i].ConsumoAnytime;
            rows[i][18] = vm.rowCollection4[i].ConsumoBonus;
            rows[i][19] = vm.rowCollection4[i].TokenDisp;    
        }else //VISIBLE DATA
        {           
            rows[i][0] = vm.displayedCollection4[i].SAN;
            rows[i][1] = vm.displayedCollection4[i].IdSuscriptor;
            rows[i][2] = vm.displayedCollection4[i].Cliente;
            rows[i][3] = vm.displayedCollection4[i].Suscriptor;
            rows[i][4] = vm.displayedCollection4[i].PlanDeServicio;
            rows[i][5] = vm.displayedCollection4[i].Hub;
            rows[i][6] = vm.displayedCollection4[i].Beam;
            rows[i][7] = vm.displayedCollection4[i].Pais;
            rows[i][8] = vm.displayedCollection4[i].ESN;
            rows[i][9] = vm.displayedCollection4[i].Estatus;
            rows[i][10] = vm.displayedCollection4[i].EstTecnico;
            rows[i][11] = vm.displayedCollection4[i].Latitud;
            rows[i][12] = vm.displayedCollection4[i].Longitud;
            rows[i][13] = vm.displayedCollection4[i].FechaActivacion;
            rows[i][14] = vm.displayedCollection4[i].FechaAlta;
            rows[i][15] = vm.displayedCollection4[i].FechaCancelacion;
            rows[i][16] = vm.displayedCollection4[i].FechaSuspension;
            rows[i][17] = vm.displayedCollection4[i].ConsumoAnytime;
            rows[i][18] = vm.displayedCollection4[i].ConsumoBonus;
            rows[i][19] = vm.displayedCollection4[i].TokenDisp;  
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

    doc.save( vm.filename+'.pdf');    
  }





// doc.autoTable(columns, records, { renderHeader: header, renderCell: cell, renderFooter: footer, lineHeight: 12, fontSize: 8, overflow: 'linebreak' });
//--------------------------------------------------------













    }

]);