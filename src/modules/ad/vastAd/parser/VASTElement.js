/**
 * VAST Element
 */
define([], function(){

    var vastElement = {

        ID: 'id',
        NODEKIND_ELEMENT: 'element',
        INLINE: 'InLine',
        WRAPPER: 'Wrapper',
        AD_SYSTEM: 'AdSystem',
        AD_TITLE: 'AdTitle',
        DESCRIPTION: 'Description',
        ERROR: 'Error',
        IMPRESSION: 'Impression',
        TRACKING_EVENTS: 'TrackingEvents',
        COMPANION_ADS: 'CompanionAds',
        COMPANION_CLICK_THROUGH: 'CompanionClickThrough',
        LINEAR: 'Linear',
        NON_LINEAR_ADS: 'NonLinearAds',
        NON_LINEAR: 'NonLinear',
        NON_LINEAR_CLICK_THROUGH: 'NonLinearClickThrough',
        TRACKING: 'Tracking',
        EVENT: 'event',
        DURATION: 'Duration',
        AD_ID: 'AdID',
        MEDIA_FILES: 'MediaFiles',
        MEDIA_FILE: 'MediaFile',
        VIDEO_CLICKS: 'VideoClicks',
        CLICK_THROUGH: 'ClickThrough',
        CLICK_TRACKING: 'ClickTracking',
        CUSTOM_CLICK: 'CustomClick',
        COMPANION: 'Companion',
        ALT_TEXT: 'AltText',
        AD_PARAMETERS: 'AdParameters',
        BITRATE: 'bitrate',
        MIN_BITRATE: 'minBitrate',
        MAX_BITRATE: 'maxBitrate',
        CODEC: 'codec',
        DELIVERY: 'delivery',
        TYPE: 'type',
        WIDTH: 'width',
        HEIGHT: 'height',
        EXPANDED_WIDTH: 'expandedWidth',
        EXPANDED_HEIGHT: 'expandedHeight',
        CREATIVE_TYPE: 'creativeType',
        SEQUENCE: 'sequence',
        SCALABLE: 'scalable',
        MAINTAIN_ASPECT_RATIO: 'maintainAspectRatio',
        API_FRAMEWORK: 'apiFramework',
        IFRAME_RESOURCE: 'IFrameResource',
        HTML_RESOURCE: 'HTMLResource',
        STATIC_RESOURCE: 'StaticResource',
        CREATIVE_VIEW: 'creativeView',
        MIN_SUGGESTED_DURATION: 'minSuggestedDuration',

        /* Added with DAAST */
        EXPIRES:'Expires',
        CATEGORY: 'Category',
        SURVEY: 'Survey',
        ADVERTISER: 'Advertiser',
        AUDIO_INTERACTIONS:'AudioInteractions',
        LOGO_TILE:'logoTile',
        LOGO_TITLE:'logoTitle',
        LOGO_ARTIST:'logoArtist',
        LOGO_URL:'logoURL'
    };

    return vastElement;

});
