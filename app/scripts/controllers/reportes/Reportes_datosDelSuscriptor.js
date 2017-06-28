'use strict';
angular.module('softvFrostApp')
.controller('Reportes_DatosDelSuscriptorCtrl', ['$http', 'reportesFactory','$timeout', 'ngNotify', '$state', function ( $http, reportesFactory, $timeout, ngNotify, $state){

 

    var vm = this;
    vm.filename = "Reporte_datos_suscriptor";
    var reportHeaderPdf = "Reporte Datos del Suscriptor";
    var fechaInicioYMD;
    var fechaFinYMD; 
    var idAux = 1;  
    vm.csvUnoHide = true; 
    vm.csvDosHide = true;   
    var img = new Image();
    img.crossOrigin = "";  


    this.$onInit = function() {
        getImageDataURL();
        getReporteDatosDelSuscriptor();   
    }

    function reloadRoute() {
        $state.reload(); 
    };

    vm.limpiarFiltros = limpiarFiltros;
    function limpiarFiltros(){
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




    var arrayDatos = [];   
    vm.getReporteDatosDelSuscriptor = getReporteDatosDelSuscriptor;
    function getReporteDatosDelSuscriptor()
    {                     
       
        reportesFactory.mostrarReporteDatosDelSuscriptor(idAux).then(function(data) {    
            arrayDatos = data.GetReporte_DatosDelSuscriptorResult;
            vm.itemsByPage = 5; 
            vm.rowCollection4 = arrayDatos; 
        });
      
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
    vm.order = [ 'SAN', 'IdSuscriptor', 'Referencia', 'Nombre', 'Estado', 'Municipio', 'Colonia', 'Calle', 'NumeroExt', 'CP','Telefono','Celular','Email'];

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
      vm.arrayReporte = [];  
         // ENCABEZADOS
        vm.arrayReporte =     [{
                "SAN": "SAN",
                "IdSuscriptor": "Id Suscriptor",
                "Referencia":"Referencia",
                "Nombre":"Nombre",
                "Estado": "Estado",                
                "Municipio": "Municipio",
          
                "Colonia": "Colonia",
                "Calle": "Calle",            
                "NumeroExt": "Número Exterior",
              
                "CP": "Código Postal",               
                "Telefono": "Telefono",
                "Celular": "Celular",               
                "Email": "Email"               
                }];
    } 


// Create TABLE PDF 
vm.createPdfTodo = createPdfTodo;
function createPdfTodo(pdfAcrear){

    var rows = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0] ]; 
   
    var r = 1; 
    var c = 0; 

    var ro = 0; 
      if ( pdfAcrear =='todo')
        { ro = vm.rowCollection4.length; }
        else 
        { ro = vm.displayedCollection4.length; }


    var cols = 12; 
    var columns = [ "SAN","Id Suscriptor", "Referencia", "Nombre", "Estado","Municipio", "Colonia", "Calle", "Número Ext", "CP", "Teléfono", "Celular","Email"];
   
    for( var i=r; i<ro; i++ ) {         
      rows.push( [] );
    }

    
    for (var i = 0; i < ro; i++)
    {    
        if ( pdfAcrear =='todo') 
        {  
            rows[i][0] = vm.rowCollection4[i].SAN;
            rows[i][1] = vm.rowCollection4[i].IdSuscriptor;
            rows[i][2] = vm.rowCollection4[i].Referencia;
            rows[i][3] = vm.rowCollection4[i].Nombre;
            rows[i][4] = vm.rowCollection4[i].Estado;            
            rows[i][5] = vm.rowCollection4[i].Municipio;
       
            rows[i][6] = vm.rowCollection4[i].Colonia;
            rows[i][7] = vm.rowCollection4[i].Calle;
            rows[i][8] = vm.rowCollection4[i].NumeroExt;
      
            rows[i][9] = vm.rowCollection4[i].CP;
            rows[i][10] = vm.rowCollection4[i].Telefono;
            rows[i][11] = vm.rowCollection4[i].Celular;
            rows[i][12] = vm.rowCollection4[i].Email;    
        }else 
        {           
            rows[i][0] = vm.displayedCollection4[i].SAN;
            rows[i][1] = vm.displayedCollection4[i].IdSuscriptor;
            rows[i][2] = vm.displayedCollection4[i].Referencia;
            rows[i][3] = vm.displayedCollection4[i].Nombre;
            rows[i][4] = vm.displayedCollection4[i].Estado;            
            rows[i][5] = vm.displayedCollection4[i].Municipio;
      
            rows[i][6] = vm.displayedCollection4[i].Colonia;
            rows[i][7] = vm.displayedCollection4[i].Calle;
            rows[i][8] = vm.displayedCollection4[i].NumeroExt;
        
            rows[i][9] = vm.displayedCollection4[i].CP;
            rows[i][10] = vm.displayedCollection4[i].Telefono;
            rows[i][11] = vm.displayedCollection4[i].Celular;
            rows[i][12] = vm.displayedCollection4[i].Email;    
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
            fontSize: 7.2,       
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