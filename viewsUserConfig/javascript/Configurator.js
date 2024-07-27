//Whether debuging is enabled or not
var IS_DEBUG=false;
//Whether to show fps counter or not
var SHOW_FPS = false;

//The statistics object
var stats;

//The scene object
var mScene;
//The renderer object
var mRenderer;

//The Cinematic camera
var mCineCamera;
//The Orbit camera
var mOrbitCamera;
//The current camera
var mMainCamera;


//The orbit controls object
var mOrbitControls;
//The camera startup position
const mOrbitCamPos =  new THREE.Vector3( 0, 5, 30 );
//The camera lookat target
const mOrbitCamTarget =  new THREE.Vector3( 0, 3, 0 );

//The loader manager
var mManager;

//The texture loader
var  mTextureLoader;

//The Cubemap path
var r = "../data/env/cubemap/";
//The cubemap file urls
var urls = [ r + "posx.jpg", r + "negx.jpg",
             r + "posy.jpg", r + "negy.jpg",
             r + "posz.jpg", r + "negz.jpg" ];
//The Cubemap object
 var mCubeMap;

//The Audio Trakc object
var mAudioTrack;

//Array to store the cinematic tweens list
var mCineShotsList=[];

//The current car 3d model
var mC3DGLTF;
//The current body color
var mCBodyColor;

//The json config object
var mConfigJSON;

//Initialize the engine
Initialize();

//Function to initialize
function Initialize()
{
    //Create renderer
    mRenderer = new THREE.WebGLRenderer( { antialias:true } );
    mRenderer.setPixelRatio(window.devicePixelRation);
    mRenderer.setSize(window.innerWidth, window.innerHeight);
    mRenderer.shadowMap.enabled = true;
    mRenderer.shadowMap.type = THREE.PCFSoftShadowMap;      
    mRenderer.setClearColor( 0x000000, 1 );
    mRenderer.sortObjects = false;
    
    //Append the renderer to the document body
    document.body.appendChild(mRenderer.domElement);    
    
    //Create a new scene
    mScene = new THREE.Scene();

    //Create and add a cine cam to the scene
    mCineCamera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    mScene.add(mCineCamera);

    //Create and add an orbit cam to the scene
    mOrbitCamera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 0.1, 1000);
    mOrbitCamera.position.copy(mOrbitCamPos);        
     
    //Add event listener to respond to window resize
    window.addEventListener('resize', OnContextResized, true);

    //If FPS enabled
    if(SHOW_FPS)
    {
        //Create a new statistics object
        stats = new Stats();
        //Show the statistics
        stats.showPanel(0);
        //Append the statistics to dom
        document.body.appendChild(stats.dom);
    }   

    //Create a loader manager
    mManager = new THREE.LoadingManager();
    //Callback to be triggered for load progress
    mManager.onProgress = OnLoadProgress;
    //Callback to be triggered when loading completed successfully
    mManager.onLoad =OnLoadCompleted;
    //Callback to be triggered when load errror occured 
    mManager.onError =OnLoadError;  

    //Creat the texture loader  
    mTextureLoader = new THREE.TextureLoader(mManager); 
    
    //Set the cinematic camera as main camera
    mMainCamera = mCineCamera;

    //Load the audtio track
    // mAudioTrack = new Audio('../data/audio_track.mp3');

    //Setup the environment
    SetupEnvironment(); 

	//Load the meta config data	
    $.getJSON("../data/sftr/meta.json", function(json) 
    {
    	//Get reference of the json object
        mConfigJSON = json;

		//Load the aventador model
    	LoadAventador(mConfigJSON);    	

		//Create the cinematics
    	AddCinemeticSequence();       	

    });    

	//Recalculate context
	OnContextResized(); 
    
}

