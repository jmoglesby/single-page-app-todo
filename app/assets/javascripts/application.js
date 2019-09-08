// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$( function() {
  function taskHtml(task) {
    var checkedStatus = task.done ? "checked " : "";
    var liElement = '<li><div class="view"><input class="toggle" type="checkbox" data-id="' +
      task.id + '" ' +
      checkedStatus +
      '><label>' +
      task.title +
      '</label></div></li>';

    return liElement;
  }

  function toggleTask(e) {
    var itemId = $(e.target).data("id");
    var doneValue = Boolean($(e.target).is(':checked'));

    $.post("/tasks/" + itemId, {
      _method: "PUT",
      task: {
        done: doneValue
      }
    });
  }

  $.get("/tasks").success( function( data ) {
    $.each(data, function(index, task) {
      $( '.todo-list' ).append(taskHtml(task));
    });

    $( '.toggle' ).change(toggleTask);
  });
});
