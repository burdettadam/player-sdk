/**
 * ModuleManager
 */

define([
    './modules/base/CoreModule',
    'dojo/_base/array',
    'dojo/_base/declare',
    'dojo/_base/Deferred',
    'dojo/_base/lang',
    'dojo/on',
    'sdk/modules/base/UserRegPlayerMediator',
    'sdk/base/util/GoogleIma',
    'sdk/modules/SyncBanners',
    'sdk/modules/MediaPlayer',
    'sdk/modules/NowPlayingApi',
    'sdk/modules/Npe',
    'sdk/modules/PlayerWebAdmin',
    'sdk/modules/TargetSpot',
    'sdk/modules/UserRegistration'
], function (coreModule, array, declare, Deferred, lang, on, UserRegPlayerMediator, GoogleIma, SyncBanners, MediaPlayer, NowPlayingApi, Npe, PlayerWebAdmin, TargetSpot, UserRegistration ) {

//"use strict";

var moduleManager = declare([ coreModule ], {

    constructor:function(config, target)
    {
        console.log('moduleManager::constructor');

        //this.coreModules array keep a reference to the loaded modules. It contains: [ { id:'moduleId', module:moduleInstance }, ... ]
        this.coreModules = [];

        this.modulesQueue = ( this.config && this.config.coreModules ) ? lang.clone( this.config.coreModules ) : [];

        this.moduleReadyHandler = on( this.target, 'module-ready', lang.hitch(this, this._onModuleComplete) );
        this.moduleErrorHandler = on( this.target, 'module-error', lang.hitch(this, this._onModuleComplete) );

        this.inherited(arguments); //this does not work if "use strict" is set
        
    },

    loadModules:function()
    {
        console.log( '%cmoduleManager::loadModules', 'background:#000;color:#fff' );
        var self = this;
        if ( this.modulesQueue.length == 0 ) return;        

        for( var i=0; i < this.config.coreModules.length; i++ )
        {

            this.loadModule( this.config.coreModules[i].id, this._getModuleConfigById( this.config.coreModules[i].id ) );
        }

    },

    loadModule:function( moduleId, moduleConfig )
    {
        console.log('moduleManager::loadModule - moduleId:' + moduleId);

        var moduleInstance = null;
        switch (moduleId) {
            case 'SyncBanners':
                moduleInstance = SyncBanners;
                break;
            case 'MediaPlayer':
                moduleInstance = MediaPlayer;
                break;
            case 'Npe':
                moduleInstance = Npe;
                break;
            case 'NowPlayingApi':
                moduleInstance = NowPlayingApi;
                break;
            case 'PlayerWebAdmin':
                moduleInstance = PlayerWebAdmin;
                break;
            case 'TargetSpot':
                moduleInstance = TargetSpot;
                break;
            case 'UserRegistration':
                moduleInstance = UserRegistration;
            default:

        }
        if( moduleInstance ){
            this._instanciateCurrentModule( moduleInstance, moduleId, moduleConfig );
        }

    },

    getModuleById:function( moduleId )
    {
        var module = null;

        array.forEach( this.coreModules, function(item, index){
            if (item.id == moduleId )
                module = item.module;
        },this );

        return module;
    },

    _instanciateCurrentModule:function( Module, moduleId, moduleConfig )
    {
        var module = new Module( moduleConfig, this.target );

        //Adding the module before starting it.
        this.coreModules.push( { id:moduleId, module:module } );

        //Start the module
        module.start();
    },

    _removeCurrentModuleFromQueue:function( currentModuleId )
    {
        //Remove the current module from this.modulesQueue
        var spliceStartIndex = -1;
        array.forEach(this.modulesQueue, function( item, index ){
            if ( item.id == currentModuleId )
                spliceStartIndex = index;
        },this);

        if ( spliceStartIndex > -1 )
            this.modulesQueue.splice(spliceStartIndex, 1);
    },

    //module completed = Ready or Error
    _onModuleComplete:function( e )
    {
        console.log( 'moduleManager::_checkModulesComplete - module Id = '+ e.data.id +' - modulesQueue.length = ' + this.modulesQueue.length );

        this._removeCurrentModuleFromQueue( e.data.id );
        var self = this;

        if ( this.modulesQueue.length == 0 )
        {
            this.moduleReadyHandler.remove();
            this.moduleErrorHandler.remove();

            //UserRegistration - MediaPlayer Mediator
            if ( this.getModuleById('UserRegistration') && this.getModuleById('MediaPlayer') ) {
                var mediator = new UserRegPlayerMediator( lang.hitch(this, this.getModuleById), this.target );
            }

            var mediaPlayerModule = this.getModuleById( 'MediaPlayer' );
            
            //load ima library
            if( mediaPlayerModule != undefined && mediaPlayerModule.tech.type == 'Html5' && !this.config.adBlockerDetected  ){


                var imaHelper = new GoogleIma();
                var imaDeferred = imaHelper.init();

                imaDeferred.then(function(){
                    //Success !
                    console.log('%cmoduleManager::_onModuleComplete - all modules have been loaded : PLAYER-READY','background:#990000;color:#fff');

                    self.emit( 'player-ready' );

                }, function(err){
                    //Error
                    self.emit( 'player-ready' );                   

                } );



            } else {
                console.log('%cmoduleManager::_onModuleComplete - all modules have been loaded : PLAYER-READY','background:#990000;color:#fff');

                this.emit( 'player-ready' );            

            }

            if( this.config.adBlockerDetected ){
                 this.emit( 'ad-blocker-detected', {message: 'Ad Blocker is activated' } );
            }

        }
    },

    /**
     * Return the module configuration
     *
     * @param {string} moduleId The module id (example: MediaPlayer)
     * @return {object} The module configuration object
     *
     * @ignore
     */
    _getModuleConfigById:function( moduleId )
    {
        var moduleConfig = {};

        if( this.config && this.config.coreModules )
        {
            array.forEach(this.config.coreModules, function(item){
                if (item.id == moduleId )
                    moduleConfig = item;
            },this);
        }

        return moduleConfig;
    }
});

return moduleManager;

});
