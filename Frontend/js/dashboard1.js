var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    var options = {
        chart: {
            type: 'area',
            toolbar: {
                show: false,
                offsetY: 0,
                parentHeightOffset: 0,
                maxHeight: 0,
            },
            parentOffset: 0,
            height: '45px',
            offsetY: 0,


        },
        legend: {
            show: false,
            maxHeight: 0,
            padding: 0
        },
        subtitle: {
            margin: 0,
            offsetY: 0,
            maxHeight: 0
        },
        dataLabels: {
            enabled: false,
        },
        series: [{
            name: 'Price',
            data: [30, 40, 135, 50, 249, 60, 300, 91, 125],
            labels: {
                show: false,
            },
        }],

        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0,
                top: -30

            }
        },
        stroke: {
            show: true,
            curve: 'smooth',
            width: 1,

        },
        xaxis: {
            type: 'category',
            categories: ['2022 - 1 - 11', '2022 - 1 - 12', ' 2022 - 1 - 13', ' 2022 - 1 - 14', '2022 - 1 - 15', '2022 - 1 - 16', '2022 - 1 - 17', '2022 - 1 - 18', '2022 - 1 - 19'],
            labels: {
                show: false,
                maxHeight: 0,
            },
            axisTicks: {
                show: false,
                maxHeight: 0,
            },

        },
        yaxis: {
            y: 0,
            offsetX: 0,
            offsetY: -20,
            show: false,
        }

    }

    for (var i = 0; i < 5; i++) {
        var chart = new ApexCharts(document.querySelector('#chart' + i), options)
        chart.render()
    }

})