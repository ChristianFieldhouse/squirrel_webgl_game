
'use strict';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(2*18.4349488, window.innerWidth / window.innerHeight, 0.5, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.gammaOutput = true
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var squirrel;
const squirrel_geom = new THREE.SphereGeometry(0.1);
const smaterial = new THREE.MeshBasicMaterial( { color: 0xffa8a9 } );
squirrel = new THREE.Mesh( squirrel_geom, smaterial );
//scene.add( squirrel );
squirrel.position.set(0, 0.5, 0);
squirrel.name = "squirrel";

loader.load( 'objects/bitchin_squirrel_boy.glb', function ( gltf ) {

	gltf.scene.scale.set( 0.05, 0.05, 0.05 );
	gltf.scene.position.set(0, 0.12, 0);
	gltf.scene.name = "squirrel";
	squirrel =  gltf.scene
	scene.add(squirrel);
	console.log("added gltf");
	//console.log(gltf.scene)

}, undefined, function ( error ) {

	console.error( error );

} );
//
//scene.add(squirrel)

const box_size = 0.8;
//const image_path = 'https://media.istockphoto.com/photos/artificial-grass-picture-id506692747?b=1&k=20&m=506692747&s=170667a&w=0&h=x4QDWFznTnLQCEmsvCO4w0sZTDYmTvYvPwYD5DW9Ntg=';
const image_path = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9v26GSqQeESWVRH4iSgq33ZdbQVfofq0p-A&usqp=CAU';
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

function add_tree(x, y){
	loader.load( 'objects/basic_bitch_tree.glb', function ( gltf ) {

		gltf.scene.scale.set( 0.05, 0.05, 0.05 );
		gltf.scene.rotation.y = Math.PI * 2 * Math.random();
		gltf.scene.position.set(x, 0.4, y);
		scene.add( gltf.scene );
		//console.log("added gltf");
		//console.log(gltf.scene)

	}, undefined, function ( error ) {

		console.error( error );

	} );
}

function add_nut(x, y){
	loader.load( 'objects/lil_acorn.glb', function ( gltf ) {

		gltf.scene.scale.set( 0.05, 0.05, 0.05 );
		gltf.scene.rotation.y = Math.PI * 2 * Math.random();
		gltf.scene.position.set(x, 0.15, y);
		scene.add( gltf.scene );
		//console.log("added gltf");
		//console.log(gltf.scene)

	}, undefined, function ( error ) {

		console.error( error );

	} );
}

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

//add_cube(0, 0, colours["green"], 1);
for(var i = -5; i < 5; ++i){
  for(var j = 0; j < 20; ++j){
    //add_grass(i, j, 1);
  }
}

add_grass(0, 0, 500);

for (var t = 0; t < 30; ++t){
	add_tree(Math.random() * 10 - 5, Math.random() * 20);
}

for (var t = 0; t < 30; ++t){
	add_nut(Math.random() * 10 - 5, Math.random() * 20);
}

console.log(scene.children);

const cam_height = 0.4;
const cam_distance = 2;
camera.position.x = 0;
camera.position.y = cam_height;
camera.position.z = -cam_distance;
camera.lookAt(squirrel.position.x, squirrel.position.y, squirrel.position.z);

const line_material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const line_geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( line_geometry, line_material );
//scene.add( line );

var raycaster = new THREE.Raycaster();
var intersects;
var direction = new THREE.Vector3();
var squirrel_dir = new THREE.Vector3(0, 0, 1);
var squirrel_left = new THREE.Vector3(1, 0, 0);
var squirrel_up = new THREE.Vector3(0, 1, 0);
var squirrel_target = new THREE.Vector3(0, 0, 0);

const animate = function () {
	requestAnimationFrame( animate );

	const gaze_fl = squirrel_dir.clone().sub(squirrel_up).add(squirrel_left);
	const gaze_fr = squirrel_dir.clone().sub(squirrel_up).sub(squirrel_left);
	const gaze_bl = squirrel_dir.clone().negate().sub(squirrel_up).add(squirrel_left);
	const gaze_br = squirrel_dir.clone().negate().sub(squirrel_up).sub(squirrel_left);

	raycaster.set(squirrel.position, gaze_fl);
	intersects = raycaster.intersectObjects(scene.children, true);
	console.log(intersects[0].object.name);

	function get_intersect(gaze){
		raycaster.set(squirrel.position, gaze);
		const intersects = raycaster.intersectObjects(scene.children, true);
		if (intersects[0].object.name == "Sphere"){
			return intersects[1].point;
		}
		return intersects[0].point;
	}
	const target_fl = get_intersect(gaze_fl);
	const target_fr = get_intersect(gaze_fr);
	const target_bl = get_intersect(gaze_bl);
	const target_br = get_intersect(gaze_br);

	//console.log("----------------");
	console.log(target_fl);
	//console.log(target_fr);
	//console.log(target_bl);
	//console.log(target_br);
	//console.log("----------");

	squirrel_dir = target_fl.clone().lerp(target_fr, 0.5).sub(target_bl.clone().lerp(target_br, 0.5)).normalize();
	squirrel_left = target_fl.clone().sub(target_fr).lerp(target_bl.clone().sub(target_br), 0.5).normalize();
	squirrel_up = squirrel_dir.clone().cross(squirrel_left).normalize();
	
	console.log(squirrel_dir);
	squirrel.position.add(squirrel_dir.clone().multiplyScalar(0.1/60));
	const m = (new THREE.Matrix4()).makeBasis(
		squirrel_left.negate().multiplyScalar(0.05),
		squirrel_up.multiplyScalar(0.05),
		squirrel_dir.multiplyScalar(0.05)
	);
	squirrel.matrix.set(...m.elements);
	squirrel.matrix.setPosition( squirrel.position );
	squirrel.matrixAutoUpdate = false;
	//console.log(m);
	//console.log(squirrel.matrix);
	
	var cam_direction = squirrel.position.clone().sub(camera.position).normalize();
	camera.position.x = squirrel.position.x - cam_direction.x * cam_distance;
	camera.position.z = squirrel.position.z - cam_direction.z * cam_distance;
	camera.position.y = squirrel.position.y + cam_height;
	camera.lookAt(squirrel.position.x, squirrel.position.y, squirrel.position.z);
	renderer.render( scene, camera );
};

document.onkeydown = function(e) {
	var cam_direction = new THREE.Vector3(
		squirrel.position.x - camera.position.x,
		squirrel.position.y - camera.position.y,
		squirrel.position.z - camera.position.z
	);
	cam_direction.y = 0;
	//console.log(cam_direction);
	cam_direction.normalize();
	const cam_orthogonal = new THREE.Vector3(0, 1, 0);
	cam_orthogonal.cross(cam_direction);
	const eps = 0.1;
    switch (e.keyCode) {
      case 37:
	  squirrel_dir = new THREE.Vector3(
		squirrel_dir.x + eps * cam_orthogonal.x,
		squirrel_dir.y + eps * cam_orthogonal.y,
		squirrel_dir.z + eps * cam_orthogonal.z
	  ).normalize();
      break;
      case 38:
	  squirrel_dir = new THREE.Vector3(
		squirrel_dir.x + eps * cam_direction.x,
		squirrel_dir.y + eps * cam_direction.y,
		squirrel_dir.z + eps * cam_direction.z
	  ).normalize();
      break;
	  case 39:
	  squirrel_dir = new THREE.Vector3(
		squirrel_dir.x - eps * cam_orthogonal.x,
		squirrel_dir.y - eps * cam_orthogonal.y,
		squirrel_dir.z - eps * cam_orthogonal.z
	  ).normalize();
      break;
	  case 40:
	  squirrel_dir = new THREE.Vector3(
		squirrel_dir.x - eps * cam_direction.x,
		squirrel_dir.y - eps * cam_direction.y,
		squirrel_dir.z - eps * cam_direction.z
	  ).normalize();
      break;
	  case 32: //  space
	  squirrel.position.y = squirrel.position.y + 1;
      break;
    }
    var cam_direction = new THREE.Vector3(
		squirrel.position.x - camera.position.x,
		squirrel.position.y - camera.position.y,
		squirrel.position.z - camera.position.z
	);
	cam_direction.y = 0;
	cam_direction.normalize();
	
	var angle = squirrel_dir.angleTo(new THREE.Vector3(0, 0, -1));
	if (squirrel_dir.x > 0){
		angle = -angle;
	}
	//squirrel.rotation.y = angle;
	console.log(squirrel.rotation.y);
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
