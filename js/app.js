// Coordinates of all the tiles
coordinates = [[529.5, 0.5], [583.5, 26.5], [649.5, 24.5], [703.5, 92.5], [757.5, 134.5], [703.5, 161.5], [649.5, 188.5], [703.5, 215.5], [757.5, 215.5], [732.5, 269.5], [798.5, 269.5], [811.5, 323.5], [865.5, 348.5], [919.5, 375.5], [865.5, 282.5], [678.5, 338.5], [678.5, 392.5], [732.5, 377.5], [678.5, 284.5], [624.5, 309.5], [811.5, 215.5], [825.5, 161.5], [879.5, 201.5], [919.5, 267.5], [825.5, 92.5], [879.5, 107.5], [649.5, 105.5], [703.5, 24.5], [757.5, 0.5], [811.5, 26.5], [865.5, 26.5], [919.5, 26.5], [516.5, 119.5], [570.5, 146.5], [568.5, 254.5], [543.5, 308.5], [529.5, 362.5], [54.5, 0.5], [54.5, 54.5], [54.5, 108.5], [0.5, 81.5], [0.5, 216.5], [108.5, 189.5], [175.5, 12.5], [175.5, 81.5], [256.5, 80.5], [189.5, 149.5], [177.5, 203.5], [270.5, 216.5], [216.5, 270.5], [324.5, 270.5], [378.5, 270.5], [162.5, 270.5], [243.5, 162.5], [270.5, 270.5], [270.5, 324.5], [270.5, 378.5], [324.5, 378.5], [378.5, 392.5], [378.5, 338.5], [216.5, 378.5], [162.5, 338.5], [162.5, 392.5], [297.5, 162.5], [378.5, 66.5], [351.5, 162.5], [229.5, 12.5], [283.5, 0.5], [337.5, 0.5], [391.5, 0.5], [108.5, 81.5], [54.5, 162.5], [54.5, 216.5], [54.5, 270.5], [54.5, 324.5], [54.5, 378.5], [0.5, 378.5]];

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

  if(i == 0){
    image = '1b.png';
  }
  else{
    image = '1b.jpg';
  }

  $('<img/>', {
    'src': 'images/'+image,
    'width': '54px',
  }).appendTo(back);
}

$('.rect').click(function(){
  $('.caption').css('opacity', 0.3);

  id = $(this).attr('id').substring(5);

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

  if(id == '1'){
    image = '1b.png';
  }
  else{
    image = '1b.jpg';
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
  });

  music.click(function(){
    $('.show-me').animate({opacity: 0}, 1000);
    $('.mine').animate({opacity: 0}, 1000);
  });

  me.click(function(){
    $('.show-me').animate({opacity: 1}, 1000);
    $('.mine').animate({opacity: 1}, 1000);
  });

  if(id == '1'){
    detail = details[0];
  }
  else{
    detail = details[1];
  }

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



$(document).foundation();
