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
  fetchTasks();

  $( '#new-form' ).submit( function(event) {
    event.preventDefault();
    var textbox = $( '.new-todo' );
    var payload = {
      task: {
        title: textbox.val()
      }
    };

    $.post("/tasks", payload).success( function() {
      textbox.val('');
      fetchTasks();
    });
  });

  function taskHtml(task) {
    var checkedStatus = task.done ? "checked " : "";
    var liClass = task.done ? "completed" : "";
    var liElement = '<li id="listItem-' + task.id + '" class="' + liClass +
      '"><div class="view"><input class="toggle" type="checkbox" data-id="' +
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
    }).success( function(data) {
      var liHtml = taskHtml(data);
      var $li = $( "#listItem-" + data.id );
      $li.replaceWith(liHtml);
      $( '.toggle' ).change(toggleTask);
    });
  }

  function fetchTasks() {
    $.get("/tasks").success( function( data ) {
      var html = '';

      $.each(data, function(index, task) {
        html += taskHtml(task);
      });

      $( '.todo-list' ).html(html);
      $( '.toggle' ).change(toggleTask);
    });
  }
});
