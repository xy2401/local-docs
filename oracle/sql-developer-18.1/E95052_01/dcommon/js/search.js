function checkText(clearable) {
  "use strict";
  if (clearable !== null) {
    if (clearable.value === 'Search products') { 
      //onLoadInfo();
      clearable.value = ''; 
      clearable.style.color = "black";
    } else {
      //aggregateSearchCriteria(null);
      //onLoadInfo();
    }
  }
}
function addText(clearable) {
  "use strict";
  if (clearable !== null) {
    if (clearable.value.length === 0 || clearable.value === '') {
      //onLoadInfo();
      clearable.className = clearable.className.replace("searchstart", "");
      clearable.value = 'Search products'; 
      clearable.style.color = "#999";
    } else {
      //aggregateSearchCriteria(null);
      //onLoadInfo();
    }
  }
}
