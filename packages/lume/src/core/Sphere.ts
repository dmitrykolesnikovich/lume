import Mesh, {MeshAttributes} from './Mesh.js'

import type {PhongMaterialBehavior, PhongMaterialBehaviorAttributes} from '../html/index.js'

export type SphereAttributes = MeshAttributes

export default class Sphere extends Mesh {
	static defaultElementName = 'lume-sphere'

	static defaultBehaviors = {
		'sphere-geometry': (initialBehaviors: string[]) => {
			return !initialBehaviors.some(b => b.endsWith('-geometry'))
		},
		'phong-material': (initialBehaviors: string[]) => {
			return !initialBehaviors.some(b => b.endsWith('-material'))
		},
	}
}

export {Sphere}

import type {ElementAttributes} from '@lume/element'

declare module '@lume/element' {
	namespace JSX {
		interface IntrinsicElements {
			'lume-sphere': ElementAttributes<
				Sphere,
				SphereAttributes,
				ElementAttributes<PhongMaterialBehavior, PhongMaterialBehaviorAttributes>
			>
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'lume-sphere': Sphere
	}
}
