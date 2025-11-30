document.addEventListener("contextmenu", event => event.preventDefault());
/*! dom-to-image domtoimage */
!function(a) {
    "use strict";
    function b(a, b) {
        function c(a) {
            return b.bgcolor && (a.style.backgroundColor = b.bgcolor),
            b.width && (a.style.width = b.width + "px"),
            b.height && (a.style.height = b.height + "px"),
            b.style && Object.keys(b.style).forEach(function(c) {
                a.style[c] = b.style[c]
            }),
            a
        }
        return b = b || {},
        g(b),
        Promise.resolve(a).then(function(a) {
            return i(a, b.filter, !0)
        }).then(j).then(k).then(c).then(function(c) {
            return l(c, b.width || q.width(a), b.height || q.height(a))
        })
    }
    function c(a, b) {
        return h(a, b || {}).then(function(b) {
            return b.getContext("2d").getImageData(0, 0, q.width(a), q.height(a)).data
        })
    }
    function d(a, b) {
        return h(a, b || {}).then(function(a) {
            return a.toDataURL()
        })
    }
    function e(a, b) {
        return b = b || {},
        h(a, b).then(function(a) {
            return a.toDataURL("image/jpeg", b.quality || 1)
        })
    }
    function f(a, b) {
        return h(a, b || {}).then(q.canvasToBlob)
    }
    function g(a) {
        "undefined" == typeof a.imagePlaceholder ? v.impl.options.imagePlaceholder = u.imagePlaceholder : v.impl.options.imagePlaceholder = a.imagePlaceholder,
        "undefined" == typeof a.cacheBust ? v.impl.options.cacheBust = u.cacheBust : v.impl.options.cacheBust = a.cacheBust
    }
    function h(a, c) {
        function d(a) {
            var b = document.createElement("canvas");
            if (b.width = c.width || q.width(a),
            b.height = c.height || q.height(a),
            c.bgcolor) {
                var d = b.getContext("2d");
                d.fillStyle = c.bgcolor,
                d.fillRect(0, 0, b.width, b.height)
            }
            return b
        }
        return b(a, c).then(q.makeImage).then(q.delay(100)).then(function(b) {
            var c = d(a);
            return c.getContext("2d").drawImage(b, 0, 0),
            c
        })
    }
    function i(a, b, c) {
        function d(a) {
            return a instanceof HTMLCanvasElement ? q.makeImage(a.toDataURL()) : a.cloneNode(!1)
        }
        function e(a, b, c) {
            function d(a, b, c) {
                var d = Promise.resolve();
                return b.forEach(function(b) {
                    d = d.then(function() {
                        return i(b, c)
                    }).then(function(b) {
                        b && a.appendChild(b)
                    })
                }),
                d
            }
            var e = a.childNodes;
            return 0 === e.length ? Promise.resolve(b) : d(b, q.asArray(e), c).then(function() {
                return b
            })
        }
        function f(a, b) {
            function c() {
                function c(a, b) {
                    function c(a, b) {
                        q.asArray(a).forEach(function(c) {
                            b.setProperty(c, a.getPropertyValue(c), a.getPropertyPriority(c))
                        })
                    }
                    a.cssText ? b.cssText = a.cssText : c(a, b)
                }
                c(window.getComputedStyle(a), b.style)
            }
            function d() {
                function c(c) {
                    function d(a, b, c) {
                        function d(a) {
                            var b = a.getPropertyValue("content");
                            return a.cssText + " content: " + b + ";"
                        }
                        function e(a) {
                            function b(b) {
                                return b + ": " + a.getPropertyValue(b) + (a.getPropertyPriority(b) ? " !important" : "")
                            }
                            return q.asArray(a).map(b).join("; ") + ";"
                        }
                        var f = "." + a + ":" + b
                          , g = c.cssText ? d(c) : e(c);
                        return document.createTextNode(f + "{" + g + "}")
                    }
                    var e = window.getComputedStyle(a, c)
                      , f = e.getPropertyValue("content");
                    if ("" !== f && "none" !== f) {
                        var g = q.uid();
                        b.className = b.className + " " + g;
                        var h = document.createElement("style");
                        h.appendChild(d(g, c, e)),
                        b.appendChild(h)
                    }
                }
                [":before", ":after"].forEach(function(a) {
                    c(a)
                })
            }
            function e() {
                a instanceof HTMLTextAreaElement && (b.innerHTML = a.value),
                a instanceof HTMLInputElement && b.setAttribute("value", a.value)
            }
            function f() {
                b instanceof SVGElement && (b.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
                b instanceof SVGRectElement && ["width", "height"].forEach(function(a) {
                    var c = b.getAttribute(a);
                    c && b.style.setProperty(a, c)
                }))
            }
            return b instanceof Element ? Promise.resolve().then(c).then(d).then(e).then(f).then(function() {
                return b
            }) : b
        }
        return c || !b || b(a) ? Promise.resolve(a).then(d).then(function(c) {
            return e(a, c, b)
        }).then(function(b) {
            return f(a, b)
        }) : Promise.resolve()
    }
    function j(a) {
        return s.resolveAll().then(function(b) {
            var c = document.createElement("style");
            return a.appendChild(c),
            c.appendChild(document.createTextNode(b)),
            a
        })
    }
    function k(a) {
        return t.inlineAll(a).then(function() {
            return a
        })
    }
    function l(a, b, c) {
        return Promise.resolve(a).then(function(a) {
            return a.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"),
            (new XMLSerializer).serializeToString(a)
        }).then(q.escapeXhtml).then(function(a) {
            return '<foreignObject x="0" y="0" width="100%" height="100%">' + a + "</foreignObject>"
        }).then(function(a) {
            return '<svg xmlns="http://www.w3.org/2000/svg" width="' + b + '" height="' + c + '">' + a + "</svg>"
        }).then(function(a) {
            return "data:image/svg+xml;charset=utf-8," + a
        })
    }
    function m() {
        function a() {
            var a = "application/font-woff"
              , b = "image/jpeg";
            return {
                woff: a,
                woff2: a,
                ttf: "application/font-truetype",
                eot: "application/vnd.ms-fontobject",
                png: "image/png",
                jpg: b,
                jpeg: b,
                gif: "image/gif",
                tiff: "image/tiff",
                svg: "image/svg+xml"
            }
        }
        function b(a) {
            var b = /\.([^\.\/]*?)$/g.exec(a);
            return b ? b[1] : ""
        }
        function c(c) {
            var d = b(c).toLowerCase();
            return a()[d] || ""
        }
        function d(a) {
            return a.search(/^(data:)/) !== -1
        }
        function e(a) {
            return new Promise(function(b) {
                for (var c = window.atob(a.toDataURL().split(",")[1]), d = c.length, e = new Uint8Array(d), f = 0; f < d; f++)
                    e[f] = c.charCodeAt(f);
                b(new Blob([e],{
                    type: "image/png"
                }))
            }
            )
        }
        function f(a) {
            return a.toBlob ? new Promise(function(b) {
                a.toBlob(b)
            }
            ) : e(a)
        }
        function g(a, b) {
            var c = document.implementation.createHTMLDocument()
              , d = c.createElement("base");
            c.head.appendChild(d);
            var e = c.createElement("a");
            return c.body.appendChild(e),
            d.href = b,
            e.href = a,
            e.href
        }
        function h() {
            var a = 0;
            return function() {
                function b() {
                    return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
                }
                return "u" + b() + a++
            }
        }
        function i(a) {
            return new Promise(function(b, c) {
                var d = new Image;
                d.onload = function() {
                    b(d)
                }
                ,
                d.onerror = c,
                d.src = a
            }
            )
        }
        function j(a) {
            var b = 3e4;
            return v.impl.options.cacheBust && (a += (/\?/.test(a) ? "&" : "?") + (new Date).getTime()),
            new Promise(function(c) {
                function d() {
                    if (4 === g.readyState) {
                        if (200 !== g.status)
                            return void (h ? c(h) : f("cannot fetch resource: " + a + ", status: " + g.status));
                        var b = new FileReader;
                        b.onloadend = function() {
                            var a = b.result.split(/,/)[1];
                            c(a)
                        }
                        ,
                        b.readAsDataURL(g.response)
                    }
                }
                function e() {
                    h ? c(h) : f("timeout of " + b + "ms occured while fetching resource: " + a)
                }
                function f(a) {
                    console.error(a),
                    c("")
                }
                var g = new XMLHttpRequest;
                g.onreadystatechange = d,
                g.ontimeout = e,
                g.responseType = "blob",
                g.timeout = b,
                g.open("GET", a, !0),
                g.send();
                var h;
                if (v.impl.options.imagePlaceholder) {
                    var i = v.impl.options.imagePlaceholder.split(/,/);
                    i && i[1] && (h = i[1])
                }
            }
            )
        }
        function k(a, b) {
            return "data:" + b + ";base64," + a
        }
        function l(a) {
            return a.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1")
        }
        function m(a) {
            return function(b) {
                return new Promise(function(c) {
                    setTimeout(function() {
                        c(b)
                    }, a)
                }
                )
            }
        }
        function n(a) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b
        }
        function o(a) {
            return a.replace(/#/g, "%23").replace(/\n/g, "%0A")
        }
        function p(a) {
            var b = r(a, "border-left-width")
              , c = r(a, "border-right-width");
            return a.scrollWidth + b + c
        }
        function q(a) {
            var b = r(a, "border-top-width")
              , c = r(a, "border-bottom-width");
            return a.scrollHeight + b + c
        }
        function r(a, b) {
            var c = window.getComputedStyle(a).getPropertyValue(b);
            return parseFloat(c.replace("px", ""))
        }
        return {
            escape: l,
            parseExtension: b,
            mimeType: c,
            dataAsUrl: k,
            isDataUrl: d,
            canvasToBlob: f,
            resolveUrl: g,
            getAndEncode: j,
            uid: h(),
            delay: m,
            asArray: n,
            escapeXhtml: o,
            makeImage: i,
            width: p,
            height: q
        }
    }
    function n() {
        function a(a) {
            return a.search(e) !== -1
        }
        function b(a) {
            for (var b, c = []; null !== (b = e.exec(a)); )
                c.push(b[1]);
            return c.filter(function(a) {
                return !q.isDataUrl(a)
            })
        }
        function c(a, b, c, d) {
            function e(a) {
                return new RegExp("(url\\(['\"]?)(" + q.escape(a) + ")(['\"]?\\))","g")
            }
            return Promise.resolve(b).then(function(a) {
                return c ? q.resolveUrl(a, c) : a
            }).then(d || q.getAndEncode).then(function(a) {
                return q.dataAsUrl(a, q.mimeType(b))
            }).then(function(c) {
                return a.replace(e(b), "$1" + c + "$3")
            })
        }
        function d(d, e, f) {
            function g() {
                return !a(d)
            }
            return g() ? Promise.resolve(d) : Promise.resolve(d).then(b).then(function(a) {
                var b = Promise.resolve(d);
                return a.forEach(function(a) {
                    b = b.then(function(b) {
                        return c(b, a, e, f)
                    })
                }),
                b
            })
        }
        var e = /url\(['"]?([^'"]+?)['"]?\)/g;
        return {
            inlineAll: d,
            shouldProcess: a,
            impl: {
                readUrls: b,
                inline: c
            }
        }
    }
    function o() {
        function a() {
            return b(document).then(function(a) {
                return Promise.all(a.map(function(a) {
                    return a.resolve()
                }))
            }).then(function(a) {
                return a.join("\n")
            })
        }
        function b() {
            function a(a) {
                return a.filter(function(a) {
                    return a.type === CSSRule.FONT_FACE_RULE
                }).filter(function(a) {
                    return r.shouldProcess(a.style.getPropertyValue("src"))
                })
            }
            function b(a) {
                var b = [];
                return a.forEach(function(a) {
                    try {
                        q.asArray(a.cssRules || []).forEach(b.push.bind(b))
                    } catch (c) {
                        console.log("Error while reading CSS rules from " + a.href, c.toString())
                    }
                }),
                b
            }
            function c(a) {
                return {
                    resolve: function() {
                        var b = (a.parentStyleSheet || {}).href;
                        return r.inlineAll(a.cssText, b)
                    },
                    src: function() {
                        return a.style.getPropertyValue("src")
                    }
                }
            }
            return Promise.resolve(q.asArray(document.styleSheets)).then(b).then(a).then(function(a) {
                return a.map(c)
            })
        }
        return {
            resolveAll: a,
            impl: {
                readAll: b
            }
        }
    }
    function p() {
        function a(a) {
            function b(b) {
                return q.isDataUrl(a.src) ? Promise.resolve() : Promise.resolve(a.src).then(b || q.getAndEncode).then(function(b) {
                    return q.dataAsUrl(b, q.mimeType(a.src))
                }).then(function(b) {
                    return new Promise(function(c, d) {
                        a.onload = c,
                        a.onerror = d,
                        a.src = b
                    }
                    )
                })
            }
            return {
                inline: b
            }
        }
        function b(c) {
            function d(a) {
                var b = a.style.getPropertyValue("background");
                return b ? r.inlineAll(b).then(function(b) {
                    a.style.setProperty("background", b, a.style.getPropertyPriority("background"))
                }).then(function() {
                    return a
                }) : Promise.resolve(a)
            }
            return c instanceof Element ? d(c).then(function() {
                return c instanceof HTMLImageElement ? a(c).inline() : Promise.all(q.asArray(c.childNodes).map(function(a) {
                    return b(a)
                }))
            }) : Promise.resolve(c)
        }
        return {
            inlineAll: b,
            impl: {
                newImage: a
            }
        }
    }
    var q = m()
      , r = n()
      , s = o()
      , t = p()
      , u = {
        imagePlaceholder: void 0,
        cacheBust: !1
    }
      , v = {
        toSvg: b,
        toPng: d,
        toJpeg: e,
        toBlob: f,
        toPixelData: c,
        impl: {
            fontFaces: s,
            images: t,
            util: q,
            inliner: r,
            options: {}
        }
    };
    "undefined" != typeof module ? module.exports = v : a.domtoimage = v
}(this);

