function setAttrs(obj, attrs) {
  let r;
  for (let k in attrs) {
    r = obj.attr(k, attrs[k]);
  }
  return r;
}
const data = [
  {
    label: "Star Wars",
    instances: 207
  },
  {
    label: "Lost In Space",
    instances: 3
  },
  {
    label: "the Boston Pops",
    instances: 20
  },
  {
    label: "Indiana Jones",
    instances: 150
  },
  {
    label: "Harry Potter",
    instances: 75
  },
  {
    label: "Jaws",
    instances: 5
  },
  {
    label: "Lincoln",
    instances: 1
  }
];

svg = d3.select("svg");
canvas = d3.select("#canvas");
art = d3.select("#art");
labels = d3.select("#labels");

// Create the pie layout function.
// This function will add convenience
// data to our existing data, like
// the start angle and end angle
// for each data element.
jhw_pie = d3.pie();
jhw_pie.value(function(d, i) {
  // Tells the layout function what
  // property of our data object to
  // use as the value.
  return d.instances;
});

// Store our chart dimensions
cDim = {
  height: 500,
  width: 500,
  innerRadius: 50,
  outerRadius: 150,
  labelRadius: 175
};

// Set the size of our SVG element
svg.attr("height", cDim.height);
svg.attr("width", cDim.width);

// This translate property moves the origin of the group's coordinate
// space to the center of the SVG element, saving us translating every
// coordinate individually.
canvas.attr("transform", "translate(" + cDim.width / 2 + "," + cDim.width / 2 + ")");

pied_data = jhw_pie(data);

// The pied_arc function we make here will calculate the path
// information for each wedge based on the data set. This is
// used in the "d" attribute.
pied_arc = d3
  .arc()
  .innerRadius(50)
  .outerRadius(150);

// This is an ordinal scale that returns 10 predefined colors.
// It is part of d3 core.
pied_colors = d3.schemeCategory10;
console.log(pied_colors);

// Let's start drawing the arcs.
enteringArcs = art
  .selectAll(".wedge")
  .data(pied_data)
  .enter();

enteringArcs
  .append("path")
  .attr("class", "wedge")
  .attr("d", pied_arc)
  .style("fill", function(d, i) {
    return pied_colors[i];
  });

// Now we'll draw our label lines, etc.
enteringLabels = labels
  .selectAll(".label")
  .data(pied_data)
  .enter();
labelGroups = enteringLabels.append("g").attr("class", "label");
labelGroups
  .append("circle")
  .attr("x", 0)
  .attr("y", 0)
  .attr("r", 2)
  .attr("fill", "#000")
  .attr("transform", function(d, i) {
    // centroid = pied_arc.centroid(d);
    return "translate(" + pied_arc.centroid(d) + ")";
  })
  .attr("class", "label-circle");

// "When am I ever going to use this?" I said in
// 10th grade trig.
textLines = setAttrs(labelGroups.append("line"), {
  x1: function(d, i) {
    return pied_arc.centroid(d)[0];
  },
  y1: function(d, i) {
    return pied_arc.centroid(d)[1];
  },
  x2: function(d, i) {
    const centroid = pied_arc.centroid(d);
    const midAngle = Math.atan2(centroid[1], centroid[0]);
    const x = Math.cos(midAngle) * cDim.labelRadius;
    return x;
  },
  y2: function(d, i) {
    const centroid = pied_arc.centroid(d);
    const midAngle = Math.atan2(centroid[1], centroid[0]);
    const y = Math.sin(midAngle) * cDim.labelRadius;
    return y;
  },
  class: "label-line"
});

// console.log(labelGroups.append("text"))

textLabels = setAttrs(labelGroups.append("text"), {
  x: function(d, i) {
    const centroid = pied_arc.centroid(d);
    const midAngle = Math.atan2(centroid[1], centroid[0]);
    const x = Math.cos(midAngle) * cDim.labelRadius;
    const sign = x > 0 ? 1 : -1;
    const labelX = x + 5 * sign;
    return labelX;
  },
  y: function(d, i) {
    const centroid = pied_arc.centroid(d);
    const midAngle = Math.atan2(centroid[1], centroid[0]);
    const y = Math.sin(midAngle) * cDim.labelRadius;
    return y;
  },
  "text-anchor": function(d, i) {
    const centroid = pied_arc.centroid(d);
    const midAngle = Math.atan2(centroid[1], centroid[0]);
    const x = Math.cos(midAngle) * cDim.labelRadius;
    return x > 0 ? "start" : "end";
  },
  class: "label-text"
}).text(function(d) {
  return d.data.label;
});

const alpha = 0.5;
const spacing = 12;

function relax() {
  let again = false;
  textLabels.each(function(d, i) {
    let a = this;
    let da = d3.select(a);
    let y1 = da.attr("y");
    textLabels.each(function(d, j) {
      let b = this;
      // a & b are the same element and don't collide.
      if (a == b) return;
      let db = d3.select(b);
      // a & b are on opposite sides of the chart and
      // don't collide
      if (da.attr("text-anchor") != db.attr("text-anchor")) return;
      // Now let's calculate the distance between
      // these elements.
      let y2 = db.attr("y");
      let deltaY = y1 - y2;

      // Our spacing is greater than our specified spacing,
      // so they don't collide.
      if (Math.abs(deltaY) > spacing) return;

      // If the labels collide, we'll push each
      // of the two labels up and down a little bit.
      again = true;
      let sign = deltaY > 0 ? 1 : -1;
      let adjust = sign * alpha;
      da.attr("y", +y1 + adjust);
      db.attr("y", +y2 - adjust);
    });
  });
  // Adjust our line leaders here
  // so that they follow the labels.
  if (again) {
    const labelElements = textLabels._groups[0];
    textLines.attr("y2", function(d, i) {
      const labelForLine = d3.select(labelElements[i]);
      return labelForLine.attr("y");
    });
    setTimeout(relax, 20);
  }
}

relax();
