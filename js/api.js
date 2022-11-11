function request(url, requestData) {
    let data = {
        url: url
    }

    if (requestData) {
        data.data = requestData;
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
    if (!url) url = '';

    data = {
        type: type,
        page: page
    };

    if (type == 'tree') data.path = url;

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

function postObject(typeObject) {
    let data = {
        id: findID(ttl_el)
    };
    Array.from(document.getElementsByClassName('data')).forEach((element) => {
        if (!element.id)
            return;
        if (element.type == 'checkbox') {
            data[element.id] = element.checked;
            return;
        }
        if (element.tagName.toLowerCase() == 'input' || element.tagName.toLowerCase() == 'textarea') {
            data[element.id] = element.value.trim().replace(/(<([^>]+)>)/ig, '');
            return;
        }
        if (element.id == 'director' || element.id == 'chief') {
            data[element.id] = $(`#${element.id}`).val() ? $(`#${element.id}`).val().join(' ') : '';
            return;
        }
        if (element.tagName.toLowerCase() == 'select') {
            data[element.id] = element.options[element.selectedIndex].value;
            return;
        }
        if (element.tagName.toLowerCase() == 'div') {
            data[element.id] = $(`${element.id}`).val();
            return;
        }
    })
    return post(URLS.setObjectValues.replace('{objName}', typeObject), data);
}

