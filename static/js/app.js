// dropdown metadata table
function demoTable(sample) {
    //data source
    d3.json("data/samples.json").then(data => {
        var metaData = data.metadata;
        //variable that compares and filters to the correct id
        var results = metaData.filter(d => d.id == sample);
        //variable to store the data from results variable
        var finalResult = results[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(finalResult).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`)
        });
        console.log(finalResult);
    })
};

//reference day3 activity 7 function for the demographic table
function init() {
    var dropDown = d3.select("#selDataset");
    //data source
    d3.json("data/samples.json").then(data => {
        //variable to store the names data
        var names = data.names;
        names.forEach(sample => {
            dropDown.append("option")
                .text(sample)
                .property("value", sample);
        });
        var firstSample = names[0];
        console.log(firstSample);
        demoTable(firstSample);
        buildCharts(firstSample);
    });
}
//function calling the other functions to build the table and the charts
function optionChanged(name) {
    demoTable(name);
    buildCharts(name)

};

//horizontal bar chart, reference day 3 activity 7
//Use D3 fetch to read the JSON file
function buildCharts(sample) {
    d3.json("data/samples.json").then((data) => {
        var metasamples = data.samples;
        var results = metasamples.filter(d => d.id == sample);
        var finalResult = results[0];
        console.log(finalResult)

        //variables to store the data in for the bar and bubble graph
        //will be used for formatting as well    
        var otu_ids = finalResult.otu_ids
        var sample_values = finalResult.sample_values
        var otu_labels = finalResult.otu_labels

        // Trace for the data, limit them to the top 10 values by slicing, reverse to get the order
        var bar_trace = {
            x: otu_ids.slice(0, 10).reverse(),
            y: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            //title of bar char
            name: "Horizontal Bellybutton Bar",
            //declaring the type of chart
            type: "bar",
            //orientation of the bar chart
            orientation: "h"
        };

        // data
        var chartData = [bar_trace];

        // Apply the group bar mode to the layout
        var layout = {
            title: "Top 10 OTUs",
            //layout for the bar chart
            //spacing of the chart, spacing is also determined by the column class in the html
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", chartData, layout);

        //bubble chart//
        //trace for the bubble chart
        var bubble_trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            name: "bubble chart",
            mode: 'markers',
            //bubble formats pulled from the values and the otu ids (hw instructions)
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };
        var charData2 = [bubble_trace];
        // Apply the group bar mode to the layout
        var layout2 = {
            title: "Top 10 OTUs",
            //spacing of the chart, spacing is also determined by the column class in the html
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
        Plotly.newPlot("bubble", charData2, layout2);
        //closing of the function
    })
}

init();