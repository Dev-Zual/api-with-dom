const fetchAllData = async (search) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${search}`
  );
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  // show all btn
  const showAllBtn = document.getElementById("show-all");
  if (phones.length > 12) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  // if more 12 data show only 12 data
  phones = phones.slice(0, 12);

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
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        `;
    phoneContainer.appendChild(div);
  });
  handleLoading(false);
};

const handleSearch = () => {
  handleLoading(true);
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;

  fetchAllData(searchText);
};

const handleLoading = (isLoading) => {
  const loading = document.getElementById("loading");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else loading.classList.add("hidden");
};
