gsap.from('.animation', {
  opacity: 0,
  duration: 1.4,
  y: -100,
  ease: 'elastic',
});

gsap.from('.animation_2', {
  opacity: 0,
  duration: 1.25,
  y: -100,
  ease: 'elastic',
});

gsap.from('.cloudy', {
  opacity: 0,
  duration: 1.25,
  y: -100,
  ease: 'elastic',
});

gsap.to('.cloudy', {
  delay: 1.1,
  opacity: 100,
  duration: 40,
  x: '100%',
  repeat: -1,
  ease: 'elastic',
});

gsap.to('#sun', 1.6, {
  rotation: '180',
  opacity: 0,
  ease: 'elastic',
  duration: 1.25,
  y: 50,
  x: 30,
});
gsap.to('#sun', 5, {
  opacity: 100,
  rotation: '180',
  ease: Linear.easeNone,
  repeat: -1,
});

const API_KEY = '1a8927de54f779e3daeb1932452a3799';

// Get the input field
var input = document.getElementById('city_input');

// Execute a function when the user releases a key on the keyboard
input.addEventListener('keyup', function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.key === 'Enter') {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById('get_weather_btn').click();
  }
});

function getWeather(key) {
  let city = document.getElementById('city_input').value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    {
      method: 'get',
    }
  )
    .then((data) => data.json())

    .then((finalData) => {
      console.log('finalData', finalData);

      if (finalData.cod === 200) {
        let result = document.getElementById('result');
        result.style.display = 'block';
        document.getElementById('temp').innerHTML = finalData.main.temp + ' C';
        document.getElementById('description').innerHTML =
          finalData.weather[0].description;
        document.getElementById('pressure').innerHTML = finalData.main.pressure;
      }
      if (finalData.cod == 404) {
        alert('city not found');
      }
      if (finalData.cod == 400) {
        alert('Nothing to geocode');
      }
    });
}

//drawing a chart for last 5 dayes temp

let arr = [
  { name: 'ahmed', value: 30 },
  { name: 'gamal', value: 8 },
  { name: 'mustafa', value: 15 },
  { name: 'saied', value: 16 },
  { name: 'a', value: 23 },
  { name: 'asdasd', value: 30 },
];

var x = d3.scaleBand().rangeRound([0, '402']).padding(0.1),
  y = d3.scaleLinear().rangeRound([202, 0]);

x.domain(
  arr.map(function (d) {
    return d.name;
  })
);
y.domain([
  0,
  d3.max(arr, function (d) {
    return d.value + 10;
  }),
]);

// var container = d3.select('svg'),
//   margin = { top: 10, right: 10, bottom: 15, left: 20 },
//   width = +svg.attr('width') - margin.left - margin.right,
//   height = +svg.attr('height') - margin.top - margin.bottom;
const container = d3.select('svg').style('border', '1px solid red');

container
  .selectAll('div')
  .data(arr)
  .enter()
  .append('rect')
  .attr('fill', function (d) {
    return 'rgb(255, 204, 0 )';
  })
  .attr('x', (data) => x(data.name))
  .attr('y', (data) => y(data.value))
  .attr('width', x.bandwidth())
  .attr('height', (d) => 202 - y(d.value));

// //set the label
// container
//   .selectAll('text')
//   .data(arr)
//   .enter()
//   .append('text')
//   .text(function (d) {
//     return d;
//   })
//   .attr('text-anchor', 'middle')
//   //   .attr('x', function (d, i) {
//   //     return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
//   //   })
//   //   .attr('y', function (d) {
//   //     return h - d * 4 + 14;
//   //   })
//   .attr('font-family', 'sans-serif')
//   .attr('font-size', '11px')
//   .attr('fill', 'white');
