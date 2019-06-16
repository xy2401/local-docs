/* global window document labels lang_menu_2_div hljs */
var docs = (function(docs){
    /*
     * NOTE: The docs module will not work properly unless the init function is called, as the jQuery object is dynamically
     * loaded using requirejs.
     */
    var jQuery = window.jQuery;
    var listeners = [];
    var ready = false;

    // BEGIN UTIL FUNCTIONS
    docs.utils = (function() {
        var exports = {};

        exports.setCookie = function(name, value, expires, path, domain, secure) {
            document.cookie = name + "=" + value +
            ((expires) ? ";expires=" + expires.toGMTString() : "") +
            ((path) ? ";path=" + path : "");
            // +
            //		((domain) ? ";domain=" + domain : "") +
            //		((secure) ? ";secure" : "");
        };

        exports.isSafari = function() {
            return navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1;
        };

        exports.scrollToTarget = function() {
            if (jQuery(window.location.hash).length > 0) {
                jQuery('html, body').animate({ scrollTop: jQuery(window.location.hash).offset().top}, 1000);
            }
        };

        exports.getCurrentPageName = function() {
            return window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
        };

        exports.escapeElementId = function(elem) {
            return elem.replace('&', '\\&');
        };

        return exports;
    }());
    // END UTIL FUNCTIONS

    // BEGIN TOC FUNCTIONS
    docs.toc = (function(utils) {
        var num_days = 7;
        var name_menu = window.location.hostname + '-publican-menu';

        function init() {
            // New toc
            var navigation = jQuery('#navigation');
            if (navigation.is(":visible")) {
                initNewToc(navigation);
            }

            // Old selectbox toc
            var docToc = jQuery(".doctoc");
            if (docToc.is(":visible")) {
                initOldToc(docToc);
            }
        }

        function initOldToc(docToc) {
            checkToc();
            docToc.load('index.html .toc:eq(0)', function () {
                loadDocNav();
            });
            utils.scrollToTarget();
        }

        function initNewToc(navigation) {
            navigation.load('index.html div > div.toc:eq(0), section > div.toc:eq(0)', function () {
                // Add the close button and bind the click event
                var tocButton = jQuery('<button class="menu-toggle"><span></span></button>');
                navigation.append(tocButton);
                tocButton.click(function (e) {
                    toggleToc();
                });

                // Check the saved state and apply the toc styling
                styleToc();
                checkToc();

                // Safari has a bug in getBoundingClientRect that needs the page to be loaded to return valid info.
                if (utils.isSafari()) {
                    jQuery(window).load(function () {
                        styleToc();
                    });
                }
            });

            jQuery(window).scroll(function (e) {
                styleToc();
            }).resize(function (e) {
                styleToc();
            });

            // Add a mechanism to handle the the main menu dropdowns.
            // TODO: This is hacky and a better way should be found to handle this.
            jQuery('.primary-nav a').on('click', function () {
                setTimeout(function () {
                    styleToc();
                }, 600);
            });
        }

        function loadDocNav() {
            var topDocNav = getTopDocNav();
            var bottomDocNav = getBottomDocNav();

            updateDocNavItems(utils.getCurrentPageName(), topDocNav, bottomDocNav);

            var onChange = function () {
                var currentPage = utils.getCurrentPageName();
                var newSelection = jQuery(this).val();
                window.location = newSelection;
                if (newSelection.indexOf(currentPage) === 0) {
                    updateDocNavItems(newSelection, getTopDocNav(), getBottomDocNav());
                }
            };
            topDocNav.change(onChange);
            bottomDocNav.change(onChange);
        }

        function updateDocNavItems(filename, topDocNav, bottomDocNav) {
            topDocNav.val(filename);
            bottomDocNav.val(filename);
        }

        function getTopDocNav() {
            return jQuery(".docnav.top").find(".pageSelect");
        }

        function getBottomDocNav() {
            return jQuery(".docnav.bottom").find("select");
        }

        function styleToc() {
            /* NOTE: We need to use an absolute position due to the portal adding content (ie outage messages), which then makes the toc overlap
             * that. There is a minor effect of some flickering, but it's minimal and currently the best situation since no events are fired by the
             * portal to say it's finished.
             */
            var nav = jQuery('#navigation');
            var navToc = nav.find('.toc');

            var main = jQuery('#legacy-portal');
            var main_rect = main[0].getBoundingClientRect();
            var main_height = main.height();
            var main_bottom = main_rect.bottom;
            var main_top = main_rect.top;

            var my_top = main.offset().top - jQuery('#main').offset().top + 5;
            var height = main_height - 5;
            var pos = "absolute";
            if (main_top <= 0) {
                my_top = 0;
                pos = "fixed";
            }

            if (navToc.is(':visible')) {
                if (pos === "fixed") {
                    if (height > ((window.innerHeight || document.documentElement.clientHeight) - my_top)) {
                        height = (window.innerHeight || document.documentElement.clientHeight) - my_top;
                    }

                    if (my_top + height > main_bottom) {
                        height = main_bottom - my_top;
                    }
                } else {
                    if (height > ((window.innerHeight || document.documentElement.clientHeight) - main_top)) {
                        height = (window.innerHeight || document.documentElement.clientHeight) - main_top - 5;
                    }

                    if (height > main_bottom) {
                        height = main_bottom;
                    }
                }

                nav.attr('style', 'top: ' + my_top + 'px !important; height: ' + height + 'px; position: ' + pos);
                navToc.attr('style', 'top: 0px !important; height: ' + height + 'px;');
            } else {
                nav.attr('style', 'top: ' + my_top + 'px !important; height: 0px; position: ' + pos);
            }
        }

        function checkToc() {
            if (document.cookie) {
                var cookies = document.cookie.split(/ *; */);
                for (var i = 0; i < cookies.length; i++) {
                    var current_c = cookies[i].split("=");
                    if (current_c[0] == name_menu) {
                        var menu_status = current_c[1];
                        if (menu_status == "closed") {
                            hideToc();
                        }
                        break;
                    }
                }
            }
        }

        function toggleToc() {
            if (jQuery("#navigation .toc").is(':visible')) {
                hideToc();
            } else {
                showToc();
            }
        }

        function hideToc() {
            var nav = jQuery("#navigation");
            nav.find("button").addClass("tocClosed");
            nav.find(".toc").hide();
            jQuery("#main").addClass('noLtoc');
            styleToc();

            var expDate = new Date();
            expDate.setDate(expDate.getDate() + num_days);
            utils.setCookie(name_menu, 'closed', expDate, '/', false, false);
        }

        function showToc() {
            var nav = jQuery("#navigation");
            nav.find("button").removeClass("tocClosed");
            nav.find(".toc").show();
            jQuery("#main").removeClass('noLtoc');
            styleToc();

            var expDate = new Date();
            expDate.setDate(expDate.getDate() + num_days);
            utils.setCookie(name_menu, 'open', expDate, '/', false, false);
        }

        return {
            init: init,
            toggleToc: toggleToc,
            getTopDocNav: getTopDocNav,
            getBottomDocNav: getBottomDocNav
        };
    }(docs.utils));
    // END TOC FUNCTIONS

    // BEGIN BREADCRUMB FUNCTIONS
    docs.breadcrumbs = (function(labels, utils) {
        var work = 1;

        function init(current_product, current_version, current_book) {
            var support_label = labels["trans_strings"]["Support"];
            var doc_label = labels["trans_strings"]["Product_Documentation"];

            // Create the very basic breadcrumb array
            var doc_array = [doc_label];
            var breadcrumbs = [
                [support_label, "/support/"],
                doc_array
            ];

            // Create the base breadcrumb, which will later be replaced with the extended version
            if (typeof current_product != "undefined" && current_product != '') {
                var prod_label = getProductLabel(current_product);
                var prod_array = [prod_label];
                breadcrumbs.push(prod_array);

                doc_array[1] = "../";

                if (typeof current_version != "undefined" && current_version != '') {
                    var version_label = getVersionLabel(current_product, current_version);
                    var version_array = [version_label];
                    breadcrumbs.push(version_array);

                    doc_array[1] = "../../";
                    prod_array[1] = "../";

                    if (typeof current_book != "undefined" && current_book != '') {
                        doc_array[1] = "../../../../";
                        prod_array[1] = "../../../";
                        version_array[1] = "../../";

                        var book_label = getBookLabel(current_product, current_version, current_book);
                        breadcrumbs.push([book_label]);
                    }
                }
            }

            window.breadcrumbs = breadcrumbs;
        }

        function getProductLabel(current_product) {
            if (current_product !== 'Products') {
                return labels[current_product]["label"];
            } else {
                return labels["trans_strings"]["Products"];
            }
        }

        function getVersionLabel(current_product, current_version) {
            if (current_version !== 'Versions') {
                return labels[current_product][current_version]["label"];
            } else {
                return labels["trans_strings"]["Versions"];
            }
        }

        function getBookLabel(current_product, current_version, current_book) {
            if (current_book !== 'Books') {
                return labels[current_product][current_version][current_book]["label"];
            } else {
                return labels["trans_strings"]["Books"];
            }
        }

        function loadMenus(toc_path, current_product, current_version, current_book) {
            var breadcrumbs = jQuery("#breadcrumbs");

            // Add a small timeout, to try to fix the items not loading
            setTimeout(function () {
                // We only care about fixing up the default breadcrumbs if we have a current product
                if (typeof current_product !== "undefined" && current_product != '') {
                    // Build the new breadcrumbs html
                    var html = jQuery(buildHTML(toc_path, current_product, current_version, current_book));

                    // Remove the dummy Product Documentation text node
                    var breadcrumbsDiv = breadcrumbs.get(0);
                    while (breadcrumbsDiv.childNodes.length > 1) {
                        breadcrumbsDiv.removeChild(breadcrumbsDiv.lastChild);
                    }

                    // Add the new breadcrumbs
                    breadcrumbs.append(html);

                    // Add a small timeout, to try to fix the items not loading
                    // Load and add the hover menus
                    loadMenu("product_menu", toc_path + "/products_menu.html");
                    loadMenu("version_menu", toc_path + '/' + current_product + "/versions_menu.html");
                    if (typeof current_version !== "undefined" && current_version != '') {
                        loadMenu("book_menu", toc_path + '/' + current_product + '/' + current_version + '/' + "/books_menu.html");
                        if (typeof current_book != "undefined" && current_book != '') {
                            loadMenu("book_lang_menu", toc_path + '/' + current_product + '/' + current_version + '/' + current_book + "/lang_menu.html");
                            loadMenu("book_format_menu", toc_path + '/' + current_product + '/' + current_version + '/' + current_book + "/format_menu.html", true);
                        }
                    }
                }

                // For splash pages the language menu is loaded in a global javascript variable
                if (typeof lang_menu_2_div != "undefined" && lang_menu_2_div != '') {
                    breadcrumbs.append(lang_menu_2_div);
                    bindMouseEvents(breadcrumbs, 'lang_menu_2', 'lang_menu_list');
                }

                bindMenuEvents(breadcrumbs, current_version, current_book);
            }, 500);
        }

        function buildHTML(toc_path, current_product, current_version, current_book) {
            // Get the labels
            var prod_label = getProductLabel(current_product);

            // Convert the default menu into something we can use
            var html = '<a href="' + toc_path + '/index.html">' + labels["trans_strings"]["Product_Documentation"] + '</a>';
            html += '<div id="product_menu"><div>' + prod_label + '</div></div>';
            if (typeof current_version !== "undefined" && current_version !== '') {
                var version_label = getVersionLabel(current_product, current_version);
                html += '<div id="version_menu"><div>' + version_label + '</div></div>';
                if (typeof current_book !== "undefined" && current_book !== '') {
                    var book_label = getBookLabel(current_product, current_version, current_book);
                    html += '<div id="book_menu"><div>' + book_label + '</div></div>';

                    if (current_book !== 'Books') {
                        html += '<div id="left-menu"><div id="book_format_menu"><div>' + labels["trans_strings"]["Formats"] + '</div></div>';
                        html += '<div id="book_lang_menu"></div></div>';
                    }
                }
            }
            return html;
        }

        // Setup the menu expand/retract listeners
        function bindMenuEvents(breadcrumbs, current_version, current_book) {
            bindMouseEvents(breadcrumbs, 'product_menu', 'product_menu_list');

            if (typeof current_version !== "undefined" && current_version !== '') {
                bindMouseEvents(breadcrumbs, 'version_menu', 'version_menu_list');

                if (typeof current_book !== "undefined" && current_book !== '') {
                    bindMouseEvents(breadcrumbs, 'book_menu', 'book_menu_list');

                    if (current_book !== 'Books') {
                        bindMouseEvents(breadcrumbs, 'book_format_menu', 'book_format_menu_list');
                        bindMouseEvents(breadcrumbs, 'book_lang_menu', 'book_lang_menu_list');
                    }
                }
            }
        }

        function bindMouseEvents(parent_ele, id, menu_id) {
            var menu_ele = jQuery('#' + id, parent_ele);
            menu_ele.on('mouseout', function () {
                work = 1;
                retractMenu(menu_id);
            });
            menu_ele.on('mouseover', function () {
                work = 1;
                expandMenu(menu_id);
            });
        }

        function loadMenu(id, url, replace) {
            jQuery.get(url, function(data) {
                if (replace) {
                    jQuery('#' + id).html(data);
                } else {
                    jQuery('#' + id).append(data);
                }
            });
        }

        function expandMenu(id) {
            if (work) {
                work = 0;
                var entity = document.getElementById(id);
                if (entity) {
                    var my_class = entity.className;
                    var my_parent = entity.parentNode;
                    if (my_class.indexOf("hidden") != -1) {
                        entity.className = my_class.replace(/hidden/, "visible");
                        my_parent.className = my_parent.className.replace(/collapsed/, "expanded");
                    }
                }
            }
        }

        function retractMenu(id) {
            if (work) {
                work = 0;
                var entity = document.getElementById(id);
                if (entity) {
                    var my_class = entity.className;
                    var my_parent = entity.parentNode;
                    if (my_class.indexOf("visible") != -1) {
                        entity.className = my_class.replace(/visible/, "hidden");
                        my_parent.className = my_parent.className.replace(/expanded/, "collapsed");
                    }
                }
            }
        }

        return {
            init: init,
            loadMenus: loadMenus,
            expandMenu: expandMenu,
            retractMenu: retractMenu
        };
    }(window.labels, docs.utils));
    // END BREADCRUMBS FUNCTIONS

    // START ANALYTICS FUNCTIONS
    docs.analytics = (function() {
        function runAnalytics(ajq) {
            /*
             var pkBaseUrl = (('https:' == document.location.protocol) ? 'https://engstats.redhat.com/piwik/' : 'http://engstats.redhat.com/piwik/');
             var pkUrl = pkBaseUrl + 'piwik.js';
             ajq('body').append('<noscript><p><img src="https://engstats.redhat.com/piwik/piwik.php?idsite=3" style="border:0" alt="" /></p></noscript>');
             require([pkUrl], function() {
             try {
             var piwikTracker = Piwik.getTracker(pkBaseUrl + 'piwik.php', 3);
             if (document.location.hostname == 'access.redhat.com') {
             piwikTracker.trackPageView();
             piwikTracker.enableLinkTracking();
             }
             } catch(err) {}
             });
             */
        }

        return {
            runAnalytics: runAnalytics
        };
    }());
    // END ANALYTICS FUNCTIONS

    // START SPLASH PAGE FUNCTIONS
    docs.splash_page = (function(utils) {
        function init() {
            jQuery(window).bind('hashchange', function () {
                if (window.location.hash === "") {
                    // activate the default section
                } else {
                    //Grab what is after the # from the url bar and remove the #
                    var anchorid = window.location.hash.replace("#", "");
                    var id = anchorid;
                    if (anchorid.match("_")) {
                        id = id.replace(/_.*/g, '');
                    }
                    activateElement2(id + '-selector');
                    activateElement(id + '-categories');
                    activateElement(id);
                    if (anchorid.match("_")) {
                        activateElement2(anchorid, 1);
                    }
                }
            });
            jQuery(window).trigger('hashchange');
        }

        function _activateElement(ele) {
            ele.addClass('active');
            ele.removeClass('hidden');
            ele.siblings().addClass('hidden');
            ele.siblings().removeClass('active');
        }

        function activateElement(elem) {
            _activateElement(jQuery('#' + utils.escapeElementId(elem)));
        }

        function activateElement2(elem, focus) {
            var ele = jQuery('#' + utils.escapeElementId(elem));
            ele.addClass('active');
            ele.siblings().removeClass('active');
            if (focus) {
                jQuery('html,body').animate({scrollTop: ele.offset().top},'slow');
            }
        }

        function activateParentElement(elem) {
            _activateElement(jQuery('#' + utils.escapeElementId(elem)).parent());
        }

        function resetCategories(categ, vers, me) {
            categ = utils.escapeElementId(categ);
            vers = utils.escapeElementId(vers);
            jQuery('#' + categ).children().removeClass('active');
            jQuery(me).addClass('active');
            jQuery('#' +vers).children().removeClass('active');
            jQuery('#' +vers).children().removeClass('hidden');
        }

        return {
            init: init,
            activateElement: activateElement,
            activateElement2: activateElement2,
            activateParentElement: activateParentElement,
            resetCategories: resetCategories
        }
    }(docs.utils));
    // END SPLASH PAGE FUNCTIONS

    function _init(ajq) {
        // Update the JQuery reference, as jquery may only have been loaded during this call
        jQuery = ajq;

        // The docs module is now ready so fire an event
        fireReady();
    }

    function fireReady() {
        if (!ready) {
            ready = true;

            // Fire the ready event to any listeners
            for (var i = 0; i < listeners.length; i++) {
                listeners[i]();
            }
        }
    }

    docs.whenReady = function(callback) {
        if (ready) {
            callback();
        } else {
            listeners.push(callback);
        }
    };

    docs.isReady = function() {
        return ready;
    };

    docs.init = function(toc_path, current_product, current_version, current_book) {
        // Set the siteMapState variable so that the main tab is highlighted
        window.siteMapState = "products & services";

        // Build the core breadcrumbs window object
        docs.breadcrumbs.init(current_product, current_version, current_book);

        // Load the rest of the content when the chroming is ready
        chrometwo_require(['jquery', 'chrome_lib'], function (ajq, lib) {
            // Init the internals
            _init(ajq);

            // Initialise the table of contents
            docs.toc.init();

            // Enable highlighting
            if (typeof hljs !== "undefined") {
                ajq('pre[class*="language-"]').each(function (i, block) {
                    hljs.highlightBlock(block);
                });
            }

            // Load the breadcrumbs menu items
            lib.whenBreadcrumbsReady(function() {
                docs.breadcrumbs.loadMenus(toc_path, current_product, current_version, current_book);
            });
        });
    };

    docs.init_splash_page = function() {
        chrometwo_require(['jquery'], function (ajq) {
            // Init the internals
            _init(ajq);

            // Export some functions to the window, since the templates use window based functions
            window.activateElement = docs.splash_page.activateElement;
            window.activateElement2 = docs.splash_page.activateElement2;
            window.activateParentElement = docs.splash_page.activateParentElement;
            window.resetCategories = docs.splash_page.resetCategories;

            // Initialise the splash page functionality
            docs.splash_page.init();
        });
    };

    // Export some functions to the window for legacy purposes
    window.initializeBreadcrumbs = docs.init;
    window.runAnalytics = docs.analytics.runAnalytics;

    // jQuery may already be available, if that's the case then fire the ready event
    if (typeof jQuery !== 'undefined') {
        fireReady();
    }

    return docs;
}({}));