import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { socket } from "@/common/lib/socket";
import { useModal } from "@/common/recoil/modal";
import { useSetRoomId } from "@/common/recoil/room";

import NotFoundModal from "../modals/NotFound";

const Home = () => {
  const { openModal } = useModal();
  const setAtomRoomId = useSetRoomId();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = "#2c3e50"; // dark blue-gray background
  }, []);

  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      setAtomRoomId(roomIdFromServer);
      router.push(roomIdFromServer);
    });

    const handleJoinedRoom = (roomIdFromServer: string, failed?: boolean) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        router.push(roomIdFromServer);
      } else {
        openModal(<NotFoundModal id={roomId} />);
      }
    };

    socket.on("joined", handleJoinedRoom);

    return () => {
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  useEffect(() => {
    socket.emit("leave_room");
    setAtomRoomId("");
  }, [setAtomRoomId]);

  const handleCreateRoom = () => {
    socket.emit("create_room", username);
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (roomId) socket.emit("join_room", roomId, username);
  };

  return (
    // Changed padding top from py-24 to pt-12 pb-24 to move heading higher
    <div className="flex flex-col items-center pt-12 pb-24">
      <h1
        className="text-5xl font-extrabold leading-tight sm:text-extra"
        style={{ color: "#ecf0f1" }} // light off-white
      >
        SketchRoom by Akhil
      </h1>
      <h3
        className="text-xl sm:text-2xl"
        style={{ color: "#bdc3c7" }} // lighter grayish text
      >
        Collaborative drawing in real-time
      </h3>

      <div className="mt-10 flex flex-col gap-2 w-80">
        {/* Made this label larger by increasing font size and weight */}
        <label
          className="self-start font-extrabold text-lg leading-tight"
          style={{ color: "#ecf0f1" }}
        >
          Who’s wielding the brush?
        </label>
        <input
          className="input"
          id="room-id"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value.slice(0, 15))}
        />
      </div>

      <div className="my-8 h-px w-96 bg-zinc-200" />

      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleJoinRoom}
      >
        {/* Smaller label for join room */}
        <label
          htmlFor="room-id"
          className="self-start font-bold leading-tight text-base"
          style={{ color: "#ecf0f1" }}
        >
          Enter your session code
        </label>
        <input
          className="input"
          id="room-id"
          placeholder="Room id..."
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className="btn" type="submit">
          Join Session
        </button>
      </form>

      <div className="my-8 flex w-96 items-center gap-2">
        <div className="h-px w-full bg-zinc-200" />
        <p className="text-zinc-400">or</p>
        <div className="h-px w-full bg-zinc-200" />
      </div>

      <div className="flex flex-col items-center gap-2">
        {/* Smaller label for create session */}
        <h5
          className="self-start font-bold leading-tight text-base"
          style={{ color: "#ecf0f1" }}
        >
          Start a new session
        </h5>

        <button className="btn" onClick={handleCreateRoom}>
          Create Session
        </button>
      </div>

      <p className="mt-16 text-sm" style={{ color: "#95a5a6" }}>
        Made with ❤️ by Akhil Jaiswal
      </p>
    </div>
  );
};

export default Home;
