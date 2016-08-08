var threed = false;

function toggleThreeD(e){
    e.classList.toggle('btn-extra-active');
    threed = !threed;
}

(function(){
    var skybox = [];

    for(var i=0;i<6;i++){
        skybox.push('./../assets/img/1.png');
    }
    var textureLoader = new THREE.TextureLoader();
    var mouseY, mouseX = 1;
    var renderer, effect, render, scene, camera, dae = null;
    var loader = new THREE.ColladaLoader();

	loader.options.convertUpAxis = true;
	loader.load( './../assets/models/diamond.dae', function ( collada ) {
		dae = collada.scene;
        dae.scale.x = dae.scale.y = dae.scale.z = 3;
		init();
		render();
	} );

    function setMaterial (node, material) {
        node.material = material;
        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                setMaterial(node.children[i], material);
            }
        }
    }


    function init(){

            scene = new THREE.Scene();
            var background = new THREE.CubeTextureLoader()
					.setPath( './' )
					.load( skybox );

            camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 3000 );

            renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            var material = new THREE.MeshStandardMaterial( {
                color: 0x666666,
                side: THREE.DoubleSide,
                transparent: true,
                opacity:0.5,
                roughness: 0,
                metalness: 0.98,
                shading: THREE.FlatShading,
                envMap: background
            });
            setMaterial(dae, material);
            scene.add(dae);



            //------------------------ LIGHT
            var ambientLight = new THREE.AmbientLight( 0xffffff );
        	scene.add( ambientLight );
            var light1 = new THREE.PointLight( 0xffffff, 100, 50 );
        	scene.add( light1 );
            light1.position.x = 30;
            light1.position.y = 10;
            var light2 = new THREE.PointLight( 0xffffff, 100, 50 );
        	scene.add( light2 );
            light2.position.x = -10;
            light2.position.y = 10;
            light2.position.z = -10;
            //------------------------ END LIGHT


            camera.position.z = 20;

            document.addEventListener('mousemove', onDocumentMouseMove, false);
            window.addEventListener( 'resize', onWindowResize, false );

            var width = window.innerWidth || 2;
            var height = window.innerHeight || 2;

            effect = new THREE.AnaglyphEffect( renderer );
            effect.setSize(width, height);
    }

    function onWindowResize() {
		windowHalfX = window.innerWidth / 2,
		windowHalfY = window.innerHeight / 2,

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		effect.setSize( window.innerWidth, window.innerHeight );
	}

    function onDocumentMouseMove(event) {
        mouseY = event.clientY / window.innerHeight;
		mouseX = event.clientX / window.innerHeight;
	}

    function render() {
    	requestAnimationFrame( render );

        if(mouseX && mouseY){
            dae.rotation.y = ( mouseX * 0.3 );
            dae.rotation.x = ( mouseY * 0.5 );
        }else{
            dae.rotation.y = 0.4;
            dae.rotation.y = 0.4;
        }

        if(threed){
            effect.render( scene, camera );
        }else{
            renderer.render( scene, camera );
        }
    }

}())
