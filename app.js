/*
Aplikacja przetwarzająca transakcje walutowe.Lista wymagań:
DONE 1. wyświetlanie i definiowanie przelicznika walutowego(1 EURO = x PLN)
DONE 2. dodawanie transakcji walutowej: definiowana nazwa i kwota w euro
DONE 3. lista dodanych transakcji walutowych: wyświetlanie dodanych wcześniej transakcji(nazwa, kwota w euro, automatycznie wyliczona kwota w PLN)
DONE 4. automatyczne przeliczanie kwot w PLN dla wcześniej dodanych transakcji po zmianie przelicznika walutowego
DONE 5. usuwanie transakcji z listy
DONE 6. suma wszystkich transakcji
DONE 7. wyświetlanie osobno, obok listy, transakcji o największej kwocie(nazwa, kwota w PLN, kwota w euro)
DONE 8. zaokrąglanie wartości do 2 miejsc po przecinku
DONE 9. wszystkie ww.informacje widoczne jednocześnie na ekranie
10. odświeżanie danych w momencie modyfikacji
DONE 11. Aplikacja powinna zostać napisana za pomocą ECMAScript 2015 lub nowszego, dopuszczalne jest ewentualne użycie biblioteki React i RequireJS
DONE 12. wymagane wsparcie przeglądarek: najnowszy Chrome lub Firefox
*/

document.addEventListener('DOMContentLoaded', function () {
  
  let converterValue = Number(document.querySelector('#converter input').value);
  const list = document.querySelector('#list');
  const converterBtn = document.querySelector('#converter button');
  const addBtn = document.querySelector('#add-transaction button');
  const highest = document.querySelector('#highest');
  const totalContainer = document.querySelector('.total-amount');
  let items = [...document.querySelectorAll('.item')];

  // set converter value
  converterBtn.addEventListener('click', function (e) {
    converterValue = Number(document.querySelector('#converter input').value);
    if (items.length > 0) {
      items.forEach(item => {
        item.querySelector('.pln').innerText = `${(Number(item.dataset.value) * converterValue).toFixed(2)} PLN`;
      })
    }
    highestTrans(highest, items);
    totalAmount(totalContainer, items);
  })

  function createListItem(list, name, eur) {
    const deleteBtn = document.createElement('span');
    deleteBtn.innerText = 'USUŃ'
    deleteBtn.classList.add('delete-btn');

    const transactionName = document.createElement('p');
    transactionName.innerText = name;
    transactionName.classList.add('name');

    const euro = document.createElement('p');
    euro.innerText = eur + ' EUR';
    euro.classList.add('euro');
    
    const pln = document.createElement('p');
    const plnVal = eur * converterValue;
    pln.innerText = plnVal.toFixed(2) + ' PLN';
    pln.classList.add('pln');

    const item = document.createElement('div');
    item.classList.add('item');
    item.dataset.value = eur;

    item.appendChild(transactionName);
    item.appendChild(euro);
    item.appendChild(pln);
    item.appendChild(deleteBtn);
    list.prepend(item);

    items = [...document.querySelectorAll('.item')];
    deleteItem(item);
  }

  // add transaction
  addBtn.addEventListener('click', function (e) {
    let inputName = document.querySelector('#name').value;
    let inputEuro = Number(document.querySelector('#euro').value);
  
    createListItem(list, inputName, inputEuro);
    highestTrans(highest, items);
    totalAmount(totalContainer, items);
  })

  // check highest transaction
  function highestTrans(container, items) {
    container.innerHTML = '';
    if (items.length === 0) return;
    items.sort((a, b) => {
      return b.dataset.value - a.dataset.value;
    });
    let clone = items[0].cloneNode(true);
    clone.classList.remove('item');
    clone.classList.add('highest-transaction');
    clone.removeChild(clone.lastChild);
    container.appendChild(clone);
  }

  // delete button trigger
  function deleteItem(item) {
    const deleteBtn = item.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function (e) {
      this.parentElement.parentElement.removeChild(this.parentElement);
      items = [...document.querySelectorAll('.item')];
      highestTrans(highest, items);
      totalAmount(totalContainer, items);
    }) 
  }

  function totalAmount(container, items) {
    container.innerHTML = '';
    if (items.length === 0) return;
    let totalEur = 0;
    items.forEach(item => {
      totalEur += Number(item.dataset.value);
    });
    const element = document.createElement('p');
    element.innerText = `TOTAL: ${totalEur} EUR / ${(totalEur * converterValue).toFixed(2)} PLN`;
    container.appendChild(element);
  }
})