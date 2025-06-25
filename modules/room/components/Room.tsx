import { useRoom } from "@/common/recoil/room";

import RoomContextProvider from "../context/Room.context";
import Canvas from "./board/Canvas";
import MousePosition from "./board/MousePosition";
import MousesRenderer from "./board/MousesRenderer";
import MoveImage from "./board/MoveImage";
import SelectionBtns from "./board/SelectionBtns";
import Chat from "./chat/Chat";
import NameInput from "./NameInput";
import ToolBar from "./toolbar/ToolBar";
import UserList from "./UserList";

const Room = () => {
  const room = useRoom();

  if (!room.id) return <NameInput />;

  return (
    <RoomContextProvider>
      <div className="relative h-full w-full overflow-hidden">

        {/* UserList Sidebar */}
        <div className="absolute right-0 top-0 h-full w-24 border-l border-gray-300 bg-white z-40">
          <UserList />
        </div>

        {/* Main Canvas and Other Components with right padding */}
        <div className="h-full pr-24">
          <ToolBar />
          <SelectionBtns />
          <MoveImage />
          <Canvas />
          <MousePosition />
          <MousesRenderer />
          <Chat />
        </div>
      </div>
    </RoomContextProvider>
  );
};

export default Room;
