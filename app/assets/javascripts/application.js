// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery2
//= require jquery_ujs
//= require tether
//= require bootstrap-sprockets
//= require react
//= require react_ujs
//= require jquery.slick
//= require bootstrap-datepicker
//= require_tree .
//= require main

$(document).on('page:load ready', function () {
  $('body').on('click', '#search-table-campaigns .table th a, #search-table-campaigns .pagination a', function () {
    jQuery.ajaxSetup({cache: true});
    $.getScript(this.href);
    return false;
  });
  $('body').on('click', '#search-table-events .table th a, #search-table-events .pagination a', function () {
    jQuery.ajaxSetup({cache: true});
    $.getScript(this.href);
    return false;
  });
  $('body').on('click', '#search-table-tasks .table th a, #search-table-tasks .pagination a', function () {
    jQuery.ajaxSetup({cache: true});
    $.getScript(this.href);
    return false;
  });

  $('#search-form-campaigns input').keyup(function () {
    $.get($('#search-form-campaigns').attr('action'), $('#search-form-campaigns').serialize(), null, 'script');
    return false;
  });
  $('#search-form-events input').keyup(function () {
    $.get($('#search-form-events').attr('action'), $('#search-form-events').serialize(), null, 'script');
    return false;
  });
  $('#search-form-tasks input').keyup(function () {
    $.get($('#search-form-tasks').attr('action'), $('#search-form-tasks').serialize(), null, 'script');
    return false;
  });

  $(function() {
     $('a[href*="#"]:not([href="#"])').click(function() {
       if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
         if (target.length) {
           $('html, body').animate({
             scrollTop: target.offset().top
           }, 500);
           return false;
         }
       }
     });
   });
   
});

$(document).ready(function(){

  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('-is-active');
    $('.tabs-panel').removeClass('-is-active');

    $(this).addClass('-is-active');
    $("#"+tab_id).addClass('-is-active');
  })
});
