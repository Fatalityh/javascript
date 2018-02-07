// editFrontEndViaREST

(function($) {

  console.log('Hello I am serving you');
  // Root till rest
  // id till posten
  // nance

  // Här lägger infon i consolen (alltså id osv)
  console.log('WPsettings.root ', WPsettings.root);
  console.log('WPsettings.nonce ', WPsettings.nonce);
  console.log('WPsettings.current_ID ', WPsettings.current_ID);

  var $entryTitle = $('.entry-title');

// Här lägger jag in redigerar-knappen så att den visas inuti posts
  $entryTitle.after('<button class="edit-button edit-title"> Redigera Rubriken </button><button class="edit-title save" style="display:none">Spara rubriken</button>');
// Detta kommer köras när man har skrivit in nya titeln på input id="title-input"
  function runAjax(newTitle) {
    $.ajax({
      url: WPsettings.root + 'wp/v2/posts/' + WPsettings.current_ID, // URL till att hitta posten genom current_ID
      method: 'POST',
      beforeSend: function(xhr) {
xhr.setRequestHeader('X-WP-Nonce', WPsettings.nonce);
},
      data: {
        'title': newTitle
      }
    })
  }
  $('.edit-title.edit-button').on('click', function() { // On click på edit title knappen
    var $originalTitle = $('.entry-title').text(); // Sparar original titeln från posten i en variabel "$originalTitle"
    $entryTitle.toggle();
    $entryTitle.after('<input id="title-input" type="text">'); // Visar en input text så att man skriva och ersätta $originalTitle mot newTitle
    $('#title-input').val($originalTitle);
    $(this).toggle();
    $('.edit-title.save').toggle();
  });
  $('.save').on('click', function() {
    var newTitle = $('#title-input').val(); // Sparar värdet av #title-input i variabeln newTitle
    $entryTitle.text(newTitle);
    $entryTitle.toggle();
    $('#title-input').toggle();
    $('.edit-title.edit-button').toggle();
    $(this).toggle();
    runAjax(newTitle);
  });
})(jQuery)
