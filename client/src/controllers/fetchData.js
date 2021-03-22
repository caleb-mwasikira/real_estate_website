

function fetchApartmentData() {
    return fetch("data/apartment_data.json")
        .then((res) => {
            return res.json();
        });
}

export default fetchApartmentData;