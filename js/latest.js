(function() {
  "use strict";

  var app = {
    spinner: document.querySelector(".loader")
  };

  var container = document.querySelector(".container");

  // Get Commit Data from Github API
  function fetchCommits() {
    var url = "https://api.github.com/repos/bijayee-saswata/pwa-auth0/commits";

    fetch(url)
      .then(function(fetchResponse) {
        return fetchResponse.json();
      })
      .then(function(datas) {
        console.log(datas);
        datas.forEach(function(data) {
          container.innerHTML += `<section class="card">
                                    <div>
                                        <h4>Message: </h4>${data.commit.message}
                                        <h4>Author: </h4>${
                                          data.commit.author.name
                                        }
                                        <h4>Time: </h4>${
                                          data.commit.author.date
                                        }<br>
                                        <a href="${
                                          data.html_url
                                        }">Click To Visit</a>
                                    </div>
                                    </section>`;
        });

        app.spinner.setAttribute("hidden", true); //hide spinner
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchCommits();
})();
