import * as Atalasoft from "web-document-viewer";
import * as jQuery from "jquery";

var maxUploadSizeMb = 9;
let viewer = new Atalasoft.Controls.WebDocumentViewer({
        parent: jQuery('#viewer'),
        toolbarparent: jQuery('.atala-document-toolbar'),
        allowforms: true,
        allowannotations: true,
        allowtext: true,
        savepath: 'saved',
        serverurl: 'wdv',
        direction:Atalasoft.Utils.ScrollDirection.Vertical,
        upload: {
            enabled: true,
            uploadpath: 'uploaded',
            allowedfiletypes: '.jpg,.pdf,.png,.jpeg,image/tiff',
            allowedmaxfilesize: maxUploadSizeMb * 1024 * 1024,
            allowmultiplefiles: true,
            allowdragdrop: true,
            filesuploadconcurrency: 3
        },
        annotations: {
            stamps:[
                {
                    name:'Approved',
                    type:Atalasoft.Annotations.AnnotationTypes.stamp,
                    fill:{
                        color:'green',
                        opacity:0.5
                    },
                    outline:{
                        color:'#43BC6F'
                    },
                    text:{
                        value:'This document has been approved',
                        align: 'left',
                        font: {
                            bold: false,
                            color: '#B9C89D',
                            family: 'Georgia',
                            size: 24
                        }
                    }

                },
                {
                    name: 'Approved2',
                    type: Atalasoft.Annotations.AnnotationTypes,
                    fill: {
                            color: 'green',
                            opacity: 0.5
                        },
                    outline: {
                            color: 'Black'
                        },
                    text: {
                            value: 'Approved',
                            align: 'left',
                            font: {
                                bold: false,
                                color: 'black',
                                family: 'Arial',
                                size: 24
                            }
                        },
                    cornerradius: 50,
                    burn: false
                }
            ]
        },
    });

let thumbL = new Atalasoft.Controls.WebDocumentThumbnailer({
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

let appendStatus = function(status:string){
    jQuery("#status").append(status + "<br>")
}

let onDocSaved = function(event){
    if (event.success) {
        appendStatus("Document saved to: " + event.fileName);
        appendStatus(event.customData.Message);
    } else {
       appendStatus("Failed to save document");
    }
}

let annoTextChangedHandler = function(event:Atalasoft.Controls.annotationtextchanged_event){
    appendStatus('Annotation text changed to: ' + event.annotation.text.value);
}

let fileAddToUploadHandler =function(event:Atalasoft.Controls.fileaddedtoupload_event){
    if(event.success){
        appendStatus("File "+ event.filename +"is ready to upload")
    }else{
        switch(event.reason){
            case 1:
            appendStatus("The file size is greater then permitted");
            break;
        case 2:
            appendStatus("Prohibited file type.");
            break;
        case 3:
            appendStatus("File with same name is already added to upload.");
            break;
        }
    }
}

viewer.bind('annotationtextchanged',annoTextChangedHandler)
viewer.bind('documentsaved',onDocSaved)
thumbL.bind('documentloaded',function(){
    appendStatus('Document loaded')
})
viewer.bind('fileaddedtoupload',fileAddToUploadHandler)


jQuery("#FileSelectionList").on("change", function() {
     thumbL.openUrl(jQuery("#FileSelectionList").val().toString())
});