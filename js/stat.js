'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_X = CLOUD_X + BAR_GAP;
var BAR_Y = 80;
var FONT_X = BAR_X;
var FONT_Y = 250;
var BAR_MAX_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var currentBarHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
    var timeHeight = BAR_MAX_HEIGHT - currentBarHeight;

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), FONT_X + (BAR_GAP + BAR_WIDTH) * i, timeHeight + BAR_Y);
    ctx.fillText(names[i], FONT_X + (BAR_GAP + BAR_WIDTH) * i, FONT_Y + GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random() + ')';
    }
    ctx.fillRect(BAR_X + (BAR_GAP + BAR_WIDTH) * i, BAR_Y + BAR_MAX_HEIGHT, BAR_WIDTH, -currentBarHeight + 2 * GAP);
  }
};
