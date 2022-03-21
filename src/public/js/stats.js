function fetchData() {
    fetch("https://api.statcord.com/v3/947154170060882010")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data.data[0].servers);
            document.querySelector(
                "#server-count"
            ).innerHTML = `<h4>${data.data[0].servers}`;
            // console.log(data.data[0].users);
            document.querySelector(
                "#user-count"
            ).innerHTML = `<h4>${data.data[0].users}`;
            // console.log(data.data[0].commands);
        })
        .catch((error) => {
            console.log(error);
        });
}
fetchData();