//Function to setup the environment
function SetupEnvironment()
{
    //Create and add an ambient light
    ambientLight = new THREE.AmbientLight( 0xffffff, 0.1 );
    mScene.add( ambientLight );

    //Light Size
    var size=6;
    //Light Intensity
    var intensity = 14;
    //Light color
    var color =0xffffff;    

    //The light width and height
    var lWidth = 12, lHeight = 6;

    //Add a front light
    var mFrontLight = CreateAreaLight(mScene, color, intensity, new THREE.Vector2(lWidth,lHeight), IS_DEBUG ? true:false );     
    mFrontLight.rotation.copy(Vector3DegToRadian({x:90, y:45, z:-90})); 
    mFrontLight.position.copy(new THREE.Vector3( -26, 16, 0 ));

    //Add a back light
    var mBackLight = CreateAreaLight(mScene, color, intensity, new THREE.Vector2(lWidth,lHeight), IS_DEBUG ? true:false);   
    mBackLight.rotation.copy(Vector3DegToRadian({x:90, y:-45, z:90}));
    mBackLight.position.copy(new THREE.Vector3( 26, 16, 0 ));

    //Add a Right Light
    var mRightLight = CreateAreaLight(mScene, color, intensity, new THREE.Vector2(lWidth,lHeight), IS_DEBUG ? true:false);
    mRightLight.rotation.copy(Vector3DegToRadian({x:135, y:0, z:180}));
    mRightLight.position.copy(new THREE.Vector3(0,16,18));
    
    //Add a left Light
    var mLeftLight = CreateAreaLight(mScene, color, intensity, new THREE.Vector2(lWidth,lHeight), IS_DEBUG ? true:false);
    mLeftLight.rotation.copy(Vector3DegToRadian({x:45, y:0, z:0}));
    mLeftLight.position.copy(new THREE.Vector3(0,16,-18));

    //Load the environmet cubemap from file
    mCubeMap = new THREE.CubeTextureLoader(mManager).load( urls );
    mCubeMap.format = THREE.RGBFormat;
    mCubeMap.mapping = THREE.CubeReflectionMapping;

    //Load the floor plane textures and set wrappings
    var DTX_Floor = mTextureLoader.load("../data/env/asphalt_albedo.png");
    var NTX_Floor = mTextureLoader.load("../data/env/asphalt_normal.png");    
    var RTX_Floor = mTextureLoader.load("../data/env/asphalt_rouphness.png"); 
    DTX_Floor.wrapS = DTX_Floor.wrapT = THREE.RepeatWrapping; DTX_Floor.repeat.set( 64, 64 );
    NTX_Floor.wrapS = NTX_Floor.wrapT = THREE.RepeatWrapping; NTX_Floor.repeat.set( 64, 64 );
    RTX_Floor.wrapS = RTX_Floor.wrapT = THREE.RepeatWrapping; RTX_Floor.repeat.set( 64, 64 );   
    //Create the  floor material
    var Mt_Floor = new THREE.MeshStandardMaterial({roughness:1, metalness:0, map:DTX_Floor, normalMap:NTX_Floor, roughnessMap:RTX_Floor});
    //Create the floor plane object and add to the scene
    var mFloorPlane = new THREE.Mesh( new THREE.PlaneGeometry( 512, 512, 1,1 ), Mt_Floor );
    mFloorPlane.rotation.x = -Math.PI/2;
    mScene.add( mFloorPlane );

	var DTX_Shadow = mTextureLoader.load("../data/env/fake_shadow.png");
    var mShadowPlane = new THREE.Mesh( new THREE.PlaneGeometry( 36, 18, 1,1 ), new THREE.MeshBasicMaterial({color:0xffffff, map:DTX_Shadow, opacity:0.4, transparent:true}) );
    mShadowPlane.rotation.x = -Math.PI/2;
    mShadowPlane.position.y=0.05;
    mScene.add( mShadowPlane );
}

