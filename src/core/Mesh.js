import Class from 'lowclass'
import { Mesh as ThreeMesh } from 'three'
import Node from './Node'
import { props } from './props'
import { mapPropTo } from './Utility'

// register behaviors that can be used with this class.
// TODO: maybe useDefaultNames() should register these, otherwise the user can
// choose names for better flexibility. See TODO NAMING below.
import '../html/behaviors/BasicMaterialBehavior'
import '../html/behaviors/PhongMaterialBehavior'
import '../html/behaviors/DOMNodeMaterialBehavior'
import '../html/behaviors/BoxGeometryBehavior'
import '../html/behaviors/SphereGeometryBehavior'
import '../html/behaviors/PlaneGeometryBehavior'
import '../html/behaviors/DOMNodeGeometryBehavior'

// TODO:
// - [ ] API for registering new behaviors as they pertain to our API, built on top
//   of element-behaviors.
// - [x] Ability specify default initial behaviors. Make this generic, or on top of
//   element-behaviors?
// - [x] generic ability to specify custom element attribute types, as an addon to
//   Custom Elements. We can use the same mechanism to specify types for behaviors too?

export default
Class('Mesh').extends( Node, ({ Super }) => ({
    static: {
        defaultElementName: 'i-mesh',

        // TODO NAMING: It would be neat to be able to return an array of classes
        // as well, so that it can be agnostic of the naming. Either way should
        // work.
        defaultBehaviors: {
            'box-geometry': initialBehaviors => {
                return !initialBehaviors.some( b => b.endsWith( '-geometry' ) )
            },
            'phong-material': initialBehaviors => {
                return !initialBehaviors.some( b => b.endsWith( '-material' ) )
            },
        },

        props: {
            ...Node.props,
            castShadow: { ...mapPropTo(props.boolean, 'threeObject3d'), default: true },
            receiveShadow: { ...mapPropTo(props.boolean, 'threeObject3d'), default: true },
        },

    },

    passInitialValuesToThree() {
        this.threeObject3d.castShadow = this.castShadow
        this.threeObject3d.receiveShadow = this.receiveShadow
    },

    makeThreeObject3d() {
        return new ThreeMesh
    },

    updated(oldProps, oldState, modifiedProps) {
        Super(this).updated(oldProps, oldState, modifiedProps)

        if ( modifiedProps.castShadow ) {
            this._needsToBeRendered()
        }

        if ( modifiedProps.receiveShadow ) {
            this.threeObject3d.material.needsUpdate = true
            this._needsToBeRendered()
        }
    },
}))
