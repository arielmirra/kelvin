import {Component, OnInit} from '@angular/core';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import L from 'leaflet';
import {Route} from '../../../../shared/routes/Route';

@Component({
    templateUrl: 'map.component.html',
    styleUrls: ['./map.component.scss']
})
export class AdminMapComponent implements OnInit {

    newRoute: Route;
    map: any;

    lightIcon = L.icon({
        iconUrl: '/../../../../assets/img/markers/light.png',

        iconSize: [36, 36], // size of the icon
        iconAnchor: [18, 18], // point of the icon which will correspond to marker's location
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    // main chart

    public mainChartElements = 27; // TODO Report size

    // temperature
    public maxTemperature: Array<number> = [];
    public currentTemperature: Array<number> = [];
    public minTemperature: Array<number> = [];

    // moisture
    public maxMoisture: Array<number> = [];
    public currentMoisture: Array<number> = [];
    public minMoisture: Array<number> = [];

    public mainChartLabels: Array<string> = [];
    public mainChartData: Array<any> = [
        {
            data: this.maxTemperature,
            label: 'Temperatura Máxima'
        },
        {
            data: this.currentTemperature,
            label: 'Temperatura'
        },
        {
            data: this.minTemperature,
            label: 'Temperatura Mínima'
        },
        {
            data: this.maxMoisture,
            label: 'Humedad Máxima'
        },
        {
            data: this.currentMoisture,
            label: 'Humedad'
        },
        {
            data: this.minMoisture,
            label: 'Humedad Mínima'
        },

    ];
    public mainChartOptions: any = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips,
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
                labelColor: function(tooltipItem, chart) {
                    return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(100 / 10),
                    max: 100
                }
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
        legend: {
            display: false
        }
    };
    public mainChartColours: Array<any> = [
        { // max-temperature
            backgroundColor: 'transparent',
            borderColor: getStyle('--danger'),
            pointHoverBackgroundColor: '#fff',
        },
        { // temperature
            backgroundColor: hexToRgba(getStyle('--success'), 10),
            borderColor: getStyle('--success'),
            pointHoverBackgroundColor: '#fff'
        },
        { // min-temperature
            backgroundColor: 'transparent',
            borderColor: getStyle('--info'),
            pointHoverBackgroundColor: '#fff',
        },
        { // max-moisture
            backgroundColor: 'transparent',
            borderColor: getStyle('--danger'),
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5]
        },
        { // moisture
            backgroundColor: 'transparent',
            borderColor: getStyle('--success'),
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5]
        },
        { // min-moisture
            backgroundColor: 'transparent',
            borderColor: getStyle('--info'),
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5]
        },
    ];
    public mainChartLegend = false;
    public mainChartType = 'line';

    public random(min: number, max: number) { // TODO delete
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    constructor() {
    }

    ngOnInit(): void {
        // generate random values for mainChart
        for (let i = 0; i <= this.mainChartElements; i++) { // TODO push data from back
            this.mainChartLabels.push('' + i);
            // temperature
            this.maxTemperature.push(50);
            this.currentTemperature.push(this.random(0, 50));
            this.minTemperature.push(0);
            // moisture
            this.maxMoisture.push(100);
            this.currentMoisture.push(this.random(75, 100));
            this.minMoisture.push(75);
        }
        this.newRoute = Route.empty();
        this.map = L.map('map').setView([-34.61315, -58.37723], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 4,
            maxZoom: 16
        }).addTo(this.map);
        L.control.scale().addTo(this.map);
    }

    drawRoute(): void {
        this.resetMap(this.map); // reset all current markers
        // TODO Loop addMarkerToMap
        // TODO centerMap
    }

    addMarkerToMap: (coordinates: number[],
                     temperature: number,
                     moisture: number,
                     lightSensed: boolean,
                     currentRoute: Route,
                     map: any) => void =
        function (coordinates: number[],
                  temperature: number,
                  moisture: number,
                  lightSensed: boolean,
                  currentRoute: Route,
                  map: any): void {
            if (currentRoute.vampire && lightSensed) {
                L.marker(coordinates, {icon: this.lightIcon}).bindPopup('Luz detectada, se abrió el contenedor').addTo(map);
            } else {
                let circleColor: string;
                if (temperature >= currentRoute.maxTemperature) {
                    circleColor = 'red';
                } else if (temperature <= currentRoute.minTemperature) {
                    circleColor = 'blue';
                } else {
                    circleColor = 'green';
                }
                L.circle(coordinates, {
                    color: circleColor,
                    fillColor: circleColor,
                    fillOpacity: 1,
                    radius: 1
                }).bindPopup('Temperatura medida = ' + 50 + 'ºC.\n' + 'Humedad medida = ' + 95 + '%').addTo(map);
            }
        };

    centerMap: (coordinatesStart: number[], coordinatesFinish: number[]) => void =
        function (coordinatesStart: number[], coordinatesFinish: number[]): void {
            const corner1 = L.latLng(coordinatesStart[0], coordinatesStart[1]),
                corner2 = L.latLng(coordinatesFinish[0], coordinatesFinish[1]),
                bounds = L.latLngBounds(corner1, corner2);
            L.flyToBounds(bounds);
        };

    // probably doesn't work
    resetMap: (map: any) => void =
        function (map: any): void {
            map = L.map('map').setView([-34.61315, -58.37723], 9);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                minZoom: 3,
                maxZoom: 15
            }).addTo(map);
            L.control.scale().addTo(map);
        };

}
