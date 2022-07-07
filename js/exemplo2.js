import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import {GLTFLoader} from "GLTFLoader";
//import {RGBELoader} from "RGBELoader";
import * as THREE2 from "three2";
import {FBXLoader} from "FBXLoader";




// criando a cena
const scene = new THREE.Scene();
// criando a camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
//criando o renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
// habilitando o renderizador para renderizar sombras 
renderer.shadowMap.enable = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//criando o loader que vai inserir as texturas 
const loader = new THREE.TextureLoader();

//criando o cubo
/*
var geometria = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ map: loader.load('https://raw.githubusercontent.com/vfkami/Projeto_CG/main/grama.jpg') });
var material = new THREE.MeshPhongMaterial({color: 0x00ff00});
var cubo = new THREE.Mesh(geometria, material);
cubo.castShadow = true;
cubo.receiveShadow = true;

//adicionando o cubo a cena
scene.add(cubo);
*/

const controlador = new OrbitControls(camera, renderer.domElement);

//criando o cilindro
/*
var geometria2 = new THREE.CylinderGeometry(1, 1, 2, 50);
var material2 = new THREE.MeshBasicMaterial({color: 0x0000ff});
var material2 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
var cil = new THREE.Mesh(geometria2, material2);
cil.castShadow = true;
cil.receiveShadow = true;
scene.add(cil);
*/

//criandd o cone
/*
var geometry3 = new THREE.ConeGeometry(0.7, 1.5, 50);
var material3 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var material3 = THREE.MeshPhongMaterial({ map: loader.load('https://github.com/renanmello/threejsTextures/blob/main/pexels-life-of-pix-8892.jpg')});
var cone = new THREE.Mesh(geometry3, material3);
cone.castShadow = true;
cone.receiveShadow = true;
scene.add(cone);
*/

//criando a esfera
/*
var geometry4 = new THREE.SphereGeometry(1, 25, 25);
var material4 = new THREE.MeshPhongMaterial( {color: 0xffab00} );
var material4 = new THREE.MeshBasicMaterial({ map: loader.load("https://github.com/renanmello/threejsTextures/blob/main/pexels-life-of-pix-8892.jpg")});
var material4 =  new THREE.MeshBasicMaterial().texture;
var material4 = new THREE.MeshBasicMaterial({ map: loader.load('https://raw.githubusercontent.com/renanmello/threejsTextures/main/pexels-bj%C3%B6rn-austmar-%C3%BE%C3%B3rsson-7267852.jpg') });
var material4 = new THREE.MeshPhongMaterial( {color: 0xffab00} );
var material4= new THREE.MeshPhongMaterial(texture);
var sphere = new THREE.Mesh(geometry4, material4);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);
*/

//posição da camera
camera.position.z = 5;

//teste fbxloader

const fbxLoader = new FBXLoader();
fbxLoader.load(
  '/assets/shiba2/source/1.fbx', function(object) {
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

fbxLoader.load(
  'assets/lake/source/LP Lake Scene.fbx', function(object) {
    object.traverse(function(child){
      if(child.isMesh){
        //child.castShadow = true;
        //child.receiveShadow = true;
        
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


//teste gltf loader
/*
//var texture = new THREE.TextureLoader().load('/assets/shiba/textures/default_baseColor.png');
//Iniciando o loader para pegar o modelo 3D
//renderer.outputEncoding = THREE2.sRGBEncoding;
//texture.encoding = THREE2.sRGBEncoding;
//texture.flipY = false;

const gloader = new GLTFLoader();
gloader.load("assets/shiba/scene.gltf", function(gltf){
  scene.add(gltf.scene);
  gltf.animations;
  gltf.scene;
  gltf.scenes;
  gltf.cameras;
  gltf.asset;


},

function(xhr){
  console.log((xhr.loaded/xhr.total*100)+'% loaded');


},
function(error){

  console.log('an error happened');
});
*/


//rotacao
/*
cubo.rotation.x=60
cubo.rotation.y=30
cubo.rotation.set(30,30,30);

//escala
cubo.scale.set(1,1,1);
cubo.scale.x=2;
cubo.scale.y=2;
cubo.scale.z=2;
/*

//posicao
/*
//cubo.position.x = 0
//cil.position.x = 3
//cone.position.x = 7
//sphere.position.x = -3
//cubo.position.set(2,0,0);
//cil.position.set(0,0,0);
//cone.position.set(-2,0,0);
//sphere.position.set(-4,0,0);

//cubo.position.x=2;
//cubo.position.y=2;
//cubo.position.z=-2;
*/

//cria piso
function piso() {
  var g = new THREE.PlaneGeometry(25, 25);
  var t = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.NearestFilter;
  t.repeat.set(12, 12);

  var ma = new THREE.MeshPhongMaterial({ map: t, side: THREE.DoubleSide });
  var p = new THREE.Mesh(g, ma);
  p.rotation.x = Math.PI * -.5;
  scene.add(p);

  p.position.y = -3;

}

//funçao de animação
function animacao() {
  requestAnimationFrame(animacao);
  //cubo.rotation.x -= 0.01;
  //cil.rotation.x += 0.01;
  //cone.rotation.x -= 0.01;
  //sphere.rotation.x += 0.01;
  renderer.render(scene, camera);
  


}

//var light = new THREE.AmbientLight(new THREE.Color(0xFFFFF),3 );
//var light = new THREE.DirectionalLight(new THREE.Color(0xFFFFF), 1);
//var light = new THREE.SpotLight(new THREE.Color(0xFFFFF),6);
//light.target.position.set(0,5,0);
////light.castShadow = true;
//light.target.position.set(0,0,0);
//light.position.set(0,2,4);
//scene.add(light.target);
//scene.add(light);
//var ajudante = new THREE.PointLightHelper(light);
//var ajudante2 = new THREE.CameraHelper(light.shadow.camera);
//scene.add(ajudante2);
//scene.add(ajudante);
piso();
//light.position.z = 0;
animacao();