//Function to skip the intro
function SkipIntro()
{
    //Start fading the audio
    $(mAudioTrack).animate({volume:0},900,function()
    {
        //Remove te audio track         
        $(mAudioTrack).remove();
    });

    //Start fading in the screen
    $('.screen-fader')  
    .fadeIn(900, function()
    {
        //Loop through each cinematic tween and stop it
        for(var i=0;i<mCineShotsList.length; i++)       
            mCineShotsList[i].stop();       

        //Remove the welcome screen
        $('.welcome-screen').remove();

        //Set the main camera to orbit camera
        SetOrbitCamera();

        //Load the configuration
        LoadConfigurator(mConfigJSON);

        //Fade out the screen
        $('.screen-fader').fadeOut(900);
    });
}

var code_user = document.getElementById("code_user");
var configUser = code_user.textContent.split("_");
//Function to load the entities
function LoadAventador(config)
{
    
	// var stpIndex = 0;//getRandomInt(0,config.body_colors.colors.length-1);

	//Choose a random body color
	mCBodyColor = config.body_colors.colors[parseInt(configUser[0])].value;	
    // console.log(parseInt(configUser[0]))
    
    console.log(configUser);

	//Get the startup colors for configurables
	dfCol_Body 				= webColorToHex(config.body_colors.colors[parseInt(configUser[0])].value);
	dfCol_Mirror			= webColorToHex(config.mirror_colors.colors[0].value);
	dfCol_Alloys			= webColorToHex(config.wheel_colors.colors[parseInt(configUser[3])].value);
	dfCol_Caliper			= webColorToHex(config.caliper_colors.colors[parseInt(configUser[4])].value);	

    var AventadorAtlas_Albedo   = LoadTextureCorrected(mTextureLoader, "");
    var AventadorAtlas_Normal	= LoadTextureCorrected(mTextureLoader, "");
    var LR_Brake_Albedo         = LoadTextureCorrected(mTextureLoader, "");     
    var LR_Turn_Albedo          = LoadTextureCorrected(mTextureLoader, "");      
    var LR_Reverse_Albedo       = LoadTextureCorrected(mTextureLoader, "");   
    var LR_Generic_Normal       = LoadTextureCorrected(mTextureLoader, "");  
	
    //Create the necessary materials
    var Mt_Abs_Black_Gloss      = new THREE.MeshStandardMaterial( {color: 0x000000, roughness:0.0, metalness:0.0, envMap:mCubeMap} );
    var Mt_ABS_Black_Mat        = new THREE.MeshStandardMaterial( {color: 0x000000, roughness:0.5, metalness:0.5, envMap:mCubeMap} );
    var Mt_Abs_White_Mat        = new THREE.MeshStandardMaterial( {color: 0xffffff, roughness:0.0, metalness:0.0, envMap:mCubeMap} );    
    var Mt_AlloyWheels			= new THREE.MeshStandardMaterial( {name:  'Mt_AlloyWheels', color: dfCol_Alloys, roughness:0.1, metalness:0.5, envMap:mCubeMap });

    var Mt_AventadorAtlas       = new THREE.MeshStandardMaterial( {color: 0xffffff, roughness:0.5, metalness:0.5, envMap:mCubeMap, map:AventadorAtlas_Albedo, transparent:true} ); 

    var Primary                 = new THREE.MeshStandardMaterial( {name: 'Primary', color: dfCol_Body, roughness:0.0, metalness:0.1, envMap:mCubeMap} );    
    var Caliper        	= new THREE.MeshStandardMaterial( {name: 'Caliper', color: dfCol_Caliper, roughness:0.5, metalness:0.5, envMap:mCubeMap} );
    var Mt_Chrome               = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, roughness:0.0, metalness:1.0, envMap:mCubeMap} );
    var Mt_Glass_Lens           = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, roughness:0.0, metalness:0.25, envMap:mCubeMap} );

    var Mt_Glass_Translucent    = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, roughness:0.0, metalness:1.0, envMap:mCubeMap, transparent:true, opacity:0.25} );

    var Mt_Interior_Black		= new THREE.MeshStandardMaterial( {color: 0x525252, roughness:0.5, metalness:0.5, envMap:mCubeMap} );
    var Mt_Metal_Black_Glossy   = new THREE.MeshStandardMaterial( {color: 0x000000, roughness:0.1, metalness:0.5, envMap:mCubeMap} );
    var Mt_Metal_Brushed        = new THREE.MeshStandardMaterial( {color: 0x555555, roughness:0.0, metalness:1.0, envMap:mCubeMap} );
    var Mt_Mirror               = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, roughness:0.0, metalness:1.0, envMap:mCubeMap} );   
    var Mt_MirrorCover			= new THREE.MeshStandardMaterial( {name:  'Mt_MirrorCover', color: dfCol_Body, roughness:0.0, metalness:0.0, envMap:mCubeMap });
    var Mt_Reflector_BL         = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, roughness:1.0, metalness:0.0, envMap:mCubeMap, map:LR_Brake_Albedo, normalMap:LR_Generic_Normal} );
    var Mt_Reflector_RL         = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, roughness:1.0, metalness:0.0, envMap:mCubeMap, map:LR_Reverse_Albedo, normalMap:LR_Generic_Normal} );
    var Mt_Reflector_TL         = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, roughness:1.0, metalness:0.0, envMap:mCubeMap, map:LR_Turn_Albedo, normalMap:LR_Generic_Normal} );  
    var Mt_TurnLights           = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, roughness:0.5, metalness:0.5, envMap:mCubeMap} );   
    var Mt_Tyres                = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, roughness:0.5, metalness:0.5, envMap:mCubeMap, map:AventadorAtlas_Albedo, normalMap:AventadorAtlas_Normal} );
    var Mt_WindScreens          = new THREE.MeshStandardMaterial( {color: 0x000000, roughness:0.0, metalness:0.0, envMap:mCubeMap, transparent:true, opacity:0.25} );
    
    //The gltf object loader
    var gltfLoader = new THREE.GLTFLoader(mManager);

    // Load a glTF resource
    var configToUse;
    if (document.getElementById("utilisateur_select").textContent == "theo_ajn"){
        configToUse = '../data/theo_ajn_sftr/sftr_car_ready_theoCar.gltf'
    } else if (document.getElementById("utilisateur_select").textContent == "nathan_bo"){
        configToUse = '../data/nathan_bo_sftr/sftr_car_ready_nathanCar.gltf'
    } else {
        configToUse = '../data/sftr/sftr_car.gltf'
    }
    gltfLoader.load(
    // resource URL
    
    configToUse,
    // called when the resource is loaded
    function ( gltf ) 
    {
        //Take areference of the current gltf model
        mC3DGLTF = gltf;

        mC3DGLTF.scene.traverse(function(obj)
        {
            if(obj instanceof THREE.Mesh)
            {   
            	
            	//Assign new materials
                if(obj.material.name=="Mt_Abs_Black_Gloss")
                    obj.material =Mt_Abs_Black_Gloss ;
                if(obj.material.name=="Mt_ABS_Black_Mat")
                    obj.material = Mt_ABS_Black_Mat;
                if(obj.material.name=="Mt_Abs_White_Mat")
                    obj.material = Mt_Abs_White_Mat;
                if(obj.material.name=="Mt_AlloyWheels")
                    obj.material = Mt_AlloyWheels;
                if(obj.material.name=="Mt_AventadorAtlas")
                    obj.material = Mt_AventadorAtlas;
                if(obj.material.name=="Primary")
                    obj.material = Primary;
                if(obj.material.name=="Caliper")
                    obj.material = Caliper;
                if(obj.material.name=="Mt_Chrome")
                    obj.material = Mt_Chrome;
                if(obj.material.name=="Mt_Glass_Lens")
                    obj.material = Mt_Glass_Lens;
                if(obj.material.name=="Mt_Glass_Translucent")
                    obj.material =Mt_Glass_Translucent ;
                if(obj.material.name=="Mt_Interior_Black")
                    obj.material =Mt_Interior_Black ;
                if(obj.material.name=="Mt_Metal_Black_Glossy")
                    obj.material = Mt_Metal_Black_Glossy;
                if(obj.material.name=="Mt_Metal_Brushed")
                    obj.material =Mt_Metal_Brushed ;
                if(obj.material.name=="Mt_Mirror")
                    obj.material = Mt_Mirror;
                if(obj.material.name=="Mt_MirrorCover")
                    obj.material = Mt_MirrorCover;
                if(obj.material.name=="Mt_Reflector_BL")
                    obj.material = Mt_Reflector_BL;
                if(obj.material.name=="Mt_Reflector_RL")
                    obj.material = Mt_Reflector_RL;
                if(obj.material.name=="Mt_Reflector_TL")
                    obj.material = Mt_Reflector_TL;
                if(obj.material.name=="Mt_TurnLights")
                    obj.material = Mt_TurnLights;
                if(obj.material.name=="Mt_Tyres")
                    obj.material =Mt_Tyres ;
                if(obj.material.name=="Mt_WindScreens")
                    obj.material = Mt_WindScreens;


            }					

			
			//If this is a rim object and not the first type
            if(obj.name.includes('Obj_Rim') && !obj.name.includes(config.wheel_designs.designs[parseInt(configUser[2])].value))            	
            	obj.visible=false;
        });



        //Add the gltf object to the scene
        mScene.add( mC3DGLTF.scene );
    }); 
}