// script m1 m2 m3
// script m1
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        initializeMapM1(); // ✅ Charge la carte après un léger délai
    }, 50);
});
    function initializeMapM1() {
        let hasInteracted = false; // Variable pour suivre l'interaction avec la carte

        const map = L.map("mapM1", {
            center: [-19, 47],
            zoom: 5.33,
            scrollWheelZoom: false // Désactiver le zoom au défilement par défaut
        });

                // Désactiver le glissement de la carte sur mobile
if (window.innerWidth < 768) { // Vérifie si l'écran est de petite taille (mobile)
    map.dragging.disable();
}

// Activer le déplacement après un clic sur la carte
map.on('click', function () {
    map.dragging.enable();
});

// Désactiver à nouveau lorsqu'on quitte la carte
map.on('mouseout', function () {
    if (window.innerWidth < 768) {
        map.dragging.disable();
    }
});
// Afficher l'infobulle si l'utilisateur essaie de glisser sur mobile sans avoir interagi
map.getContainer().addEventListener('touchmove', function () {
    if (!hasInteracted && !tooltip.parentNode) {
        document.getElementById('mapM1').appendChild(tooltip);

        // Supprimer l'infobulle après un délai
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 3000);
    }
}, { passive: true });       
        // Style initial du curseur : par défaut
        document.getElementById('mapM1').style.cursor = 'default';

        // Crée une seule fois l'élément pour l'infobulle
        const tooltip = L.DomUtil.create('div', 'map-tooltip');
        tooltip.innerHTML = "Cliquez pour activer la carte."; // Message simplifié et clair
        tooltip.style.position = 'absolute';
        tooltip.style.top = '50%'; // Centrer verticalement
        tooltip.style.left = '50%'; // Centrer horizontalement
        tooltip.style.transform = 'translate(-50%, -50%)'; // Ajuster pour centrer parfaitement
        tooltip.style.width = '40%'; // Espace sur les côtés
        tooltip.style.backgroundColor = 'white'; // Fond blanc
        tooltip.style.color = 'black';
        tooltip.style.fontWeight = 'bold';
        tooltip.style.padding = '10px';
        tooltip.style.textAlign = 'center'; // Centrer le texte
        tooltip.style.border = '1px solid black';
        tooltip.style.borderRadius = '10px';
        tooltip.style.zIndex = '1000'; // Assurez-vous que l'infobulle est au-dessus de la carte
        document.getElementById('mapM1').appendChild(tooltip);

        // Supprimer l'infobulle après un certain temps au chargement initial
        setTimeout(() => {
            if (tooltip.parentNode && !hasInteracted) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 3000); // Supprime après 4 secondes

        // Activer le zoom au défilement après un clic sur la carte
        map.on('click', function () {
            if (!hasInteracted) {
                hasInteracted = true; // Marquer l'interaction comme effectuée
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip); // Supprimer l'infobulle si elle est présente
                }
                document.getElementById('mapM1').style.cursor = 'grab'; // Changer le curseur en forme de main
            }
            map.scrollWheelZoom.enable(); // Activer le zoom au défilement
        });

