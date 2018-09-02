/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.font.plugins {
    import BitmapCharacter = com.jme3.font.BitmapCharacter;

    import BitmapCharacterSet = com.jme3.font.BitmapCharacterSet;

    import BitmapFont = com.jme3.font.BitmapFont;

    import Material = com.jme3.material.Material;

    import MaterialDef = com.jme3.material.MaterialDef;

    import BlendMode = com.jme3.material.RenderState.BlendMode;

    import Texture = com.jme3.texture.Texture;

    import BufferedReader = java.io.BufferedReader;

    import IOException = java.io.IOException;

    import InputStream = java.io.InputStream;

    import InputStreamReader = java.io.InputStreamReader;

    import SYSTEM_EXCEPTION = org.omg.PortableInterceptor.SYSTEM_EXCEPTION;

    export class BitmapFontLoader implements AssetLoader {
        public load(assetManager? : any, folder? : any, __in? : any) : any {
            if(((assetManager != null && (assetManager["__interfaces"] != null && assetManager["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0 || assetManager.constructor != null && assetManager.constructor["__interfaces"] != null && assetManager.constructor["__interfaces"].indexOf("com.jme3.asset.AssetManager") >= 0)) || assetManager === null) && ((typeof folder === 'string') || folder === null) && ((__in != null && __in instanceof java.io.InputStream) || __in === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let spriteMat : MaterialDef = <MaterialDef>assetManager.loadAsset(<any>(new AssetKey("Common/MatDefs/Misc/Unshaded.j3md")));
                    let charSet : BitmapCharacterSet = new BitmapCharacterSet();
                    let matPages : Material[] = null;
                    let font : BitmapFont = new BitmapFont();
                    let reader : BufferedReader = new BufferedReader(new InputStreamReader(__in));
                    let regex : string = "[\\s=]+";
                    font.setCharSet(charSet);
                    let line : string;
                    while(((line = reader.readLine()) != null)){
                        let tokens : string[] = line.split(regex);
                        if((tokens[0] === "info")) {
                            for(let i : number = 1; i < tokens.length; i++) {
                                if((tokens[i] === "size")) {
                                    charSet.setRenderedSize(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                }
                            }
                        } else if((tokens[0] === "common")) {
                            for(let i : number = 1; i < tokens.length; i++) {
                                let token : string = tokens[i];
                                if((token === "lineHeight")) {
                                    charSet.setLineHeight(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "base")) {
                                    charSet.setBase(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "scaleW")) {
                                    charSet.setWidth(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "scaleH")) {
                                    charSet.setHeight(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "pages")) {
                                    matPages = new Array(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                    font.setPages(matPages);
                                }
                            }
                        } else if((tokens[0] === "page")) {
                            let index : number = -1;
                            let tex : Texture = null;
                            for(let i : number = 1; i < tokens.length; i++) {
                                let token : string = tokens[i];
                                if((token === "id")) {
                                    index = javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]);
                                } else if((token === "file")) {
                                    let file : string = tokens[i + 1];
                                    if(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(file, "\"")) {
                                        file = file.substring(1, file.length - 1);
                                    }
                                    let key : TextureKey = new TextureKey(folder + file, true);
                                    key.setGenerateMips(false);
                                    tex = assetManager.loadTexture(key);
                                    tex.setMagFilter(Texture.MagFilter.Bilinear);
                                    tex.setMinFilter(Texture.MinFilter.BilinearNoMipMaps);
                                }
                            }
                            if(index >= 0 && tex != null) {
                                let mat : Material = new Material(spriteMat);
                                mat.setTexture("ColorMap", tex);
                                mat.setBoolean("VertexColor", true);
                                mat.getAdditionalRenderState().setBlendMode(BlendMode.Alpha);
                                matPages[index] = mat;
                            }
                        } else if((tokens[0] === "char")) {
                            let ch : BitmapCharacter = null;
                            for(let i : number = 1; i < tokens.length; i++) {
                                let token : string = tokens[i];
                                if((token === "id")) {
                                    let index : number = javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]);
                                    ch = new BitmapCharacter();
                                    charSet.addCharacter(index, ch);
                                } else if((token === "x")) {
                                    ch.setX(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "y")) {
                                    ch.setY(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "width")) {
                                    ch.setWidth(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "height")) {
                                    ch.setHeight(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "xoffset")) {
                                    ch.setXOffset(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "yoffset")) {
                                    ch.setYOffset(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "xadvance")) {
                                    ch.setXAdvance(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                } else if((token === "page")) {
                                    ch.setPage(javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]));
                                }
                            }
                        } else if((tokens[0] === "kerning")) {
                            let index : number = 0;
                            let second : number = 0;
                            let amount : number = 0;
                            for(let i : number = 1; i < tokens.length; i++) {
                                if((tokens[i] === "first")) {
                                    index = javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]);
                                } else if((tokens[i] === "second")) {
                                    second = javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]);
                                } else if((tokens[i] === "amount")) {
                                    amount = javaemul.internal.IntegerHelper.parseInt(tokens[i + 1]);
                                }
                            }
                            let ch : BitmapCharacter = charSet.getCharacter(index);
                            ch.addKerning(second, amount);
                        }
                    };
                    return font;
                })();
            } else if(((assetManager != null && assetManager instanceof com.jme3.asset.AssetInfo) || assetManager === null) && folder === undefined && __in === undefined) {
                return <any>this.load$com_jme3_asset_AssetInfo(assetManager);
            } else throw new Error('invalid overload');
        }

        public load$com_jme3_asset_AssetInfo(info : AssetInfo) : any {
            let __in : InputStream = null;
            try {
                __in = info.openStream();
                let font : BitmapFont = this.load(info.getManager(), info.getKey().getFolder(), __in);
                return font;
            } finally {
                if(__in != null) {
                    __in.close();
                }
            };
        }

        constructor() {
        }
    }
    BitmapFontLoader["__class"] = "com.jme3.font.plugins.BitmapFontLoader";
    BitmapFontLoader["__interfaces"] = ["com.jme3.asset.AssetLoader"];


}

