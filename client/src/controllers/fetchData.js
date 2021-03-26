

function fetchApartmentData() {
    return fetch("http://localhost:9000/apartments/")
        .then((res) => {
            return res.json();
        });
}

export default fetchApartmentData;