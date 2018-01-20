/*
 * Copyright (C) 2016 CRTOLEDO.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301  USA
 */

 // Main viewmodel class
 define(['jquery'], function($) {
     return new function i18nTool() {
         var mainMod = this;
     //Private
        
		 //Public
        mainMod.translateAtt = function(attName, attValue, keys){
                if(!keys){
                   return attValue;
                }
                else{
                  var attValMod = attValue;
                  for(var key in keys){
                    attValMod = attValMod.replace("__"+key+"__",keys[key]);
                  }
                  return attValMod;
                }
         };
     };
 });
