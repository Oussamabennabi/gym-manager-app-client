import React from "react";
import DefaultModal from "./DefaultModal";
import MemberFormCard from "../forms/MemberFormCard";

const MemberModal = ({
  open,
  setOpen,
  memberId,
  setMemberId,
  fetchMembers,
}) => {
  const modalTitle = memberId ? "Edit A Member" : "Add A Member";
  return (
    <DefaultModal modalHeaderTitle={modalTitle} open={open} setOpen={setOpen}>
      <MemberFormCard
        memberId={memberId}
        setModalOpen={setOpen}
        setMemberId={setMemberId}
        fetchMembers={fetchMembers}
      />
    </DefaultModal>
  );
};

export default MemberModal;
