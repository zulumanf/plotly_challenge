//built table builds demo table
//init selects the data set
//optinoschange is the function that changes the table
//make functions then call them later


// dropdown metadata table
function buildTable(sample) {
    d3.json("data/samples.json").then(data => {
        //console.log(data);
        // sample = 940;
        var metaData = data.metadata;
        var results = metaData.filter(d => d.id == sample);
        var finalResult = results[0];
        //**console.log(finalResult) DELETE LATER**
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(finalResult).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`)
        });
        console.log(finalResult);
    })
};

// function for the demographic table
//reference day3 activity 7
function init() {
    var dropDown = d3.select("#selDataset");
    d3.json("data/samples.json").then(data => {
        var names = data.names;
        //console.log(names) DELETE LATER
        names.forEach(sample => {
            dropDown.append("option")
                .text(sample)
                .property("value", sample);
        });
        var firstSample = names[0];
        console.log(firstSample);
        buildTable(firstSample);
        buildCharts(firstSample);
    });
}

function optionChanged(name) {
    buildTable(name);
    buildCharts(name)

};

//horizontal bar chart, reference day3 activity 7
//Use D3 fetch to read the JSON file
//The data from the JSON file is arbitrarily named importedData as the argument
function buildCharts(sample) {
    d3.json("data/samples.json").then((data) => {
        var metasamples = data.samples;
        var results = metasamples.filter(d => d.id == sample);
        var finalResult = results[0];
        console.log(finalResult)

        //variables to store the data in for the graphs    
        var otu_ids = finalResult.otu_ids
        var sample_values = finalResult.sample_values
        var otu_labels = finalResult.otu_labels

        // Trace1 for the data, reference the 
        var trace1 = {
            x: otu_ids.slice(0, 10).reverse(),
            y: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            name: "Horizontal Bellybutton Bar",
            type: "bar",
            orientation: "h"
        };

        // data
        var chartData = [trace1];

        // Apply the group bar mode to the layout
        var layout = {
            title: "Top 10 OTUs",
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
        // Trace1 for the data, reference the 


        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            name: "bubble chart",
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
            }

        };
        var charData2 = [trace2];
        // Apply the group bar mode to the layout
        var layout2 = {
            title: "Top 10 OTUs",
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