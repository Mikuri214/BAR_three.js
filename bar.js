var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
var renderer = new THREE.WebGLRenderer();
var mesh2;
var mesh1;
var axes = null;

function main() {

    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMapEnabled = true;

    axes = new THREE.AxisHelper(20);
    scene.add(axes);

    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);
    scene.add(camera);

    var cub = new THREE.CubeGeometry(2,2,2);
    var met = new THREE.MeshLambertMaterial({color: 0xff0000});
    var sph = new THREE.Mesh(cub, met);
    sph.position.set(-4, 6, 0);
    sph.castShadow = true;
    scene.add(sph);

    var planeGeometry = new THREE.PlaneBufferGeometry(60, 20, 100, 100);
    var planeMaterial = new THREE.MeshLambertMaterial({color: '#aaaaaa'});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15,0,0);
    plane.receiveShadow = true;
    scene.add(plane);

    //mesh.castShadow = true;
    /*var step = 0.0;
    step += 0.04;
    sph.position.x = 20 +(10*(Math.cos(step)));
    sph.position.y = 2 + (10*Math.abs(Math.sin(step)));*/


    var light = new THREE.SpotLight(0xffffff);
    light.position.set(-40, 60, -10);
    light.intensity = 1;
    light.angle = Math.PI/40;
    light.castShadow = true;
    light.target = sph;
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    scene.add(light);


    loadOBJ('sphBottle1_model2.obj', -4, 6, 0, 0.7, 0.7, 0.7, mesh1);
    loadOBJ('wineBottle2_model4.obj', 4, 4, 0, 1.5, 1.5, 1.5, mesh2);

    document.addEventListener('keydown',onDocumentKeyDown,false);

    draw(sph);
}

    function loadOBJ(src, x, y, z, sx, sy ,sz, mesh)
    {

        var obj_material = new THREE.MeshPhongMaterial(
            {
                color: 0xFFCBB3,
                emissive: 0x642100,
                transparent: true,
                opacity: 0.7,
                //side: THREE.doubleSide,
                specular: 0xFFCBB3,
                shininess: 20
            }
        );

        var loader = new THREE.OBJLoader();

        loader.load(src, function (obj)
        {
            obj.traverse(function (child)
            {
                if (child instanceof THREE.Mesh)
                {
                    child.material = obj_material;
                    child.geometry.computeFaceNormals();
                    child.geometry.computeVertexNormals();
                    child.castShadow = true;
                }
            });
            obj.scale.set(sx, sy, sz);

            obj.position.set(x, y, z);

            mesh = obj.clone();
            scene.add(obj);
        });
    }

    function draw(sph) {
        requestAnimationFrame(draw);
        renderer.render(scene, camera);
    }

function onDocumentKeyDown(event)
{
    switch(event.keyCode){
        case 37: //左
            camera.position.x -= 0.2;
            break;
        case 39: //右
            camera.position.x += 0.2;
            break;
        case 38: //上
            camera.position.z += 0.2;
            break;
        case 40: //下
            camera.position.z -= 0.2;
            break;
        case 65:
            if(mesh1) {
                mesh1.scale.x += 0.1;
            }
            break;
        default:
            break;
    }
}