// Afficher une infobulle au défilement uniquement si l'utilisateur n'a pas encore interagi
map.getContainer().addEventListener('wheel', function (event) {
    if (!hasInteracted && !tooltip.parentNode) {
        document.getElementById('mapM1').appendChild(tooltip);
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 3000); // Supprime après 3 secondes
    }
}, { passive: true }); // ✅ Ajout de `passive: true` pour éviter le blocage du scroll
        // Réinitialiser l'état d'interaction lorsque la souris quitte la carte
        map.on('mouseout', function () {
            map.scrollWheelZoom.disable(); // Désactiver le zoom au défilement
            hasInteracted = false; // Réinitialiser l'interaction
            document.getElementById('mapM1').style.cursor = 'default'; // Retour au curseur par défaut
        });

        
        // Échelle de la carte
        L.control.scale({ position: 'bottomleft', metric: true, imperial: false }).addTo(map);

        // Conteneur pour le titre de la carte
        const titleControl = L.control({ position: 'topleft' }); // Titre placé en haut à gauche
        titleControl.onAdd = function () {
            const div = L.DomUtil.create('div', 'map-title');
            div.style.padding = '5px';
            div.style.top = '-5px';
            div.style.left = '5px';
            div.style.background = 'white';
            div.style.border = '1px solid black';
            div.style.borderRadius = '5px';
            div.style.color = 'black';
            div.style.fontSize = '13px';
            div.style.textAlign = 'center';
            div.style.fontWeight = 'bold';
            div.style.lineHeight = '1.2'; // Réduire l'interligne pour un affichage compact
            div.textContent = "REGIONS"; // Titre par défaut
            return div;
        };
        titleControl.update = function (regionName) {
            const div = document.querySelector(".map-title");
            if (regionName === "Aucun") {
                div.textContent = "REGIONS"; // Réinitialiser au titre par défaut
            } else {
                div.innerHTML = `REGION<br>${regionName}`;
            }
        };
        titleControl.addTo(map);
        // Charger les données GeoJSON des régions
        fetch("LROYR.geojson")
            .then(response => response.json())
            .then(regionData => {
                const regionLayer = L.geoJSON(regionData, {
                    style: {
                        color: "black",
                        fillColor: "white",
                        weight: 1,
                        fillOpacity: 0.4
                    },
                    onEachFeature: function (feature, layer) {
                        const regionName = feature.properties.region || "Nom inconnu";
                        layer.bindPopup(`<strong>REGION ${regionName}</strong>`);
                        layer.featureName = regionName;
                    }
                }).addTo(map);

                initializeRegionDropdown(regionLayer, titleControl);
            })
            .catch(error => console.error("Erreur lors du chargement des données GeoJSON :", error));

        // Ajout de la flèche du nord
        var north = L.control({ position: 'topleft' });
        north.onAdd = function () {
            // Crée un div pour la flèche du nord
            var div = L.DomUtil.create('div', 'north-arrow');

            // Ajoute l'image avec une taille adaptée
            div.innerHTML = '<img src="north-arrow.png" alt="North Arrow" style="width: 42px; height: 50px;">';
            div.style.backgroundColor = 'none';
            div.style.padding = '5px';
            div.style.position = 'absolute';
            div.style.left = '17.5rem';
            div.style.top = '-1rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        north.addTo(map);
    }
    function initializeRegionDropdown(regionLayer, titleControl) {
        const regionDropdown = document.getElementById("regionSelect1");

        // Initialisation du menu déroulant des régions
        regionDropdown.innerHTML = `<option value="Aucun">-- Sélectionnez une région --</option>`;
        const regionOptions = [];
        regionLayer.eachLayer(function (layer) {
            regionOptions.push(layer.featureName);
        });

        // Trier les régions par ordre alphabétique
        regionOptions.sort().forEach(region => {
            const option = document.createElement("option");
            option.value = region;
            option.textContent = region;
            regionDropdown.appendChild(option);
        });

        // Gestion de la sélection d'une région
        regionDropdown.addEventListener("change", function () {
            const selectedRegion = this.value || "Aucun";

            if (selectedRegion === "Aucun") {
                regionLayer.eachLayer(function (layer) {
                    layer.setStyle({
                        color: "black",
                        fillColor: "white",
                        weight: 1,
                        fillOpacity: 0.4
                    });
                });
                titleControl.update("Aucun"); // Réinitialiser au titre par défaut
            } else {
                regionLayer.eachLayer(function (layer) {
                    if (layer.featureName === selectedRegion) {
                        layer.setStyle({
                            color: "black",
                            fillColor: "orange",
                            weight: 2,
                            fillOpacity: 0.7
                        });
                        titleControl.update(selectedRegion); // Mettre à jour le titre avec le nom de la région
                    } else {
                        layer.setStyle({
                            color: "black",
                            fillColor: "white",
                            weight: 1,
                            fillOpacity: 0.4
                        });
                    }
                });
            }
        });
    }

document.getElementById("exportMapImage1").addEventListener("click", function () {
    // Sélectionnez l'élément contenant la carte
    const mapElement = document.getElementById("servicesmapM1");

    // Sélectionnez l'infobulle
    const tooltip = document.querySelector(".map-tooltip");

    // Masquez l'infobulle avant l'exportation
    if (tooltip) {
        tooltip.style.display = "none"; // Masquer l'infobulle
    }

    // Exportez l'image à partir de la carte
    domtoimage.toPng(mapElement)
        .then(function (dataUrl) {
            // Créez un lien de téléchargement
            const link = document.createElement("a");
            link.download = "carte-exportée.jpg"; // Nom du fichier
            link.href = dataUrl;
            link.click(); // Télécharge l'image automatiquement
        })
        .catch(function (error) {
            console.error("Erreur lors de l'exportation : ", error);
        })
        .finally(function () {
            // Réaffichez l'infobulle après l'exportation
            if (tooltip) {
                tooltip.style.display = "block"; // Réafficher l'infobulle
            }
        });
});

