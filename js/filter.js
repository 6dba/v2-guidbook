var filterTable = function (HTMLTBodyRef, aFilters) {
    console.log(HTMLTBodyRef);
    var rows = HTMLTBodyRef.getElementsByTagName("tr"),
        filters = {}, n,
        walkThrough = function (rows) {
            var tr, i, f;
            for (i = 0; i < rows.length; i += 1) {
                tr = rows.item(i);
                for(f in filters) {
                    if (filters.hasOwnProperty(f)) {
                        if (false === filters[f].validate(tr.children[f].innerText)) {
                            tr.style.display = "none"; break;
                        } else {
                            tr.style.display = "";
                        }
                    }
                }
            }
        };
    for(n in aFilters) {
        if (aFilters.hasOwnProperty(n)) {
            if (aFilters[n] instanceof filterTable.Filter) {
                filters[n] = aFilters[n];
            } else {
                filters[n] = new filterTable.Filter(aFilters[n]);
            }
        }
    }
}

filterTable.Filter = function (HTMLElementRef, callback, eventName) {
    if (!(this instanceof arguments.callee)) {
        return new arguments.callee(HTMLElementRef, callback, eventName);
    }
    
    this.filters = {}.toString.call(HTMLElementRef) == "[object Array]" ? HTMLElementRef : [HTMLElementRef];
};