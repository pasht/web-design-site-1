/**
 * Created by administrator on 3/11/17.
 */
"use strict";
// Source: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
;(function() {
    // helpers
    var regExp = function(name) {
        return new RegExp('(^| )'+ name +'( |$)');
    };
    var forEach = function(list, fn, scope) {
        for (var i = 0; i < list.length; i++) {
            fn.call(scope, list[i]);
        }
    };

    // class list object with basic methods
    function ClassList(element) {
        this.element = element;
    }

    ClassList.prototype = {
        add: function() {
            forEach(arguments, function(name) {
                if (!this.contains(name)) {
                    this.element.className += ' '+ name;
                }
            }, this);
        },
        remove: function() {
            forEach(arguments, function(name) {
                this.element.className =
                    this.element.className.replace(regExp(name), '');
            }, this);
        },
        toggle: function(name) {
            return this.contains(name)
                ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function(name) {
            return regExp(name).test(this.element.className);
        },
        // bonus..
        replace: function(oldName, newName) {
            this.remove(oldName), this.add(newName);
        }
    };

    // IE8/9, Safari
    if (!('classList' in Element.prototype)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function() {
                return new ClassList(this);
            }
        });
    }

    // replace() support for others
    if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
})();

//
function outerHeight(el) {
    var height = el.offsetHeight;
    var style = getComputedStyle(el);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
}

//
function stickToBottom(){
    var body = document.body,
        html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight,body.clientHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    //
    console.log('Max height:'+height+'px');
    var headerElement = document.getElementsByTagName('header')[0];
    var headerHeight = outerHeight(headerElement);
    var footerElement = document.getElementsByTagName('footer')[0];
    var footerHeight = outerHeight(footerElement);
    var container = document.getElementsByClassName('container')[0];
    container.style.minHeight = height - (headerHeight+footerHeight)+'px';
}



//
window.addEventListener('resize',function(){
    stickToBottom();
});

window.addEventListener('load',function(){
    stickToBottom();
});


var Portfolio = (function(){
    // register click events for portfolio gallery
    function init(){
        var _modal = document.getElementsByClassName('modal')[0];
        var gallery = document.getElementById('portfolio');
        if(gallery){
            var galleryItems = gallery.getElementsByClassName('gallery-item');
            for(var i=0;i<galleryItems.length;i++){
                galleryItems[i].addEventListener('click',function (evt) {
                    var _modal = document.getElementsByClassName('modal')[0];
                    _modal.style.opacity = "1";
                    _modal.style.zIndex = "10";
                    // Get Image url
                    var url = window.getComputedStyle(evt.target,false).backgroundImage.match(/url\(["|']?([^"']*)["|']?\)/)[1];
                    _modal.getElementsByClassName('modal-content')[0].innerHTML ='<img src="'+url+'">';
                })
            }
        }
    }
    // Close modal
    function closeModal(){
        var _modal = document.getElementsByClassName('modal')[0];
        _modal.style.opactity="0";
        _modal.style.zIndex = "-1";
        //_modal.getElementsByClassName('modal-content')[0].innerHTML = "";
    }

    // Module functions
    return {
        init:init,
        closeModal:closeModal
    }
})();
// Initialize Portfolio Module
if(document.getElementById('portfolio'))
    Portfolio.init();
