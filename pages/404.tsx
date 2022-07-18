import Default from "@layout/Default/Default";
import { NextPageWithLayout } from "types";

const Custom404: NextPageWithLayout = () => <div>404 Page not Found</div>;

export default Custom404;

Custom404.getLayout = (page) => {
  return <Default>{page}</Default>;
};
