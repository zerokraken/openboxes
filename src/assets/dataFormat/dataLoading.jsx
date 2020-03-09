function loadColors(data, id) {
    var datasets = data['datasets'][0];
    var datasets1 = data['datasets'][1];
    var datasets2 = data['datasets'][2];
    var datasets3 = data['datasets'][3];

    if (id === 0) {
        datasets['borderColor'] = "#2e5685";
        datasets['pointBorderColor'] = "#2e5685";
        datasets['pointBackgroundColor'] = "#2e5685";
        datasets['pointHoverBackgroundColor'] = "#fff";
        datasets['pointHoverBorderColor'] = "#2e5685";
        datasets['pointHoverBorderWidth'] = 2;
        datasets['pointBorderWidth'] = 0;
        datasets['lineTension'] = 0;
    } else if (id === 1) {
        datasets['borderColor'] = "#fcc169";
        datasets['pointBorderColor'] = "#fcc169";
        datasets['pointBackgroundColor'] = "#fcc169";
        datasets['pointHoverBackgroundColor'] = "#fff";
        datasets['pointHoverBorderColor'] = "#fcc169";
        datasets['pointHoverBorderWidth'] = 1;
        datasets['pointBorderWidth'] = 0;
        datasets['lineTension'] = 0.4;
        datasets['pointRadius'] = 3;

        datasets1['borderColor'] = "#ee4540";
        datasets1['pointBorderColor'] = "#ee4540";
        datasets1['pointBorderWidth'] = 0;
        datasets1['pointBackgroundColor'] = "#ee4540";;
        datasets1['pointHoverBackgroundColor'] = "#ee4540";;
        datasets1['pointHoverBorderColor'] = "#ee4540";;
        datasets1['pointHoverBorderWidth'] = 0;
        datasets1['pointRadius'] = 1;
        datasets1['pointHoverRadius'] = 1;
        datasets1['lineTension'] = 0;
        data['datasets'][1] = datasets1;

        datasets2['backgroundColor'] = "#6fb98f";
        datasets2['hoverBackgroundColor'] = "#6fb98f";
        data['datasets'][2] = datasets2;

        datasets3['backgroundColor'] = "#004445";
        data['datasets'][3] = datasets3;
    } else if (id === 2) {
        datasets['backgroundColor'] = ["#2c7873", "#52de97", "#a7e9af", "#ff0000", "#e89da2"];
    } else if (id === 3) {
        datasets['backgroundColor'] = "#444444"

        if (datasets1) {
            datasets1['backgroundColor'] = "#cf455c";
            datasets1['hoverBackgroundColor'] = "#cf455c";
            data['datasets'][1] = datasets1;
        }
        if (datasets2) {
            datasets2['backgroundColor'] = "#e89da2";
            data['datasets'][2] = datasets2;
        }
        if (datasets3) {
            datasets3['backgroundColor'] = "#e0b623";
            data['datasets'][3] = datasets3;
        }

    } else if (id === 4) {
        datasets['backgroundColor'] = "#2c7873"

        if (datasets1) {
            datasets1['backgroundColor'] = "#52de97";
            datasets1['hoverBackgroundColor'] = "#52de97";
            data['datasets'][1] = datasets1;
        }
        if (datasets2) {
            datasets2['backgroundColor'] = "#c0ffb3";
            data['datasets'][2] = datasets2;
        }
        if (datasets3) {
            datasets3['backgroundColor'] = "#ffba5a";
            data['datasets'][3] = datasets3;
        }
    }

    data['datasets'][0] = datasets;
    return data['datasets'];
}

export { loadColors }; 