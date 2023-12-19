"use client";

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const CreateChatButton = (props: Props) => {
    const router = useRouter()
    const createNewChat = async () => {
        //logic...
        router.push(`/chat/id`)

    }
  return (
    <Button onClick={createNewChat} variant={"ghost"}>
      <MessageSquarePlusIcon />
    </Button>
  );
};

export default CreateChatButton;
