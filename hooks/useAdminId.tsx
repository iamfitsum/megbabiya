"use client";

import { chatMemberAdminRef } from "@/lib/converters/ChatMembers";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

type Props = {
  chatId: string;
};

function useAdminId({ chatId }: Props) {
  const [adminId, setAdminId] = useState<string>("");

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map(
        (doc) => doc.id
      )[0];

      setAdminId(adminId);
    };

    fetchAdminStatus();
  }, [chatId]);

  return adminId;
}

export default useAdminId;
