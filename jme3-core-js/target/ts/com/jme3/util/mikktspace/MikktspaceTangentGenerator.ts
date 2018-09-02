/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util.mikktspace {
    import FastMath = com.jme3.math.FastMath;

    import Vector3f = com.jme3.math.Vector3f;

    import ArrayList = java.util.ArrayList;

    import Arrays = java.util.Arrays;

    import List = java.util.List;

    import Level = java.util.logging.Level;

    import Logger = java.util.logging.Logger;

    /**
     * This tangent generator is Highly experimental.
     * This is the Java translation of The mikktspace generator made by Morten S. Mikkelsen
     * C Source code can be found here
     * https://developer.blender.org/diffusion/B/browse/master/intern/mikktspace/mikktspace.c
     * https://developer.blender.org/diffusion/B/browse/master/intern/mikktspace/mikktspace.h
     * 
     * MikkTspace looks like the new standard of tangent generation in 3D softwares.
     * Xnormal, Blender, Substance painter, and many more use it.
     * 
     * Usage is :
     * MikkTSpaceTangentGenerator.generate(spatial);
     * 
     * 
     * 
     * @author Nehon
     */
    export class MikktspaceTangentGenerator {
        static MARK_DEGENERATE : number = 1;

        static QUAD_ONE_DEGEN_TRI : number = 2;

        static GROUP_WITH_ANY : number = 4;

        static ORIENT_PRESERVING : number = 8;

        static INTERNAL_RND_SORT_SEED : number; public static INTERNAL_RND_SORT_SEED_$LI$() : number { if(MikktspaceTangentGenerator.INTERNAL_RND_SORT_SEED == null) MikktspaceTangentGenerator.INTERNAL_RND_SORT_SEED = 39871946 & 4294967295; return MikktspaceTangentGenerator.INTERNAL_RND_SORT_SEED; };

        static CELLS : number = 2048;

        static makeIndex(face : number, vert : number) : number {
            return (face << 2) | (vert & 3);
        }

        static indexToData(face : number[], vert : number[], indexIn : number) {
            vert[0] = indexIn & 3;
            face[0] = indexIn >> 2;
        }

        static avgTSpace(tS0 : MikktspaceTangentGenerator.TSpace, tS1 : MikktspaceTangentGenerator.TSpace) : MikktspaceTangentGenerator.TSpace {
            let tsRes : MikktspaceTangentGenerator.TSpace = new MikktspaceTangentGenerator.TSpace();
            if(tS0.magS === tS1.magS && tS0.magT === tS1.magT && tS0.os.equals(tS1.os) && tS0.ot.equals(tS1.ot)) {
                tsRes.magS = tS0.magS;
                tsRes.magT = tS0.magT;
                tsRes.os.set(tS0.os);
                tsRes.ot.set(tS0.ot);
            } else {
                tsRes.magS = 0.5 * (tS0.magS + tS1.magS);
                tsRes.magT = 0.5 * (tS0.magT + tS1.magT);
                tsRes.os.set(tS0.os).addLocal(tS1.os).normalizeLocal();
                tsRes.ot.set(tS0.ot).addLocal(tS1.ot).normalizeLocal();
            }
            return tsRes;
        }

        public static generate(s : Spatial) {
            if(s != null && s instanceof com.jme3.scene.Node) {
                let n : Node = <Node>s;
                for(let index537=n.getChildren().iterator();index537.hasNext();) {
                    let child = index537.next();
                    {
                        MikktspaceTangentGenerator.generate(child);
                    }
                }
            } else if(s != null && s instanceof com.jme3.scene.Geometry) {
                let g : Geometry = <Geometry>s;
                let context : MikkTSpaceImpl = new MikkTSpaceImpl(g.getMesh());
                if(!MikktspaceTangentGenerator.genTangSpaceDefault(context)) {
                    Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c.name)(MikktspaceTangentGenerator)).log(Level.SEVERE, "Failed to generate tangents for geometry " + g.getName());
                }
                TangentUtils.generateBindPoseTangentsIfNecessary(g.getMesh());
            }
        }

        public static genTangSpaceDefault(mikkTSpace : MikkTSpaceContext) : boolean {
            return MikktspaceTangentGenerator.genTangSpace(mikkTSpace, 180.0);
        }

        public static genTangSpace(mikkTSpace : MikkTSpaceContext, angularThreshold : number) : boolean {
            let piTriListIn : number[];
            let piGroupTrianglesBuffer : number[];
            let pTriInfos : MikktspaceTangentGenerator.TriInfo[];
            let pGroups : MikktspaceTangentGenerator.Group[];
            let psTspace : MikktspaceTangentGenerator.TSpace[];
            let iNrTrianglesIn : number = 0;
            let iNrTSPaces : number;
            let iTotTris : number;
            let iDegenTriangles : number;
            let iNrMaxGroups : number;
            let iNrActiveGroups : number;
            let index : number;
            let iNrFaces : number = mikkTSpace.getNumFaces();
            let fThresCos : number = <number>FastMath.cos((angularThreshold * <number>FastMath.PI_$LI$()) / 180.0);
            for(let f : number = 0; f < iNrFaces; f++) {
                let verts : number = mikkTSpace.getNumVerticesOfFace(f);
                if(verts === 3) {
                    ++iNrTrianglesIn;
                } else if(verts === 4) {
                    iNrTrianglesIn += 2;
                }
            }
            if(iNrTrianglesIn <= 0) {
                return false;
            }
            piTriListIn = new Array(3 * iNrTrianglesIn);
            pTriInfos = new Array(iNrTrianglesIn);
            iNrTSPaces = MikktspaceTangentGenerator.generateInitialVerticesIndexList(pTriInfos, piTriListIn, mikkTSpace, iNrTrianglesIn);
            MikktspaceTangentGenerator.generateSharedVerticesIndexList(piTriListIn, mikkTSpace, iNrTrianglesIn);
            iTotTris = iNrTrianglesIn;
            iDegenTriangles = 0;
            for(let t : number = 0; t < iTotTris; t++) {
                let i0 : number = piTriListIn[t * 3 + 0];
                let i1 : number = piTriListIn[t * 3 + 1];
                let i2 : number = piTriListIn[t * 3 + 2];
                let p0 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, i0);
                let p1 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, i1);
                let p2 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, i2);
                if(p0.equals(p1) || p0.equals(p2) || p1.equals(p2)) {
                    pTriInfos[t].flag |= MikktspaceTangentGenerator.MARK_DEGENERATE;
                    ++iDegenTriangles;
                }
            }
            iNrTrianglesIn = iTotTris - iDegenTriangles;
            MikktspaceTangentGenerator.degenPrologue(pTriInfos, piTriListIn, iNrTrianglesIn, iTotTris);
            MikktspaceTangentGenerator.initTriInfo(pTriInfos, piTriListIn, mikkTSpace, iNrTrianglesIn);
            iNrMaxGroups = iNrTrianglesIn * 3;
            pGroups = new Array(iNrMaxGroups);
            piGroupTrianglesBuffer = new Array(iNrTrianglesIn * 3);
            iNrActiveGroups = MikktspaceTangentGenerator.build4RuleGroups(pTriInfos, pGroups, piGroupTrianglesBuffer, piTriListIn, iNrTrianglesIn);
            psTspace = new Array(iNrTSPaces);
            for(let t : number = 0; t < iNrTSPaces; t++) {
                let tSpace : MikktspaceTangentGenerator.TSpace = new MikktspaceTangentGenerator.TSpace();
                tSpace.os.set(1.0, 0.0, 0.0);
                tSpace.magS = 1.0;
                tSpace.ot.set(0.0, 1.0, 0.0);
                tSpace.magT = 1.0;
                psTspace[t] = tSpace;
            }
            MikktspaceTangentGenerator.generateTSpaces(psTspace, pTriInfos, pGroups, iNrActiveGroups, piTriListIn, fThresCos, mikkTSpace);
            MikktspaceTangentGenerator.DegenEpilogue(psTspace, pTriInfos, piTriListIn, mikkTSpace, iNrTrianglesIn, iTotTris);
            index = 0;
            for(let f : number = 0; f < iNrFaces; f++) {
                let verts : number = mikkTSpace.getNumVerticesOfFace(f);
                if(verts !== 3 && verts !== 4) {
                    continue;
                }
                for(let i : number = 0; i < verts; i++) {
                    let pTSpace : MikktspaceTangentGenerator.TSpace = psTspace[index];
                    let tang : number[] = [pTSpace.os.x, pTSpace.os.y, pTSpace.os.z];
                    let bitang : number[] = [pTSpace.ot.x, pTSpace.ot.y, pTSpace.ot.z];
                    mikkTSpace.setTSpace(tang, bitang, pTSpace.magS, pTSpace.magT, pTSpace.orient, f, i);
                    mikkTSpace.setTSpaceBasic(tang, pTSpace.orient === true?1.0:(-1.0), f, i);
                    ++index;
                }
            }
            return true;
        }

        static findGridCell(min : number, max : number, val : number) : number {
            let fIndex : number = MikktspaceTangentGenerator.CELLS * ((val - min) / (max - min));
            let iIndex : number = (<number>fIndex|0);
            return iIndex < MikktspaceTangentGenerator.CELLS?(iIndex >= 0?iIndex:0):(MikktspaceTangentGenerator.CELLS - 1);
        }

        static generateSharedVerticesIndexList(piTriList_in_and_out : number[], mikkTSpace : MikkTSpaceContext, iNrTrianglesIn : number) {
            let pTmpVert : MikktspaceTangentGenerator.TmpVert[];
            let vMin : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, 0);
            let vMax : Vector3f = vMin.clone();
            let vDim : Vector3f;
            let fMin : number;
            let fMax : number;
            for(let i : number = 1; i < (iNrTrianglesIn * 3); i++) {
                let index : number = piTriList_in_and_out[i];
                let vP : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, index);
                if(vMin.x > vP.x) {
                    vMin.x = vP.x;
                } else if(vMax.x < vP.x) {
                    vMax.x = vP.x;
                }
                if(vMin.y > vP.y) {
                    vMin.y = vP.y;
                } else if(vMax.y < vP.y) {
                    vMax.y = vP.y;
                }
                if(vMin.z > vP.z) {
                    vMin.z = vP.z;
                } else if(vMax.z < vP.z) {
                    vMax.z = vP.z;
                }
            }
            vDim = vMax.subtract(vMin);
            let iChannel : number = 0;
            fMin = vMin.x;
            fMax = vMax.x;
            if(vDim.y > vDim.x && vDim.y > vDim.z) {
                iChannel = 1;
                fMin = vMin.y;
                fMax = vMax.y;
            } else if(vDim.z > vDim.x) {
                iChannel = 2;
                fMin = vMin.z;
                fMax = vMax.z;
            }
            let piHashTable : number[] = new Array(iNrTrianglesIn * 3);
            let piHashCount : number[] = new Array(MikktspaceTangentGenerator.CELLS);
            let piHashOffsets : number[] = new Array(MikktspaceTangentGenerator.CELLS);
            let piHashCount2 : number[] = new Array(MikktspaceTangentGenerator.CELLS);
            for(let i : number = 0; i < (iNrTrianglesIn * 3); i++) {
                let index : number = piTriList_in_and_out[i];
                let vP : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, index);
                let fVal : number = iChannel === 0?vP.x:(iChannel === 1?vP.y:vP.z);
                let iCell : number = MikktspaceTangentGenerator.findGridCell(fMin, fMax, fVal);
                ++piHashCount[iCell];
            }
            piHashOffsets[0] = 0;
            for(let k : number = 1; k < MikktspaceTangentGenerator.CELLS; k++) {
                piHashOffsets[k] = piHashOffsets[k - 1] + piHashCount[k - 1];
            }
            for(let i : number = 0; i < (iNrTrianglesIn * 3); i++) {
                let index : number = piTriList_in_and_out[i];
                let vP : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, index);
                let fVal : number = iChannel === 0?vP.x:(iChannel === 1?vP.y:vP.z);
                let iCell : number = MikktspaceTangentGenerator.findGridCell(fMin, fMax, fVal);
                piHashTable[piHashOffsets[iCell] + piHashCount2[iCell]] = i;
                ++piHashCount2[iCell];
            }
            for(let k : number = 0; k < MikktspaceTangentGenerator.CELLS; k++) {
            }
            let iMaxCount : number = piHashCount[0];
            for(let k : number = 1; k < MikktspaceTangentGenerator.CELLS; k++) {
                if(iMaxCount < piHashCount[k]) {
                    iMaxCount = piHashCount[k];
                }
            }
            pTmpVert = new Array(iMaxCount);
            for(let k : number = 0; k < MikktspaceTangentGenerator.CELLS; k++) {
                let iEntries : number = piHashCount[k];
                if(iEntries < 2) {
                    continue;
                }
                if(pTmpVert != null) {
                    for(let e : number = 0; e < iEntries; e++) {
                        let j : number = piHashTable[piHashOffsets[k] + e];
                        let vP : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, piTriList_in_and_out[j]);
                        pTmpVert[e] = new MikktspaceTangentGenerator.TmpVert();
                        pTmpVert[e].vert[0] = vP.x;
                        pTmpVert[e].vert[1] = vP.y;
                        pTmpVert[e].vert[2] = vP.z;
                        pTmpVert[e].index = j;
                    }
                    MikktspaceTangentGenerator.MergeVertsFast(piTriList_in_and_out, pTmpVert, mikkTSpace, 0, iEntries - 1);
                } else {
                    let pTable : number[] = Arrays.copyOfRange(piHashTable, piHashOffsets[k], piHashOffsets[k] + iEntries);
                    MikktspaceTangentGenerator.MergeVertsSlow(piTriList_in_and_out, mikkTSpace, pTable, iEntries);
                }
            }
        }

        static MergeVertsFast(piTriList_in_and_out : number[], pTmpVert : MikktspaceTangentGenerator.TmpVert[], mikkTSpace : MikkTSpaceContext, iL_in : number, iR_in : number) {
            let fvMin : number[] = new Array(3);
            let fvMax : number[] = new Array(3);
            for(let c : number = 0; c < 3; c++) {
                fvMin[c] = pTmpVert[iL_in].vert[c];
                fvMax[c] = fvMin[c];
            }
            for(let l : number = (iL_in + 1); l <= iR_in; l++) {
                for(let c : number = 0; c < 3; c++) {
                    if(fvMin[c] > pTmpVert[l].vert[c]) {
                        fvMin[c] = pTmpVert[l].vert[c];
                    } else if(fvMax[c] < pTmpVert[l].vert[c]) {
                        fvMax[c] = pTmpVert[l].vert[c];
                    }
                }
            }
            let dx : number = fvMax[0] - fvMin[0];
            let dy : number = fvMax[1] - fvMin[1];
            let dz : number = fvMax[2] - fvMin[2];
            let channel : number = 0;
            if(dy > dx && dy > dz) {
                channel = 1;
            } else if(dz > dx) {
                channel = 2;
            }
            let fSep : number = 0.5 * (fvMax[channel] + fvMin[channel]);
            if(fSep >= fvMax[channel] || fSep <= fvMin[channel]) {
                for(let l : number = iL_in; l <= iR_in; l++) {
                    let i : number = pTmpVert[l].index;
                    let index : number = piTriList_in_and_out[i];
                    let vP : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, index);
                    let vN : Vector3f = MikktspaceTangentGenerator.getNormal(mikkTSpace, index);
                    let vT : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, index);
                    let bNotFound : boolean = true;
                    let l2 : number = iL_in;
                    let i2rec : number = -1;
                    while((l2 < l && bNotFound)){
                        let i2 : number = pTmpVert[l2].index;
                        let index2 : number = piTriList_in_and_out[i2];
                        let vP2 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, index2);
                        let vN2 : Vector3f = MikktspaceTangentGenerator.getNormal(mikkTSpace, index2);
                        let vT2 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, index2);
                        i2rec = i2;
                        if(vP.x === vP2.x && vP.y === vP2.y && vP.z === vP2.z && vN.x === vN2.x && vN.y === vN2.y && vN.z === vN2.z && vT.x === vT2.x && vT.y === vT2.y && vT.z === vT2.z) {
                            bNotFound = false;
                        } else {
                            ++l2;
                        }
                    };
                    if(!bNotFound) {
                        piTriList_in_and_out[i] = piTriList_in_and_out[i2rec];
                    }
                }
            } else {
                let iL : number = iL_in;
                let iR : number = iR_in;
                while((iL < iR)){
                    let bReadyLeftSwap : boolean = false;
                    let bReadyRightSwap : boolean = false;
                    while(((!bReadyLeftSwap) && iL < iR)){
                        bReadyLeftSwap = !(pTmpVert[iL].vert[channel] < fSep);
                        if(!bReadyLeftSwap) {
                            ++iL;
                        }
                    };
                    while(((!bReadyRightSwap) && iL < iR)){
                        bReadyRightSwap = pTmpVert[iR].vert[channel] < fSep;
                        if(!bReadyRightSwap) {
                            --iR;
                        }
                    };
                    if(bReadyLeftSwap && bReadyRightSwap) {
                        let sTmp : MikktspaceTangentGenerator.TmpVert = pTmpVert[iL];
                        pTmpVert[iL] = pTmpVert[iR];
                        pTmpVert[iR] = sTmp;
                        ++iL;
                        --iR;
                    }
                };
                if(iL === iR) {
                    let bReadyRightSwap : boolean = pTmpVert[iR].vert[channel] < fSep;
                    if(bReadyRightSwap) {
                        ++iL;
                    } else {
                        --iR;
                    }
                }
                if(iL_in < iR) {
                    MikktspaceTangentGenerator.MergeVertsFast(piTriList_in_and_out, pTmpVert, mikkTSpace, iL_in, iR);
                }
                if(iL < iR_in) {
                    MikktspaceTangentGenerator.MergeVertsFast(piTriList_in_and_out, pTmpVert, mikkTSpace, iL, iR_in);
                }
            }
        }

        static MergeVertsSlow(piTriList_in_and_out : number[], mikkTSpace : MikkTSpaceContext, pTable : number[], iEntries : number) {
            for(let e : number = 0; e < iEntries; e++) {
                let i : number = pTable[e];
                let index : number = piTriList_in_and_out[i];
                let vP : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, index);
                let vN : Vector3f = MikktspaceTangentGenerator.getNormal(mikkTSpace, index);
                let vT : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, index);
                let bNotFound : boolean = true;
                let e2 : number = 0;
                let i2rec : number = -1;
                while((e2 < e && bNotFound)){
                    let i2 : number = pTable[e2];
                    let index2 : number = piTriList_in_and_out[i2];
                    let vP2 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, index2);
                    let vN2 : Vector3f = MikktspaceTangentGenerator.getNormal(mikkTSpace, index2);
                    let vT2 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, index2);
                    i2rec = i2;
                    if(vP.equals(vP2) && vN.equals(vN2) && vT.equals(vT2)) {
                        bNotFound = false;
                    } else {
                        ++e2;
                    }
                };
                if(!bNotFound) {
                    piTriList_in_and_out[i] = piTriList_in_and_out[i2rec];
                }
            }
        }

        static generateSharedVerticesIndexListSlow(piTriList_in_and_out : number[], mikkTSpace : MikkTSpaceContext, iNrTrianglesIn : number) {
            let iNumUniqueVerts : number = 0;
            for(let t : number = 0; t < iNrTrianglesIn; t++) {
                for(let i : number = 0; i < 3; i++) {
                    let offs : number = t * 3 + i;
                    let index : number = piTriList_in_and_out[offs];
                    let vP : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, index);
                    let vN : Vector3f = MikktspaceTangentGenerator.getNormal(mikkTSpace, index);
                    let vT : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, index);
                    let bFound : boolean = false;
                    let t2 : number = 0;
                    let index2rec : number = -1;
                    while((!bFound && t2 <= t)){
                        let j : number = 0;
                        while((!bFound && j < 3)){
                            let index2 : number = piTriList_in_and_out[t2 * 3 + j];
                            let vP2 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, index2);
                            let vN2 : Vector3f = MikktspaceTangentGenerator.getNormal(mikkTSpace, index2);
                            let vT2 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, index2);
                            if(vP.equals(vP2) && vN.equals(vN2) && vT.equals(vT2)) {
                                bFound = true;
                            } else {
                                ++j;
                            }
                        };
                        if(!bFound) {
                            ++t2;
                        }
                    };
                    if(index2rec === index) {
                        ++iNumUniqueVerts;
                    }
                    piTriList_in_and_out[offs] = index2rec;
                }
            }
        }

        static generateInitialVerticesIndexList(pTriInfos : MikktspaceTangentGenerator.TriInfo[], piTriList_out : number[], mikkTSpace : MikkTSpaceContext, iNrTrianglesIn : number) : number {
            let iTSpacesOffs : number = 0;
            let iDstTriIndex : number = 0;
            for(let f : number = 0; f < mikkTSpace.getNumFaces(); f++) {
                let verts : number = mikkTSpace.getNumVerticesOfFace(f);
                if(verts !== 3 && verts !== 4) {
                    continue;
                }
                pTriInfos[iDstTriIndex] = new MikktspaceTangentGenerator.TriInfo();
                pTriInfos[iDstTriIndex].orgFaceNumber = f;
                pTriInfos[iDstTriIndex].tSpacesOffs = iTSpacesOffs;
                if(verts === 3) {
                    let pVerts : number[] = pTriInfos[iDstTriIndex].vertNum;
                    pVerts[0] = 0;
                    pVerts[1] = 1;
                    pVerts[2] = 2;
                    piTriList_out[iDstTriIndex * 3 + 0] = MikktspaceTangentGenerator.makeIndex(f, 0);
                    piTriList_out[iDstTriIndex * 3 + 1] = MikktspaceTangentGenerator.makeIndex(f, 1);
                    piTriList_out[iDstTriIndex * 3 + 2] = MikktspaceTangentGenerator.makeIndex(f, 2);
                    ++iDstTriIndex;
                } else {
                    {
                        pTriInfos[iDstTriIndex + 1].orgFaceNumber = f;
                        pTriInfos[iDstTriIndex + 1].tSpacesOffs = iTSpacesOffs;
                    };
                    {
                        let i0 : number = MikktspaceTangentGenerator.makeIndex(f, 0);
                        let i1 : number = MikktspaceTangentGenerator.makeIndex(f, 1);
                        let i2 : number = MikktspaceTangentGenerator.makeIndex(f, 2);
                        let i3 : number = MikktspaceTangentGenerator.makeIndex(f, 3);
                        let T0 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, i0);
                        let T1 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, i1);
                        let T2 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, i2);
                        let T3 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, i3);
                        let distSQ_02 : number = T2.subtract(T0).lengthSquared();
                        let distSQ_13 : number = T3.subtract(T1).lengthSquared();
                        let bQuadDiagIs_02 : boolean;
                        if(distSQ_02 < distSQ_13) {
                            bQuadDiagIs_02 = true;
                        } else if(distSQ_13 < distSQ_02) {
                            bQuadDiagIs_02 = false;
                        } else {
                            let P0 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, i0);
                            let P1 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, i1);
                            let P2 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, i2);
                            let P3 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, i3);
                            let distSQ_022 : number = P2.subtract(P0).lengthSquared();
                            let distSQ_132 : number = P3.subtract(P1).lengthSquared();
                            bQuadDiagIs_02 = distSQ_132 >= distSQ_022;
                        }
                        if(bQuadDiagIs_02) {
                            {
                                let pVerts_A : number[] = pTriInfos[iDstTriIndex].vertNum;
                                pVerts_A[0] = 0;
                                pVerts_A[1] = 1;
                                pVerts_A[2] = 2;
                            };
                            piTriList_out[iDstTriIndex * 3 + 0] = i0;
                            piTriList_out[iDstTriIndex * 3 + 1] = i1;
                            piTriList_out[iDstTriIndex * 3 + 2] = i2;
                            ++iDstTriIndex;
                            {
                                let pVerts_B : number[] = pTriInfos[iDstTriIndex].vertNum;
                                pVerts_B[0] = 0;
                                pVerts_B[1] = 2;
                                pVerts_B[2] = 3;
                            };
                            piTriList_out[iDstTriIndex * 3 + 0] = i0;
                            piTriList_out[iDstTriIndex * 3 + 1] = i2;
                            piTriList_out[iDstTriIndex * 3 + 2] = i3;
                            ++iDstTriIndex;
                        } else {
                            {
                                let pVerts_A : number[] = pTriInfos[iDstTriIndex].vertNum;
                                pVerts_A[0] = 0;
                                pVerts_A[1] = 1;
                                pVerts_A[2] = 3;
                            };
                            piTriList_out[iDstTriIndex * 3 + 0] = i0;
                            piTriList_out[iDstTriIndex * 3 + 1] = i1;
                            piTriList_out[iDstTriIndex * 3 + 2] = i3;
                            ++iDstTriIndex;
                            {
                                let pVerts_B : number[] = pTriInfos[iDstTriIndex].vertNum;
                                pVerts_B[0] = 1;
                                pVerts_B[1] = 2;
                                pVerts_B[2] = 3;
                            };
                            piTriList_out[iDstTriIndex * 3 + 0] = i1;
                            piTriList_out[iDstTriIndex * 3 + 1] = i2;
                            piTriList_out[iDstTriIndex * 3 + 2] = i3;
                            ++iDstTriIndex;
                        }
                    };
                }
                iTSpacesOffs += verts;
            }
            for(let t : number = 0; t < iNrTrianglesIn; t++) {
                pTriInfos[t].flag = 0;
            }
            return iTSpacesOffs;
        }

        static getPosition(mikkTSpace : MikkTSpaceContext, index : number) : Vector3f {
            let iF : number[] = new Array(1);
            let iI : number[] = new Array(1);
            let pos : number[] = new Array(3);
            MikktspaceTangentGenerator.indexToData(iF, iI, index);
            mikkTSpace.getPosition(pos, iF[0], iI[0]);
            return new Vector3f(pos[0], pos[1], pos[2]);
        }

        static getNormal(mikkTSpace : MikkTSpaceContext, index : number) : Vector3f {
            let iF : number[] = new Array(1);
            let iI : number[] = new Array(1);
            let norm : number[] = new Array(3);
            MikktspaceTangentGenerator.indexToData(iF, iI, index);
            mikkTSpace.getNormal(norm, iF[0], iI[0]);
            return new Vector3f(norm[0], norm[1], norm[2]);
        }

        static getTexCoord(mikkTSpace : MikkTSpaceContext, index : number) : Vector3f {
            let iF : number[] = new Array(1);
            let iI : number[] = new Array(1);
            let texc : number[] = new Array(2);
            MikktspaceTangentGenerator.indexToData(iF, iI, index);
            mikkTSpace.getTexCoord(texc, iF[0], iI[0]);
            return new Vector3f(texc[0], texc[1], 1.0);
        }

        static calcTexArea(mikkTSpace : MikkTSpaceContext, indices : number[]) : number {
            let t1 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, indices[0]);
            let t2 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, indices[1]);
            let t3 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, indices[2]);
            let t21x : number = t2.x - t1.x;
            let t21y : number = t2.y - t1.y;
            let t31x : number = t3.x - t1.x;
            let t31y : number = t3.y - t1.y;
            let fSignedAreaSTx2 : number = t21x * t31y - t21y * t31x;
            return fSignedAreaSTx2 < 0?(-fSignedAreaSTx2):fSignedAreaSTx2;
        }

        static isNotZero(v : number) : boolean {
            return Math.abs(v) > 0;
        }

        static initTriInfo(pTriInfos : MikktspaceTangentGenerator.TriInfo[], piTriListIn : number[], mikkTSpace : MikkTSpaceContext, iNrTrianglesIn : number) {
            for(let f : number = 0; f < iNrTrianglesIn; f++) {
                for(let i : number = 0; i < 3; i++) {
                    pTriInfos[f].faceNeighbors[i] = -1;
                    pTriInfos[f].assignedGroup[i] = null;
                    pTriInfos[f].os.x = 0.0;
                    pTriInfos[f].os.y = 0.0;
                    pTriInfos[f].os.z = 0.0;
                    pTriInfos[f].ot.x = 0.0;
                    pTriInfos[f].ot.y = 0.0;
                    pTriInfos[f].ot.z = 0.0;
                    pTriInfos[f].magS = 0;
                    pTriInfos[f].magT = 0;
                    pTriInfos[f].flag |= MikktspaceTangentGenerator.GROUP_WITH_ANY;
                }
            }
            for(let f : number = 0; f < iNrTrianglesIn; f++) {
                let v1 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, piTriListIn[f * 3 + 0]);
                let v2 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, piTriListIn[f * 3 + 1]);
                let v3 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, piTriListIn[f * 3 + 2]);
                let t1 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, piTriListIn[f * 3 + 0]);
                let t2 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, piTriListIn[f * 3 + 1]);
                let t3 : Vector3f = MikktspaceTangentGenerator.getTexCoord(mikkTSpace, piTriListIn[f * 3 + 2]);
                let t21x : number = t2.x - t1.x;
                let t21y : number = t2.y - t1.y;
                let t31x : number = t3.x - t1.x;
                let t31y : number = t3.y - t1.y;
                let d1 : Vector3f = v2.subtract(v1);
                let d2 : Vector3f = v3.subtract(v1);
                let fSignedAreaSTx2 : number = t21x * t31y - t21y * t31x;
                let vOs : Vector3f = d1.mult(t31y).subtract(d2.mult(t21y));
                let vOt : Vector3f = d1.mult(-t31x).add(d2.mult(t21x));
                pTriInfos[f].flag |= (fSignedAreaSTx2 > 0?MikktspaceTangentGenerator.ORIENT_PRESERVING:0);
                if(MikktspaceTangentGenerator.isNotZero(fSignedAreaSTx2)) {
                    let fAbsArea : number = Math.abs(fSignedAreaSTx2);
                    let fLenOs : number = vOs.length();
                    let fLenOt : number = vOt.length();
                    let fS : number = (pTriInfos[f].flag & MikktspaceTangentGenerator.ORIENT_PRESERVING) === 0?(-1.0):1.0;
                    if(MikktspaceTangentGenerator.isNotZero(fLenOs)) {
                        pTriInfos[f].os = vOs.multLocal(fS / fLenOs);
                    }
                    if(MikktspaceTangentGenerator.isNotZero(fLenOt)) {
                        pTriInfos[f].ot = vOt.multLocal(fS / fLenOt);
                    }
                    pTriInfos[f].magS = fLenOs / fAbsArea;
                    pTriInfos[f].magT = fLenOt / fAbsArea;
                    if(MikktspaceTangentGenerator.isNotZero(pTriInfos[f].magS) && MikktspaceTangentGenerator.isNotZero(pTriInfos[f].magT)) {
                        pTriInfos[f].flag &= (~MikktspaceTangentGenerator.GROUP_WITH_ANY);
                    }
                }
            }
            let t : number = 0;
            while((t < (iNrTrianglesIn - 1))){
                let iFO_a : number = pTriInfos[t].orgFaceNumber;
                let iFO_b : number = pTriInfos[t + 1].orgFaceNumber;
                if(iFO_a === iFO_b) {
                    let bIsDeg_a : boolean = (pTriInfos[t].flag & MikktspaceTangentGenerator.MARK_DEGENERATE) !== 0;
                    let bIsDeg_b : boolean = (pTriInfos[t + 1].flag & MikktspaceTangentGenerator.MARK_DEGENERATE) !== 0;
                    if((bIsDeg_a || bIsDeg_b) === false) {
                        let bOrientA : boolean = (pTriInfos[t].flag & MikktspaceTangentGenerator.ORIENT_PRESERVING) !== 0;
                        let bOrientB : boolean = (pTriInfos[t + 1].flag & MikktspaceTangentGenerator.ORIENT_PRESERVING) !== 0;
                        if(bOrientA !== bOrientB) {
                            let bChooseOrientFirstTri : boolean = false;
                            if((pTriInfos[t + 1].flag & MikktspaceTangentGenerator.GROUP_WITH_ANY) !== 0) {
                                bChooseOrientFirstTri = true;
                            } else if(MikktspaceTangentGenerator.calcTexArea(mikkTSpace, Arrays.copyOfRange(piTriListIn, t * 3 + 0, t * 3 + 3)) >= MikktspaceTangentGenerator.calcTexArea(mikkTSpace, Arrays.copyOfRange(piTriListIn, (t + 1) * 3 + 0, (t + 1) * 3 + 3))) {
                                bChooseOrientFirstTri = true;
                            }
                            {
                                let t0 : number = bChooseOrientFirstTri?t:(t + 1);
                                let t1 : number = bChooseOrientFirstTri?(t + 1):t;
                                pTriInfos[t1].flag &= (~MikktspaceTangentGenerator.ORIENT_PRESERVING);
                                pTriInfos[t1].flag |= (pTriInfos[t0].flag & MikktspaceTangentGenerator.ORIENT_PRESERVING);
                            };
                        }
                    }
                    t += 2;
                } else {
                    ++t;
                }
            };
            {
                let pEdges : MikktspaceTangentGenerator.Edge[] = new Array(iNrTrianglesIn * 3);
                MikktspaceTangentGenerator.buildNeighborsFast(pTriInfos, pEdges, piTriListIn, iNrTrianglesIn);
            };
        }

        static build4RuleGroups(pTriInfos : MikktspaceTangentGenerator.TriInfo[], pGroups : MikktspaceTangentGenerator.Group[], piGroupTrianglesBuffer : number[], piTriListIn : number[], iNrTrianglesIn : number) : number {
            let iNrMaxGroups : number = iNrTrianglesIn * 3;
            let iNrActiveGroups : number = 0;
            let iOffset : number = 0;
            for(let f : number = 0; f < iNrTrianglesIn; f++) {
                for(let i : number = 0; i < 3; i++) {
                    if((pTriInfos[f].flag & MikktspaceTangentGenerator.GROUP_WITH_ANY) === 0 && pTriInfos[f].assignedGroup[i] == null) {
                        let bOrPre : boolean;
                        let vert_index : number = piTriListIn[f * 3 + i];
                        pTriInfos[f].assignedGroup[i] = new MikktspaceTangentGenerator.Group();
                        pGroups[iNrActiveGroups] = pTriInfos[f].assignedGroup[i];
                        pTriInfos[f].assignedGroup[i].vertexRepresentitive = vert_index;
                        pTriInfos[f].assignedGroup[i].orientPreservering = (pTriInfos[f].flag & MikktspaceTangentGenerator.ORIENT_PRESERVING) !== 0;
                        pTriInfos[f].assignedGroup[i].nrFaces = 0;
                        ++iNrActiveGroups;
                        MikktspaceTangentGenerator.addTriToGroup(pTriInfos[f].assignedGroup[i], f);
                        bOrPre = (pTriInfos[f].flag & MikktspaceTangentGenerator.ORIENT_PRESERVING) !== 0;
                        let neigh_indexL : number = pTriInfos[f].faceNeighbors[i];
                        let neigh_indexR : number = pTriInfos[f].faceNeighbors[i > 0?(i - 1):2];
                        if(neigh_indexL >= 0) {
                            let bAnswer : boolean = MikktspaceTangentGenerator.assignRecur(piTriListIn, pTriInfos, neigh_indexL, pTriInfos[f].assignedGroup[i]);
                            let bOrPre2 : boolean = (pTriInfos[neigh_indexL].flag & MikktspaceTangentGenerator.ORIENT_PRESERVING) !== 0;
                            let bDiff : boolean = bOrPre !== bOrPre2;
                        }
                        if(neigh_indexR >= 0) {
                            let bAnswer : boolean = MikktspaceTangentGenerator.assignRecur(piTriListIn, pTriInfos, neigh_indexR, pTriInfos[f].assignedGroup[i]);
                            let bOrPre2 : boolean = (pTriInfos[neigh_indexR].flag & MikktspaceTangentGenerator.ORIENT_PRESERVING) !== 0;
                            let bDiff : boolean = bOrPre !== bOrPre2;
                        }
                        let faceIndices : number[] = new Array(pTriInfos[f].assignedGroup[i].nrFaces);
                        for(let j : number = 0; j < faceIndices.length; j++) {
                            faceIndices[j] = pTriInfos[f].assignedGroup[i].faceIndices.get(j);
                        }
                        java.lang.System.arraycopy(faceIndices, 0, piGroupTrianglesBuffer, iOffset, pTriInfos[f].assignedGroup[i].nrFaces);
                        iOffset += pTriInfos[f].assignedGroup[i].nrFaces;
                    }
                }
            }
            return iNrActiveGroups;
        }

        static addTriToGroup(group : MikktspaceTangentGenerator.Group, triIndex : number) {
            group.faceIndices.add(triIndex);
            ++group.nrFaces;
        }

        static assignRecur(piTriListIn : number[], psTriInfos : MikktspaceTangentGenerator.TriInfo[], iMyTriIndex : number, pGroup : MikktspaceTangentGenerator.Group) : boolean {
            let pMyTriInfo : MikktspaceTangentGenerator.TriInfo = psTriInfos[iMyTriIndex];
            let iVertRep : number = pGroup.vertexRepresentitive;
            let index : number = 3 * iMyTriIndex;
            let i : number = -1;
            if(piTriListIn[index] === iVertRep) {
                i = 0;
            } else if(piTriListIn[index + 1] === iVertRep) {
                i = 1;
            } else if(piTriListIn[index + 2] === iVertRep) {
                i = 2;
            }
            if(pMyTriInfo.assignedGroup[i] === pGroup) {
                return true;
            } else if(pMyTriInfo.assignedGroup[i] != null) {
                return false;
            }
            if((pMyTriInfo.flag & MikktspaceTangentGenerator.GROUP_WITH_ANY) !== 0) {
                if(pMyTriInfo.assignedGroup[0] == null && pMyTriInfo.assignedGroup[1] == null && pMyTriInfo.assignedGroup[2] == null) {
                    pMyTriInfo.flag &= (~MikktspaceTangentGenerator.ORIENT_PRESERVING);
                    pMyTriInfo.flag |= (pGroup.orientPreservering?MikktspaceTangentGenerator.ORIENT_PRESERVING:0);
                }
            }
            {
                let bOrient : boolean = (pMyTriInfo.flag & MikktspaceTangentGenerator.ORIENT_PRESERVING) !== 0;
                if(bOrient !== pGroup.orientPreservering) {
                    return false;
                }
            };
            MikktspaceTangentGenerator.addTriToGroup(pGroup, iMyTriIndex);
            pMyTriInfo.assignedGroup[i] = pGroup;
            {
                let neigh_indexL : number = pMyTriInfo.faceNeighbors[i];
                let neigh_indexR : number = pMyTriInfo.faceNeighbors[i > 0?(i - 1):2];
                if(neigh_indexL >= 0) {
                    MikktspaceTangentGenerator.assignRecur(piTriListIn, psTriInfos, neigh_indexL, pGroup);
                }
                if(neigh_indexR >= 0) {
                    MikktspaceTangentGenerator.assignRecur(piTriListIn, psTriInfos, neigh_indexR, pGroup);
                }
            };
            return true;
        }

        static generateTSpaces(psTspace : MikktspaceTangentGenerator.TSpace[], pTriInfos : MikktspaceTangentGenerator.TriInfo[], pGroups : MikktspaceTangentGenerator.Group[], iNrActiveGroups : number, piTriListIn : number[], fThresCos : number, mikkTSpace : MikkTSpaceContext) : boolean {
            let pSubGroupTspace : MikktspaceTangentGenerator.TSpace[];
            let pUniSubGroups : MikktspaceTangentGenerator.SubGroup[];
            let pTmpMembers : number[];
            let iMaxNrFaces : number = 0;
            let iUniqueTspaces : number = 0;
            let g : number = 0;
            let i : number = 0;
            for(g = 0; g < iNrActiveGroups; g++) {
                if(iMaxNrFaces < pGroups[g].nrFaces) {
                    iMaxNrFaces = pGroups[g].nrFaces;
                }
            }
            if(iMaxNrFaces === 0) {
                return true;
            }
            pSubGroupTspace = new Array(iMaxNrFaces);
            pUniSubGroups = new Array(iMaxNrFaces);
            pTmpMembers = new Array(iMaxNrFaces);
            iUniqueTspaces = 0;
            for(g = 0; g < iNrActiveGroups; g++) {
                let pGroup : MikktspaceTangentGenerator.Group = pGroups[g];
                let iUniqueSubGroups : number = 0;
                let s : number = 0;
                for(i = 0; i < pGroup.nrFaces; i++) {
                    let f : number = pGroup.faceIndices.get(i);
                    let index : number = -1;
                    let iVertIndex : number = -1;
                    let iOF_1 : number = -1;
                    let iMembers : number = 0;
                    let j : number = 0;
                    let l : number = 0;
                    let tmp_group : MikktspaceTangentGenerator.SubGroup = new MikktspaceTangentGenerator.SubGroup();
                    let bFound : boolean;
                    let n : Vector3f;
                    let vOs : Vector3f;
                    let vOt : Vector3f;
                    if(pTriInfos[f].assignedGroup[0] === pGroup) {
                        index = 0;
                    } else if(pTriInfos[f].assignedGroup[1] === pGroup) {
                        index = 1;
                    } else if(pTriInfos[f].assignedGroup[2] === pGroup) {
                        index = 2;
                    }
                    iVertIndex = piTriListIn[f * 3 + index];
                    n = MikktspaceTangentGenerator.getNormal(mikkTSpace, iVertIndex);
                    vOs = pTriInfos[f].os.subtract(n.mult(n.dot(pTriInfos[f].os)));
                    vOt = pTriInfos[f].ot.subtract(n.mult(n.dot(pTriInfos[f].ot)));
                    vOs.normalizeLocal();
                    vOt.normalizeLocal();
                    iOF_1 = pTriInfos[f].orgFaceNumber;
                    iMembers = 0;
                    for(j = 0; j < pGroup.nrFaces; j++) {
                        let t : number = pGroup.faceIndices.get(j);
                        let iOF_2 : number = pTriInfos[t].orgFaceNumber;
                        let vOs2 : Vector3f = pTriInfos[t].os.subtract(n.mult(n.dot(pTriInfos[t].os)));
                        let vOt2 : Vector3f = pTriInfos[t].ot.subtract(n.mult(n.dot(pTriInfos[t].ot)));
                        vOs2.normalizeLocal();
                        vOt2.normalizeLocal();
                        {
                            let bAny : boolean = ((pTriInfos[f].flag | pTriInfos[t].flag) & MikktspaceTangentGenerator.GROUP_WITH_ANY) !== 0;
                            let bSameOrgFace : boolean = iOF_1 === iOF_2;
                            let fCosS : number = vOs.dot(vOs2);
                            let fCosT : number = vOt.dot(vOt2);
                            if(bAny || bSameOrgFace || (fCosS > fThresCos && fCosT > fThresCos)) {
                                pTmpMembers[iMembers++] = t;
                            }
                        };
                    }
                    tmp_group.nrFaces = iMembers;
                    tmp_group.triMembers = pTmpMembers;
                    if(iMembers > 1) {
                        MikktspaceTangentGenerator.quickSort(pTmpMembers, 0, iMembers - 1, MikktspaceTangentGenerator.INTERNAL_RND_SORT_SEED_$LI$());
                    }
                    bFound = false;
                    l = 0;
                    while((l < iUniqueSubGroups && !bFound)){
                        bFound = MikktspaceTangentGenerator.compareSubGroups(tmp_group, pUniSubGroups[l]);
                        if(!bFound) {
                            ++l;
                        }
                    };
                    if(!bFound) {
                        let pIndices : number[] = new Array(iMembers);
                        pUniSubGroups[iUniqueSubGroups] = new MikktspaceTangentGenerator.SubGroup();
                        pUniSubGroups[iUniqueSubGroups].nrFaces = iMembers;
                        pUniSubGroups[iUniqueSubGroups].triMembers = pIndices;
                        java.lang.System.arraycopy(tmp_group.triMembers, 0, pIndices, 0, iMembers);
                        pSubGroupTspace[iUniqueSubGroups] = MikktspaceTangentGenerator.evalTspace(tmp_group.triMembers, iMembers, piTriListIn, pTriInfos, mikkTSpace, pGroup.vertexRepresentitive);
                        ++iUniqueSubGroups;
                    }
                    {
                        let iOffs : number = pTriInfos[f].tSpacesOffs;
                        let iVert : number = pTriInfos[f].vertNum[index];
                        let pTS_out : MikktspaceTangentGenerator.TSpace = psTspace[iOffs + iVert];
                        if(pTS_out.counter === 1) {
                            pTS_out.set(MikktspaceTangentGenerator.avgTSpace(pTS_out, pSubGroupTspace[l]));
                            pTS_out.counter = 2;
                            pTS_out.orient = pGroup.orientPreservering;
                        } else {
                            pTS_out.set(pSubGroupTspace[l]);
                            pTS_out.counter = 1;
                            pTS_out.orient = pGroup.orientPreservering;
                        }
                    };
                }
                iUniqueTspaces += iUniqueSubGroups;
            }
            return true;
        }

        static evalTspace(face_indices : number[], iFaces : number, piTriListIn : number[], pTriInfos : MikktspaceTangentGenerator.TriInfo[], mikkTSpace : MikkTSpaceContext, iVertexRepresentitive : number) : MikktspaceTangentGenerator.TSpace {
            let res : MikktspaceTangentGenerator.TSpace = new MikktspaceTangentGenerator.TSpace();
            let fAngleSum : number = 0;
            for(let face : number = 0; face < iFaces; face++) {
                let f : number = face_indices[face];
                if((pTriInfos[f].flag & MikktspaceTangentGenerator.GROUP_WITH_ANY) === 0) {
                    let i : number = -1;
                    if(piTriListIn[3 * f + 0] === iVertexRepresentitive) {
                        i = 0;
                    } else if(piTriListIn[3 * f + 1] === iVertexRepresentitive) {
                        i = 1;
                    } else if(piTriListIn[3 * f + 2] === iVertexRepresentitive) {
                        i = 2;
                    }
                    let index : number = piTriListIn[3 * f + i];
                    let n : Vector3f = MikktspaceTangentGenerator.getNormal(mikkTSpace, index);
                    let vOs : Vector3f = pTriInfos[f].os.subtract(n.mult(n.dot(pTriInfos[f].os)));
                    let vOt : Vector3f = pTriInfos[f].ot.subtract(n.mult(n.dot(pTriInfos[f].ot)));
                    vOs.normalizeLocal();
                    vOt.normalizeLocal();
                    let i2 : number = piTriListIn[3 * f + (i < 2?(i + 1):0)];
                    let i1 : number = piTriListIn[3 * f + i];
                    let i0 : number = piTriListIn[3 * f + (i > 0?(i - 1):2)];
                    let p0 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, i0);
                    let p1 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, i1);
                    let p2 : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, i2);
                    let v1 : Vector3f = p0.subtract(p1);
                    let v2 : Vector3f = p2.subtract(p1);
                    v1.subtractLocal(n.mult(n.dot(v1))).normalizeLocal();
                    v2.subtractLocal(n.mult(n.dot(v2))).normalizeLocal();
                    let fCos : number = v1.dot(v2);
                    fCos = fCos > 1?1:(fCos < (-1)?(-1):fCos);
                    let fAngle : number = <number>Math.acos(fCos);
                    let fMagS : number = pTriInfos[f].magS;
                    let fMagT : number = pTriInfos[f].magT;
                    res.os.addLocal(vOs.multLocal(fAngle));
                    res.ot.addLocal(vOt.multLocal(fAngle));
                    res.magS += (fAngle * fMagS);
                    res.magT += (fAngle * fMagT);
                    fAngleSum += fAngle;
                }
            }
            res.os.normalizeLocal();
            res.ot.normalizeLocal();
            if(fAngleSum > 0) {
                res.magS /= fAngleSum;
                res.magT /= fAngleSum;
            }
            return res;
        }

        static compareSubGroups(pg1 : MikktspaceTangentGenerator.SubGroup, pg2 : MikktspaceTangentGenerator.SubGroup) : boolean {
            if(pg2 == null || (pg1.nrFaces !== pg2.nrFaces)) {
                return false;
            }
            let stillSame : boolean = true;
            let i : number = 0;
            while((i < pg1.nrFaces && stillSame)){
                stillSame = pg1.triMembers[i] === pg2.triMembers[i];
                if(stillSame) {
                    ++i;
                }
            };
            return stillSame;
        }

        static quickSort(pSortBuffer : number[], iLeft : number, iRight : number, uSeed : number) {
            let iL : number;
            let iR : number;
            let n : number;
            let index : number;
            let iMid : number;
            let iTmp : number;
            let t : number = uSeed & 31;
            t = (uSeed << t) | (uSeed >> (32 - t));
            uSeed = uSeed + t + 3;
            uSeed = uSeed & 4294967295;
            iL = iLeft;
            iR = iRight;
            n = (iR - iL) + 1;
            index = (<number>((uSeed & 4294967295) % n)|0);
            iMid = pSortBuffer[index + iL];
            do {
                while((pSortBuffer[iL] < iMid)){
                    ++iL;
                };
                while((pSortBuffer[iR] > iMid)){
                    --iR;
                };
                if(iL <= iR) {
                    iTmp = pSortBuffer[iL];
                    pSortBuffer[iL] = pSortBuffer[iR];
                    pSortBuffer[iR] = iTmp;
                    ++iL;
                    --iR;
                }
            } while((iL <= iR));
            if(iLeft < iR) {
                MikktspaceTangentGenerator.quickSort(pSortBuffer, iLeft, iR, uSeed);
            }
            if(iL < iRight) {
                MikktspaceTangentGenerator.quickSort(pSortBuffer, iL, iRight, uSeed);
            }
        }

        static buildNeighborsFast(pTriInfos : MikktspaceTangentGenerator.TriInfo[], pEdges : MikktspaceTangentGenerator.Edge[], piTriListIn : number[], iNrTrianglesIn : number) {
            let uSeed : number = MikktspaceTangentGenerator.INTERNAL_RND_SORT_SEED_$LI$();
            for(let f : number = 0; f < iNrTrianglesIn; f++) {
                for(let i : number = 0; i < 3; i++) {
                    let i0 : number = piTriListIn[f * 3 + i];
                    let i1 : number = piTriListIn[f * 3 + (i < 2?(i + 1):0)];
                    pEdges[f * 3 + i] = new MikktspaceTangentGenerator.Edge();
                    pEdges[f * 3 + i].setI0(i0 < i1?i0:i1);
                    pEdges[f * 3 + i].setI1(!(i0 < i1)?i0:i1);
                    pEdges[f * 3 + i].setF(f);
                }
            }
            MikktspaceTangentGenerator.quickSortEdges(pEdges, 0, iNrTrianglesIn * 3 - 1, 0, uSeed);
            let iEntries : number = iNrTrianglesIn * 3;
            let iCurStartIndex : number = 0;
            for(let i : number = 1; i < iEntries; i++) {
                if(pEdges[iCurStartIndex].getI0() !== pEdges[i].getI0()) {
                    let iL : number = iCurStartIndex;
                    let iR : number = i - 1;
                    iCurStartIndex = i;
                    MikktspaceTangentGenerator.quickSortEdges(pEdges, iL, iR, 1, uSeed);
                }
            }
            iCurStartIndex = 0;
            for(let i : number = 1; i < iEntries; i++) {
                if(pEdges[iCurStartIndex].getI0() !== pEdges[i].getI0() || pEdges[iCurStartIndex].getI1() !== pEdges[i].getI1()) {
                    let iL : number = iCurStartIndex;
                    let iR : number = i - 1;
                    iCurStartIndex = i;
                    MikktspaceTangentGenerator.quickSortEdges(pEdges, iL, iR, 2, uSeed);
                }
            }
            for(let i : number = 0; i < iEntries; i++) {
                let i0 : number = pEdges[i].getI0();
                let i1 : number = pEdges[i].getI1();
                let g : number = pEdges[i].getF();
                let bUnassigned_A : boolean;
                let i0_A : number[] = new Array(1);
                let i1_A : number[] = new Array(1);
                let edgenum_A : number[] = new Array(1);
                let edgenum_B : number[] = new Array(1);
                let triList : number[] = new Array(3);
                java.lang.System.arraycopy(piTriListIn, g * 3, triList, 0, 3);
                MikktspaceTangentGenerator.getEdge(i0_A, i1_A, edgenum_A, triList, i0, i1);
                bUnassigned_A = pTriInfos[g].faceNeighbors[edgenum_A[0]] === -1;
                if(bUnassigned_A) {
                    let j : number = i + 1;
                    let t : number;
                    let bNotFound : boolean = true;
                    while((j < iEntries && i0 === pEdges[j].getI0() && i1 === pEdges[j].getI1() && bNotFound)){
                        let bUnassigned_B : boolean;
                        let i0_B : number[] = new Array(1);
                        let i1_B : number[] = new Array(1);
                        t = pEdges[j].getF();
                        java.lang.System.arraycopy(piTriListIn, t * 3, triList, 0, 3);
                        MikktspaceTangentGenerator.getEdge(i1_B, i0_B, edgenum_B, triList, pEdges[j].getI0(), pEdges[j].getI1());
                        bUnassigned_B = pTriInfos[t].faceNeighbors[edgenum_B[0]] === -1;
                        if(i0_A[0] === i0_B[0] && i1_A[0] === i1_B[0] && bUnassigned_B) {
                            bNotFound = false;
                        } else {
                            ++j;
                        }
                    };
                    if(!bNotFound) {
                        let t2 : number = pEdges[j].getF();
                        pTriInfos[g].faceNeighbors[edgenum_A[0]] = t2;
                        pTriInfos[t2].faceNeighbors[edgenum_B[0]] = g;
                    }
                }
            }
        }

        static buildNeighborsSlow(pTriInfos : MikktspaceTangentGenerator.TriInfo[], piTriListIn : number[], iNrTrianglesIn : number) {
            for(let f : number = 0; f < iNrTrianglesIn; f++) {
                for(let i : number = 0; i < 3; i++) {
                    if(pTriInfos[f].faceNeighbors[i] === -1) {
                        let i0_A : number = piTriListIn[f * 3 + i];
                        let i1_A : number = piTriListIn[f * 3 + (i < 2?(i + 1):0)];
                        let bFound : boolean = false;
                        let t : number = 0;
                        let j : number = 0;
                        while((!bFound && t < iNrTrianglesIn)){
                            if(t !== f) {
                                j = 0;
                                while((!bFound && j < 3)){
                                    let i1_B : number = piTriListIn[t * 3 + j];
                                    let i0_B : number = piTriListIn[t * 3 + (j < 2?(j + 1):0)];
                                    if(i0_A === i0_B && i1_A === i1_B) {
                                        bFound = true;
                                    } else {
                                        ++j;
                                    }
                                };
                            }
                            if(!bFound) {
                                ++t;
                            }
                        };
                        if(bFound) {
                            pTriInfos[f].faceNeighbors[i] = t;
                            pTriInfos[t].faceNeighbors[j] = f;
                        }
                    }
                }
            }
        }

        static quickSortEdges(pSortBuffer : MikktspaceTangentGenerator.Edge[], iLeft : number, iRight : number, channel : number, uSeed : number) {
            let sTmp : MikktspaceTangentGenerator.Edge;
            let iElems : number = iRight - iLeft + 1;
            if(iElems < 2) {
                return;
            } else if(iElems === 2) {
                if(pSortBuffer[iLeft].array[channel] > pSortBuffer[iRight].array[channel]) {
                    sTmp = pSortBuffer[iLeft];
                    pSortBuffer[iLeft] = pSortBuffer[iRight];
                    pSortBuffer[iRight] = sTmp;
                }
                return;
            }
            let t : number = uSeed & 31;
            t = (uSeed << t) | (uSeed >> (32 - t));
            uSeed = uSeed + t + 3;
            uSeed = uSeed & 4294967295;
            let iL : number = iLeft;
            let iR : number = iRight;
            let n : number = (iR - iL) + 1;
            let index : number = (<number>(uSeed % n)|0);
            let iMid : number = pSortBuffer[index + iL].array[channel];
            do {
                while((pSortBuffer[iL].array[channel] < iMid)){
                    ++iL;
                };
                while((pSortBuffer[iR].array[channel] > iMid)){
                    --iR;
                };
                if(iL <= iR) {
                    sTmp = pSortBuffer[iL];
                    pSortBuffer[iL] = pSortBuffer[iR];
                    pSortBuffer[iR] = sTmp;
                    ++iL;
                    --iR;
                }
            } while((iL <= iR));
            if(iLeft < iR) {
                MikktspaceTangentGenerator.quickSortEdges(pSortBuffer, iLeft, iR, channel, uSeed);
            }
            if(iL < iRight) {
                MikktspaceTangentGenerator.quickSortEdges(pSortBuffer, iL, iRight, channel, uSeed);
            }
        }

        static getEdge(i0_out : number[], i1_out : number[], edgenum_out : number[], indices : number[], i0_in : number, i1_in : number) {
            edgenum_out[0] = -1;
            if(indices[0] === i0_in || indices[0] === i1_in) {
                if(indices[1] === i0_in || indices[1] === i1_in) {
                    edgenum_out[0] = 0;
                    i0_out[0] = indices[0];
                    i1_out[0] = indices[1];
                } else {
                    edgenum_out[0] = 2;
                    i0_out[0] = indices[2];
                    i1_out[0] = indices[0];
                }
            } else {
                edgenum_out[0] = 1;
                i0_out[0] = indices[1];
                i1_out[0] = indices[2];
            }
        }

        static degenPrologue(pTriInfos : MikktspaceTangentGenerator.TriInfo[], piTriList_out : number[], iNrTrianglesIn : number, iTotTris : number) {
            let t : number = 0;
            while((t < (iTotTris - 1))){
                let iFO_a : number = pTriInfos[t].orgFaceNumber;
                let iFO_b : number = pTriInfos[t + 1].orgFaceNumber;
                if(iFO_a === iFO_b) {
                    let bIsDeg_a : boolean = (pTriInfos[t].flag & MikktspaceTangentGenerator.MARK_DEGENERATE) !== 0;
                    let bIsDeg_b : boolean = (pTriInfos[t + 1].flag & MikktspaceTangentGenerator.MARK_DEGENERATE) !== 0;
                    if((bIsDeg_a !== bIsDeg_b) !== false) {
                        pTriInfos[t].flag |= MikktspaceTangentGenerator.QUAD_ONE_DEGEN_TRI;
                        pTriInfos[t + 1].flag |= MikktspaceTangentGenerator.QUAD_ONE_DEGEN_TRI;
                    }
                    t += 2;
                } else {
                    ++t;
                }
            };
            let iNextGoodTriangleSearchIndex : number = 1;
            t = 0;
            let bStillFindingGoodOnes : boolean = true;
            while((t < iNrTrianglesIn && bStillFindingGoodOnes)){
                let bIsGood : boolean = (pTriInfos[t].flag & MikktspaceTangentGenerator.MARK_DEGENERATE) === 0;
                if(bIsGood) {
                    if(iNextGoodTriangleSearchIndex < (t + 2)) {
                        iNextGoodTriangleSearchIndex = t + 2;
                    }
                } else {
                    let bJustADegenerate : boolean = true;
                    while((bJustADegenerate && iNextGoodTriangleSearchIndex < iTotTris)){
                        let bIsGood2 : boolean = (pTriInfos[iNextGoodTriangleSearchIndex].flag & MikktspaceTangentGenerator.MARK_DEGENERATE) === 0;
                        if(bIsGood2) {
                            bJustADegenerate = false;
                        } else {
                            ++iNextGoodTriangleSearchIndex;
                        }
                    };
                    let t0 : number = t;
                    let t1 : number = iNextGoodTriangleSearchIndex;
                    ++iNextGoodTriangleSearchIndex;
                    if(!bJustADegenerate) {
                        for(let i : number = 0; i < 3; i++) {
                            let index : number = piTriList_out[t0 * 3 + i];
                            piTriList_out[t0 * 3 + i] = piTriList_out[t1 * 3 + i];
                            piTriList_out[t1 * 3 + i] = index;
                        }
                        {
                            let tri_info : MikktspaceTangentGenerator.TriInfo = pTriInfos[t0];
                            pTriInfos[t0] = pTriInfos[t1];
                            pTriInfos[t1] = tri_info;
                        };
                    } else {
                        bStillFindingGoodOnes = false;
                    }
                }
                if(bStillFindingGoodOnes) {
                    ++t;
                }
            };
        }

        static DegenEpilogue(psTspace : MikktspaceTangentGenerator.TSpace[], pTriInfos : MikktspaceTangentGenerator.TriInfo[], piTriListIn : number[], mikkTSpace : MikkTSpaceContext, iNrTrianglesIn : number, iTotTris : number) {
            for(let t : number = iNrTrianglesIn; t < iTotTris; t++) {
                let bSkip : boolean = (pTriInfos[t].flag & MikktspaceTangentGenerator.QUAD_ONE_DEGEN_TRI) !== 0;
                if(!bSkip) {
                    for(let i : number = 0; i < 3; i++) {
                        let index1 : number = piTriListIn[t * 3 + i];
                        let bNotFound : boolean = true;
                        let j : number = 0;
                        while((bNotFound && j < (3 * iNrTrianglesIn))){
                            let index2 : number = piTriListIn[j];
                            if(index1 === index2) {
                                bNotFound = false;
                            } else {
                                ++j;
                            }
                        };
                        if(!bNotFound) {
                            let iTri : number = (j / 3|0);
                            let iVert : number = j % 3;
                            let iSrcVert : number = pTriInfos[iTri].vertNum[iVert];
                            let iSrcOffs : number = pTriInfos[iTri].tSpacesOffs;
                            let iDstVert : number = pTriInfos[t].vertNum[i];
                            let iDstOffs : number = pTriInfos[t].tSpacesOffs;
                            psTspace[iDstOffs + iDstVert] = psTspace[iSrcOffs + iSrcVert];
                        }
                    }
                }
            }
            for(let t : number = 0; t < iNrTrianglesIn; t++) {
                if((pTriInfos[t].flag & MikktspaceTangentGenerator.QUAD_ONE_DEGEN_TRI) !== 0) {
                    let pV : number[] = pTriInfos[t].vertNum;
                    let iFlag : number = (1 << pV[0]) | (1 << pV[1]) | (1 << pV[2]);
                    let iMissingIndex : number = 0;
                    if((iFlag & 2) === 0) {
                        iMissingIndex = 1;
                    } else if((iFlag & 4) === 0) {
                        iMissingIndex = 2;
                    } else if((iFlag & 8) === 0) {
                        iMissingIndex = 3;
                    }
                    let iOrgF : number = pTriInfos[t].orgFaceNumber;
                    let vDstP : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, MikktspaceTangentGenerator.makeIndex(iOrgF, iMissingIndex));
                    let bNotFound : boolean = true;
                    let i : number = 0;
                    while((bNotFound && i < 3)){
                        let iVert : number = pV[i];
                        let vSrcP : Vector3f = MikktspaceTangentGenerator.getPosition(mikkTSpace, MikktspaceTangentGenerator.makeIndex(iOrgF, iVert));
                        if(vSrcP.equals(vDstP)) {
                            let iOffs : number = pTriInfos[t].tSpacesOffs;
                            psTspace[iOffs + iMissingIndex] = psTspace[iOffs + iVert];
                            bNotFound = false;
                        } else {
                            ++i;
                        }
                    };
                }
            }
        }
    }
    MikktspaceTangentGenerator["__class"] = "com.jme3.util.mikktspace.MikktspaceTangentGenerator";


    export namespace MikktspaceTangentGenerator {

        /**
         * SubGroup inner class
         */
        export class SubGroup {
            nrFaces : number;

            triMembers : number[];

            constructor() {
                this.nrFaces = 0;
            }
        }
        SubGroup["__class"] = "com.jme3.util.mikktspace.MikktspaceTangentGenerator.SubGroup";


        export class Group {
            nrFaces : number;

            faceIndices : List<number> = <any>(new ArrayList<number>());

            vertexRepresentitive : number;

            orientPreservering : boolean;

            constructor() {
                this.nrFaces = 0;
                this.vertexRepresentitive = 0;
                this.orientPreservering = false;
            }
        }
        Group["__class"] = "com.jme3.util.mikktspace.MikktspaceTangentGenerator.Group";


        export class TriInfo {
            faceNeighbors : number[] = new Array(3);

            assignedGroup : MikktspaceTangentGenerator.Group[] = new Array(3);

            os : Vector3f = new Vector3f();

            ot : Vector3f = new Vector3f();

            magS : number;

            magT : number;

            orgFaceNumber : number;

            flag : number;

            tSpacesOffs : number;

            vertNum : number[] = new Array(4);

            constructor() {
                this.magS = 0;
                this.magT = 0;
                this.orgFaceNumber = 0;
                this.flag = 0;
                this.tSpacesOffs = 0;
            }
        }
        TriInfo["__class"] = "com.jme3.util.mikktspace.MikktspaceTangentGenerator.TriInfo";


        export class TSpace {
            os : Vector3f = new Vector3f();

            magS : number;

            ot : Vector3f = new Vector3f();

            magT : number;

            counter : number;

            orient : boolean;

            set(ts : MikktspaceTangentGenerator.TSpace) {
                this.os.set(ts.os);
                this.magS = ts.magS;
                this.ot.set(ts.ot);
                this.magT = ts.magT;
                this.counter = ts.counter;
                this.orient = ts.orient;
            }

            constructor() {
                this.magS = 0;
                this.magT = 0;
                this.counter = 0;
                this.orient = false;
            }
        }
        TSpace["__class"] = "com.jme3.util.mikktspace.MikktspaceTangentGenerator.TSpace";


        export class TmpVert {
            vert : number[] = new Array(3);

            index : number;

            constructor() {
                this.index = 0;
            }
        }
        TmpVert["__class"] = "com.jme3.util.mikktspace.MikktspaceTangentGenerator.TmpVert";


        export class Edge {
            setI0(i : number) {
                this.array[0] = i;
            }

            setI1(i : number) {
                this.array[1] = i;
            }

            setF(i : number) {
                this.array[2] = i;
            }

            getI0() : number {
                return this.array[0];
            }

            getI1() : number {
                return this.array[1];
            }

            getF() : number {
                return this.array[2];
            }

            array : number[] = new Array(3);
        }
        Edge["__class"] = "com.jme3.util.mikktspace.MikktspaceTangentGenerator.Edge";

    }

}


com.jme3.util.mikktspace.MikktspaceTangentGenerator.INTERNAL_RND_SORT_SEED_$LI$();
