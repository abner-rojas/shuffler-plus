import * as THREE from "three"
import { useMemo, useRef } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { useGLTF, MeshRefractionMaterial, CubeCamera } from "@react-three/drei"
import diamondUrl from "../assets/dflat.glb?url"

export default function Diamonds({count}){

    const { viewport, clock } = useThree()
    const model = useRef()
    const { nodes } = useGLTF(diamondUrl)
    // Create random position data
    const dummy = useMemo(() => new THREE.Object3D(), [parseInt(count)])
    const diamonds = useMemo(
      () =>
        new Array(...Array(parseInt(count))).map((_, i) => ({
          position: [THREE.MathUtils.randFloatSpread(viewport.width * 1.4), 40 - Math.random() * 40, THREE.MathUtils.randFloatSpread(15) - 10],
          factor: 0.75 + Math.random() * 2,
          direction: Math.random() < 0.5 ? -1 : 1,
          rotation: [Math.sin(Math.random()) * Math.PI, Math.sin(Math.random()) * Math.PI, Math.cos(Math.random()) * Math.PI]
        })),
      [count]
    )
  
    // Render-loop
    useFrame((state, delta) => {
      // Update instanced diamonds
      
      diamonds.forEach((data, i) => {
        const t = clock.getElapsedTime()
        data.position[1] -= data.factor * 1 * delta * data.direction
        if (data.direction === 1 ? data.position[1] < -20 : data.position[1] > 20)
          data.position = [viewport.width / 2 - Math.random() * viewport.width, 50 * data.direction, data.position[2]]
        const { position, rotation, factor } = data
        dummy.position.set(position[0], position[1], position[2])
        dummy.rotation.set(rotation[0] + (t * factor) / 10, rotation[1] + (t * factor) / 10, rotation[2] + (t * factor) / 10)
        dummy.scale.setScalar(1 + factor)
        dummy.updateMatrix()
        model.current.setMatrixAt(i, dummy.matrix)
      })
      model.current.instanceMatrix.needsUpdate = true
    })
  
    return (
      <CubeCamera>
        {(texture) => (
          <instancedMesh ref={model} args={[nodes.Diamond_1_0.geometry, null, diamonds.length]}>
            <MeshRefractionMaterial bounces={3} aberrationStrength={0} envMap={texture} toneMapped={false} />
          </instancedMesh>
        )}
      </CubeCamera>
    )
}
