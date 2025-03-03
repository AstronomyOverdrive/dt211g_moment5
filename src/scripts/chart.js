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
