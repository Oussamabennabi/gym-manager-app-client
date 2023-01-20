import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { deleteMember, getMember } from "../../services";
import DefaultModal from "./DefaultModal";
const DeleteMemberModel = ({
  open,
  setOpen,
  memberId,
  setMemberId,
  fetchMembers,
}) => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!memberId) return;
    const main = async () => {
      try {
        setMember(await getMember(memberId));
      } catch (error) {
        console.log(error);
      }
    };
    main();
  }, [memberId]);

  async function handleDelete() {
    try {
      setLoading(true);
      await deleteMember(memberId);
      await fetchMembers();
      setMember(null);
      setMemberId("");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <DefaultModal
      customStyles={{}}
      modalHeaderTitle={"Warning"}
      open={open}
      setOpen={setOpen}
    >
      <Stack
        direction="column"
        gap="3rem"
        my="1rem"
        justifyContent={"center"}
        alignItems="center"
      >
        <Box
          width="150px"
          height="150px"
          sx={{ objectFit: "cover" }}
          src={"http://localhost:3001/photos/" + member?.photo}
          component={"img"}
        />

        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          Are You sure you want to delete :{" "}
        </Typography>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }} variant="p">
          {member?.fullName}
        </Typography>
        <Button
          sx={{ fontWeight: "bold", fontSize: "1rem" }}
          disabled={loading}
          onClick={handleDelete}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </Stack>
    </DefaultModal>
  );
};

export default DeleteMemberModel;
