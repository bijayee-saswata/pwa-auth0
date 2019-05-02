(function() {
  "use strict";

  var app = {
    spinner: document.querySelector(".loader")
  };

  var container = document.querySelector(".container");
  // Refresh data
  document.getElementById("butRefresh").addEventListener("click", function() {
    // Get fresh, updated data from GitHub whenever you are clicked
    if (navigator.onLine) {
      toast("Fetching latest data...");
      fetchCommits();
      console.log("Getting fresh data!!!");
    } else {
      toast("You are offline...");
    }
  });

  // Check that localStorage is both supported and available
  function storageAvailable(type) {
    try {
      var storage = window[type],
        x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Get Commit Data from Github API
  function fetchCommits() {
    var url = "https://api.github.com/repos/bijayee-saswata/pwa-auth0/commits";

    fetch(url)
      .then(function(fetchResponse) {
        return fetchResponse.json();
      })
      .then(function(datas) {
        localStorage.clear();
        localStorage.setItem("datas", JSON.stringify(datas));
        var res_data = datas;
        container.innerHTML = "";
        res_data.forEach(function(data) {
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
  // Get the commits Data from the Web Storage
  function fetchCommitsFromLocalStorage(datas) {
    var localData = JSON.parse(datas);

    app.spinner.setAttribute("hidden", true); //hide spinner

    localData.forEach(function(dataItem) {
      container.innerHTML += `<section class="card">
                                <div>
                                    <h4>Message: </h4>${dataItem.commit.message}
                                    <h4>Author: </h4>${
                                      dataItem.commit.author.name
                                    }
                                    <h4>Time: </h4>${
                                      dataItem.commit.author.date
                                    }<br>
                                    <a href="${
                                      dataItem.html_url
                                    }">Click To Visit</a>
                                </div>
                                </section>`;
    });
  }

  if (storageAvailable("localStorage")) {
    if (localStorage.getItem("datas") === null) {
      /* The user is using the app for the first time, or the user has not
       * saved any commit data, so show the user some fake data.
       */
      fetchCommits();
      console.log("Fetch from API");
    } else {
      fetchCommitsFromLocalStorage(localStorage.getItem("datas"));
      console.log("Fetch from Local Storage");
    }
  } else {
    toast("We can't cache your app data yet..");
  }
})();
