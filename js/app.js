// Coordinates of all the tiles
coordinates = [[529.5, 0.5], [583.5, 26.5], [649.5, 24.5], [703.5, 92.5], [757.5, 134.5], [703.5, 161.5], [649.5, 188.5], [703.5, 215.5], [757.5, 215.5], [732.5, 269.5], [798.5, 269.5], [811.5, 323.5], [865.5, 348.5], [919.5, 375.5], [865.5, 282.5], [678.5, 338.5], [678.5, 392.5], [732.5, 377.5], [678.5, 284.5], [624.5, 309.5], [811.5, 215.5], [825.5, 161.5], [879.5, 201.5], [919.5, 267.5], [825.5, 92.5], [879.5, 107.5], [649.5, 105.5], [703.5, 24.5], [757.5, 0.5], [811.5, 26.5], [865.5, 26.5], [919.5, 26.5], [516.5, 119.5], [570.5, 146.5], [568.5, 254.5], [543.5, 308.5], [529.5, 362.5], [54.5, 0.5], [54.5, 54.5], [54.5, 108.5], [0.5, 81.5], [0.5, 216.5], [108.5, 189.5], [175.5, 12.5], [175.5, 81.5], [256.5, 80.5], [189.5, 149.5], [177.5, 203.5], [270.5, 216.5], [216.5, 270.5], [324.5, 270.5], [378.5, 270.5], [162.5, 270.5], [243.5, 162.5], [270.5, 270.5], [270.5, 324.5], [270.5, 378.5], [324.5, 378.5], [378.5, 392.5], [378.5, 338.5], [216.5, 378.5], [162.5, 338.5], [162.5, 392.5], [297.5, 162.5], [378.5, 66.5], [351.5, 162.5], [229.5, 12.5], [283.5, 0.5], [337.5, 0.5], [391.5, 0.5], [108.5, 81.5], [54.5, 162.5], [54.5, 216.5], [54.5, 270.5], [54.5, 324.5], [54.5, 378.5], [0.5, 378.5]];
pixels_per_year = 180;
pixels_per_month = 15;
albums_by_time = [53, 72, 67, 70, 4, 73, 60, 37, 24, 22, 2, 27, 26, 14, 31, 11, 57, 47, 23, 13, 3, 17, 34, 8, 30, 54, 52, 76, 10, 6, 5, 48, 68, 35, 1, 44, 36, 50, 0, 18, 65, 41, 20, 66, 64, 55, 16, 38, 71, 15, 63, 12, 39, 46, 25, 69, 74, 61, 62, 75, 51, 59, 32, 56, 40, 43, 42, 33, 29, 21, 45, 28, 49, 9, 7, 19, 58];

// position tiles and images on the page
for(i = 0; i < coordinates.length; i ++){
  style = {
    'top': coordinates[i][1] + 'px',
    'left': coordinates[i][0] + 'px'
  };

  shadow = $('<div/>', {
    'class': 'shadow',
  }).css(style).appendTo('.container');

  // let albums fade in with [3, 5)s delays.
  style['-webkit-animation-delay'] = (3 + 5*Math.random()) + 's';

  rect = $('<div/>', {
    'class': 'rect',
    'id': 'album' + (i+1),
  }).css(style).appendTo('.container');
  
  // when albums have shown, remove all the shadows.
  window.setTimeout(function(){
    $('.shadow').remove();
  }, 10000);

  flipper = $('<div/>', {
    'class': 'flipper'
  }).appendTo(rect);

  front = $('<div/>', {
    'class': 'front'
  }).appendTo(flipper);

  back = $('<div/>', {
    'class': 'back'
  }).appendTo(flipper);

  $('<img/>', {
    'src': 'images/' + (i+1) + 'a.png',
    'width': '54px',
  }).appendTo(front);

  if(i < 10){
    image = (i + 1) + 'b.jpg';
  }
  else{
    image = '8b.jpg';
  }

  $('<img/>', {
    'src': 'images/'+image,
    'width': '54px',
  }).appendTo(back);

  // constructing timeline
  if(i < details.length){
    year = details[i].year - 2008;
    month = details[i].month;

    pixels = year*pixels_per_year + month*pixels_per_month - 10;
    dot = $('<div/>', {
      'class': 'dot',
      'id': 'dot'+ (i+1),
      'data-id': (i+1),
    }).css({
      'left': pixels + 'px',
    }).appendTo('.timeline');

    $('<div/>', {
      'class': 'date',
      'id': 'date'+ (i+1),
    }).css({
      'left': (pixels - 30) + 'px',
    }).text(details[i].time).appendTo('.timeline');

    dot.mouseenter(function(){
      id = $(this).data('id');
      $('#album'+id).css('z-index', 200);
      $('#album'+id+' .front').addClass('zoom');
      $('#album'+id+' .back').addClass('zoom');
      $('#date'+id).fadeIn(300);

      if($('.container').hasClass('stack')){
        id_num = parseInt(id);
        left = $('#album'+id).css('left');
        $('.container .date').css('left', left);
        $('.container .date').text('Released in '+details[id_num - 1].album_time);
        $('.container .date').fadeIn(300);
      }
    });

    dot.mouseout(function(){
      id = $(this).data('id');
      
      if($('.container').hasClass('stack')){
        $('#album'+id).css('z-index', albums_by_time.indexOf(parseInt(id) - 1) + 2);
      }else{
        $('#album'+id).css('z-index', 0);
      }
      $('#album'+id+' .front').removeClass('zoom');
      $('#album'+id+' .back').removeClass('zoom');
      $('#date'+id).fadeOut(300);
      if($('.container').hasClass('stack')){
        $('.container .date').fadeOut(300);
      }
    });
  }
}

