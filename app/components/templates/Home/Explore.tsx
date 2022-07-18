import { Eye, Collection } from "@element/SVG"

const Explore:React.FC = () => {
  return <div className="relative z-10 bg-[#151515] rounded-xl flex items-center justify-center py-28">
      <div className="absolute right-[20%] top-[-35%] scale-[1.3]">
        <Eye />
        <Collection />
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold text-7xl"> Explore </h3>
        <p className="text-[#515562] text-2xl mt-4 mx-auto w-8/12"> Our community-centric NFT marketplace </p>
      </div>
    </div>
}

export default Explore