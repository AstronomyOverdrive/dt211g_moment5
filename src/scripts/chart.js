"use strict";

/**
 * Get remote data and pass it on to "sortData"
 */
async function getData() {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        if (!response.ok) {
            throw new Error("Invalid response!");
        }
        const applicationData = await response.json();
        sortData(applicationData);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Divide data into separate arrays and sort them
 * @param {Array} data - Array containing unsorted data objects
 */
function sortData(data) {
    let coursesData = [];
    let programsData = [];
    data.forEach(object => {
        if (object.type === "Kurs") {
            coursesData.push(object);
        } else if (object.type === "Program") {
            programsData.push(object);
        }
    });
    coursesData.sort((a, b) => Number(a.applicantsTotal) > Number(b.applicantsTotal) ? 1 : -1).reverse();
    programsData.sort((a, b) => Number(a.applicantsTotal) > Number(b.applicantsTotal) ? 1 : -1).reverse();
    showData(coursesData, 6, "bar");
    showData(programsData, 5, "circle");
}

/**
 * Display data as chosen chart
 * @param {Array} data - Array containing sorted data objects
 * @param {number} amount - How many items to show
 * @param {string} type - Type of chart to use
 */
function showData(data, amount, type) {
    let namesToShow = [];
    let numbersToShow = [];
    for (let i = 0; i < amount; i++) {
        namesToShow.push(data[i].name);
        numbersToShow.push(Number(data[i].applicantsTotal));
    }
    switch (type) {
        case "bar":
            drawBarChart(namesToShow, numbersToShow);
            break;
        case "circle":
            drawCircleChart(namesToShow, numbersToShow);
            break;
        default:
            console.log("Invalid chart type!");
    }
}

/**
 * Draw bar chart displaying number of applicants
 * @param {Array} itemNames - Names of the items to show, in order
 * @param {Array} itemApplicants - Number of applicants to show, in order
 */
function drawBarChart(itemNames, itemApplicants) {
    const options = {
        theme: {
            mode: "dark"
        },
        chart: {
            type: "bar",
            width: "100%"
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: "end",
                horizontal: true
            }
        },
        xaxis: {
            categories: itemNames
        },
        series: [{
            name: "Antal sökande",
            data: itemApplicants
        }],
        dataLabels: {
            enabled: true
        }
    };
    const barChart = new ApexCharts(document.querySelector("#bar-chart"), options);
    barChart.render();
}

/**
 * Draw circle chart displaying applicants
 * @param {Array} itemNames - Names of the items to show, in order
 * @param {Array} itemApplicants - Number of applicants to show, in order
 */
function drawCircleChart(itemNames, itemApplicants) {
    const options = {
        theme: {
            mode: "dark"
        },
        chart: {
            type: "pie",
            width: "100%",
            height: "100%"
        },
        labels: itemNames,
        series: itemApplicants
    };
    const circleChart = new ApexCharts(document.querySelector("#circle-chart"), options);
    circleChart.render();
}

addEventListener("load", getData);
