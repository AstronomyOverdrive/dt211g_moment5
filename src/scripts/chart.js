"use strict";

/**
 * Draw chart for the most applied for courses
 * @param {Array} courseNames - Names of the courses to show, in order
 * @param {Array} courseApplicants - Number of applicants to show, in order
 */
function drawCoursesChart(courseNames, courseApplicants) {
    const options = {
        theme: {
            mode: "dark"
        },
        chart: {
            type: 'bar',
            width: 500
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true
            }
        },
        xaxis: {
            categories: courseNames
        },
        series: [{
            name: "Antal sökande",
            data: courseApplicants
        }],
        dataLabels: {
            enabled: true
        }
    };
    const coursesChart = new ApexCharts(document.querySelector("#course-chart"), options);
    coursesChart.render();
}

/**
 * Draw chart for the most applied for programs
 * @param {Array} programNames - Names of the programs to show, in order
 * @param {Array} programApplicants - Number of applicants to show, in order
 */
function drawProgramsChart(programNames, programApplicants) {
    const options = {
        theme: {
            mode: "dark"
        },
        chart: {
            type: 'pie',
            width: 500
        },
        labels: programNames,
        series: programApplicants
    };
    const programsChart = new ApexCharts(document.querySelector("#programs-chart"), options);
    programsChart.render();
}
