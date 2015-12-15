// // Alfredo Sebastian Rosadilla Ribeiro
// (function(global, factory) {
//     'use strict';
//     if (typeof define === 'function' && define.amd) {
//         define(['jquery'], function($) {
//           return factory($, global, global.document, global.Math);
//         });
//     } else if (typeof exports !== 'undefined') {
//         module.exports = factory(require('jquery'), global, global.document, global.Math);
//     } else {
//         factory(jQuery, global, global.document, global.Math);
//     }
// })
//   'use strict';
//   $(window).load(function() {
//     angular.element(document).ready(function() {
//       var popUps = document.getElementsByClassName('sr-popup');
//
//       if (popUps.length > 0) {
//           console.log(popUps[0].nextSibling);
//   // -----------------------------------------------------------------------------
//         // initilizing
//         var elementSons = [],
//             son = 0,
//             background = [],
//             siblingsbackground = [],
//             siblingsPop = [];
//
//         // Create the background divs
//         for (var i = 0; i < popUps.length; i++) {
//           background.push(document.createElement('div'));
//           siblingsbackground.push(document.createElement('section'));
//         }
//
//         // Obtein each direct element
//         for (var i = 0; i < popUps.length; i++) {
//           // Put all sibling in a container
//           siblingsPop.push([]);
//           if (popUps[i].nextSibling) {
//             siblingsPop[i].push(popUps[i].nextSibling);
//             siblingsbackground[i].appendChild(popUps[i].nextSibling);
//             son = 0;
//             while(siblingsPop[son].nextSibling) {
//               son++;
//               siblingsPop[son].push(popUps[son].nextSibling);
//               siblingsbackground[i].appendChild(popUps[son].nextSibling);
//             }
//           }
//
//           popUps[i].parentNode.appendChild(siblingsbackground[i]);
//
//
//           // Each element is an array whit the first son pop-up
//           elementSons.push([popUps[i].firstChild]);
//
//           // Add each sibling
//           son = 0;
//           while (elementSons[i][son].nextSibling) {
//             elementSons[i].push(elementSons[i][son].nextSibling);
//             son++;
//           }
//         }
//
//         for (var i = 0; i < elementSons.length; i++) {
//           for (var j = 0; j < elementSons[i].length; j++) {
//             background[i].appendChild(elementSons[i][j]);
//           }
//           popUps[i].appendChild(background[i]);
//         }
//   // -----------------------------------------------------------------------------
//         // Create the pop-up
//         var sHeight = window.screen.height,
//             sWidth = window.screen.width,
//             body = document.getElementsByTagName('body')[0];
//
//         // Background container
//         for (var i = 0; i < popUps.length; i++) {
//           popUps[i].style.height = sHeight + 'px';
//           popUps[i].style.width = sWidth + 'px';
//           popUps[i].style.background = 'rgba(255, 255, 255, 0.5)';
//         }
//       }
//     })
//   });
