angular.module('app').value('eToastr', toastr);

angular.module('app').factory('eNotifier', function(eToastr) {
  return {
    notify: function(msg) {
      eToastr.success(msg);
      console.log(msg);
    },
    error: function(msg) {
      eToastr.error(msg);
      console.log(msg);
    }
  };
});
