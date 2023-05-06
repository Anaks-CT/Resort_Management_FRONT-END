import React from "react";
import MemberTableProfile from "../../../components/User/MemberTableProfile";

function MemberPage() {

  return (
    <div className="text-white grid gap-5 p-2 max-h-[440px] overflow-y-auto scroll-0 rounded">
      <MemberTableProfile />
    </div>
  );
}

export default MemberPage;
