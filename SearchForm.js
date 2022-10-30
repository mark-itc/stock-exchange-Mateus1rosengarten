const mainform = document.getElementById('form');
const divresult = document.getElementById('results')



class CreatingForm {
  constructor(myform) {
    this.myform = myform

  }
  renderingDiv(objc) {

    const makenav = document.createElement('nav');
    makenav.classList.add('navbar', 'navbar-light', 'bg-light')
    this.myform.appendChild(makenav);
    const makeform = document.createElement('form');
    makeform.classList.add('form-inline');
    makeform.type = "submit"
    makenav.appendChild(makeform);
    const makeinput = document.createElement('input');
    makeinput.classList.add('form-control', 'mr-sm-2', 'ml-5', 'mt-3', 'custom-input');
    makeinput.type = "search";
    makeinput.id = 'myinput';
    makeform.appendChild(makeinput);
    const makebutton = document.createElement('button');
    makebutton.classList.add('btn', 'btn-outline-success', 'mt-3');
    makebutton.type = "submit";
    makebutton.innerHTML = "Search"
    makeform.appendChild(makebutton);



    makebutton.addEventListener('click', function (event) {
      event.preventDefault()
      let companies
      let resultcompanies = []
      const myinputvalue = makeinput.value;

      divresult.innerHTML = ""
      const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${myinputvalue}&limit=10&exchange=NASDAQ`

      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          for (let i in result) {
            companies = result[i];

            fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companies.symbol} `)
              .then((response2) => response2.json())
              .then((result2) => {
                console.log(result2)

                resultcompanies.push(result2)

                console.log('tes', resultcompanies[0].profile)

                const SearchEvent = new CustomEvent("search", {
                  detail: { data: resultcompanies }
                });

                document.dispatchEvent(SearchEvent);

              })
          }

        }
        )
    })

  }
}




