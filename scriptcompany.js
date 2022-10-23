
const companyname = document.getElementById('company-name');
const companyimage = document.getElementById('company-image');
const companyprice = document.getElementById('company-price');
const companychanges = document.getElementById('company-changes');
const companydescription = document.getElementById('company-description');
const myLoader = document.getElementById('my-loader');


window.onload = (e) => {

  hideLoader()
  getProfileData()
}


async function getProfileData() {
  const parameters = new URLSearchParams(location.search);
  const symbol = parameters.get('symbol')

  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
  const resp = await fetch(url);
  const results = await resp.json();
  console.log(results)
  const myobject = results.profile
  if (myobject.changes > 0) {
    companychanges.style.color = "green";
  }
  else {
    companychanges.style.color = "red";
  }
  getHistPriceData();
  printingInfo(myobject);

}


function printingInfo(myobjectData) {

  companyimage.innerHTML = `<img src=${myobjectData.image}>`
  companyname.innerHTML = myobjectData.companyName
  companyprice.innerHTML = `Stock price: $${myobjectData.price}`
  companychanges.innerHTML = `(${myobjectData.changes}%)`
  companydescription.innerHTML = myobjectData.description


}


function creatingChart(key, value) {
  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [key[0].date, key[30].date, key[60].date, key[90].date, key[120].date, key[150].date, key[180].date, key[210].date, key[240].date, key[270].date, key[300].date, key[330].date, key[360].date, key[390].date,],
      datasets: [{
        label: 'Stock price history',
        data: [value[0].close, value[30].close, value[60].close, value[90].close, value[120].close, value[150].close, value[180].close, value[210].close, value[240].close, value[270].close, value[300].close, value[330].close, value[360].close, value[390].close,],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


async function getHistPriceData() {

  const parameters = new URLSearchParams(location.search);
  const symbol = parameters.get('symbol')


  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
  const resp = await fetch(url);
  const results = await resp.json();
  console.log('result', results.historical)

  
    creatingChart(results.historical, results.historical)

  }


function hideLoader() {
  myLoader.style.display = 'none';
}



