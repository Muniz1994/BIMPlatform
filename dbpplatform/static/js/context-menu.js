// https://bbbootstrap.com/snippets/simple-context-menu-42706253
(function($) {
    'use strict';
    $.contextMenu({
      selector: '#viewer-container',
      callback: function(key, options) {},
      items: {
        "info": {
          name: "Info",
          icon: "fas fa-info-circle"
         
        },
        "cut": {
          name: "Cut",
          icon: "cut",
          callback: function(){
            console.log('Hey!')
          }
        },
        copy: {
          name: "Copy",
          icon: "copy"
        },
        "paste": {
          name: "Paste",
          icon: "paste"
        },
        "delete": {
          name: "Delete",
          icon: "delete"
        },
        "sep1": "---------",
        "quit": {
          name: "Quit",
          icon: function() {
            return 'context-menu-icon context-menu-icon-quit';
          }
        }
      }
    });
    
  })(jQuery);
      