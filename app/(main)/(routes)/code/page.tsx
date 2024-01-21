import { createOrFindUser } from "@/actions/user";
import { CreateModel } from "@/components/modal/CreateModel";
import { Button } from "@/components/ui/button";
import GetUserFolder from "@/components/user/GetUserFolder";

const page = async () => {
  const user = await createOrFindUser();
  return (
    <div className="px-4 md:px-20 p-3 flex-col flex items-center  justify-center w-full gap-y-10">
      <CreateModel>
        <Button variant={"outline"} className=" text-lg ml-auto">
          Create Project
        </Button>
      </CreateModel>

      <div className="lg:px-20 md:px-10 ">
        <GetUserFolder />
      </div>
    </div>
  );
};

export default page;
