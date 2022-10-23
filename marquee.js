const marqueeDiv = document.getElementById('marquee')

class CreatingMarquee {
  constructor(mydiv) {
    this.mydiv = mydiv
  }
  renderingDiv(apilink) {
    let makefirstdiv = document.createElement('div');
    makefirstdiv.classList.add('marquee');
    const makeseconddiv = document.createElement('div')
    makeseconddiv.classList.add('mymarquee');
    makefirstdiv.appendChild(makeseconddiv);
    this.mydiv.appendChild(makefirstdiv);

    fetch(apilink)
      .then((response) => response.json())
      .then((result) => {
        for (let i = 0; i < 100; i++) {
          let object = result[i];
          this.printingOnscreen(makeseconddiv, object)
        }
        })

      }
      printingOnscreen(seconddiv, dataobject){
        seconddiv.innerHTML += `<span>${dataobject.symbol}</span>` + `<span class ="pricecolor"> ${dataobject.price}</span>` + `   `
      }
  }






window.onload = () => {
  const marquee = new CreatingMarquee(marqueeDiv)
  marquee.renderingDiv(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com//api/v3/quotes/nyse`)
}