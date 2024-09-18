import { Suspense } from "react";
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";

import { Dancer } from "./Dancer";
import { Loader } from "./Loader";
import { MovingDom } from "./dom/MovingDom";

export const MainCanvas = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const aspectRatio = window.innerWidth / window.innerHeight;

  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }}
      shadows="soft"
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 1000,
        position: [0, 6, 12],
      }}
      scene={{ background: new THREE.Color(0x000000) }}
    >
      <ScrollControls pages={isEntered ? 8 : 0} damping={0.25}>
        <Suspense fallback={<Loader />}>
          <MovingDom />
          <Dancer />
        </Suspense>
      </ScrollControls>
    </Canvas>
  );
};
