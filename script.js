
const myButton = document.getElementById('my-button');
const myListPlace = document.getElementById('my-ul');
const myLoader = document.getElementById('my-loader');



  myButton.addEventListener('click',function(e){
    e.preventDefault()
    console.log('oi')
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
    const object = result[i];
    hideLoader();
    printList(myListPlace,object);
    
   }

}


function printList (container,objectData){
  const myList = document.createElement('li');
  myList.classList.add('liststyle');
  const myHr = document.createElement('hr');
  myHr.classList.add('hrstyle')
  myListPlace.appendChild(myList);
  myListPlace.appendChild(myHr);
  const symbolcompany = objectData.symbol;

  myList.innerHTML = '<a href="./company.html?symbol=' + symbolcompany +'">'  +`${objectData.name} (${objectData.symbol})</a>`;

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



