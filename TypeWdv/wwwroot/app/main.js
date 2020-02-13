define(["require", "exports", "web-document-viewer", "jquery"], function (require, exports, atala, jQuery) {
    "use strict";
    exports.__esModule = true;
    var maxUploadSizeMb = 9;
    var viewer = new atala.Controls.WebDocumentViewer({
        parent: jQuery('#atalaviewer'),
        toolbarparent: jQuery('.atala-document-toolbar'),
        allowforms: true,
        allowannotations: true,
        allowtext: false,
        savepath: 'saved',
        serverurl: 'wdv',
        upload: {
            enabled: true,
            uploadpath: 'uploaded',
            allowedfiletypes: '.jpg,.pdf,.png,.jpeg,image/tiff',
            allowedmaxfilesize: maxUploadSizeMb * 1024 * 1024,
            allowmultiplefiles: true,
            allowdragdrop: true,
            filesuploadconcurrency: 3
        }
    });
    var thumb = new atala.Controls.WebDocumentViewer({
        parent: jQuery('#thumbLeft'),
        serverurl: 'wdv',
        maxwidth: 240,
        minwidth: 60,
        viewer: viewer,
        allowannotations: true,
        allowforms: true,
        allowdragdrop: true,
        showthumbcaption: true,
        thumbcaptionformat: 'p. {0}',
        tabular: true,
        columns: 2
    });

    return {
        viewer: viewer
    }
});
