// Coordinates of all the tiles
coordinates = [[529.5, 0.5], [583.5, 26.5], [649.5, 24.5], [703.5, 92.5], [757.5, 134.5], [703.5, 161.5], [649.5, 188.5], [703.5, 215.5], [757.5, 215.5], [732.5, 269.5], [798.5, 269.5], [811.5, 323.5], [865.5, 348.5], [919.5, 375.5], [865.5, 282.5], [678.5, 338.5], [678.5, 392.5], [732.5, 377.5], [678.5, 284.5], [624.5, 309.5], [811.5, 215.5], [825.5, 161.5], [879.5, 201.5], [919.5, 267.5], [825.5, 92.5], [879.5, 107.5], [649.5, 105.5], [703.5, 24.5], [757.5, 0.5], [811.5, 26.5], [865.5, 26.5], [919.5, 26.5], [516.5, 119.5], [570.5, 146.5], [568.5, 254.5], [543.5, 308.5], [529.5, 362.5], [54.5, 0.5], [54.5, 54.5], [54.5, 108.5], [0.5, 81.5], [0.5, 216.5], [108.5, 189.5], [175.5, 12.5], [175.5, 81.5], [256.5, 80.5], [189.5, 149.5], [177.5, 203.5], [270.5, 216.5], [216.5, 270.5], [324.5, 270.5], [378.5, 270.5], [162.5, 270.5], [243.5, 162.5], [270.5, 270.5], [270.5, 324.5], [270.5, 378.5], [324.5, 378.5], [378.5, 392.5], [378.5, 338.5], [216.5, 378.5], [162.5, 338.5], [162.5, 392.5], [297.5, 162.5], [378.5, 66.5], [351.5, 162.5], [229.5, 12.5], [283.5, 0.5], [337.5, 0.5], [391.5, 0.5], [108.5, 81.5], [54.5, 162.5], [54.5, 216.5], [54.5, 270.5], [54.5, 324.5], [54.5, 378.5], [0.5, 378.5]];
descriptions = [
  {
    time: 'April 2012',
    location: 'Fenghuang, China',
    text: 'I was traveling to the rural and ancient part of China, just before graduation from undergrad. Had fun with friend, but I was sad that my exam conflicted with JAMC\'s concert in Beijing.',
  },
  {
    time: 'August 2013',
    location: 'Chicago, USA',
    text: 'The Vaccines is not a complicated, artsy band I usually like. It\'s simple and energetic. Saw them at lollapalooza 2013 with friends on the east coast.',
  }
];

// position tiles and images on the page
for(i = 0; i < coordinates.length; i ++){
  style = {
    'top': coordinates[i][1] + 'px',
    'left': coordinates[i][0] + 'px'
  };

  rect = $('<div/>', {
    'class': 'rect',
    'id': 'album' + (i+1),
  }).css(style).appendTo('.container');

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

  style = {
    'background-image': 'url(images/'+ id +'a.png)',
    'background-size' : '100% auto',
  };

  show = $('<div/>', {
    'class': 'show'
  }).appendTo('body');

  show_front = $('<div/>', {
    'class': 'show-front',
  }).css(style).appendTo(show);

  if(id == '1'){
    image = '1b.png';
  }
  else{
    image = '1b.jpg';
  }

  style = {
    'background-image': 'url(images/' + image + ')',
    'background-size' : '100% auto',
    'opacity': 0,
  };

  show_back = $('<div/>', {
    'class': 'show-back',
  }).css(style).appendTo(show);

  close = $('<div/>', {
    'class': 'close'
  }).text('X').appendTo(show);

  close.click(function(){
    $('.show').fadeOut(500, function(){
      $(this).remove();
    });
    $('.caption').css('opacity', 0.7);
  });

  if(id == '1'){
    description = descriptions[0];
  }
  else{
    description = descriptions[1];
  }

  descr = $('<div/>', {
    'class': 'descr',
  }).appendTo(show_back);

  $('<span/>', {
    'class': 'time',
  }).text(description.time).appendTo(descr);

  $('<span/>', {
    'class': 'location',
  }).text(description.location).appendTo(descr);

  $('<p/>', {
    'class': 'text',
  }).text(description.text).appendTo(descr);

});

$(document).foundation();