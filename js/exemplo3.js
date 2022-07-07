import * as THREE from 'three2';
import { OrbitControls } from "OrbitControls";
import {FBXLoader} from "FBXLoader";


// criando as variveis camera, cena e renderizador
let camera, scene, renderer;

// Criando uma constante do tipo relógio
const clock = new THREE.Clock();

//criando o loader que irá carregar as texturas
const loaderT= new THREE.TextureLoader();

//criando a esfera que será a lua 
var geometry = new THREE.SphereGeometry(1, 25, 25);
var material = new THREE.MeshBasicMaterial({ map: loaderT.load('./assets/moon.jpg') });
const sphere = new THREE.Mesh(geometry, material);

//criando os mixers para fazer as animações
let mixer,mixer2,mixer3;


//funcao init que irá criar toda a cena e definir algumas configurações
init();
// funcao animate irá animar os objetos
animate();


function init() {
	//criando um container para inserir codigos no html
    const container = document.createElement( 'div' );
	document.body.appendChild( container );
    
    //criando a camera (campo de visao, proporção da tela, distancia x a y de renderização da camera)
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	//posicao da camera
	camera.position.set( 100, 200, 300 );
	
	//criando a cena
	scene = new THREE.Scene();
	//criando a constante back que vai ser o nosso background da cena
	const back = loaderT.load('./assets/sky.jpg');
	scene.background = back;

	//criando uma nevoa 
	//scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );
	
	//luz superior da cena, nao cria sombra (cor do ceu, cor do chao)
	const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	//posicao da luz
	hemiLight.position.set( 0, 200, 100 );
	// adicionando a luz na cena
	scene.add( hemiLight );
    // criando a luz direcional 
	const dirLight = new THREE.DirectionalLight( 0xffffff );
	//posicao da luz
	dirLight.position.set( 100, 50, 100 );
	//mostrar sombras dinamicas
	dirLight.castShadow = true;
	
	//proporção da sombra
	dirLight.shadow.camera.top = 40;
	dirLight.shadow.camera.bottom = -40;
	dirLight.shadow.camera.left = -40;
	dirLight.shadow.camera.right = 40;
	scene.add( dirLight );
	
	//camerahelper que ajudar a mostrar onde esta posicionada da fonte de luz
	scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );
    
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
    sphere.position.x=5;
    sphere.position.y=50;
    sphere.position.z=30;
    
    sphere.scale.set(5,5,5);
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
        object.position.y=21;
        object.position.x=40;
        object.position.z=-3;
        object.scale.set(0.03,0.03,0.03);
        
		scene.add( object );

				} );
    loader.load(
        './assets/island2/source/test231`31.fbx', function(object) {
          object.traverse(function(child){
            if(child.isMesh){
              child.castShadow = true;
              child.receiveShadow = true;
              
            }
          })
            object.position.y=22;
            object.position.x=25;
            //object.position.z=100;
            //object.set.position(0,10,0);
            scene.add(object)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
      )
	  
	 
	  loader.load( 'assets/dog1/source/cheesecake_NEW1.fbx', function ( object ) {
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
        object.position.x=40;
        object.rotation.x=0.3;
        object.position.z=-10;
        object.rotation.y=1.2;
        object.scale.set(0.01,0.01,0.01);
        
		scene.add( object );

                } );
                
    loader.load( 'assets/snoop/source/snoopy.fbx', function ( object ) {
        mixer3 = new THREE.AnimationMixer( object );

		const action = mixer3.clipAction( object.animations[ 0 ] );
		action.play();

		object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
				child.receiveShadow = true;
                

						}

                    } );
        object.position.x=5;
        object.position.y=55;
        object.position.z=30;
             
       //object.rotation.x=0.3;
        
       //object.rotation.y=1.2;
        object.scale.set(2.5,2.5,2.5);
        
		scene.add( object );

				} );
    //especifica o renderizador e seta o anti serrilhamento true
	renderer = new THREE.WebGLRenderer({ antialias: true });
	//proporção de pixel
	renderer.setPixelRatio( window.devicePixelRatio );
	//tamanho do renderizador
	renderer.setSize( window.innerWidth, window.innerHeight );
	//habilita renderizar sombras
	renderer.shadowMap.enabled = true;
	//adiciona o renderizador no container 
	container.appendChild( renderer.domElement );
	
	// criando a constante control do tipo orbitcontrols para movimentar a camera com o mouse na cena
	const controls = new OrbitControls( camera, renderer.domElement );
	//escolhendo o alvo 
	controls.target.set( 25, 22,0 );
	controls.update();
    
	window.addEventListener( 'resize', onWindowResize );
    
			}
	
//funcao pra dimensionar a tela
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

			}

			
//funcao de animacao
function animate() {
    requestAnimationFrame( animate );
	sphere.rotation.x-=0.01;
    sphere.rotation.z-=0.01;
	
	//cria a constante delta que pega o valor atual do relogio
	const delta = clock.getDelta();
    //atualiza as animações
	if ( mixer ) mixer.update( delta );
    if ( mixer2 ) mixer2.update( delta );
    if ( mixer3 ) mixer3.update( delta );
    //renderiza a cena e a camera
	renderer.render( scene, camera );

}