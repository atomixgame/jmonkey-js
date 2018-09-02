/* Generated from Java with JSweet 1.2.0 - http://www.jsweet.org */
namespace com.jme3.util.mikktspace {
    /**
     * 
     * @author Nehon
     */
    export interface MikkTSpaceContext {
        /**
         * Returns the number of faces (triangles/quads) on the mesh to be
         * processed.
         * 
         * @return
         */
        getNumFaces() : number;

        /**
         * Returns the number of vertices on face number iFace iFace is a number in
         * the range {0, 1, ..., getNumFaces()-1}
         * 
         * @param face
         * @return
         */
        getNumVerticesOfFace(face : number) : number;

        /**
         * returns the position/normal/texcoord of the referenced face of vertex
         * number iVert. iVert is in the range {0,1,2} for triangles and {0,1,2,3}
         * for quads.
         * 
         * @param posOut
         * @param face
         * @param vert
         */
        getPosition(posOut : number[], face : number, vert : number);

        getNormal(normOut : number[], face : number, vert : number);

        getTexCoord(texOut : number[], face : number, vert : number);

        /**
         * The call-backsetTSpaceBasic() is sufficient for basic normal mapping.
         * This function is used to return the tangent and sign to the application.
         * tangent is a unit length vector. For normal maps it is sufficient to use
         * the following simplified version of the bitangent which is generated at
         * pixel/vertex level.
         * 
         * bitangent = fSign * cross(vN, tangent);
         * 
         * Note that the results are returned unindexed. It is possible to generate
         * a new index list But averaging/overwriting tangent spaces by using an
         * already existing index list WILL produce INCRORRECT results. DO NOT! use
         * an already existing index list.
         * 
         * @param tangent
         * @param sign
         * @param face
         * @param vert
         */
        setTSpaceBasic(tangent : number[], sign : number, face : number, vert : number);

        /**
         * This function is used to return tangent space results to the application.
         * tangent and biTangent are unit length vectors and fMagS and fMagT are
         * their true magnitudes which can be used for relief mapping effects.
         * 
         * biTangent is the "real" bitangent and thus may not be perpendicular to
         * tangent. However, both are perpendicular to the vertex normal. For normal
         * maps it is sufficient to use the following simplified version of the
         * bitangent which is generated at pixel/vertex level.
         * 
         * <pre>
         * fSign = bIsOrientationPreserving ? 1.0f : (-1.0f);
         * bitangent = fSign * cross(vN, tangent);
         * </pre>
         * 
         * Note that the results are returned unindexed. It is possible to generate
         * a new index list. But averaging/overwriting tangent spaces by using an
         * already existing index list WILL produce INCRORRECT results. DO NOT! use
         * an already existing index list.
         * 
         * @param tangent
         * @param biTangent
         * @param magS
         * @param magT
         * @param isOrientationPreserving
         * @param face
         * @param vert
         */
        setTSpace(tangent : number[], biTangent : number[], magS : number, magT : number, isOrientationPreserving : boolean, face : number, vert : number);
    }
}

