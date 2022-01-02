
'use strict';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(2*18.4349488, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.gammaOutput = true
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const squirrel_geom = new THREE.SphereGeometry(0.1);
const smaterial = new THREE.MeshBasicMaterial( { color: 0xffa8a9 } );
const squirrel = new THREE.Mesh( squirrel_geom, smaterial );
squirrel.position.set(0, 0.1, 0);
scene.add(squirrel)

const box_size = 0.8;
const image_path = 'https://media.istockphoto.com/photos/artificial-grass-picture-id506692747?b=1&k=20&m=506692747&s=170667a&w=0&h=x4QDWFznTnLQCEmsvCO4w0sZTDYmTvYvPwYD5DW9Ntg='
const grass_texture = new THREE.TextureLoader().load( image_path );
// immediately use the texture for material creation
const grass_material = new THREE.MeshBasicMaterial( { map: grass_texture } );

function add_cube(x, y, colour, box_size=0.8){
    const geometry = new THREE.BoxGeometry(box_size, box_size, box_size);
    const material = new THREE.MeshBasicMaterial( { color: colour } );
    const cube = new THREE.Mesh( geometry, material );
    cube.name = `tile_${x}_${y}`
    cube.position.set(x, y, 0);
    scene.add( cube );
}

function add_grass(x, y, box_size=0.8){
	const geometry = new THREE.BoxGeometry(box_size, 0.1, box_size); //THREE.PlaneGeometry( 1, 1 );
	const material = new THREE.MeshBasicMaterial( { color: 0x61ab68 } );
	const plane = new THREE.Mesh( geometry, grass_material );
    plane.name = `grass_${x}_${y}`
    plane.position.set(x, 0, y);
	scene.add( plane );
}

function col_cube(x, y, colour){
    var cube = scene.getObjectByName(`tile_${x}_${y}`);
    cube.material = new THREE.MeshBasicMaterial( { color: colour } );
}

const colours = {
    "ligt_salmon": 0xfbc2b5,
    "salmon": 0xffa8a9,
    "pink": 0xf786aa,
    "purple": 0xa14a76,
    "grey": 0xcdb2ab,
    "green": 0x61ab68
}

function createMaterialArray() {
  const skyboxImagepaths = [
	'https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&rect=0%2C292%2C3008%2C1504&q=45&auto=format&w=1356&h=668&fit=crop',
	'https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&rect=0%2C292%2C3008%2C1504&q=45&auto=format&w=1356&h=668&fit=crop',
	'https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&rect=0%2C292%2C3008%2C1504&q=45&auto=format&w=1356&h=668&fit=crop',
	'https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&rect=0%2C292%2C3008%2C1504&q=45&auto=format&w=1356&h=668&fit=crop',
	'https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&rect=0%2C292%2C3008%2C1504&q=45&auto=format&w=1356&h=668&fit=crop',
	'https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&rect=0%2C292%2C3008%2C1504&q=45&auto=format&w=1356&h=668&fit=crop'
  ];
  const materialArray = skyboxImagepaths.map(image => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
}

const skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
const skybox = new THREE.Mesh(skyboxGeo, createMaterialArray());
scene.add(skybox);

const loader = new GLTFLoader();
function add_tree(x, y){
	loader.load( 'objects/bad_tree.glb', function ( gltf ) {

		gltf.scene.scale.set( 0.05, 0.05, 0.05 );
		gltf.scene.rotation.y = Math.PI / 2;
		gltf.scene.position.set(x, 0.2, y);
		scene.add( gltf.scene );
		console.log("added gltf");
		console.log(gltf.scene)

	}, undefined, function ( error ) {

		console.error( error );

	} );
}

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

//add_cube(0, 0, colours["green"], 1);
for(var i = -5; i < 5; ++i){
  for(var j = 0; j < 20; ++j){
    add_grass(i, j, 1);
  }
}

for (var t = 0; t < 20; ++t){
	add_tree(Math.floor(Math.random() * 10 - 5), Math.floor(Math.random() * 20));
}

camera.position.x = 0;
camera.position.y = 0.4;
camera.position.z = -2;
camera.lookAt(0, 0, 0);

const line_material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const line_geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( line_geometry, line_material );
//scene.add( line );

const animate = function () {
	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

//var camera = scene.getObjectByName('camera');
document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
      camera.position.x += 0.1;
      squirrel.position.x += 0.1;
      break;
      case 38:
      camera.position.z += 0.1;
      squirrel.position.z += 0.1;
      break;
      case 39:
      camera.position.x -= 0.1;
      squirrel.position.x -= 0.1;
      break;
      case 40:
      camera.position.z -= 0.1;
      squirrel.position.z -= 0.1;
      break;
    }
};

function onDocumentMouseWheel( event ) {

    var fovMAX = 160;
    var fovMIN = 1;
    
    var mx = 2 * (event.clientX / window.innerWidth - 0.5);
    var my = 2 * (event.clientY / window.innerHeight - 0.5);
    
    var new_z = Math.pow(Math.sqrt(camera.position.z) + event.wheelDeltaY * 0.005, 2);
    var z_diff = camera.position.z - new_z;
    camera.position.z = new_z;
    camera.position.x += mx * Math.tan(Math.PI/180 * camera.fov/2) * z_diff * camera.aspect;
    camera.position.y -= my * Math.tan(Math.PI/180 *camera.fov/2) * z_diff;

    //camera.fov -= event.wheelDeltaY * 0.05;
    //camera.fov = Math.max( Math.min( camera.fov, fovMAX ), fovMIN );
    //camera.projectionMatrix = new THREE.Matrix4().makePerspective(camera.fov, window.innerWidth / window.innerHeight, camera.near, camera.far);

}

document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );

animate();
