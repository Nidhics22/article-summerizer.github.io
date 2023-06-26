function validateURL() {
    var urlInput = document.getElementById("urlInput");
    var errorMessage = document.getElementById("errorMessage");
    var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlPattern.test(urlInput.value)) {
        errorMessage.textContent = "Invalid URL";
        urlInput.classList.add("error");
    } else {

        var requestData = {
            url: urlInput.value,
            min_length: 100,
            max_length: 300,
            is_detailed: false
          };


        fetch('https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '9b875896afmsha03b728207e5998p15aa49jsn1dee6ca1a06e',
                    'X-RapidAPI-Host': 'tldrthis.p.rapidapi.com'
                },
                body: JSON.stringify(requestData)
            }).then(response => response.json())
            .then(data => {
                // Display the response data
                errorMessage.textContent = data.summary;
            }).catch(error => {
                console.error('Error:', error);
                errorMessage.textContent = "An error occurred while fetching the summary.";
            });
    }
}