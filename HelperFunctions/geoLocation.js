export default (setLocation) => {
    var options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
    };

    function success(pos) {
        var crd = pos.coords;
        setLocation([crd.latitude, crd.longitude])
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }


    navigator.geolocation.getCurrentPosition(success, error, options);
}