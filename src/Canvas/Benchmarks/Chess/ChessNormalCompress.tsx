import {useGLTF } from "@react-three/drei";
import {KTX2Loader } from "three-stdlib";
import {  useThree } from "@react-three/fiber";

export function Chess(props: JSX.IntrinsicElements["group"]) {
  const gl = useThree((state) => state.gl);
  const Scene = useGLTF(
    "BenchmarkModels/CompressedNormals/ChessKTX2.gltf",
    undefined,
    undefined,

    (loader) => {
      const ktx2loader = new KTX2Loader();
      ktx2loader.setTranscoderPath(
        "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/basis/"
      );
      ktx2loader.detectSupport(gl);
      loader.setKTX2Loader(ktx2loader);
    }
  );
  return (
      <group>
        <primitive object={Scene.scene} {...props} />
      </group>
  );
}
