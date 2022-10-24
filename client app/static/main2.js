var modal = document.getElementById("myModal"),
    modal_title = document.getElementById("modal_title"),
    table_body = document.getElementById("table_body"),
    footer_button = document.getElementById("footer_button"),
    dd_best_practice = document.getElementById("best_practice"),
    dd_recommendation = document.getElementById("recommendation"),
    dd_criteria = document.getElementById("criteria"),
    submit_button = document.getElementById("submit_button"),
    cart_button = document.getElementById("cart_button"),
    cart_count = cart_button.getAttribute("cart_count"),
    close_button = document.getElementById("close"),
    div_message = document.getElementById("message"),
    file_download_url = "/download_result";
cart_button.value = "Check Cart (" + cart_count + ")";
const xhttp = new XMLHttpRequest;

function showResult() {
    table_body.innerHTML = "\n        <tr>\n            <td>Best Practice</td>\n            <td>Recommendation</td>\n            <td>Criteria</td>\n            <td>Life Cycle Stage</td>\n            <td>X Indicators</td>\n            <td>Y Indicators</td>\n            <td>Indicators</td>\n        </tr>\n    ", xhttp.onload = function() {
        if (response = JSON.parse(this.responseText), console.log(response), response.status) {
            data = response.data;
            for (let t = 0; t < data.length; t++) single_data = data[t], table_body.innerHTML += "\n                    <tr>\n                        <td>" + single_data.family + "</td>\n                        <td>" + single_data.recommendation + "</td>\n                        <td>" + single_data.criteria + "</td>\n                        <td>" + single_data.life_cycle_stage + "</td>\n                        <td>" + single_data.x_indicators + "</td>\n                        <td>" + single_data.y_indicators + "</td>\n                        <td>" + single_data.indicators + "</td>\n                    </tr>\n                "
        } else table_body.innerHTML += '\n                <tr>\n                    <td colspan=6 style="text-align: center">Something wrong. Please try again.</td>\n                </tr>\n            '
    }, xhttp.open("GET", "/api/get_result", !0), xhttp.send(), modal_title.textContent = "Final Result", footer_button.classList.remove("view_result_button"), footer_button.classList.add("download_result_button"), footer_button.value = "Download Result"
}

function downloadResult() {
    window.open(file_download_url, "_blank", "noopener")
}
dd_best_practice.addEventListener("change", function() {
    var t = this.value;
    dd_recommendation.innerHTML = '<option value="" selected disabled>Select a Recommendation</option>', dd_criteria.innerHTML = '<option value="" selected disabled>Select a Criteria</option>', xhttp.onload = function() {
        var t = JSON.parse(this.responseText);
        if (t.status) {
            var e = t.id,
                n = t.recommendations;
            for (let t = 0; t < n.length; t++) dd_recommendation.innerHTML += '<option value="' + e[t] + '">' + n[t] + "</option>"
        } else div_message.innerHTML = '<font color="#FF0000">Something wrong. Please try again</font>', div_message.style.display = "block"
    }, xhttp.open("GET", "/api/get_data?family=" + t, !0), xhttp.send()
}), dd_recommendation.addEventListener("change", function() {
    var t = dd_best_practice.value,
        e = this.value;
    dd_criteria.innerHTML = '<option value="" selected disabled>Select a Criteria</option>', xhttp.onload = function() {
        var t = JSON.parse(this.responseText);
        if (t.status) {
            var e = t.sub_id,
                n = t.criterias;
            for (let t = 0; t < n.length; t++) dd_criteria.innerHTML += '<option value="' + e[t] + '">' + n[t] + "</option>"
        } else div_message.innerHTML = '<font color="#FF0000">Something wrong. Please try again</font>', div_message.style.display = "block"
    }, xhttp.open("GET", "/api/get_data?family=" + t + "&id=" + e, !0), xhttp.send()
}), submit_button.addEventListener("click", function() {
    var t = dd_best_practice.value,
        e = dd_recommendation.value,
        n = dd_criteria.value;
    if ("" == t) div_message.innerHTML = '<font color="#FF0000">Plase select a Best Practice</font>', div_message.style.display = "block";
    else if ("" == e) div_message.innerHTML = '<font color="#FF0000">Plase select a Recommendation</font>', div_message.style.display = "block";
    else if ("" == n) div_message.innerHTML = '<font color="#FF0000">Plase select a Criteria</font>', div_message.style.display = "block";
    else {
        xhttp.onload = function() {
            JSON.parse(this.responseText).status ? (cart_count++, cart_button.setAttribute("cart_count", cart_count), cart_button.value = "Check Cart (" + cart_count + ")", div_message.innerHTML = '<font color="#00FF00">Successfully added to cart</font>', div_message.style.display = "block") : (div_message.innerHTML = '<font color="#FF0000">This item is already in Developement Cart</font>', div_message.style.display = "block")
        };
        var o = "family=" + t + "&id=" + e + "&sub_id=" + n;
        xhttp.open("POST", "/api/add_to_cart", !0), xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), xhttp.send(o)
    }
}), cart_button.addEventListener("click", function() {
    table_body.innerHTML = "\n        <tr>\n            <td>Best Practice</td>\n            <td>Recommendation</td>\n            <td>Criteria</td>\n        </tr>\n    ", xhttp.onload = function() {
        var t = JSON.parse(this.responseText);
        if (t.status) {
            data = t.data;
            for (let t = 0; t < data.length; t++) single_data = data[t], table_body.innerHTML += "\n                    <tr>\n                        <td>" + single_data.family + "</td>\n                        <td>" + single_data.recommendation + "</td>\n                        <td>" + single_data.criteria + "</td>\n                    </tr>\n                ";
            modal_title.textContent = "Development Cart (" + cart_count + ")", footer_button.classList.remove("download_result_button"), footer_button.classList.add("view_result_button"), footer_button.value = "View Result", modal.style.display = "block"
        } else div_message.innerHTML = '<font color="#FF0000">Something wrong. Please try again</font>', div_message.style.display = "block"
    }, xhttp.open("GET", "/api/get_cart_items", !0), xhttp.send()
}), close_button.addEventListener("click", function() {
    modal.style.display = "none", footer_button.classList.remove("download_result_button"), footer_button.classList.remove("view_result_button")
}), footer_button.addEventListener("click", function() {
    footer_button.classList.contains("view_result_button") ? showResult() : footer_button.classList.contains("download_result_button") && downloadResult()
});