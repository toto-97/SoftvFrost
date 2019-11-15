'use strict';
angular.module('softvFrostApp')
.controller('Reportes_PlantaCtrl', ['$http', 'reportesFactory','$timeout', 'ngNotify','$state', function ( $http, reportesFactory, $timeout,ngNotify, $state){


 
    var vm = this;  
    vm.filename = "Reporte_de_terminales";
    var reportHeaderPdf = "Reporte de Terminales";
    vm.csvUnoHide = true; 
    vm.csvDosHide = true; 
    var img = new Image();
    img.crossOrigin = "";  
  
    /// Llama a las funciones para llenar de informacion la ventana
    this.$onInit = function() {

        getImageDataURL();             

        var arrayPlanta = [];   
        vm.ReportePlanta = ReportePlanta;
        function ReportePlanta()
        {           
            reportesFactory.mostrarReportePlanta().then(function(data) {       
                arrayPlanta = data.GetReportes_PlantaListResult; 
                vm.itemsByPage = 5;      
                vm.rowCollection4 = arrayPlanta;   
               
                   
            });
        }
        ReportePlanta();
    }
    
    /// Carga las rutas
    function reloadRoute() {
        $state.reload(); 
    };
       
    /// Elimina los filtros para las migraciones
    vm.limpiarFiltros = limpiarFiltros;
    function limpiarFiltros(){
        reloadRoute();
    }

    /// Coloca las imagenes para crear un pdf
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

    //CSV 
    vm.order = [ 'SAN', 'IdSuscriptor', 'Suscriptor', 'Referencia', 'PlanDeServicio', 'Beam', 'SatellitedID',
    'ESN', 'Estatus', 'EstTecnico', 'Latitud', 'Longitud', 'FechaAlta','FechaActivacion', 'FechaSuspension', 'FechaCancelacion',
   'ConsumoAnytime','ConsumoBonus','TokenDisp','DiaRelleno'];


    // Crea un CSV 
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

    /// Da formato a la informacion de la ventana
    function initArray (){
      vm.arrayReporte = []; 
         // ENCABEZADOS
        vm.arrayReporte =     [{
            "Beam": "Beam",
            "SatellitedID": "Satellite",
            "ConsumoAnytime": "Consumo Anytime (Gb)",
            "ConsumoBonus": "Consumo Bonus (Gb)",
            "ESN": "ESN",
            "EstTecnico": "Est. FAP",
            "Estatus": "Est. Comercial",
            "FechaAlta": "Fecha Alta",
            "FechaActivacion": "Fecha Activación",
            "FechaSuspension": "Fecha Suspensión",
            "FechaCancelacion": "Fecha Cancelación",            
            
            "IdSuscriptor": "Id Suscriptor",
            "Latitud": "Latitud",
            "Longitud": "Longitud", 
                     
            "PlanDeServicio": "Plan de Servicio",
            "SAN": "SAN",
            "Suscriptor": "Suscriptor",
            "Referencia":"Referencia",
            "TokenDisp": "Token Disp (Gb)",
            "DiaRelleno": "DiaRelleno"
                }];
    } 


    // Crea un CSV 
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

    // Crea un PDF 
    vm.createPdfTodo = createPdfTodo;
    function createPdfTodo(pdfAcrear){


    var rows = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ];

    var r = 1; 
    var c = 0; 


    var ro = 0; // length array of objects
      if ( pdfAcrear =='todo')
        { ro = vm.rowCollection4.length; }
        else 
        { ro = vm.displayedCollection4.length; }


    var cols = 17;
    var columns = ["SAN", "Id Suscriptor", "Suscriptor", "Referencia", "Plan de Servicio",  "Beam", "Satellite", "ESN", "Est. Comercial", 
                    "Est. FAP", "Latitud", "Longitud", "Fecha Alta", "Fecha Activación", "Fecha Suspensión", "Fecha Cancelación",  "Consumo Anytime (Gb)",  "Consumo Bonus (Gb)", "Token Disp (Gb)", "Día de Relleno"];

    
    for( var i=r; i<ro; i++ ) {         
      rows.push( [] );
    }

    
    for (var i = 0; i < ro; i++)
    {    
        if ( pdfAcrear =='todo') 
        {   
            rows[i][0] = vm.rowCollection4[i].SAN;
            rows[i][1] = vm.rowCollection4[i].IdSuscriptor;
            rows[i][2] = vm.rowCollection4[i].Suscriptor;
            rows[i][3] = vm.rowCollection4[i].Referencia;
            rows[i][4] = vm.rowCollection4[i].PlanDeServicio;
            
            rows[i][5] = vm.rowCollection4[i].Beam;
            rows[i][6] = vm.rowCollection4[i].SatellitedID;
            rows[i][7] = vm.rowCollection4[i].ESN;
            rows[i][8] = vm.rowCollection4[i].Estatus;
            rows[i][9] = vm.rowCollection4[i].EstTecnico;
            rows[i][10] = vm.rowCollection4[i].Latitud;
            rows[i][11] = vm.rowCollection4[i].Longitud;
            rows[i][12] = vm.rowCollection4[i].FechaAlta;
            rows[i][13] = vm.rowCollection4[i].FechaActivacion; 
            rows[i][14] = vm.rowCollection4[i].FechaSuspension;           
            rows[i][15] = vm.rowCollection4[i].FechaCancelacion;            
            rows[i][16] = vm.rowCollection4[i].ConsumoAnytime;
            rows[i][17] = vm.rowCollection4[i].ConsumoBonus;
            rows[i][18] = vm.rowCollection4[i].TokenDisp;    
            rows[i][19] = vm.rowCollection4[i].DiaRelleno;    
        }else 
        {           
            rows[i][0] = vm.displayedCollection4[i].SAN;
            rows[i][1] = vm.displayedCollection4[i].IdSuscriptor;            
            rows[i][2] = vm.displayedCollection4[i].Suscriptor;
            rows[i][3] = vm.displayedCollection4[i].Referencia;
            rows[i][4] = vm.displayedCollection4[i].PlanDeServicio;
            
            rows[i][5] = vm.displayedCollection4[i].Beam;
            rows[i][6] = vm.displayedCollection4[i].SatellitedID;
            rows[i][7] = vm.displayedCollection4[i].ESN;
            rows[i][8] = vm.displayedCollection4[i].Estatus;
            rows[i][9] = vm.displayedCollection4[i].EstTecnico;
            rows[i][10] = vm.displayedCollection4[i].Latitud;
            rows[i][11] = vm.displayedCollection4[i].Longitud;
            rows[i][12] = vm.displayedCollection4[i].FechaAlta;
            rows[i][13] = vm.displayedCollection4[i].FechaActivacion; 
            rows[i][14] = vm.displayedCollection4[i].FechaSuspension;       
            rows[i][15] = vm.displayedCollection4[i].FechaCancelacion;            
            rows[i][16] = vm.displayedCollection4[i].ConsumoAnytime;
            rows[i][17] = vm.displayedCollection4[i].ConsumoBonus;
            rows[i][18] = vm.displayedCollection4[i].TokenDisp;  
            rows[i][19] = vm.displayedCollection4[i].DiaRelleno;  
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
        doc.setFontSize(9);
           
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
                fontSize: 6.8,       
            },
                bodyStyles: {        
                    fontSize: 6.4 
            }
        });

        doc.autoTable( columns, rows, {
            startY:27,   
            theme: 'plain',
            
            styles:{
                overflow: 'linebreak',  
            },
            columnStyles: { 
                0: {columnWidth: 12}, 
                1: {columnWidth: 12}, 
                4: {columnWidth: 11},                                     
            },
            margin: {top: 10, right: 5, bottom: 16, left: 5},
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