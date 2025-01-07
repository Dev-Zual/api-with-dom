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
};

const handleSearch = () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;

  fetchAllData(searchText);
};
