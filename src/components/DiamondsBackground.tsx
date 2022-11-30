import * as THREE from "three"
import { useEffect, useState } from "react"
import { Canvas} from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing"
import Diamonds from "./Diamonds"
import beach from "../assets/backgrounds/the-beach.jpg"
import space from "../assets/backgrounds/space.jpg"
import holidays from "../assets/backgrounds/holidays.jpg"
import neon from "../assets/backgrounds/neon.jpg"

function Background({theme}: {theme:string}) {

  let t = space

  if(theme == "space"){
     t = space
  }

  if(theme == "the-beach"){
    t = beach
  }

  if(theme == "holidays"){
    t = holidays
  }

  if(theme == "neon"){
    t = neon
  }
  
  const texture = useTexture(t)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  return (
    <mesh rotation={[-0.7, 0, 0]} scale={50}>
      <sphereGeometry />
      <meshBasicMaterial map={texture} depthTest={false} side={THREE.BackSide} />
    </mesh>
  )
}

export default function DiamondsBackground({theme, diamondCount} : {theme:string, diamondCount:number}) {

  const[background, setBackground] = useState('beach')
  const[count, setCount] = useState<number>(diamondCount)

  useEffect(() => {
    // console.log('Diamonds background render');
    
  }, [])

  useEffect(() => {

    setBackground(theme)

  }, [theme])

  useEffect(() => {
    setCount(diamondCount)

  }, [diamondCount])

  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 50, position: [0, 0, 25], near: 1, far: 100 }}>
      <color attach="background" args={["white"]} />
      <Background theme={background} />
      <Diamonds count={count} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.8} intensity={10} levels={9} mipmapBlur />
        <DepthOfField target={[0, 0, -10]} focalLength={0.1} bokehScale={10} height={1000} />
      </EffectComposer>
    </Canvas>
  )
}
