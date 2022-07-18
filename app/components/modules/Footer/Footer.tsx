export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {}

export const Footer:React.FC<IFooter> = ({ ...footerProps }) => (
  <footer { ...footerProps } className="mt-12 md:mt-28 py-6">
    <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between">
      <p className="text-xs text-[#7a7a7a]">&copy; NFT, Inc. All rights reserved.</p>
      <p className="text-xs text-[#7a7a7a]">Terms and Stuff</p>
    </div>
  </footer>
);