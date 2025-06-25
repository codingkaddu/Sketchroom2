import { useRoom } from "@/common/recoil/room";

const UserList = () => {
  const { users } = useRoom();

  return (
    <div className="flex flex-col p-2 bg-white h-full max-h-full overflow-y-auto rounded-l-md shadow-inner">
      <h3 className="mb-2 text-sm font-semibold text-gray-600 text-center">Users</h3>
      {[...users.keys()].map((userId) => {
        const user = users.get(userId);
        const name = user?.name || "Anon";

        return (
          <div
            key={userId}
            className="group flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 cursor-default"
            title={name} // Tooltip with full name on hover
          >
            <span
              className="inline-block h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-white select-none"
              style={{ backgroundColor: user?.color || "gray" }}
            >
              {name[0].toUpperCase()}
            </span>
            {/* Show username only on hover */}
            <span className="hidden text-xs text-gray-800 group-hover:inline">
              {name.length > 10 ? name.slice(0, 10) + "…" : name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
