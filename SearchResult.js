
const containerDOM = document.getElementById('container')
const companyname = document.getElementById('company-name');
const companyimage = document.getElementById('company-image');
const companyprice = document.getElementById('company-price');
const companychanges = document.getElementById('company-changes');
const companydescription = document.getElementById('company-description');
const mainresult = document.getElementById('results');
const myLoader = document.getElementById('my-loader');

class CreatingResult {
  constructor(myresult) {
    this.myresult = myresult

    document.addEventListener("search", (event) => {
      const finalresult = event.detail.data
      this.renderingResults(finalresult)
    }
    )
  }

  renderingResults(objc) {


    let makepar
    let makehr
    for (let i in objc) {
      makepar = document.createElement('p');
      makepar.classList.add('parstyle');
      makehr = document.createElement('hr');
      makehr.classList.add('hrstyle');

      const term = document.getElementById('myinput').value
      
       makepar.innerHTML = `<img src=${objc[i].profile.image} class="imagesize">` + `<a href="./company.html?symbol=` + objc[i].symbol + '">'
      + `${this.highli(objc[i].profile.companyName,term)} </a> ` + `(${this.highli(objc[i].symbol,term)})` + `<span class=changestyle>` + `(${objc[i].profile.changesPercentage}%)` + `</span>`
    }
    this.myresult.appendChild(makepar);
    this.myresult.appendChild(makehr);
  }

  CompanyDetails() {

    let myobject
    const parameters = new URLSearchParams(location.search);
    const symbol = parameters.get('symbol')
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
    fetch(url)
      .then((response) => response.json())
      .then((result) => {

        myobject = result.profile
        if (myobject.changes > 0) {
          companychanges.style.color = "green";
        }
        else {
          companychanges.style.color = "red";
        }

        this.printingInfo(myobject)
        this.getHistorieData()
      })


  }
  highli(original,termval){

    let re = new RegExp(termval,"gi"); 
    let newText = original.replace(re, `<mark>$&</mark>`);
    return newText

  }


  creatingChart(key, value) {
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


  printingInfo(myobjectData) {
    myLoader.style.display = 'none';
    companyimage.innerHTML = `<img src=${myobjectData.image}>`

    companyname.innerHTML = myobjectData.companyName
    companyprice.innerHTML = `Stock price: $${myobjectData.price}`
    companychanges.innerHTML = `(${myobjectData.changes}%)`
    companydescription.innerHTML = myobjectData.description

  }

  getHistorieData() {

    const parameters = new URLSearchParams(location.search);
    const symbol = parameters.get('symbol')
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)

        this.creatingChart(result.historical, result.historical)

      })

  }

}


