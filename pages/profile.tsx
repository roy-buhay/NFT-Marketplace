import Default from "@layout/Default/Default";
import { NextPageWithLayout } from "types";

const Profile:NextPageWithLayout = () => {
  return <>
      <h2 className="text-3xl font-semibold mb-3"> Edit Profile </h2>
      <p className="w-1/2 text-[.95rem] text-gray-700 font-light">
        {" "}
        You can set preferred display name, create your branded profile URL and
        manage other personal settings{" "}
      </p>

      <div className="flex items-center mt-8 w-7/12">
        <div className="flex flex-col items-start justify-between space-y-6 w-8/12">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded shadow-lg"
          >
            Update
          </button>
        </div>
        <div className="w-4/12"></div>
      </div>
      </>
}

export default Profile

Profile.getLayout = (page) => {
  return <Default>{page}</Default>;
};
