import { getUserFolders } from "@/actions/user";
import UserFolderCard from "./UserFolderCard";
const GetUserFolder = async () => {
  const folders = await getUserFolders();
  if (!folders || folders?.length === 0) {
    return (
      <div className="text-gray-500 text-xl flex items-center justify-center h-[500px] w-full">
        Currently you don&apos;t have any project!!
      </div>
    );
  }
  return (
    <div className="flex  flex-wrap  md:w-[90%] gap-5  ">
      {folders?.map((item) => (
        <UserFolderCard key={item.id} name={item.name} id={item.id} />
      ))}
    </div>
  );
};

export default GetUserFolder;
