const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

search.addEventListener("input", () => searchCars(search.value));

// Get Cars properties
const searchCars = async (searchCar) => {
  const res = await fetch("/data/data.json");
  const cities = await res.json();
  const matches = cities.filter((city) => {
    const ex = new RegExp(`^${searchCar}`, "gi");
    return city.manufacturer.match(ex) || city.model.match(ex);
  });

  if(searchCar.length === 0){
      matches = []
      matchList.innerHTML = ''
  }
  output(matches);
};

function output(matches) {
    if(matches.length > 0 ) {
  const html = matches.map((city) =>
    `
             <div class="card card-body mb-1">
             <h3>${city.model} <small class='text-primary'>(${city.manufacturer})</small></h3>
            
             <h4 class='text-success'>Price: ${city.price}$</h4>
             <img class="img-thumbnail" src="${city.img}" >
             </div>
             
             
             `
  );
  console.log(html);
  matchList.innerHTML = html;
    }
}
