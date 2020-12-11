import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ADMIN_ROUTES: RouteInfo[] = [
    {
        path: '/dashboard', title: 'Dashboard', icon: 'zmdi zmdi-view-dashboard', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/clients', title: 'Clients', icon: 'zmdi zmdi-book-image', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/wifiBeacons', title: 'Wifi Beacon', icon: 'zmdi zmdi-portable-wifi', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Tracking', icon: 'zmdi zmdi-satellite', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/trackingCameras', title: 'Cameras', icon: 'zmdi zmdi-camera', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/visitor-groups', title: 'Visitors', icon: 'zmdi zmdi-camera', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    {
        path: '', title: 'Campaign', icon: 'zmdi zmdi-flag', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '', title: 'FR Interactive Video', icon: 'zmdi zmdi-collection-video', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/frInteractiveCameras', title: 'Cameras', icon: 'zmdi zmdi-camera', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/bodyGestures', title: 'Body Gestures', icon: 'zmdi zmdi-male', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/facialExpressions', title: 'Facial Expressions', icon: 'zmdi zmdi-mood', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
            ] },
            { path: '', title: 'SmileToVote', icon: 'zmdi zmdi-face', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/smileToVoteCameras', title: 'Cameras', icon: 'zmdi zmdi-camera', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
            ] }
        ]
    },
    {
        path: '/licenses', title: 'Licenses', icon: 'zmdi zmdi-portable-wifi', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
];