//Function will be called with load progress
function OnLoadProgress(_item, _loaded, _loaded)
{
    //Show loading progress
    $('.preloader .desc').text("("+_loaded+"/"+_loaded+")");
}

//Function will be called when everything loaded succesfully
function OnLoadCompleted()
{
    //Log here
    console.log('All data loaded successfully');
    
    //Fade out the preloader and remove it
    $('.preloader')
    .fadeOut(900,function()
    { 
        //Remove the prelaoder
        $(this).remove();       

        //Display the intro skip button after a delay
        $('.welcome-screen .ws-wrapper button').fadeIn(900);
        // $('.welcome-screen .ws-wrapper button').delay(9000).fadeIn(900);
    });    

    // Start the cinematic
    mCineShotsList[0].start();
    //Start the audio track
    // mAudioTrack.play();
}


//Function will be called when a load error occured
function OnLoadError(item)
{
    //Display load error
    $('.preloader .title').text("Chargement des textures");
    //Display the load error file
    $('.preloader .desc').text(item);
}

//Function to add the cinematic sequence
function AddCinemeticSequence()
{   
    //The cinematic sequence
    var mSequence = 
    [
        {   // 3/4 gauche
            sP:{x:-28, y:-26, z:3.5},
            eP:{x:-23, y:-21, z:3.5},
            cR:{x:0.0, y:-45, z:0.0},
            tD:6500
        },
        {   // Front avant en haut
            sP:{x:-24, y:0,   z:2.5},
            eP:{x:-24, y:0,   z:5.5},
            cR:{x:0.0, y:-90, z:0.0},
            tD:5000
        },
        {   // Light gauche
            sP:{x:-16.50, y:-5.75,  z:5.75},
            eP:{x:-12.00, y:-8.50,  z:5.75},
            cR:{x:-30.79, y:-42.36, z:-19.55},
            tD:7000
        },
        {   // roue avant gauche
            sP:{x:-10.50, y:-8.0,   z:1.50},
            eP:{x:-14.00, y:-12.0,  z:1.00},
            cR:{x:10.12,  y:-43.88, z:-7.06},
            tD:7000
        },
        {   // latéral gauche
            sP:{x:-13,    y:-14, z:14},
            eP:{x:11,     y:-14, z:14},
            cR:{x:-38.28, y:0.0, z:0.0},
            tD:12000
        },
        {   // Light arrière
            sP:{x:26.85, y:-1.0,  z:5.35},
            eP:{x:26.85, y:0.70,  z:5.35},
            cR:{x:-0.0, y:90.0, z:-0.0},
            tD:7000
        },
        {   // 3/4 arriere gauche
            sP:{x:17, y:-7.5,  z:2.5},
            eP:{x:17, y:-7.5,  z:5.0},
            cR:{x:0,  y:58, z:5.35},
            tD:7000
        },
        {   // Portière gauche
            sP:{x:-7.3, y:-7.5,  z:5.0},
            eP:{x:2.2, y:-7.5,   z:5.35},
            cR:{x:-30.65, y:-55.53, z:-1.88},
            tD:5000
        }
    ];

    for(var i=0;i<mSequence.length;i++)
    {
        //Get the tween starting point vector
        var tweenStartPoint = CoordR2L(mSequence[i].sP);
        //Get the tween end point vector
        var tweenEndPoint = CoordR2L(mSequence[i].eP);
        //Get the duration for this tween
        var tweenDuration = mSequence[i].tD;
        //Get the distance for this tween
        var tweenDistance = distanceVector(tweenEndPoint, tweenStartPoint);

        var cineShot = new TWEEN.Tween(tweenStartPoint).to(tweenEndPoint, tweenDuration).easing(TWEEN.Easing.Linear.None)
        .onStart( (function(id, ctx)
        {
            return function() 
            { 
                //Set the new camera orientation
                mCineCamera.rotation.copy(Vector3DegToRadian(mSequence[id].cR)); 

            };

        })(i,this))             
        .onUpdate((function(endPoint, totalDistance)
        {
            return function()
            {
                //Tween the postion
                mCineCamera.position.set(this.x,this.y,this.z);
            };

        })(tweenEndPoint, tweenDistance));

        //Add the cine shot to shots list
        mCineShotsList.push(cineShot);

        //Chain the shot to previous
        if(i>0)
            mCineShotsList[i-1].chain(mCineShotsList[i]);
    }

    //Event will be triggered when the last tween is completed
    mCineShotsList[mCineShotsList.length-1].onComplete(function()
    {
        //Skip the intro to orbit camera
        SkipIntro();
    });

    //If debug mode enabled, add camera helper for cine cam
    if(IS_DEBUG)
        mScene.add( new THREE.CameraHelper( mCineCamera ) );        
}


