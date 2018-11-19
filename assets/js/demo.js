//Login
var acceso_ = false;

$('.login').on('submit', function(e) {
    e.preventDefault();
    if (acceso_) return;
    acceso_ = true;
    var $this = $(this),
        $state = $this.find('button > .state');
    $this.addClass('loading');
    $state.html('Revisando credenciales...');
    setTimeout(function() {
        $this.addClass('ok');
        $state.html('Bienvenido!');
        setTimeout(function() {
            $(location).attr('href', 'chart.html');
        }, 2000);
    }, 3000);
});


//Gráfica 
$(function() {

    //Llamar el Json desde una api (no pude traerlo desde la url que me proporcionaron)
    $.getJSON('https://api.myjson.com/bins/f0dfe', function(data) {

        //parsear el json para visualizarlo con el plugin declarando mis variables en arreglos vacíos
        var chartPrecio = [];
        var chartTiempo = [];
        //Variables para validar
        var PrecioInicial;
        var ok = false;

        //verificar el resultado del json en la tabla
        if (data.resultObj != null) {

            PrecioInicial = data.resultObj[0].Precio;
            //verificar cada objeto..
            $.each(data.resultObj, function() {
                //si precio cambia 
                if (this.Precio != PrecioInicial || ok) {
                    //actualizar precio 
                    chartPrecio.push(this.Precio);
                    //actualizar fecha
                    chartTiempo.push(this.Fecha.substring(0, 20));
                    ok = true;
                }

            });

        } else {}




        //Ejecutar el plugin highcharts para visualizar los datos 
        $('#theChart').highcharts({
            chart: {
                type: 'areaspline',
                zoomType: 'x'
            },
            title: {
                text: null
            },
            legend: {
                enabled: true
            },
            xAxis: {
                type: 'datetime',
                tickInterval: 3600 * 1000,
                categories: chartTiempo,
                labels: {
                    enabled: true,
                }

            },
            yAxis: {
                title: {
                    text: "Valores IPC"

                },
                opposite: true,
                gridLineWidth: 0,
                minorGridLineWidth: 0

            },
            tooltip: {
                shared: true,
                valuePrefix: '$ '
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                area: {
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'IPC',
                data: chartPrecio

            }]
        });
    });
});