import Topiary from '@walsh9/topiary';
import nanoKONTROL from 'korg-nano-kontrol';


const HEIGHT = 0;
const THICKNESS = 1;
const HUE = 2;
const SATURATION = 3;
const LIGHTNESS = 4;
const LEFT_ANGLE = 5;
const RIGHT_ANGLE = 6;
const HEIGHT_CHANGE = 7;
const THICKNESS_CHANGE = 8;

var deterministicTree = function(canvas, array, x, y) {
  canvas = document.getElementById("canvas");
  var treeOptions = {
    canvas: canvas,
    startPoint: Topiary.Vector2d.new(x , y),
    color: Topiary.Color.new(Math.floor(array[HUE] * 360), 
                     Math.floor(array[SATURATION] * 50 + 50),  
                     Math.floor(array[LIGHTNESS] * 50 + 50)),
    height:    array[HEIGHT] * 100 + 50,
    thickness: array[THICKNESS] * 8 + 2,
    depth: 11,
    rainbow: false,
    colorShiftRate: 0,
    delay: 0,
  };
  var mutationOptions = {
    minLeftAngle: array[LEFT_ANGLE] * 90,
    maxLeftAngle: array[LEFT_ANGLE] * 90,
    minRightAngle: array[RIGHT_ANGLE] * 90,
    maxRightAngle: array[RIGHT_ANGLE] * 90,
    minHeightChange: array[HEIGHT_CHANGE] * 0.1 + 0.7,
    maxHeightChange: array[HEIGHT_CHANGE] * 0.1 + 0.7,
    minThicknessChange: array[THICKNESS_CHANGE] * 0.1 + 0.7,
    maxThicknessChange: array[THICKNESS_CHANGE] * 0.1 + 0.7,
  };
  return Topiary.new(treeOptions, mutationOptions);
};

var clamp = function(n, min, max) {
  if (min === undefined) {min = 0;}
  if (max === undefined) {max = 1;}
  if (n < min) {return min;}
  if (n > max) {return max;}
  return n;
};

var arrayOf = function(value, length) {
  var arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = value;
  }
  return arr;
};

var newTreeData = function(value, length) {
  let numFields = 9;
  return { 
    current: arrayOf(0, numFields),
    target: arrayOf(0.4, numFields)
  };
};

var change = function(data) {
  let change = 0.2;
  for (let i = 0; i < data.current.length; i++) {
    if (data.current[i] < data.target[i]) {
      data.current[i] = Math.min(data.current[i] + change, data.target[i]);
    } else if (data.current[i] > data.target[i]) {
      data.current[i] = Math.max(data.current[i] - change, data.target[i]);
    }
  }
  return data;
};

let cycle = function(num, increment) {
  num += increment;
  while(num > 1) {num -= 1;}
  return num;
};

let numTrees = 8;
let canvas = document.getElementById("canvas");
let treeData = [];
for (let i = 0; i < numTrees; i++) {
  treeData[i] = newTreeData();
}

var fitCanvasToWindow = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener('resize', fitCanvasToWindow);

var draw = function () {
  let ctx = canvas.getContext("2d");
  ctx.fillstyle = "black";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  for (let i = 0; i < numTrees; i++) {  
    let y = canvas.height;
    let x = (i + 1) / (numTrees + 1) * canvas.width;
    let tree = deterministicTree(canvas, change(treeData[i]).current, x, y);
    canvas = document.getElementById("canvas");
    tree.draw();
  }
};

fitCanvasToWindow();
setInterval(draw, 50);

nanoKONTROL.connect()
.then((device) => {
  console.log('connected!' + device.name);
  for (let i = 0; i < numTrees; i++) {  
    device.on('slider:' + i, (value) => {
      treeData[i].target[HEIGHT] = value / 127;
    });
    device.on('knob:' + i, (value) => {
      treeData[i].target[RIGHT_ANGLE] = 1 - (value / 127);
      treeData[i].target[LEFT_ANGLE] = value / 127;
    });
    device.on('knob:' + i, (value) => {
      treeData[i].target[RIGHT_ANGLE] = 1 - (value / 127);
      treeData[i].target[LEFT_ANGLE] =  0 + (value / 127);
    });
    device.on('button:s:' + i, (value) => {
      treeData[i].target[HUE] = cycle(treeData[i].current[HUE], 1/25);
    });
    device.on('button:m:' + i, (value) => {
      treeData[i].target[THICKNESS] = cycle(treeData[i].current[THICKNESS], 1/16);
    });
    device.on('button:r:' + i, (value) => {
      treeData[i].target[HEIGHT_CHANGE] = cycle(treeData[i].current[HEIGHT_CHANGE], 1/16);
    });
  }
})
.catch(function(err){
  console.error(err);
});