//Start the update function
Update();

function Update()
{
	//If FPS enabled, start profiling
    if(SHOW_FPS)
        stats.begin();

    //Update the tween animations
    TWEEN.update(); 

    //Update the orbit controls
    if(mMainCamera == mOrbitCamera)
       mOrbitControls.update();   

    //Render the scene through camera
    mRenderer.render(mScene, mMainCamera);

	//Enable profiling if fps enabled
    if(SHOW_FPS)
        stats.end();

    //Request updation of next frame
    requestAnimationFrame(Update);
}

//Function will be called whenver the context is resized
function OnContextResized()
{
    //Recalculate the aspect ratio
    mMainCamera.aspect = window.innerWidth/window.innerHeight;
    //Set new renderer size
    mRenderer.setSize(window.innerWidth, window.innerHeight);
    //Update the projection matrix
    mMainCamera.updateProjectionMatrix();
}

/*------------------------------------------------------------
                CONFIGURATION PALETTE
 -----------------------------------------------------------*/

//Function to load the configurration palette
function LoadConfigurator(mConfigJSON)
{
    //The config palette element
    var config_palette

    //Append the cofigurator palette to body
    $('body').append(config_palette);   

    //Upon clicking the config tab
    $('.nav-config-item',config_palette).click(function()
    {
        //Get the clicked tab id
        var configID = $(this).data('id');  

        //If the palette is already active
        if($(this).hasClass("active"))
        {
            //Empty the container
            $('#'+configID+" ul",config_palette).empty();
            $(this).removeClass('active');
            //Do not execute further
            return;
        }

        //Deactivate all config tab links
        $('.nav-config-item',config_palette).removeClass('active');
        //Hide all config tab contents
        $('.palette-content',config_palette).hide();                       
        
        //Add object/texture swatch if wheel design
        if(configID=='wheel_designs')     
        {
            AddTextureSwatches($('#'+configID+" ul",config_palette),mConfigJSON[configID],function(targetName)
            {
                //Set the corresponding entity object visible
                SetEntityVisible(mC3DGLTF.scene,targetName);

            });
        }
        //Add the color swatches
        else                
        { 
            AddColorSwatches($('#'+configID+" ul",config_palette), mConfigJSON[configID], (configID =='mirror_colors') ? mCBodyColor: null, function(color, targetMat)
            {                   
                //Set the corresponding entity color
                SetEntityColor(color, targetMat);
                //If changed body color, change mirror color cover also
                if(targetMat=='Primary')
                    SetEntityColor(color,'Mt_MirrorCover');

            });
        }
                 
        //Set the current clicked tab active
        $('.nav-config-item[data-id="'+configID+'"]',config_palette).addClass("active");
        //Show the clicked palette conent
        $('#'+configID, config_palette).show();     
    });    
    
}