document.addEventListener("DOMContentLoaded", function() {
    var mapIDs = ["servicesmapM1", "servicesmapM2", "servicesmapM3", "intermap"]; // Remplacez par les ID des cartes où vous voulez masquer le bouton de zoom

    mapIDs.forEach(function(mapID) {
        var mapElement = document.getElementById(mapID);
        if (mapElement) {
            var style = document.createElement("style");
            style.innerHTML = `
                #${mapID} .leaflet-touch .leaflet-bar {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    });
});


// script m2
document.addEventListener("DOMContentLoaded", function () {
    function initializeMapM2() {
        let hasInteracted = false; // Variable pour suivre l'interaction avec la carte
        let regionSelected = false; // Variable pour suivre si une région a été sélectionnée

        const map = L.map("mapM2", {
            center: [-19, 49],
            zoom: 5.33,
            scrollWheelZoom: false // Désactiver le zoom au défilement par défaut
        });

        // Désactiver le glissement de la carte sur mobile
if (window.innerWidth < 768) { // Vérifie si l'écran est de petite taille (mobile)
    map.dragging.disable();
}

// Activer le déplacement après un clic sur la carte
map.on('click', function () {
    map.dragging.enable();
});

// Désactiver à nouveau lorsqu'on quitte la carte
map.on('mouseout', function () {
    if (window.innerWidth < 768) {
        map.dragging.disable();
    }
});

        
        // Style initial du curseur : par défaut
        document.getElementById('mapM2').style.cursor = 'default';

        // Crée une seule fois l'élément pour l'infobulle permanent
        const tooltipPermanent = L.DomUtil.create('div', 'map-tooltip-permanent');
        tooltipPermanent.innerHTML = "Sélectionnez une région pour afficher cette carte."; // Message permanent
        tooltipPermanent.style.position = 'absolute';
        tooltipPermanent.style.top = '50%'; // Centrer verticalement
        tooltipPermanent.style.left = '50%'; // Centrer horizontalement
        tooltipPermanent.style.transform = 'translate(-50%, -50%)'; // Ajuster pour centrer parfaitement
        tooltipPermanent.style.width = '40%'; // Espace sur les côtés
        tooltipPermanent.style.backgroundColor = 'white'; // Fond blanc
        tooltipPermanent.style.color = 'red';
        tooltipPermanent.style.fontWeight = 'bold';
        tooltipPermanent.style.padding = '10px';
        tooltipPermanent.style.textAlign = 'center'; // Centrer le texte
        tooltipPermanent.style.border = '1px solid black';
        tooltipPermanent.style.borderRadius = '10px';
        tooltipPermanent.style.zIndex = '1000'; // Assurez-vous que l'infobulle est visible au-dessus de la carte
        document.getElementById('mapM2').appendChild(tooltipPermanent);

        let tooltipScroll = null; // Élément pour le message lors du scroll

        // Mettre à jour le message lorsque la sélection de région change dans M1
        const regionDropdown = document.getElementById("regionSelect1");
        regionDropdown.addEventListener("change", function () {
            const selectedRegion = this.value || "Aucun";
            if (selectedRegion === "Aucun") {
                regionSelected = false; // Aucune région sélectionnée
                if (!tooltipPermanent.parentNode) {
                    document.getElementById('mapM2').appendChild(tooltipPermanent); // Réafficher l'infobulle permanente
                }
                tooltipPermanent.innerHTML = "Sélectionnez une région pour afficher cette carte.";
            } else {
                regionSelected = true; // Une région est sélectionnée
                if (tooltipPermanent.parentNode) {
                    tooltipPermanent.parentNode.removeChild(tooltipPermanent); // Supprimer l'infobulle permanente
                }
            }
        });

        // Activer le zoom au défilement après un clic sur la carte
        map.on('click', function () {
            if (!hasInteracted && regionSelected) {
                hasInteracted = true; // Marquer l'interaction comme effectuée
                if (tooltipScroll && tooltipScroll.parentNode) {
                    tooltipScroll.parentNode.removeChild(tooltipScroll); // Supprimer l'infobulle si elle est présente
                }
                document.getElementById('mapM2').style.cursor = 'grab'; // Changer le curseur en forme de main
            }
            if (regionSelected) {
                map.scrollWheelZoom.enable(); // Activer le zoom au défilement si une région est sélectionnée
            }
        });

        // Afficher une infobulle au défilement uniquement si l'utilisateur n'a pas encore interagi
        map.getContainer().addEventListener('wheel', function () {
            if (!hasInteracted && regionSelected) {
                if (!tooltipScroll || !tooltipScroll.parentNode) {
                    tooltipScroll = L.DomUtil.create('div', 'map-tooltip-scroll');
                    tooltipScroll.innerHTML = "Cliquez pour activer la carte.";
                    tooltipScroll.style.position = 'absolute';
                    tooltipScroll.style.top = '50%'; // Centrer verticalement
                    tooltipScroll.style.left = '50%'; // Centrer horizontalement
                    tooltipScroll.style.transform = 'translate(-50%, -50%)'; // Ajuster pour centrer parfaitement
                    tooltipScroll.style.width = '40%'; // Espace sur les côtés
                    tooltipScroll.style.backgroundColor = 'white'; // Fond blanc
                    tooltipScroll.style.color = 'black';
                    tooltipScroll.style.fontWeight = 'bold';
                    tooltipScroll.style.padding = '10px';
                    tooltipScroll.style.textAlign = 'center'; // Centrer le texte
                    tooltipScroll.style.border = '1px solid black';
                    tooltipScroll.style.borderRadius = '10px';
                    tooltipScroll.style.zIndex = '1000'; // Assurez-vous que l'infobulle est visible au-dessus de la carte
                    document.getElementById('mapM2').appendChild(tooltipScroll);

                    // Supprimer le tooltip après un délai
                    setTimeout(() => {
                        if (tooltipScroll && tooltipScroll.parentNode) {
                            tooltipScroll.parentNode.removeChild(tooltipScroll);
                        }
                    }, 3000); // Supprime après 3 secondes
                }
            }
        }, { passive: true });
        
        map.getContainer().addEventListener('touchmove', function () {
    if (!hasInteracted && regionSelected) {
        if (!tooltipScroll || !tooltipScroll.parentNode) {
            tooltipScroll = L.DomUtil.create('div', 'map-tooltip-scroll');
            tooltipScroll.innerHTML = "Cliquez pour activer la carte.";
            tooltipScroll.style.position = 'absolute';
            tooltipScroll.style.top = '50%';
            tooltipScroll.style.left = '50%';
            tooltipScroll.style.transform = 'translate(-50%, -50%)';
            tooltipScroll.style.width = '40%';
            tooltipScroll.style.backgroundColor = 'white';
            tooltipScroll.style.color = 'black';
            tooltipScroll.style.fontWeight = 'bold';
            tooltipScroll.style.padding = '10px';
            tooltipScroll.style.textAlign = 'center';
            tooltipScroll.style.border = '1px solid black';
            tooltipScroll.style.borderRadius = '10px';
            tooltipScroll.style.zIndex = '1000';
            document.getElementById('mapM2').appendChild(tooltipScroll);

            // Supprimer le tooltip après un délai
            setTimeout(() => {
                if (tooltipScroll && tooltipScroll.parentNode) {
                    tooltipScroll.parentNode.removeChild(tooltipScroll);
                }
            }, 3000); // Supprime après 3 secondes
        }
    }
}, { passive: true });


        // Réinitialiser l'état d'interaction lorsque la souris quitte la carte
        map.on('mouseout', function () {
            if (regionSelected) {
                map.scrollWheelZoom.disable(); // Désactiver le zoom au défilement
                hasInteracted = false; // Réinitialiser l'interaction
                document.getElementById('mapM2').style.cursor = 'default'; // Retour au curseur par défaut
            }
        });
 


        // Échelle de la carte
        L.control.scale({ position: 'bottomleft', metric: true, imperial: false }).addTo(map);

        // Titre de la carte
        const titleControl = L.control({ position: 'topleft' });
        titleControl.onAdd = function () {
            const div = L.DomUtil.create('div', 'map-title-m2');
            div.style.padding = '5px';
            div.style.top = '-5px';
            div.style.left = '5px';
            div.style.background = 'white';
            div.style.border = '1px solid black';
            div.style.borderRadius = '5px';
            div.style.color = 'black';
            div.style.fontSize = '13px';
            div.style.textAlign = 'center';
            div.style.fontWeight = 'bold';
            div.style.lineHeight = '1.2';
            div.textContent = " "; // Titre par défaut
            return div;
        };
        titleControl.update = function (districtName) {
            const div = document.querySelector(".map-title-m2");
            if (!districtName || districtName === "Aucun") {
                div.textContent = " "; // Titre par défaut
            } else {
                div.innerHTML = `DISTRICT<br>${districtName}`;
            }
        };
        titleControl.addTo(map);

        // Ajout de la flèche du nord
        var north = L.control({ position: 'topleft' });
        north.onAdd = function () {
            // Crée un div pour la flèche du nord
            var div = L.DomUtil.create('div', 'north-arrow');

            // Ajoute l'image avec une taille adaptée
            div.innerHTML = '<img src="north-arrow.png" alt="North Arrow" style="width: 42px; height: 50px;">';
            div.style.backgroundColor = 'none';
            div.style.padding = '5px';
            div.style.position = 'absolute';
            div.style.left = '17.5rem';
            div.style.top = '-1rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        north.addTo(map);

        // Charger les données GeoJSON
    Promise.all([
    fetch("WFDD1.geojson").then(response => response.json()),
    fetch("ZGHD2.geojson").then(response => response.json())
])
.then(([dataPart1, dataPart2]) => {
    // Fusionner les deux objets GeoJSON
    const mergedData = {
        type: "FeatureCollection",
        features: [...dataPart1.features, ...dataPart2.features]
    };

    const districtLayer = L.geoJSON(mergedData, {
        style: {
            color: "black",
            fillColor: "white",
            weight: 1,
            fillOpacity: 0.4
        },
        onEachFeature: function (feature, layer) {
            const districtName = feature.properties.district || "Nom inconnu";
            const regionName = feature.properties.region || null;
            layer.bindPopup(`<strong>District :</strong> ${districtName}<br><strong>Région :</strong> ${regionName}`);
            layer.featureName = districtName;
            layer.featureRegion = regionName;
        }
    });

    initializeRegionAndDistrictInteraction(districtLayer, titleControl, map);
})
.catch(error => console.error("Erreur lors du chargement des fichiers GeoJSON :", error));

    }

    function initializeRegionAndDistrictInteraction(districtLayer, titleControl, map) {
        const regionDropdownM1 = document.getElementById("regionSelect1");
        const districtDropdown = document.getElementById("regionSelect2");
        let districtLabelMarker = null; // Marqueur pour afficher le nom du district en surbrillance

        regionDropdownM1.addEventListener("change", function () {
            const selectedRegion = this.value || "Aucun";

            if (selectedRegion === "Aucun") {
                titleControl.update("Aucun");
                map.eachLayer(function (layer) {
                    map.removeLayer(layer);
                });
                districtDropdown.innerHTML = `<option value="Aucun">-- Sélectionnez un district --</option>`;
            } else {
                districtDropdown.innerHTML = `<option value="Aucun">-- Sélectionnez un district --</option>`;
                const districtOptions = [];
                const bounds = [];
                districtLayer.eachLayer(function (layer) {
                    if (layer.featureRegion === selectedRegion) {
                        districtOptions.push(layer.featureName);
                        bounds.push(layer.getBounds());
                        layer.setStyle({
                            color: "black",
                            fillColor: "orange",
                            weight: 1,
                            fillOpacity: 0.7
                        });
                        layer.addTo(map);
                    } else {
                        map.removeLayer(layer);
                    }
                });

                if (bounds.length > 0) {
                    const combinedBounds = bounds.reduce((acc, layerBounds) => acc.extend(layerBounds), L.latLngBounds(bounds[0]));
                    map.fitBounds(combinedBounds);
                }

                districtOptions.sort().forEach(district => {
                    const option = document.createElement("option");
                    option.value = district;
                    option.textContent = district;
                    districtDropdown.appendChild(option);
                });
            }
        });

        districtDropdown.addEventListener("change", function () {
            const selectedDistrict = this.value || "Aucun";

            if (selectedDistrict === "Aucun") {
                titleControl.update("Aucun");
                districtLayer.eachLayer(function (layer) {
                    if (layer.featureRegion === regionDropdownM1.value) {
                        layer.setStyle({
                            color: "black",
                            fillColor: "orange",
                            weight: 1,
                            fillOpacity: 0.7
                        });
                    }
                });
                if (districtLabelMarker) {
                    map.removeLayer(districtLabelMarker); // Retirer la légende précédente
                    districtLabelMarker = null;
                }
            } else {
                titleControl.update(selectedDistrict); // Mettre à jour le titre
                districtLayer.eachLayer(function (layer) {
                    if (layer.featureName === selectedDistrict) {
                        layer.setStyle({
                            color: "black",
                            fillColor: "orangered",
                            weight: 2,
                            fillOpacity: 0.8
                        });

                        const center = layer.getBounds().getCenter();

                        if (districtLabelMarker) {
                            map.removeLayer(districtLabelMarker); // Retirer le marqueur précédent
                        }

                        // Ajouter le nom du district directement sur la carte
                        districtLabelMarker = L.marker(center, {
                            icon: L.divIcon({
                                className: 'district-label',
                                html: `<div style="background: white; border: 1px solid black; padding: 2px; width: min-content; white-space: nowrap; font-weight: bold; font-size: 9px; text-align: center; color: black;">
                                    ${selectedDistrict}
                                </div>`,
                                iconSize: [0, 0]
                            })
                        }).addTo(map);
                    } else if (layer.featureRegion === regionDropdownM1.value) {
                        layer.setStyle({
                            color: "black",
                            fillColor: "orange",
                            weight: 1,
                            fillOpacity: 0.7
                        });
                    } else {
                        map.removeLayer(layer);
                    }
                });
            }
        });
    }

    initializeMapM2();
});

document.getElementById("exportMapImage2").addEventListener("click", function () {
    // Sélectionnez l'élément contenant la carte
    const mapElement = document.getElementById("servicesmapM2");
    const tooltipPermanent = document.querySelector(".map-tooltip-permanent"); // Infobulle permanente
    const tooltipScroll = document.querySelector(".map-tooltip-scroll"); // Infobulle au scroll

    // Vérifier si le message permanent "Sélectionnez une région pour afficher cette carte" est affiché
    if (tooltipPermanent && tooltipPermanent.innerHTML === "Sélectionnez une région pour afficher cette carte.") {
        alert("Impossible d'exporter. Veuillez sélectionner une région avant de télécharger la carte."); // Message d'erreur
        return; // Arrêter l'exportation
    }

    // Masquer temporairement l'infobulle de scroll pour l'exportation
    if (tooltipScroll && tooltipScroll.parentNode) {
        tooltipScroll.style.display = "none";
    }

    // Exportez l'image à partir de la carte
    domtoimage.toPng(mapElement)
        .then(function (dataUrl) {
            // Créez un lien de téléchargement
            const link = document.createElement("a");
            link.download = "carte-exportée.jpg"; // Nom du fichier
            link.href = dataUrl;
            link.click(); // Télécharge l'image automatiquement
        })
        .catch(function (error) {
            console.error("Erreur lors de l'exportation : ", error);
        })
        .finally(function () {
            // Réafficher l'infobulle après l'exportation
            if (tooltipScroll && tooltipScroll.parentNode) {
                tooltipScroll.style.display = "block";
            }
        });
});

// script m3
document.addEventListener("DOMContentLoaded", function () {
    function initializeMapM3() {
        let hasInteracted = false; // Variable pour suivre l'interaction avec la carte
        let districtSelected = false; // Variable pour suivre si un district a été sélectionné

        const map = L.map("mapM3", {
            center: [-19, 49],
            zoom: 5.33,
            scrollWheelZoom: false // Désactiver le zoom au défilement par défaut
        });

        // Désactiver le glissement de la carte sur mobile
if (window.innerWidth < 768) { // Vérifie si l'écran est de petite taille (mobile)
    map.dragging.disable();
}

// Activer le déplacement après un clic sur la carte
map.on('click', function () {
    map.dragging.enable();
});

// Désactiver à nouveau lorsqu'on quitte la carte
map.on('mouseout', function () {
    if (window.innerWidth < 768) {
        map.dragging.disable();
    }
});
        
        // Style initial du curseur : par défaut
        document.getElementById('mapM3').style.cursor = 'default';

        // Crée une seule fois l'élément pour l'infobulle permanente
        const tooltipPermanent = L.DomUtil.create('div', 'map-tooltip-permanent');
        tooltipPermanent.innerHTML = "Sélectionnez un district pour afficher cette carte."; // Message permanent
        tooltipPermanent.style.position = 'absolute';
        tooltipPermanent.style.top = '50%'; // Centrer verticalement
        tooltipPermanent.style.left = '50%'; // Centrer horizontalement
        tooltipPermanent.style.transform = 'translate(-50%, -50%)'; // Ajuster pour centrer parfaitement
        tooltipPermanent.style.width = '40%'; // Espace sur les côtés
        tooltipPermanent.style.backgroundColor = 'white'; // Fond blanc
        tooltipPermanent.style.color = 'red';
        tooltipPermanent.style.fontWeight = 'bold';
        tooltipPermanent.style.padding = '10px';
        tooltipPermanent.style.textAlign = 'center'; // Centrer le texte
        tooltipPermanent.style.border = '1px solid black';
        tooltipPermanent.style.borderRadius = '10px';
        tooltipPermanent.style.zIndex = '1000'; // Assurez-vous que l'infobulle est visible au-dessus de la carte
        document.getElementById('mapM3').appendChild(tooltipPermanent);

        let tooltipScroll = null; // Élément pour le message lors du scroll

        // Mettre à jour le message lorsque la sélection de district change
        const districtDropdown = document.getElementById("regionSelect2");
        districtDropdown.addEventListener("change", function () {
            const selectedDistrict = this.value || "Aucun";
            if (selectedDistrict === "Aucun") {
                districtSelected = false; // Aucun district sélectionné
                if (!tooltipPermanent.parentNode) {
                    document.getElementById('mapM3').appendChild(tooltipPermanent); // Réafficher l'infobulle permanente
                }
                tooltipPermanent.innerHTML = "Sélectionnez un district pour afficher cette carte.";
            } else {
                districtSelected = true; // Un district est sélectionné
                if (tooltipPermanent.parentNode) {
                    tooltipPermanent.parentNode.removeChild(tooltipPermanent); // Supprimer l'infobulle permanente
                }
            }
        });

        // Activer le zoom au défilement après un clic sur la carte
        map.on('click', function () {
            if (!hasInteracted && districtSelected) {
                hasInteracted = true; // Marquer l'interaction comme effectuée
                if (tooltipScroll && tooltipScroll.parentNode) {
                    tooltipScroll.parentNode.removeChild(tooltipScroll); // Supprimer l'infobulle de scroll si elle est présente
                }
                document.getElementById('mapM3').style.cursor = 'grab'; // Changer le curseur en forme de main
            }
            if (districtSelected) {
                map.scrollWheelZoom.enable(); // Activer le zoom au défilement si un district est sélectionné
            }
        });

        // Afficher une infobulle au défilement uniquement si la carte est inactive
        map.getContainer().addEventListener('wheel', function () {
            if (!hasInteracted && districtSelected) {
                if (!tooltipScroll || !tooltipScroll.parentNode) {
                    tooltipScroll = L.DomUtil.create('div', 'map-tooltip-scroll');
                    tooltipScroll.innerHTML = "Cliquez pour activer la carte.";
                    tooltipScroll.style.position = 'absolute';
                    tooltipScroll.style.top = '50%'; // Centrer verticalement
                    tooltipScroll.style.left = '50%'; // Centrer horizontalement
                    tooltipScroll.style.transform = 'translate(-50%, -50%)'; // Ajuster pour centrer parfaitement
                    tooltipScroll.style.width = '40%'; // Espace sur les côtés
                    tooltipScroll.style.backgroundColor = 'white'; // Fond blanc
                    tooltipScroll.style.color = 'black';
                    tooltipScroll.style.fontWeight = 'bold';
                    tooltipScroll.style.padding = '10px';
                    tooltipScroll.style.textAlign = 'center'; // Centrer le texte
                    tooltipScroll.style.border = '1px solid black';
                    tooltipScroll.style.borderRadius = '10px';
                    tooltipScroll.style.zIndex = '1000'; // Assurez-vous que l'infobulle est visible au-dessus de la carte
                    document.getElementById('mapM3').appendChild(tooltipScroll);

                    // Supprimer le tooltip après un délai
                    setTimeout(() => {
                        if (tooltipScroll && tooltipScroll.parentNode) {
                            tooltipScroll.parentNode.removeChild(tooltipScroll);
                        }
                    }, 3000); // Supprime après 3 secondes
                }
            }
        }, { passive: true });
        
map.getContainer().addEventListener('touchmove', function () {
    if (!hasInteracted && districtSelected) {
        if (!tooltipScroll || !tooltipScroll.parentNode) {
            tooltipScroll = L.DomUtil.create('div', 'map-tooltip-scroll');
            tooltipScroll.innerHTML = "Cliquez pour activer la carte.";
            tooltipScroll.style.position = 'absolute';
            tooltipScroll.style.top = '50%';
            tooltipScroll.style.left = '50%';
            tooltipScroll.style.transform = 'translate(-50%, -50%)';
            tooltipScroll.style.width = '40%';
            tooltipScroll.style.backgroundColor = 'white';
            tooltipScroll.style.color = 'black';
            tooltipScroll.style.fontWeight = 'bold';
            tooltipScroll.style.padding = '10px';
            tooltipScroll.style.textAlign = 'center';
            tooltipScroll.style.border = '1px solid black';
            tooltipScroll.style.borderRadius = '10px';
            tooltipScroll.style.zIndex = '1000';
            document.getElementById('mapM3').appendChild(tooltipScroll);

            // Supprimer l'infobulle après un délai
            setTimeout(() => {
                if (tooltipScroll && tooltipScroll.parentNode) {
                    tooltipScroll.parentNode.removeChild(tooltipScroll);
                }
            }, 3000); // Supprime après 3 secondes
        }
    }
}, { passive: true });

        // Réinitialiser l'état d'interaction lorsque la souris quitte la carte
        map.on('mouseout', function () {
            if (districtSelected) {
                map.scrollWheelZoom.disable(); // Désactiver le zoom au défilement
                hasInteracted = false; // Réinitialiser l'interaction
                document.getElementById('mapM3').style.cursor = 'default'; // Retour au curseur par défaut
            }
        });

    

        // Échelle de la carte
        L.control.scale({ position: 'bottomleft', metric: true, imperial: false }).addTo(map);

        // Titre de la carte
        const titleControl = L.control({ position: 'topleft' });
        titleControl.onAdd = function () {
            const div = L.DomUtil.create('div', 'map-title-m3');
            div.style.padding = '5px';
            div.style.top = '-5px';
            div.style.left = '5px';
            div.style.background = 'white';
            div.style.border = '1px solid black';
            div.style.borderRadius = '5px';
            div.style.color = 'black';
            div.style.fontSize = '13px';
            div.style.textAlign = 'center';
            div.style.fontWeight = 'bold';
            div.style.lineHeight = '1.2'; // Compact spacing between lines
            div.textContent = " "; // Titre par défaut
            return div;
        };
        titleControl.update = function (communeName) {
            const div = document.querySelector(".map-title-m3");
            if (!communeName || communeName === "Aucun") {
                div.textContent = " "; // Titre par défaut
            } else {
                div.innerHTML = `COMMUNE<br>${communeName}`; // COMMUNE sur une ligne et communeName sur une nouvelle ligne
            }
        };
        titleControl.addTo(map);

        // Ajout de la flèche du nord
        var north = L.control({ position: 'topleft' });
        north.onAdd = function () {
            // Crée un div pour la flèche du nord
            var div = L.DomUtil.create('div', 'north-arrow');

            // Ajoute l'image avec une taille adaptée
            div.innerHTML = '<img src="north-arrow.png" alt="North Arrow" style="width: 42px; height: 50px;">';
            div.style.backgroundColor = 'none';
            div.style.padding = '5px';
            div.style.position = 'absolute';
            div.style.left = '17.5rem';
            div.style.top = '-1rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        north.addTo(map);

        var unP = L.control({ position: 'topleft' });
        unP.onAdd = function () {
            var div = L.DomUtil.create('div', 'unP');
            div.style.backgroundColor = 'black';
            div.style.padding = '2px';
            div.style.position = 'absolute';
            div.style.left = '-1vh';
            div.style.top = '3rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        unP.addTo(map);

        var deuxP = L.control({ position: 'topleft' });
        deuxP.onAdd = function () {
            var div = L.DomUtil.create('div', 'deuxP');
            div.style.backgroundColor = 'black';
            div.style.padding = '2px';
            div.style.position = 'absolute';
            div.style.left = '-1vh';
            div.style.top = '9rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        deuxP.addTo(map);

        var troisP = L.control({ position: 'topleft' });
        troisP.onAdd = function () {
            var div = L.DomUtil.create('div', 'troisP');
            div.style.backgroundColor = 'black';
            div.style.padding = '2px';
            div.style.position = 'absolute';
            div.style.left = '-1vh';
            div.style.top = '15rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        troisP.addTo(map);

        var quatreP = L.control({ position: 'topleft' });
        quatreP.onAdd = function () {
            var div = L.DomUtil.create('div', 'quatreP');
            div.style.backgroundColor = 'black';
            div.style.padding = '2px';
            div.style.position = 'absolute';
            div.style.left = '-1vh';
            div.style.top = '20.5rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        quatreP.addTo(map);
        
var un = L.control({ position: 'topleft' });
un.onAdd = function () {
    var div = L.DomUtil.create('div', 'un');
    div.style.padding = '0';
    div.style.color = 'black';
    div.style.fontSize = '10px';
    div.style.position = 'absolute';
    div.style.left = '-0.4rem';
    div.style.top = '2.8rem';
    div.style.textAlign = 'center'; // Centrer le contenu
    div.style.writingMode = 'vertical-lr'; // Texte affiché verticalement
    return div;
};
un.addTo(map);

var deux = L.control({ position: 'topleft' });
deux.onAdd = function () {
    var div = L.DomUtil.create('div', 'deux');
    div.style.padding = '0';
    div.style.color = 'black';
    div.style.fontSize = '10px';
    div.style.position = 'absolute';
    div.style.left = '-0.4rem';
    div.style.top = '8.6rem';
    div.style.textAlign = 'center'; // Centrer le contenu
    div.style.writingMode = 'vertical-lr'; // Texte affiché verticalement
    return div;
};
deux.addTo(map);

var trois = L.control({ position: 'topleft' });
trois.onAdd = function () {
    var div = L.DomUtil.create('div', 'trois');
    div.style.padding = '0';
    div.style.color = 'black';
    div.style.fontSize = '10px';
    div.style.position = 'absolute';
    div.style.left = '-0.4rem';
    div.style.top = '14.6rem';
    div.style.textAlign = 'center'; // Centrer le contenu
    div.style.writingMode = 'vertical-lr'; // Texte affiché verticalement
    return div;
};
trois.addTo(map);

var quatre = L.control({ position: 'topleft' });
quatre.onAdd = function () {
    var div = L.DomUtil.create('div', 'quatre');
    div.style.padding = '0';
    div.style.color = 'black';
    div.style.fontSize = '10px';
    div.style.position = 'absolute';
    div.style.left = '-0.4rem';
    div.style.top = '19.5rem';
    div.style.textAlign = 'center'; // Centrer le contenu
    div.style.writingMode = 'vertical-lr'; // Texte affiché verticalement
    return div;
};
quatre.addTo(map);
     

        var Long1P = L.control({ position: 'bottomleft' });
        Long1P.onAdd = function () {
            var div = L.DomUtil.create('div', 'Long1P');
            div.style.backgroundColor = 'black';
            div.style.padding = '2px';
            div.style.position = 'absolute';
            div.style.left = '4rem';
            div.style.bottom = '-0.7rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        Long1P.addTo(map);
        var Long2P = L.control({ position: 'bottomleft' });
        Long2P.onAdd = function () {
            var div = L.DomUtil.create('div', 'Long2P');
            div.style.backgroundColor = 'black';
            div.style.padding = '2px';
            div.style.position = 'absolute';
            div.style.left = '9rem';
            div.style.bottom = '-0.7rem';
            div.style.textAlign = 'center'; // Centrer le contenu
            
            return div;
        };
        Long2P.addTo(map);
        
        var Long3P = L.control({ position: 'bottomleft' });
        Long3P.onAdd = function () {
            var div = L.DomUtil.create('div', 'Long3P');
            div.style.backgroundColor = 'black';
            div.style.padding = '2px';
            div.style.position = 'absolute';
            div.style.left = '13.6rem';
            div.style.bottom = '-0.7rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        Long3P.addTo(map);
        
        var Long4P = L.control({ position: 'bottomleft' });
        Long4P.onAdd = function () {
            var div = L.DomUtil.create('div', 'Long4P');
            div.style.backgroundColor = 'black';
            div.style.padding = '2px';
            div.style.position = 'absolute';
            div.style.left = '18rem';
            div.style.bottom = '-0.7rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        Long4P.addTo(map);

        var Long1 = L.control({ position: 'bottomleft' });
        Long1.onAdd = function () {
            var div = L.DomUtil.create('div', 'Long1');
            div.style.padding = '0';
            div.style.color = 'black';
            div.style.fontSize = '10px';
            div.style.position = 'absolute';
            div.style.left = '3.5rem';
            div.style.bottom = '-0.56rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        Long1.addTo(map);
        var Long2 = L.control({ position: 'bottomleft' });
        Long2.onAdd = function () {
            var div = L.DomUtil.create('div', 'Long2');
            div.style.padding = '0';
            div.style.color = 'black';
            div.style.fontSize = '10px';
            div.style.position = 'absolute';
            div.style.left = '8.5rem';
            div.style.bottom = '-0.56rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        Long2.addTo(map);
        
        var Long3 = L.control({ position: 'bottomleft' });
        Long3.onAdd = function () {
            var div = L.DomUtil.create('div', 'Long3');
            div.style.padding = '0';
            div.style.color = 'black';
            div.style.fontSize = '10px';
            div.style.position = 'absolute';
            div.style.left = '13rem';
            div.style.bottom = '-0.56rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        Long3.addTo(map);
        
        var Long4 = L.control({ position: 'bottomleft' });
        Long4.onAdd = function () {
            var div = L.DomUtil.create('div', 'Long4');
            div.style.padding = '0';
            div.style.color = 'black';
            div.style.fontSize = '10px';
            div.style.position = 'absolute';
            div.style.left = '17.4rem';
            div.style.bottom = '-0.56rem';
            div.style.textAlign = 'center'; // Centrer le contenu

            return div;
        };
        Long4.addTo(map);

function updateCoordinates() {
    const bounds = map.getBounds(); // Obtient les limites de la carte

    // Calcul des quatre longitudes (croissantes)
    const longitudes = [
        bounds.getWest().toFixed(2), // Point à l'extrême gauche
        ((parseFloat(bounds.getWest()) * 2 + parseFloat(bounds.getEast())) / 3).toFixed(2), // 1/3 de progression croissante
        ((parseFloat(bounds.getWest()) + parseFloat(bounds.getEast()) * 2) / 3).toFixed(2), // 2/3 de progression croissante
        bounds.getEast().toFixed(2), // Point à l'extrême droite
    ];

    // Calcul des quatre latitudes (croissantes)
    const latitudes = [
        bounds.getNorth().toFixed(2), // Point en haut
        ((parseFloat(bounds.getNorth()) * 2 + parseFloat(bounds.getSouth())) / 3).toFixed(2), // 1/3 de progression croissante
        ((parseFloat(bounds.getNorth()) + parseFloat(bounds.getSouth()) * 2) / 3).toFixed(2), // 2/3 de progression croissante
        bounds.getSouth().toFixed(2), // Point en bas
    ];

    // Met à jour les valeurs affichées pour les latitudes
    document.querySelector(".un").innerHTML = latitudes[0]; // Latitude 1
    document.querySelector(".deux").innerHTML = latitudes[1]; // Latitude 2
    document.querySelector(".trois").innerHTML = latitudes[2]; // Latitude 3
    document.querySelector(".quatre").innerHTML = latitudes[3]; // Latitude 4

    // Met à jour les valeurs affichées pour les longitudes
    document.querySelector(".Long1").innerHTML = longitudes[0]; // Longitude 1
    document.querySelector(".Long2").innerHTML = longitudes[1]; // Longitude 2
    document.querySelector(".Long3").innerHTML = longitudes[2]; // Longitude 3
    document.querySelector(".Long4").innerHTML = longitudes[3]; // Longitude 4
}

// Écoute les événements de déplacement et de zoom de la carte
map.on("move", updateCoordinates);
map.on("zoomend", updateCoordinates);

// Initialise les coordonnées
updateCoordinates();
        
        // Charger les données GeoJSON des communes
Promise.all([
    fetch("VTCC1.geojson").then(response => response.json()),
    fetch("CVTC2.geojson").then(response => response.json()),
    fetch("WFJC3.geojson").then(response => response.json())
])
.then(([dataPart1, dataPart2, dataPart3]) => {
    // Fusionner les trois objets GeoJSON
    const mergedData = {
        type: "FeatureCollection",
        features: [...dataPart1.features, ...dataPart2.features, ...dataPart3.features]
    };

    // Création de la couche commune
    const communeLayer = L.geoJSON(mergedData, {
        style: {
            color: "blue",
            fillColor: "#ADD8E6", // Bleu ciel
            weight: 1,
            fillOpacity: 0.5
        },
        onEachFeature: function (feature, layer) {
            const communeName = feature.properties.commune || "Nom inconnu";
            const districtName = feature.properties.district || null;

            // Ajouter un popup pour chaque commune
            layer.bindPopup(`<strong>Commune :</strong> ${communeName}<br><strong>District :</strong> ${districtName}`);
            layer.featureName = communeName;
            layer.featureDistrict = districtName;
        }
    });

    // Ajoutez la couche commune sur la carte
    initializeCommuneInteraction(communeLayer, titleControl, map);
})
.catch(error => console.error("Erreur lors du chargement des fichiers GeoJSON :", error));

        
    }

    function initializeCommuneInteraction(communeLayer, titleControl, map) {
        const regionDropdownM1 = document.getElementById("regionSelect1");
        const districtDropdownM2 = document.getElementById("regionSelect2");
        const communeDropdown = document.getElementById("regionSelect3");
        let communeLabelMarker = null; // Marqueur pour afficher le nom de la commune sur la carte

        // Réinitialiser la carte si une région est sélectionnée en M1
        regionDropdownM1.addEventListener("change", function () {
            districtDropdownM2.value = "Aucun"; // Remettre M2 à son état par défaut
            districtDropdownM2.dispatchEvent(new Event("change")); // Simuler un changement dans M2
            titleControl.update("Aucun");
            communeDropdown.innerHTML = `<option value="Aucun">-- Sélectionnez une commune --</option>`;
        });

       // Gestion de la sélection d'un district dans M2
districtDropdownM2.addEventListener("change", function () {
    const selectedDistrict = this.value || "Aucun";

    if (selectedDistrict === "Aucun") {
        // Réinitialiser le titre de la carte
        titleControl.update("Aucun");

        map.eachLayer(function (layer) {
            map.removeLayer(layer); // Retirer toutes les communes
        });
        communeDropdown.innerHTML = `<option value="Aucun">-- Sélectionnez une commune --</option>`;
    } else {
        titleControl.update("Aucun"); // Réinitialiser le titre également ici si nécessaire
        communeDropdown.innerHTML = `<option value="Aucun">-- Sélectionnez une commune --</option>`;
        const communeOptions = [];
        const bounds = [];
        communeLayer.eachLayer(function (layer) {
            if (layer.featureDistrict === selectedDistrict) {
                communeOptions.push(layer.featureName);
                bounds.push(layer.getBounds());
                layer.setStyle({
                    color: "white",
                    fillColor: "orangered",
                    weight: 1,
                    fillOpacity: 0.9
                });
                layer.addTo(map);
            } else {
                map.removeLayer(layer);
            }
        });

        if (bounds.length > 0) {
            const combinedBounds = bounds.reduce((acc, layerBounds) => acc.extend(layerBounds), L.latLngBounds(bounds[0]));
            map.fitBounds(combinedBounds);
        }

        communeOptions.sort().forEach(commune => {
            const option = document.createElement("option");
            option.value = commune;
            option.textContent = commune;
            communeDropdown.appendChild(option);
        });
    }
});


        // Gestion de la sélection d'une commune dans M3
        communeDropdown.addEventListener("change", function () {
            const selectedCommune = this.value || "Aucun";

            if (selectedCommune === "Aucun") {
                titleControl.update("Aucun");
                if (communeLabelMarker) {
                    map.removeLayer(communeLabelMarker); // Supprimer le marqueur précédent
                    communeLabelMarker = null;
                }
                communeLayer.eachLayer(function (layer) {
                    layer.setStyle({
                        color: "black",
                        fillColor: "orangered",
                        weight: 1,
                        fillOpacity: 0.5
                    });
                });
            } else {
                communeLayer.eachLayer(function (layer) {
                    if (layer.featureName === selectedCommune) {
                        layer.setStyle({
                            color: "black",
                            fillColor: "red", // Bleu ciel pour surbrillance
                            weight: 2,
                            fillOpacity: 0.7
                        });

                        const center = layer.getBounds().getCenter();

                        if (communeLabelMarker) {
                            map.removeLayer(communeLabelMarker); // Retirer le marqueur précédent
                        }

                        // Ajouter la légende sur la carte
                        communeLabelMarker = L.marker(center, {
                            icon: L.divIcon({
                                className: 'commune-label',
                                html: `<div style="background: white; border: 1px solid black; padding: 2px; white-space: nowrap; width: min-content; font-weight: bold; font-size: 9px; text-align: center; color: black;">
                                    ${selectedCommune}
                                </div>`,
                                iconSize: [0, 0]
                            })
                        }).addTo(map);

                        titleControl.update(selectedCommune); // Mettre à jour le titre
                    } else {
                        layer.setStyle({
                            color: "white",
                            fillColor: "orangered",
                            weight: 0.8,
                            fillOpacity: 0.9
                        });
                    }
                });
            }
        });
    }

    // Initialiser la carte M3
    initializeMapM3();
});


let districtSelected = false; // Variable globale pour suivre l'état de sélection

document.getElementById("regionSelect2").addEventListener("change", function () {
    const selectedDistrict = this.value || "Aucun";
    districtSelected = selectedDistrict !== "Aucun"; // Met à jour l'état selon la sélection
});

document.getElementById("exportMapImage3").addEventListener("click", function () {
    // Vérifier si un district est sélectionné avant l'exportation
    if (!districtSelected) {
        alert("Impossible d'exporter. Veuillez sélectionner un district avant de télécharger la carte."); // Message d'erreur
        return; // Arrêter l'exportation
    }

    // Sélectionnez l'élément contenant la carte
    const mapElement = document.getElementById("servicesmapM3");
    const tooltipScroll = document.querySelector(".map-tooltip-scroll"); // Infobulle au scroll

    // Masquer temporairement l'infobulle de scroll pour l'exportation
    if (tooltipScroll && tooltipScroll.parentNode) {
        tooltipScroll.style.display = "none";
    }

    // Exportez l'image à partir de la carte
    domtoimage.toPng(mapElement)
        .then(function (dataUrl) {
            // Créez un lien de téléchargement
            const link = document.createElement("a");
            link.download = "carte-exportée.jpg"; // Nom du fichier
            link.href = dataUrl;
            link.click(); // Télécharge l'image automatiquement
        })
        .catch(function (error) {
            console.error("Erreur lors de l'exportation :", error);
        })
        .finally(function () {
            // Réafficher l'infobulle après l'exportation
            if (tooltipScroll && tooltipScroll.parentNode) {
                tooltipScroll.style.display = "block";
            }
        });
});
