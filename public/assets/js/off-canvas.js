// (function($) {
//   'use strict';
//   $(function() {
//     $('[data-bs-toggle="offcanvas"]').on("click", function() {
//       $('.sidebar-offcanvas').toggleClass('active')
//     });
//   }); 
 
// })(jQuery);


(function() {
  'use strict';
  // Delegated click handler in vanilla JS so elements added by React are handled
  function toggleOffcanvas(e) {
    var trigger = e.target.closest('[data-bs-toggle="offcanvas"]');
    if (!trigger) return;
    var sidebar = document.querySelector('.sidebar-offcanvas');
    if (!sidebar) return;
    sidebar.classList.toggle('active');
  }

  document.addEventListener('click', toggleOffcanvas);
})();