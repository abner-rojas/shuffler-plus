import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { Canvas} from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, SelectiveBloom } from '@react-three/postprocessing'
import Diamonds from './Diamonds'
import useImagePreloader from '../hooks/useImagePreloader'
import beach from '../assets/backgrounds/the-beach.jpg'
import space from '../assets/backgrounds/space.jpg'
import holidays from '../assets/backgrounds/holidays.jpg'
import neon from '../assets/backgrounds/neon.jpg'
import valentine from '../assets/backgrounds/valentine.jpg'
import carnival from '../assets/backgrounds/carnival.jpg'
import stpatrick from '../assets/backgrounds/stpatricks.jpg'
import halloween from '../assets/backgrounds/halloween.jpg'
import dayofthedead from '../assets/backgrounds/dayofthedead.jpg'

const backgroundImage:Record<string, string> = {
  beach,
  space,
  holidays,
  neon,
  valentine,
  carnival,
  stpatrick,
  halloween,
  dayofthedead
}

function Background({theme}: {theme:string}) {

  const texture = useTexture(backgroundImage[theme])
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
  const { imagesPreloaded } = useImagePreloader(Object.values(backgroundImage))

  useEffect(() => {
    
    
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
        <Bloom luminanceThreshold={0.8} intensity={10} levels={9} mipmapBlur={true} />
        <DepthOfField target={[0, 0, -10]} focalLength={0.1} bokehScale={10} height={1000} />
      </EffectComposer>
    </Canvas>
  )
}
