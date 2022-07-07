import * as THREE from 'three2';
import { OrbitControls } from "OrbitControls";
import {FBXLoader} from "FBXLoader";

let camera, scene, renderer;

const clock = new THREE.Clock();

const loaderT= new THREE.TextureLoader();

var geometry = new THREE.SphereGeometry(1, 25, 25);
var material = new THREE.MeshBasicMaterial({ map: loaderT.load('./assets/moon.jpg') });
const sphere = new THREE.Mesh(geometry, material);
let mixer;
let mixer2;




init();
animate();




function init() {
    const container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 100, 200, 300 );
    
	scene = new THREE.Scene();
	//scene.background = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	const back = loaderT.load('./assets/sky.jpg');
	scene.background = back;
	//scene.background = new THREE.Color( 0xa0a0a0 );
	//scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

	const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	hemiLight.position.set( 0, 300, 0 );
	scene.add( hemiLight );

	const dirLight = new THREE.DirectionalLight( 0xffffff );
	dirLight.position.set( 0, 200, 100 );
	dirLight.castShadow = true;
	dirLight.shadow.camera.top = 200;
	dirLight.shadow.camera.bottom = - 120;
	dirLight.shadow.camera.left = - 140;
	dirLight.shadow.camera.right = 150;
	scene.add( dirLight );
	
	//camerahelper que ajudar a mostrar onde esta posicionada a camera
	//scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );
    
	// ground
	/*const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );

	const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
	grid.material.opacity = 0.2;
	grid.material.transparent = true;
	scene.add( grid );
    */
	
	
	//criando a lua
    
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.y=200;
    sphere.position.z=100;
    sphere.position.x=-120;
    sphere.scale.set(20,20,20);
    scene.add(sphere);
	
	// model
	const loader = new FBXLoader();
	loader.load( 'assets/bot1/Samba Dancing.fbx', function ( object ) {
        mixer = new THREE.AnimationMixer( object );

		const action = mixer.clipAction( object.animations[ 0 ] );
		action.play();

		object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
				child.receiveShadow = true;
                

						}

					} );
        object.position.y=93;
        object.position.x=-3;
        object.scale.set(0.2,0.2,0.2);
        
		scene.add( object );

				} );
    loader.load(
        './assets/island/source/Island.fbx', function(object) {
          object.traverse(function(child){
            if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
              
            }
          })
            
            scene.add(object)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
      )
	  
	 
	  loader.load( 'assets/crab/source/crabClaw_Attack.fbx', function ( object ) {
        mixer2 = new THREE.AnimationMixer( object );

		const action = mixer2.clipAction( object.animations[ 0 ] );
		action.play();

		object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
				child.receiveShadow = true;
                

						}

					} );
        object.position.y=22.5;
		object.position.x=25;
		object.position.z=67;
        object.scale.set(0.1,0.1,0.1);
        
		scene.add( object );

				} );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	container.appendChild( renderer.domElement );

	const controls = new OrbitControls( camera, renderer.domElement );
	controls.target.set( 0, 100, 0 );
	controls.update();

	window.addEventListener( 'resize', onWindowResize );
    return sphere
			}
	

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

function animate() {
    requestAnimationFrame( animate );
	sphere.rotation.x-=0.01;
	sphere.rotation.z-=0.01;
	const delta = clock.getDelta();

	if ( mixer ) mixer.update( delta );
	if ( mixer2 ) mixer2.update( delta );

	renderer.render( scene, camera );

}