//Function to add color swatches
function AddColorSwatches(container, configEntity, def, onClickCallback)
{		
	//Empty the container
	$(container).empty();

	//Get the color array
	var colorList = configEntity.colors.slice(0);;

	//If default color available
	if(def)
		colorList.unshift({"name":"Current","value":def});

	//Loop through each colors for config entity
	for(var i=0;i<colorList.length;i++)
	{
		var colorSwatch = $('<li><button class="color-swatch"><span>'+colorList[i].name+'</span></button></li>');            
		//Set the color swatch
	 	$('button', colorSwatch).css({"background":colorList[i].value});	
		//Trigger the callback with data on clicking swatch button
	 	$('button',colorSwatch).click(function(color, target) { return function(){onClickCallback(color,target)};}(colorList[i].value,configEntity.target));
	 	//Add the color swatch to corresponding container
	 	$(container).append(colorSwatch);
	}	
}

//Function to add texture swatches
function AddTextureSwatches(container, configEntity, onClickCallback)
{	
	//Empty the container
	$(container).empty();

	//Loop through each entry in config entity
	for(var i=0;i<configEntity.designs.length;i++)
	{
		var url="../data/sftr/"+configEntity.designs[i].thumb;
		//Create the texture swatch object
		var textureSwatch = $('<li><button class="texture-swatch"><span>'+configEntity.designs[i].name+'</span></button></li>');
		$('button',textureSwatch).css({'background-image':'url('+url+')'});
		//Trigger the callback with data on clicking swatch button
		$('button', textureSwatch).click(function(targetName){return function(){onClickCallback(targetName);};}(configEntity.designs[i].value));
		//Add the texture swatch to corresponding container
		$(container.append(textureSwatch));

       
	}
}


