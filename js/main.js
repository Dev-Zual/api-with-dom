const fetchAllData = async (search, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${search}`
  );
  const data = await res.json();

  displayPhones(data.data, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  // show if no data
  if (phones.length === 0) {
    my_modal_1.showModal();
    handleLoading(false);
    return;
  }
  // show all btn
  const showAllBtn = document.getElementById("show-all");
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  // if more 12 data show only 12 data if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card bg-base-100  shadow-xl">
  <figure>
    <img
      src="${phone.image}"/>
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button onclick="handleDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
        `;
    phoneContainer.appendChild(div);
  });
  handleLoading(false);
};

const handleSearch = (isShowAll) => {
  handleLoading(true);
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;

  fetchAllData(searchText, isShowAll);
};

const handleLoading = (isLoading) => {
  const loading = document.getElementById("loading");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else loading.classList.add("hidden");
};

const handleShowAll = () => {
  handleSearch(true);
};

const handleDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data.data);
  const details = data.data;
  const sensors = details?.mainFeatures?.sensors;
  const sensorHtml = sensors
    .map((sensor) => `<span>${sensor}</span>`)
    .join(", ");
  const showDetails = document.getElementById("show_details");
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
        <div class="modal-box">
        <img src="${details.image}" />
          <h3 class="text-lg font-bold">${details.name}</h3>
          <h4 class="text-l font-bold">Brand: ${details.brand}</h4>
          <p class="py-1">Release Date: ${details.releaseDate}</p>
          <h3 class="text-lg font-bold">More Information</h3>
          <p class=""><span class="font-bold">Chipset</span> : ${details.mainFeatures.chipSet}</p>
          <p class=""><span class="font-bold">Display Size</span> : ${details.mainFeatures.displaySize}</p>
          <p class=""><span class="font-bold">Memory</span> : ${details.mainFeatures.memory}</p>
          <p class=""><span class="font-bold">Storage</span> : ${details.mainFeatures.storage}</p>
          <p id="show-sensor" class=""><span class="font-bold">Sensors :</span>
           ${sensorHtml}
          </p>
          <h3 class="text-lg font-bold">Others</h3>
          <p class=""><span class="font-bold">Bluetooth</span> : ${details.others.Bluetooth}</p>
          <p class=""><span class="font-bold">GPS</span> : ${details.others.GPS}</p>
          <p class=""><span class="font-bold">NFC</span> : ${details.others.NFC}</p>
          <p class=""><span class="font-bold">Radio</span> : ${details.others.Radio}</p>
          <p class=""><span class="font-bold">USB</span> : ${details.others.USB}</p>
          <p class=""><span class="font-bold">WLAN</span> : ${details.others.WLAN}</p>
        
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
  `;
  showDetails.appendChild(detailsContainer);
  show_details.showModal();
};
