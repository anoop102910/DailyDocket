import { updateProfile } from "@/lib/action";
// import { fetchUser, fetchUserByEmail } from "@/app/lib/data";
// import { getServerSession } from "next-auth";

async function NewUser({ params }) {
  //   const session = await  getServerSession();
  //   const { id } = await fetchUserByEmail(session.user.email);
  //   const user = await fetchUser(id);

//   console.log(user);
  return (
    <div className="flex justify-between items-center w-full ">
      <div className="w-full  mx-auto max-w-lg p-4  rounded-lg  sm:p-6 ">
        <form className="space-y-6">
          {/* <input type="hidden" name="id" value={user.id} /> */}
          <h5 className="text-3xl font-medium text-slate-800">Update Account</h5>
          <div>
            <label htmlFor="username" className="block mb-2  font-medium text-slate-800">
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="bg-transparent border border-slate-500 text-slate-100  rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-slate-400"
              placeholder="E.g. Anoop Singh"
            //   defaultValue={user.username}
              required
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-2  font-medium text-slate-800">
              Bio
            </label>
            <input
              type="bio"
              name="bio"
              id="bio"
              className="bg-transparent border border-slate-500 text-slate-100  rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-slate-400"
              placeholder="E.g. Hi! I am a frontend developer"
            //   defaultValue={user.bio ? user.bio : ""}
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-2  font-medium text-slate-800">
              Gender
            </label>
            <input
              type="gender"
              name="gender"
              id="gender"
              className="bg-transparent border border-slate-500 text-slate-100  rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-slate-400"
              placeholder="E.g. Female"
            //   defaultValue={user.gender ? user.gender : ""}
              required
            />
          </div>
          <div className="flex items-start"></div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center"
          >
            {"Update User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