$('.rect').click(function(){
  $('.caption').css('opacity', 0.3);

  id = $(this).attr('id').substring(5);

  $('#dot'+id).css('z-index', '10');
  $('#dot'+id).css('background-color', '#e74c3c');
  $('#dot'+id).css('opacity', '0.8');
  $('#date'+id).fadeIn(300);

  show = $('<div/>', {
    'class': 'show'
  }).appendTo('body');

  show_album = $('<img/>', {
    'class': 'show-album',
    'src': 'images/'+ id + 'a.png',
  }).appendTo(show);

  show_text = $('<div/>', {
    'class': 'show-text',
  }).appendTo(show);

  int_id = parseInt(id);

  if(int_id < 10){
    image = int_id + 'b.jpg';
  }
  else{
    image = '8b.jpg';
  }

  show_me = $('<img/>', {
    'class': 'show-me',
    'src': 'images/'+ image,
  }).appendTo(show);

  close = $('<div/>', {
    'class': 'close control'
  }).text('X').appendTo(show);

  music = $('<div/>', {
    'class': 'music control'
  }).text('Music').appendTo(show);

  me = $('<div/>', {
    'class': 'me control'
  }).text('Me').appendTo(show);

  close.click(function(){
    $('.show').fadeOut(500, function(){
      $(this).remove();
    });
    $('.caption').css('opacity', 0.7);
    $('#dot'+id).css('background-color', '#2ecc71');
    $('#date'+id).fadeOut(300);
    $('#dot'+id).css('opacity', '0.6');
  });

  music.click(function(){
    $('.show-me').animate({opacity: 0}, 1000);
    $('.mine').animate({opacity: 0}, 1000);
  });

  me.click(function(){
    $('.show-me').animate({opacity: 1}, 1000);
    $('.mine').animate({opacity: 1}, 1000);
  });

  detail = details[int_id - 1];

  album_info = $('<div/>', {
    'class': 'album-info'
  }).appendTo(show_text);

  $('<h4/>', {
    'class': 'album-title'
  }).text(detail.album_title).appendTo(album_info);

  $('<h6/>', {
    'class': 'artist'
  }).text(detail.artist).appendTo(album_info);

  mine = $('<div/>', {
    'class': 'mine',
  }).appendTo(show_text);

  $('<span/>', {
    'class': 'location',
  }).text('@ '+detail.location).appendTo(mine);

  $('<p/>', {
    'class': 'text',
  }).text(detail.text).appendTo(mine);
});

$('#character').click(function(){
  if($('.container').hasClass('character')){
    return;
  }

  else if($('.container').hasClass('stack')){
    $('.container').addClass('character');
    $('.container').removeClass('stack');
    to_character();
  }
});

$('#stack').click(function(){
  if($('.container').hasClass('stack')){
    return;
  }

  else if($('.container').hasClass('character')){
    $('.container').addClass('stack');
    $('.container').removeClass('character');
    to_stack();
  }
});

function to_stack(){
  for(i = 0; i < coordinates.length; i ++){
    index = albums_by_time.indexOf(i);
    $('#album'+(i+1)).animate({
      'top': '200px',
      'left':  - 20 + (index*13) + 'px',
      'z-index': (index + 2),
    }, 1000);
  }
}

function to_character(){
  for(i = 0; i < coordinates.length; i ++){
    $('#album'+(i+1)).animate({
      'top': coordinates[i][1] + 'px',
      'left': coordinates[i][0] + 'px',
      'z-index': 3,
    }, 1000);
  }
}

function sort(){
  ids_by_time = [];
  for(i = 0; i < details.length; i ++){
    console.log(i);
    time_s = details[i].album_time.replace( /^\D+/g, '');
    year = parseInt(time_s);
    ids_by_time.push({
      'id': i,
      'year': year,
    });
  }

  function compare(a, b){
    if (a.year < b.year)
      return -1;
    if (a.year > b.year)
      return 1;
    return 0;
  }

  ids_by_time.sort(compare);

  ids = [];
  for(i = 0; i < ids_by_time.length; i ++){
    ids.push(ids_by_time[i].id);
  }

  console.log(ids);
}

$(document).foundation();
