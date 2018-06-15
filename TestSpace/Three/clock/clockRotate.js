/* eslint-disable */
var renderer;
var width,height;
var stats;
function initThree() {
    // width=document.getElementById("canvas-frame").clientWidth;
    // height=document.getElementById("canvas-frame").clientHeight;
    // renderer=new THREE.WebGLRenderer({
    //     antialias:true
    // });
    // renderer.setSize(width,height);
    // document.getElementById("canvas-frame").appendChild(renderer.domElement);
    // renderer.setClearColor(0xffffff,1.0);

    //
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.setClearColor(0xffffff,1.0);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    // document.getElementById('canvas-frame').appendChild(stats.domElement);
    document.body.appendChild( stats.domElement );
}

var camera;
function initCamera(){
    camera=new THREE.PerspectiveCamera(45,width/height,1,10000);
    camera.position.set(600,600,600);
    camera.up.set(0,1,0);
    camera.lookAt(0,0,0);
}

var scene;
function initScene() {
    scene=new THREE.Scene();
}

var light;
function initLight() {
    light=new THREE.DirectionalLight({color:0xffffff});
    light.position.set(0,0,1);
    scene.add(light);
}

var lineX,lineY,lineZ;
var line1,line2,line3;
var mesh;
var meshAll;
function initObject() {

    lineX=new THREE.Geometry();
    lineY=new THREE.Geometry();
    lineZ=new THREE.Geometry();
    var color=new THREE.Color(0xffffff);
    var color1=new THREE.Color(0xff0000);
    var color2=new THREE.Color(0x00ff00);
    var color3=new THREE.Color(0x0000ff);
    var line_material=new THREE.LineBasicMaterial({vertexColors:true});
    var p=new THREE.Vector3(0,0,0);
    var p1=new THREE.Vector3(1000,0,0);
    var p2=new THREE.Vector3(0,1000,0);
    var p3=new THREE.Vector3(0,0,1000);
    lineX.vertices.push(p);
    lineY.vertices.push(p);
    lineZ.vertices.push(p);
    lineX.vertices.push(p1);
    lineY.vertices.push(p2);
    lineZ.vertices.push(p3);
    lineX.colors.push(color,color1);
    lineY.colors.push(color,color2);
    lineZ.colors.push(color,color3);

    line1=new THREE.Line(lineX,line_material,THREE.LineSegments);
    line2=new THREE.Line(lineY,line_material,THREE.LineSegments);
    line3=new THREE.Line(lineZ,line_material,THREE.LineSegments);
    meshAll= new THREE.Object3D();
    meshAll.add(line1);
    meshAll.add(line2);
    meshAll.add(line3);
    scene.add(meshAll);
}

var texture;
function initCube() {
    var geometry = new THREE.CubeGeometry(150, 150, 150);
    texture = new THREE.Texture( canvas);
    var material = new THREE.MeshBasicMaterial({map:texture});

    texture.needsUpdate = true;
    mesh = new THREE.Mesh( geometry,material );
    scene.add( mesh );
}

var controls;
function initControl() {
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.minDistance = 300;
    controls.maxDistance = 600;
    controls.maxPolarAngle = 1.5;// 上下两极的可视区域的最大角度
    controls.minPolarAngle = 1;// 上下两极的可视区域最小角度
    controls.enableDamping = true;// 允许远近拉伸
    controls.enableKeys = false;// 禁止键盘控制
    controls.enablePan = false;// 禁止平移
    controls.dampingFactor = 0.1;// 鼠标滚动一个单位时拉伸幅度
    controls.rotateSpeed = 0.5;// 旋转速度
    // controls.enabled = false;// 禁用控制器
    controls.minDistance = 300;// 离中心物体的最近距离
    controls.maxDistance = 3000;// 离中心物体的最远距离
  }

function animate() {
    var v1 = new THREE.Vector3( 1, 1, 1 );
    var v2 = new THREE.Vector3( 1, 0, 0 );
    // meshAll.rotateOnAxis(v1,0.01);
    mesh.rotateOnAxis(v2,0.01);
    texture.needsUpdate = true;
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    stats.update();
    controls.update();
}

function onWindowResize() {
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

function threeStart() {
    clock();
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    initCube();
    initControl();
    animate();
    onWindowResize();
}

window.onload=threeStart;