function savesConfiguration() {
    window.location.replace("./custom_car.php?codeSaves="+configUser.join("_"));
}


function savesColor(color, targetMat){
    console.log(configUser)
    if (targetMat == "Primary"){
        for (let i = 0; i < mConfigJSON.body_colors.colors.length; i++) {
            if (color == mConfigJSON.body_colors.colors[i].value){
                configUser[0] = i.toString()
                return i
            }
        }
    }
    else if (targetMat == "Mt_AlloyWheels"){
        for (let i = 0; i < mConfigJSON.wheel_colors.colors.length; i++) {
            if (color == mConfigJSON.wheel_colors.colors[i].value){
                configUser[3] = i.toString()
                return i
            }
        }
    }

    else if (targetMat == "Caliper"){
        for (let i = 0; i < mConfigJSON.caliper_colors.colors.length; i++) {
            if (color == mConfigJSON.caliper_colors.colors[i].value){
                configUser[4] = i.toString()
                return i
            }
        }
    }

        
    }
    
    

function savesWheels(targetName){
    for (let i = 0; i < mConfigJSON.wheel_designs.designs.length; i++) {
        // console.log(targetName)
        // console.log(mConfigJSON.wheel_designs.designs[i].value)
        if (targetName == mConfigJSON.wheel_designs.designs[i].value){
            configUser[2] = i.toString()
            console.log(configUser)
        }
    }
}


