const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(2*18.4349488, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const box_size = 0.8;

function add_cube(x, y, colour){
    const geometry = new THREE.BoxGeometry(box_size, box_size, box_size);
    const material = new THREE.MeshBasicMaterial( { color: colour } );
    const cube = new THREE.Mesh( geometry, material );
    cube.name = `tile_${x}_${y}`
    cube.position.set(x - gridsize/2 + 1/2, y - gridsize/2 + 1/2, - box_size);
    scene.add( cube );
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

const gridsize = 50;
for (var i = 0; i < gridsize; ++i){
    for (var j = 0; j < gridsize; ++j){
        //add_cube(i, j, colours[Math.floor(Math.random() * 5)]);
        add_cube(i, j, colours["grey"]);
    }
}

for (var i = 0; i < 10; ++i){
    for (var j = 0; j < 10; ++j){
        col_cube(i, j, colours["green"]);
    } 
}

const matrix = new Array(gridsize).fill(0).map(() => new Array(gridsize).fill(0));

camera.position.z = 75;

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
      camera.position.x -= 0.1;
      break;
      case 38:
      camera.position.y += 0.1;
      break;
      case 39:
      camera.position.x += 0.1;
      break;
      case 40:
      camera.position.y -= 0.1;
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
