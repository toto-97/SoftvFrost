
'use strict';
angular.module('softvFrostApp')
.controller('Reportes_reporteGeneralPlataformaCtrl', ['$http', 'reportesFactory','$timeout', 'ngNotify','$state', function ( $http, reportesFactory, $timeout, ngNotify, $state){

 

  var vm = this;
    vm.filename = "Reporte_general_de_plataforma";
    var reportHeaderPdf = "Reporte General de Plataforma";
    var fechaInicioYMD;
    var fechaFinYMD; 
    var idAux = 1;  
    vm.csvUnoHide = true; 
    vm.csvDosHide = true;    
    var img = new Image();
    img.crossOrigin = "";  


    this.$onInit = function() {

        getImageDataURL();
        getReportePorPlataforma();  

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


    var arrayTokens = [];   
    vm.getReportePorPlataforma = getReportePorPlataforma;
    function getReportePorPlataforma()
    {                 
        reportesFactory.mostrarReportePorPlataforma(idAux).then(function(data) {
          
            arrayTokens = data.GetReporte_PorPlataformaResult; 
            //vm.itemsByPage = 5; 
            vm.rowCollection4 = arrayTokens; 
        });
    }


    //CSV 
    vm.order = [ 'Plataforma', 'PlanDeServicio', 'Activos', 'Suspendidos', 'PorInstalar', 'Total', 'TokensProv'];

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
        vm.arrayReporte = [{
                "Plataforma": "Plataforma",              
                "PlanDeServicio": "Plan de Servicio",
                "Activos": "Status Activos",
                "Suspendidos": "Status Suspendidos",
                "PorInstalar": "Status Por Instalar",
                "Total": "Total",
                "TokensProv": "Tokens Provisión"
                }];
    } 

// Create TABLE PDF  
vm.createPdfTodo = createPdfTodo;
function createPdfTodo(pdfAcrear){

    var rows = [ [0,0,0,0,0,0,0] ];
   
    var r = 1; 
    var c = 0; 

    var ro = 0; 
      if ( pdfAcrear =='todo')
        { ro = vm.rowCollection4.length; }
        else 
        { ro = vm.displayedCollection4.length; }


    var cols = 7;
    var columns = ["", "", "", "Status de Servicios", "", "", ""];
 

    for( var i=r; i<ro; i++ ) {         
      rows.push( [] );
    }

    for (var i = 0; i < ro; i++)
    {    
        if ( pdfAcrear =='todo') 
        {   
            rows[i][0] = vm.rowCollection4[i].Plataforma;          
            rows[i][1] = vm.rowCollection4[i].PlanDeServicio;
            rows[i][2] = vm.rowCollection4[i].Activos;
            rows[i][3] = vm.rowCollection4[i].Suspendidos;
            rows[i][4] = vm.rowCollection4[i].PorInstalar;
            rows[i][5] = vm.rowCollection4[i].Total;
            rows[i][6] = vm.rowCollection4[i].TokensProv; 
        }else 
        {                
            rows[i][0] = vm.displayedCollection4[i].Plataforma;          
            rows[i][1] = vm.displayedCollection4[i].PlanDeServicio;
            rows[i][2] = vm.displayedCollection4[i].Activos;
            rows[i][3] = vm.displayedCollection4[i].Suspendidos;
            rows[i][4] = vm.displayedCollection4[i].PorInstalar;
            rows[i][5] = vm.displayedCollection4[i].Total;
            rows[i][6] = vm.displayedCollection4[i].TokensProv; 
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
            doc.text(doc.internal.pageSize.width - 28 , doc.internal.pageSize.height - 10, str); 
              
        };
 
              
        
       
        doc.addImage(img, 'jpeg', 5, 5, 40, 15); 

        // Encabezado 
        doc.setFontSize(14); 
        doc.setFontType("bold");
        var fontSize = doc.internal.getFontSize(); 
        var pageWidth = doc.internal.pageSize.width; 
        var txtWidth = doc.getStringUnitWidth(reportHeaderPdf) * fontSize / doc.internal.scaleFactor;
        var x = ( pageWidth - txtWidth ) / 2;      
        doc.text(reportHeaderPdf, x, 14);   

      
        var laFechaHoy = reportesFactory.obtenerFechaHoy();
        doc.setFontSize(11);   
        doc.setFontType("normal");
        doc.text(doc.internal.pageSize.width - 45 , 20, laFechaHoy); 
        
        doc.setPage(1); 


       

        // Custom table 
        jsPDF.autoTableSetDefaults({
            headerStyles: 
            {   
                fontSize: 9,  
                halign: 'center',     
            },
            bodyStyles: {        
                fontSize: 8 
            }
        });

        doc.autoTable( columns, rows, {
            startY:27,    
            theme: 'plain',       
     
            styles:{
                overflow: 'linebreak', 
            },
            columnStyles: { 
                  0: {columnWidth: 40},
                  1: {columnWidth: 90},
                  3: {columnWidth: 40}
            },
            drawHeaderRow: function(row, data) {
                row.height = 10; // Height for both headers
            },
            drawHeaderCell: function(cell, data) {
              //  doc.rect(cell.x, cell.y, cell.width, cell.height, cell.styles.fillStyle);
              //  doc.setFillColor(230);
            //    doc.rect(cell.x, cell.y + (cell.height / 2), cell.width, cell.height / 2, cell.styles.fillStyle);
              
                doc.autoTableText(cell.text, cell.textPos.x, cell.textPos.y, {
                    halign: cell.styles.halign,
                    valign: cell.styles.valign
                });

                var text = 'Plataforma'; //= data.table.rows[0].cells[data.column.dataKey].text;             
                for(var i = 0; i < data.column.index; i++)
                {   
                     if(i == 0)
                     {
                         text = 'Plan de Servicio';
                     }
                     else if(i == 1)
                     {
                         text = 'Activos';
                     }
                     else if(i == 2)
                     {
                         text = 'Suspendidos';
                     }
                     else if(i == 3)
                     {
                         text = 'Por instalar';
                     }
                     else if(i == 4)
                     {
                         text = 'Total';
                     }
                     else if(i == 5)
                     {
                         text = 'Tokens'+'\n'+'Provisionales';
                     }
                }
                
                    doc.autoTableText(text, cell.textPos.x, cell.textPos.y + (cell.height / 2), {                     
                        halign: cell.styles.halign,
                        valign: cell.styles.valign
                    });
                return false;
            },
            /* -- en header 2 toma la primera fila del body, esto evita que se repita
            drawRow: function(row, data) {
            // Don't print secondary header normally
                if (row.index === 0) return false;
            },
            */
            createdCell: function (cell, data) {
            
                for (var i = 0; i<7; i++){
                   
                    if(i >= 2)
                    {
                       if (data.column.index === i)
                       {
                        cell.styles.halign = 'right';
                       }   
                       else if (data.column.index === 3)
                       {
                        cell.styles.halign = 'center';
                       }                     
                    }
                }

                if (cell.raw === 'CON FAP' 
                    || cell.raw === 'SIN FAP') {
                   // cell.styles.halign = 'right';                    
                    //cell.styles.textColor = [255, 100, 100];   
                    cell.styles.fontStyle = 'bold';                               
                } 
                else if (cell.raw === 'TOTAL ESTATUS CON FAP'
                    || cell.raw === 'TOTAL ESTATUS SIN FAP'
                    || cell.raw === 'TOTAL ESTATUS GENERAL'
                    || cell.raw === 'TOTAL SUMA RESIDENCIALES, EMPRESARIALES SIN FAP'){
                       cell.styles.halign = 'right';
                       cell.styles.fontStyle = 'bold';  
                }
                else if (cell.raw === null)
                {                   
                    cell.text = ' ';
                }
            },
             margin: {top: 16, right: 15, bottom: 16, left: 15},
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