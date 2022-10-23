
const myButton = document.getElementById('my-button');
const myListPlace = document.getElementById('my-ul');
const myLoader = document.getElementById('my-loader');




  myButton.addEventListener('click',function(e){
    e.preventDefault()
    apiSearch();
  });

  


async function apiSearch(){
  const myInput = document.getElementById('my-input').value
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${myInput}&limit=10&exchange=NASDAQ`
  
  showLoader();
  const response = await fetch(url);
  const result = await response.json();
   console.log('result' ,result);

   for(let i in result){
    object = result[i];
    hideLoader();
    getExtra(object.symbol,object);
    }
    
  }

   async function getExtra(symb,objectData){
   const url2 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symb} `
   const resp2 = await fetch(url2)
   const results2 = await resp2.json()
   console.log(results2);
   const obj = results2
   const myList = document.createElement('li');
   myList.classList.add('liststyle');
   const myHr = document.createElement('hr');
   myHr.classList.add('hrstyle')
   myListPlace.appendChild(myList);
   myListPlace.appendChild(myHr);
   

   
   myList.innerHTML = `<img src=${obj.profile.image} class="imagesize">`+`<a href="./company.html?symbol=` + objectData.symbol +'">'  +`${objectData.name} (${objectData.symbol})</a>` +
   `<span class=changestyle>(${obj.profile.changesPercentage}%)</span>`
  
   }
     
function cleaningResults(){
  myListPlace.innerHTML = '' ;
}


function showLoader(){
  myLoader.style.display = 'block';
  cleaningResults();
}


function hideLoader(){
  myLoader.style.display = 'none';
}


  
