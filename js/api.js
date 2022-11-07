function request(url, requestData) {
    let data = {
        url: url
    }

    if (requestData) {
        data["data"] = requestData;
    }

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '../php/api.php',
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function (response) {
                return resolve(response);
            },
            error: function (jqxhr, status, errorMsg) {
                return reject(errorMsg, status);
            }
        });
    });
}

function get(url) {
    return request(url);
}

function post(url, data) {
    return request(url, data);
}

function cache(type, page, url) {
    if (!url) url = "";
    data = {
        type: type,
        page: page
    };
    if (type == 'tree')
        data["path"] = url;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '../php/get_cache.php',
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function (response) {
                return resolve(response);
            },
            error: function (jqxhr, status, errorMsg) {
                return reject(errorMsg, status);
            }
        });
    });
}

async function getAll(page) {
    return await cache('table', page).then(all => all).catch(reject => reject);
}

function postEnterprise() {
    let data = {
        id: findID(ttl_el),
        name: arg_1.value.trim().replace(/(<([^>]+)>)/ig, ''),
        fullname: arg_2.value.trim().replace(/(<([^>]+)>)/ig, '')
    };
    data['holding'] = arg_3.options[arg_3.selectedIndex].value;
    data['type'] = arg_4.options[arg_4.selectedIndex].value;
    data['director'] = $('#arg_5').val().join(' ');
    if (arg_6.checked) data['isContractor'] = true;
    else data["isContractor"] = false;
    data["sklad"] = arg_7.value.trim().replace(/(<([^>]+)>)/ig, '');

    return post('http://81.161.220.59:8100/api/enterprise/?action=setVariables&request=developer', data);
}

function postDivision() {
    let data = {
        id: findID(ttl_el),
        name: arg_8.value.trim().replace(/(<([^>]+)>)/ig, ''),
        fullname: arg_9.value.trim().replace(/(<([^>]+)>)/ig, '')
    };
    data['enterprise'] = arg_10.options[arg_10.selectedIndex].value;
    data['type'] = arg_11.options[arg_11.selectedIndex].value;
    data['shift'] = $('#handle').val();
    data['chief'] = $('#arg_13').val().join(' ');
    data['adjanced'] = arg_14.options[arg_14.selectedIndex].value;
    if (arg_15.checked) data['isOpo'] = true;
    else data["isOpo"] = false;
    if (arg_16.checked) data['is_order_visible'] = true;
    else data["is_order_visible"] = false;

    return post('http://81.161.220.59:8100/api/division/?action=setVariables&request=developer', data);
}
