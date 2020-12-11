import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export var CLIENT_ROUTES: RouteInfo[] = [
    {
        path: '/dashboard', title: 'Dashboard', icon: 'zmdi zmdi-view-dashboard', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }
];

export const REGISTRATION = {
    path: '/registration', title: 'Registration', icon: 'zmdi zmdi-book-image', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
};

export const WIFI_BEACON_REPORT = {
    path: '/wifiBeaconReport', title: 'Wifi Beacon', icon: 'zmdi zmdi-portable-wifi', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
};

export const ACCOUNT = {
    path: '/account', title: 'account', icon: 'zmdi zmdi-portable-wifi', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
};

export const TRACKING = {
    path: '', title: 'Tracking', icon: 'zmdi zmdi-satellite', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
        { path: '/visitor-groups', title: 'Visitors', icon: 'zmdi zmdi-camera', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/trackingCameraConfig', title: 'Cameras', icon: 'zmdi zmdi-camera', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/trackingReport', title: 'Basic Tracking', icon: 'zmdi zmdi-male', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        { path: '/liveTrackingReport', title: 'Live Demographics', icon: 'zmdi zmdi-mood', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
};

export var CAMPAIGN = {
    path: '', title: 'Campaign', icon: 'zmdi zmdi-flag', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: []
};

export const FR_INTERACTIVE_VIDEO = { 
    path: '/frInteractiveVideo', title: 'FR Interactive Video', icon: 'zmdi zmdi-collection-video', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] 
};

export const SMILETOVOTE = { 
    path: '/smileToVote', title: 'SmileToVote', icon: 'zmdi zmdi-face', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] 
};
