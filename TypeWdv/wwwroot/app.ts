import * as atala from "web-document-viewer";
import * as jQuery from "jquery";

var maxUploadSizeMb = 9;
export let viewer = new atala.Controls.WebDocumentViewer({
        parent: jQuery('#atalaviewer'),
        toolbarparent: jQuery('.atala-document-toolbar'),
        allowforms: true,
        allowannotations: true,
        allowtext: true,
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
        },
    });

export let thumbL = new atala.Controls.WebDocumentThumbnailer({
    parent:jQuery('#thumbLeft'),
    serverurl: 'wdv',
    maxwidth: 240,
    minwidth: 60,
    viewer: viewer,
    allowannotations: true,
    allowforms:true,
    allowdragdrop: true,
    showthumbcaption:true,
    thumbcaptionformat:'p. {0}',
    tabular: true,
    documenturl: 'images/Test.pdf',
});

jQuery("#FileSelectionList").on("change", function() {
     thumbL.OpenUrl(jQuery("#FileSelectionList").val().toString())
});