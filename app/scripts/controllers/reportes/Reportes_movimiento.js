'use strict';
angular.module('softvFrostApp')
.controller('Reportes_MovimientoCtrl', ['$http', 'reportesFactory','$timeout', 'ngNotify','$state', function ( $http, reportesFactory, $timeout, ngNotify, $state){


 
	var vm = this;
    vm.filename = "Reporte_de_movimientos";
    var reportHeaderPdf = "Reporte de Movimientos";
    var fechaInicioYMD;
    var fechaFinYMD; 
    var idAux = 1;  
    vm.csvUnoHide = true; 
    vm.csvDosHide = true; 
    var img = new Image();
    img.crossOrigin = "";  

    this.$onInit = function() {

        getImageDataURL();
        getReporteMovimientos();  

    }

    function reloadRoute() {
        $state.reload(); 
    };


    vm.limpiarFiltros = limpiarFiltros;
    function limpiarFiltros(){
        vm.fechaInicio = null;
        vm.fechaFin = null;
        reloadRoute();
    }
    

    function getImageDataURL() 
    {             
       
        var url = document.getElementById("pdflogoimage").src;  
        var data, canvas, ctx;

        img.onload = function()
        {
            // Create the canvas element.
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            // Get '2d' context and draw the image.
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            // Get canvas data URL
            data = canvas.toDataURL();   
            
        }
            // Load image URL.    
        img.src = url;  
    }

    var arrayMovi = [];   
    vm.getReporteMovimientos = getReporteMovimientos;
    function getReporteMovimientos()
    {                     
            getFechas();         
                if (vm.fechaFin == null){ vm.fechaFin = undefined; }
                if (vm.fechaInicio > vm.fechaFin){
                    ngNotify.set('La fecha de inicio debe ser anterior a la fecha fin', {
                        type: 'error'
                    });  
                } 

            reportesFactory.mostrarReporteMovimientos(idAux, fechaInicioYMD, fechaFinYMD).then(function(data) {
                
                arrayMovi = data.GetReporte_MovimientosListResult;
                vm.itemsByPage = 5; 
                vm.rowCollection4 = arrayMovi;  

            });
    }


    function getFechas(){
        if ( vm.fechaInicio == null ){
                fechaInicioYMD = null;
        }
        else {                
                var D1 = vm.fechaInicio; 
                var month = D1.getUTCMonth() + 1; 
                var day = D1.getUTCDate();
                var year = D1.getUTCFullYear();
                fechaInicioYMD = year + "/" + month + "/" + day;
        }
        if ( vm.fechaFin == null ){
                fechaFinYMD = null;
        }else{
                var D2 = vm.fechaFin; 
                var month = D2.getUTCMonth() + 1; 
                var day = D2.getUTCDate();
                var year = D2.getUTCFullYear();
                fechaFinYMD = year + "/" + month + "/" + day;
        }
    }

    vm.clearInicio = clearInicio;
    function clearInicio(){
        fechaInicioYMD = null;
        vm.fechaInicio = fechaInicioYMD;        
  
    }

    vm.clearFin = clearFin;
    function clearFin(){
        vm.fechaFin = null;
        fechaFinYMD = null; 
    }



    //CSV 
    vm.order = [ 'SAN', 'Suscriptor', 'Beam', 'SatellitedID', 'Usuario', 'FechaMovim', 'ESN', 'Movimiento', 'Mensaje'];

    // CREAR CSV 
    vm.crearVisibleAsCsv = crearVisibleAsCsv;
    function crearVisibleAsCsv() {
        $timeout(function() {

       
        for (var i = 0; i < vm.displayedCollection4.length; i++) 
            { 
                delete vm.displayedCollection4[i].BaseIdUser;
                delete vm.displayedCollection4[i].BaseRemoteIp;
                delete vm.displayedCollection4[i].$$hashKey;
            } 

            initArray();
       
          for (var i = 0; i < vm.displayedCollection4.length; i++) 
            {   
                vm.arrayReporte.push(vm.displayedCollection4[i]);  
            } 
          
        angular.element('#csvUno').triggerHandler('click'); 
      });
    };


    // CREAR CSV 
    vm.crearTodoAsCsv = crearTodoAsCsv;
    function crearTodoAsCsv() {
      $timeout(function() {

        
        for (var i = 0; i < vm.rowCollection4.length; i++) 
            { 
                delete vm.rowCollection4[i].BaseIdUser;
                delete vm.rowCollection4[i].BaseRemoteIp;
                delete vm.rowCollection4[i].$$hashKey;
            } 

            initArray();
       
          for (var i = 0; i < vm.rowCollection4.length; i++) 
            {   
                vm.arrayReporte.push(vm.rowCollection4[i]);   
            } 
        
        angular.element('#csvDos').triggerHandler('click'); 
      });
    };




    function initArray (){
        vm.arrayReporte = [];          // ENCABEZADOS
        vm.arrayReporte =     [{
            "SAN": "SAN",
            "Suscriptor": "Suscriptor",
            "Beam": "Beam", 
            "SatellitedID": "Satellite",
            "Usuario": "Usuario",
            "FechaMovim": "Fecha Movimiento",
            "ESN": "ESN",
            "Movimiento": "Movimiento",
            "Mensaje":"Mensaje"   
            }];
    } 


    // Create TABLE PDF
    vm.createPdfTodo = createPdfTodo;
    function createPdfTodo(pdfAcrear){

    var rows = [ [0,0,0,0,0,0,] ]; 
    
    var r = 1; 
    var c = 0; 

    var ro = 0;
      if ( pdfAcrear =='todo')
        { ro = vm.rowCollection4.length; }
        else 
        { ro = vm.displayedCollection4.length; }


    var cols = 9; 
    var columns = ["SAN", "Suscriptor", "Beam", "Satellite", "Usuario", "Fecha Movimiento", "ESN", "Movimiento", "Mensaje"];

 
    for( var i=r; i<ro; i++ ) {         
      rows.push( [] );
    }

   
    for (var i = 0; i < ro; i++)
    {    
        if ( pdfAcrear =='todo') 
        {   
            rows[i][0] = vm.rowCollection4[i].SAN;
            rows[i][1] = vm.rowCollection4[i].Suscriptor;
            rows[i][2] = vm.rowCollection4[i].Beam;
            rows[i][3] = vm.rowCollection4[i].SatellitedID;
            rows[i][4] = vm.rowCollection4[i].Usuario;
            rows[i][5] = vm.rowCollection4[i].FechaMovim;
            rows[i][6] = vm.rowCollection4[i].ESN;
            rows[i][7] = vm.rowCollection4[i].Movimiento;
            rows[i][8] = vm.rowCollection4[i].Mensaje;           
        }else 
        {                   
            rows[i][0] = vm.displayedCollection4[i].SAN;           
            rows[i][1] = vm.displayedCollection4[i].Suscriptor;
            rows[i][2] = vm.displayedCollection4[i].Beam;
            rows[i][3] = vm.displayedCollection4[i].SatellitedID;
            rows[i][4] = vm.displayedCollection4[i].Usuario;
            rows[i][5] = vm.displayedCollection4[i].FechaMovim;
            rows[i][6] = vm.displayedCollection4[i].ESN;
            rows[i][7] = vm.displayedCollection4[i].Movimiento;
            rows[i][8] = vm.displayedCollection4[i].Mensaje;           
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
        
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            doc.setFontSize(9);
            //x , y 
            doc.text(doc.internal.pageSize.width - 28 , doc.internal.pageSize.height - 8, str); 
             
        };
     

    

  

        doc.addImage(img, 'jpeg', 5, 5, 40, 15); 

        // Encabezado 
        doc.setFontSize(14); 
        doc.setFontType("bold");
        var fontSize = doc.internal.getFontSize(); // Get current font size
        var pageWidth = doc.internal.pageSize.width; 
        var txtWidth = doc.getStringUnitWidth(reportHeaderPdf) * fontSize / doc.internal.scaleFactor;
        var x = ( pageWidth - txtWidth ) / 2;    // Calculate text's x coordinate    
        doc.text(reportHeaderPdf, x, 14);   // Posición text at x,y

       
        var laFechaHoy = reportesFactory.obtenerFechaHoy();
        doc.setFontSize(11);   
        doc.setFontType("normal");
        doc.text(doc.internal.pageSize.width - 45 , 20, laFechaHoy);  
        
        doc.setPage(1); 


       

        // Custom table 
        jsPDF.autoTableSetDefaults({
            headerStyles: 
            {   
                fontSize: 8.2,       
            },
            bodyStyles: {        
                fontSize: 7.4 
            }
        });

        doc.autoTable( columns, rows, {
            startY:27,    
            theme: 'plain',
   
     
            styles:{
                overflow: 'linebreak', 
            },            
            columnStyles: { 
                  8: {columnWidth: 96},        
            },     
            margin: {top: 10, right: 10, bottom: 16, left: 10},
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