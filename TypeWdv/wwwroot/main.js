requirejs.config({
    baseUrl: 'node_modules',
    paths: {
        'jquery': 'jquery/dist/jquery.min',
        'jquery-ui': 'jquery-ui-dist/jquery-ui.min',
        'raphael': 'raphael/raphael.min',
        'clipboard': 'clipboard/dist/clipboard.min',
        'web-document-viewer': 'web-document-viewer/atalaWebDocumentViewer',
        'app': '../app'
    }
});
require(['app/app']);
