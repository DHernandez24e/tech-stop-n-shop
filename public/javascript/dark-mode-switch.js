(function() {
  var darkSwitch = document.getElementById("darkSwitch");
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function(event) {
      resetTheme();
    });
    function initTheme() {
      var darkThemeSelected =
        localStorage.getItem("darkSwitch") !== null &&
        localStorage.getItem("darkSwitch") === "dark";
      darkSwitch.checked = darkThemeSelected;
      darkThemeSelected
        ? document.body.setAttribute("data-theme", "dark")
        : document.body.removeAttribute("data-theme");
    }
    function resetTheme() {
      if (darkSwitch.checked) {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("darkSwitch", "dark");
        
        fetch('/api/users/dm', {
          method: 'PUT',
          body: JSON.stringify({
            dark_mode: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // .then(res => {
        //   console.log(res);
        // })
      } else {
        document.body.removeAttribute("data-theme");
        localStorage.removeItem("darkSwitch");

        fetch('/api/users/dm', {
          method: 'PUT',
          body: JSON.stringify({
            dark_mode: false
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // .then(res => {
        //   console.log(res);
        // })
      }
    }
  }
})();
