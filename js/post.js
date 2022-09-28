function postEnterprise() {
    let id = '';
    ttl_el.classList.forEach(
        function (a) {
            if (/id/.test(a)) id = a.substring(2);
        });
    let data = {
        id: id,
        name: arg_1.value,
        fullname: arg_2.value
    };
    data['holding'] = arg_3.options[arg_3.selectedIndex].value;
    data['type'] = arg_4.options[arg_4.selectedIndex].value;
    data['director'] = arg_5.options[arg_5.selectedIndex].value;
    if (arg_6.checked) data['isContractor'] = 'Y';
    else data["isContractor"] = '';
    data["sklad"] = arg_7.value;

    post('http://81.161.220.59:8100/api/enterprise/?action=setVariables&request=developer', data);
}

function postDivision() {
    let id;
    ttl_el.classList.forEach(
        function (a) {
            if (/id/.test(a)) id = a.substring(2);
        });
    let data = {
        id: id,
        name: arg_8.value,
        fullname: arg_9.value
    };
    data['enterprise'] = arg_10.options[arg_10.selectedIndex].value;
    data['type'] = arg_11.options[arg_11.selectedIndex].value;
    data['shift'] = arg_12.options[arg_12.selectedIndex].value;
    data['chief'] = arg_13.options[arg_13.selectedIndex].value;
    data['adjanced'] = arg_14.options[arg_14.selectedIndex].value;
    if (arg_15.checked) data['isOpo'] = 'Y';
    else data["isOpo"] = '';
    if (arg_16.checked) data['is_order_visible'] = 'Y';
    else data["is_order_visible"] = '';

    //post('http://81.161.220.59:8100/api/division/?action=setVariables&request=developer', data);
}
