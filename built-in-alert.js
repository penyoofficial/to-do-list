function biAlert(msg, containner) {
    if (!msg)
        return false;
    if (!containner)
        containner = document.body;
    const id = Math.random();
    containner.innerHTML += `
        <div class="built-in-alert" id="`+ id + `" style="--text-length: ` + msg.length + `em">` + msg + `</div>
    `;
    setTimeout(function () {
        document.getElementById(id).style.cssText += `
            animation: built-in-alert-hide 1s;
        `;
        setTimeout(function () {
            document.getElementById(id).remove();
        }, 990);
    }, 3990);
    return true;
}