//Function to set the color of an entityt
function SetEntityColor(color, targetMat)
{		
	mC3DGLTF.scene.traverse(function(obj)
    {
        if(obj instanceof THREE.Mesh)
        {
            if(obj.material.name == targetMat)
            {                
                //Set the material color
                obj.material.color.setHex(webColorToHex(color));

                //Cache if current body color changed
                if(targetMat == 'Primary')
                	mCBodyColor = color;
                    savesColor(color, targetMat)

                    // console.log(obj.material)

                //Return after changing one material
                // console.log(configEntity.designs[i].value);
                return;
            }
        }
    });
}

//Function to set the entity visibility
function SetEntityVisible(nodeObject, targetName)
{
	//Traverse through the object
	nodeObject.traverse(function(object)
	{
		//If this is a rim object
		if(object.name.includes('Obj_Rim'))
		{
			//Show if name matches target, else hide it
			if(object.name.includes(targetName))
				object.visible=true;
			else
				object.visible=false;

            savesWheels(targetName)
		}
		
	});
}


//Function to set orbit camera as new camera
function SetOrbitCamera()
{
    //Create new orbit controls
    mOrbitControls = new THREE.OrbitControls(mOrbitCamera,mRenderer.domElement);
    mOrbitControls.target = mOrbitCamTarget;
    mOrbitControls.enablePan = false;
    mOrbitControls.enableZoom = true; 
    mOrbitControls.enableDamping = true;
    mOrbitControls.minPolarAngle = 0.75; //Uper
    mOrbitControls.maxPolarAngle = 1.6; //Lower
    mOrbitControls.dampingFactor = 0.07;
    mOrbitControls.rotateSpeed = 0.07;
    mOrbitControls.minDistance = 16
    mOrbitControls.maxDistance = 32;
    mOrbitControls.autoRotate = false;
    mOrbitControls.autoRotateSpeed = 0.05;

    //Set orbit camera as main camera
    mMainCamera = mOrbitCamera;

    //Recalculate context
    OnContextResized();
}

/*------------------------------------------------------------
                        HELPER FUNCTIONS
 -----------------------------------------------------------*/
//Function to create an area light
function CreateAreaLight(scene, color, intensity, size, visible)
{
    //Create an area light with parameters
    var rectLight = new THREE.RectAreaLight( color, intensity, size.x, size.y );    
    //Add the ligh to the scene
    scene.add( rectLight );

    //Add visibility and back mesh if required
    if(visible)
    {
        var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial() );
        rectLightMesh.scale.x = rectLight.width;
        rectLightMesh.scale.y = rectLight.height;
        rectLight.add( rectLightMesh );

        var rectLightMeshBack = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
        rectLightMeshBack.rotation.y = Math.PI;
        rectLightMesh.add( rectLightMeshBack );
    }

    //Return the created light
    return rectLight;
}

 //Function to convert vector3 from degree to radian
 function Vector3DegToRadian(_vector3)
{
    //The per dgree converter
    var degree = Math.PI/180;
    //Return the new vector3 in radian
    return  new THREE.Euler(_vector3.x*degree, _vector3.y * degree, _vector3.z * degree, 'XYZ');
}

//Function to convert points from right hand to left hand coordinate system
function CoordR2L(_point)
{
    //Swap Y and Z with Z=-Y
    return { x:_point.x, y:_point.z, z:-_point.y };
}

//Function to get the distance between two Vector3
function distanceVector( V3A, V3Bs )
{
    //Get the vector3 values delta
    var deltaX = V3A.x - V3Bs.x;
    var deltaY = V3A.y - V3Bs.y;
    var deltaZ = V3A.z - V3Bs.z;
    
    //Return the calculated distance
    return Math.sqrt( deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ );
}

//Function to load texture corrected
function LoadTextureCorrected(_loader, _path)
{
    //Load the texture
    var texture = _loader.load(_path);
    //Set repeat wrapping
    texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
    //Flip texture vertically
    texture.repeat.y    = - 1;
    //Return the corrected texture
    return texture;
}

//Function to convert webcolor to hex color
function webColorToHex(color)
{
	return parseInt(color.replace("#","0x"));
}

//Function to get a random int (min,max inclusive)
function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
